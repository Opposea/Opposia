import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface VerifyRequestBody {
  token: string;
  action?: string;
}

interface RecaptchaEnterpriseResponse {
  riskAnalysis?: {
    score?: number;
    reasons?: string[];
  };
  tokenProperties?: {
    valid: boolean;
    invalidReason?: string;
    action?: string;
  };
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, authorization, x-client-info, apikey",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const { token, action }: VerifyRequestBody = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing token" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("RECAPTCHA_ENTERPRISE_API_KEY");
    const projectId = Deno.env.get("RECAPTCHA_ENTERPRISE_PROJECT_ID");
    const minScoreEnv = Deno.env.get("RECAPTCHA_MIN_SCORE");
    const minScore = minScoreEnv ? parseFloat(minScoreEnv) : 0.5;

    if (!apiKey || !projectId) {
      console.error("RECAPTCHA_ENTERPRISE_API_KEY or RECAPTCHA_ENTERPRISE_PROJECT_ID not set");
      return new Response(
        JSON.stringify({ success: false, error: "Server misconfiguration" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const siteKey = "6Lfcp0ksAAAAAITpw8d6RY1V4cVhf-0pJhxVO-5b";

    const body = {
      event: {
        token,
        expectedAction: action || "auth",
        siteKey,
      },
    };

    const googleResponse = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!googleResponse.ok) {
      const text = await googleResponse.text();
      console.error("reCAPTCHA Enterprise API error:", text);
      return new Response(
        JSON.stringify({ success: false, error: "reCAPTCHA API error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = (await googleResponse.json()) as RecaptchaEnterpriseResponse;
    console.log("reCAPTCHA Enterprise response:", JSON.stringify(data));

    const valid = data.tokenProperties?.valid ?? false;
    const score = data.riskAnalysis?.score ?? 0;
    const tokenAction = data.tokenProperties?.action;

    const actionMatches = !action || !tokenAction || tokenAction === action;
    const passed = valid && actionMatches && score >= minScore;

    return new Response(
      JSON.stringify({
        success: passed,
        score,
        minScore,
        action: tokenAction,
        reasons: data.riskAnalysis?.reasons ?? [],
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("verify-recaptcha-enterprise error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

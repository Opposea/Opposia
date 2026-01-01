import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const securityHeaders = {
  // Content Security Policy - prevents XSS, clickjacking, and other injection attacks
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.gpteng.co",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.ipify.org",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
  
  // Prevent clickjacking
  "X-Frame-Options": "SAMEORIGIN",
  
  // Prevent MIME type sniffing
  "X-Content-Type-Options": "nosniff",
  
  // Enable XSS filter in browsers
  "X-XSS-Protection": "1; mode=block",
  
  // Control referrer information
  "Referrer-Policy": "strict-origin-when-cross-origin",
  
  // Enforce HTTPS
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  
  // Control browser features
  "Permissions-Policy": [
    "accelerometer=()",
    "camera=(self)",
    "geolocation=()",
    "gyroscope=()",
    "magnetometer=()",
    "microphone=(self)",
    "payment=()",
    "usb=()",
  ].join(", "),
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    // Return the security headers configuration
    // This can be used by the frontend or as documentation
    return new Response(
      JSON.stringify({
        success: true,
        headers: securityHeaders,
        description: {
          "Content-Security-Policy": "Prevents XSS and injection attacks by controlling resource loading",
          "X-Frame-Options": "Prevents clickjacking by disallowing embedding in iframes",
          "X-Content-Type-Options": "Prevents MIME-sniffing attacks",
          "X-XSS-Protection": "Enables browser XSS filtering",
          "Referrer-Policy": "Controls referrer header information",
          "Strict-Transport-Security": "Enforces HTTPS connections",
          "Permissions-Policy": "Controls browser feature access",
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...securityHeaders,
        },
      }
    );
  } catch (error) {
    console.error("Security headers error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});

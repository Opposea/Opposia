import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Allowed countries mapping (ISO 3166-1 alpha-2)
const ALLOWED_COUNTRIES = new Set([
  // UK
  'GB',
  // North America
  'US', 'CA',
  // EU countries
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
  'SI', 'ES', 'SE',
  // Australia & New Zealand
  'AU', 'NZ'
]);

// Blocked countries (extra check)
const BLOCKED_COUNTRIES = new Set([
  // Sub-Saharan Africa
  'NG', 'GH', 'KE', 'UG', 'CM', 'TZ', 'ZA', 'ZW', 'SN', 'CI', 'ET', 'CD',
  'AO', 'MZ', 'MG', 'ZM', 'MW', 'RW', 'BJ', 'TG', 'ML', 'NE', 'BF', 'SL',
  'LR', 'GM',
  // Other blocked
  'PH', 'TH', 'IN', 'BR', 'MX', 'ID', 'VN', 'CO'
]);

interface GeoResponse {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
  proxy: boolean;
  hosting: boolean;
  query: string;
  message?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { selectedCountry } = await req.json();

    if (!selectedCountry || typeof selectedCountry !== 'string') {
      return new Response(
        JSON.stringify({ 
          allowed: false, 
          reason: 'missing_country',
          message: 'Country selection is required' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user's IP from request headers
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const cfConnectingIp = req.headers.get('cf-connecting-ip');
    
    // Priority: CF > X-Forwarded-For > X-Real-IP
    let clientIp = cfConnectingIp || (forwardedFor ? forwardedFor.split(',')[0].trim() : null) || realIp;

    // Skip verification for local/development IPs
    if (!clientIp || clientIp === '127.0.0.1' || clientIp === '::1' || clientIp.startsWith('192.168.') || clientIp.startsWith('10.')) {
      console.log('Development/local IP detected, skipping geo verification');
      return new Response(
        JSON.stringify({ 
          allowed: true, 
          reason: 'development_mode',
          detectedCountry: selectedCountry,
          message: 'Location verification skipped in development' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Verifying location for IP: ${clientIp}, selected country: ${selectedCountry}`);

    // Call ip-api.com (free, includes VPN/proxy detection)
    // fields: status,message,country,countryCode,region,city,proxy,hosting,query
    const geoResponse = await fetch(
      `http://ip-api.com/json/${clientIp}?fields=status,message,country,countryCode,region,city,proxy,hosting,query`,
      { method: 'GET' }
    );

    if (!geoResponse.ok) {
      console.error('Geo API request failed:', geoResponse.status);
      // Fail open with warning - don't block legitimate users due to API issues
      return new Response(
        JSON.stringify({ 
          allowed: true, 
          reason: 'geo_api_unavailable',
          warning: 'Location verification temporarily unavailable',
          message: 'Please proceed with registration' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const geoData: GeoResponse = await geoResponse.json();
    console.log('Geo API response:', JSON.stringify(geoData));

    if (geoData.status !== 'success') {
      console.error('Geo API error:', geoData.message);
      return new Response(
        JSON.stringify({ 
          allowed: true, 
          reason: 'geo_lookup_failed',
          warning: 'Could not verify location',
          message: 'Please proceed with registration' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const detectedCountry = geoData.countryCode.toUpperCase();
    const selectedCountryUpper = selectedCountry.toUpperCase();

    // Check for VPN/Proxy usage
    if (geoData.proxy || geoData.hosting) {
      console.log(`VPN/Proxy detected for IP ${clientIp}`);
      return new Response(
        JSON.stringify({ 
          allowed: false, 
          reason: 'vpn_detected',
          message: 'VPN or proxy usage detected. Please disable your VPN and try again.' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if detected country is blocked
    if (BLOCKED_COUNTRIES.has(detectedCountry)) {
      console.log(`Blocked country detected: ${detectedCountry}`);
      return new Response(
        JSON.stringify({ 
          allowed: false, 
          reason: 'blocked_country',
          detectedCountry: detectedCountry,
          message: 'Registration is not available from your location.' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if detected country is in allowed list
    if (!ALLOWED_COUNTRIES.has(detectedCountry)) {
      console.log(`Country not in allowed list: ${detectedCountry}`);
      return new Response(
        JSON.stringify({ 
          allowed: false, 
          reason: 'country_not_allowed',
          detectedCountry: detectedCountry,
          message: 'Registration is only available in UK, EU, USA, Canada, Australia, and New Zealand.' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if selected country matches detected country
    if (selectedCountryUpper !== detectedCountry) {
      console.log(`Country mismatch: selected ${selectedCountryUpper}, detected ${detectedCountry}`);
      return new Response(
        JSON.stringify({ 
          allowed: false, 
          reason: 'country_mismatch',
          detectedCountry: detectedCountry,
          selectedCountry: selectedCountryUpper,
          message: `Your selected country (${selectedCountryUpper}) doesn't match your detected location (${detectedCountry}). Please select your actual country.` 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // All checks passed
    console.log(`Location verified: ${detectedCountry}`);
    return new Response(
      JSON.stringify({ 
        allowed: true, 
        reason: 'verified',
        detectedCountry: detectedCountry,
        city: geoData.city,
        region: geoData.region,
        message: 'Location verified successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in verify-location:', error);
    // Fail open - don't block users due to unexpected errors
    return new Response(
      JSON.stringify({ 
        allowed: true, 
        reason: 'verification_error',
        warning: 'Location verification encountered an error',
        message: 'Please proceed with registration' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

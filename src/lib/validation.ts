// UUID validation regex (RFC 4122)
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Validates if a string is a valid UUID v1-5
 */
export function isValidUUID(str: string | undefined | null): boolean {
  if (!str) return false;
  return UUID_REGEX.test(str);
}

/**
 * Sanitizes a string by removing HTML tags and trimming whitespace
 */
export function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

/**
 * Validates a string length is within bounds
 */
export function isValidLength(str: string, min: number, max: number): boolean {
  const length = str.length;
  return length >= min && length <= max;
}

// Allowed countries: UK, EU, USA, Canada, Australia, New Zealand
export const ALLOWED_COUNTRIES = [
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
];

// Explicitly blocked countries (for extra validation)
export const BLOCKED_COUNTRIES = [
  // Sub-Saharan Africa
  'NG', // Nigeria
  'GH', // Ghana
  'KE', // Kenya
  'UG', // Uganda
  'CM', // Cameroon
  'TZ', // Tanzania
  'ZA', // South Africa
  'ZW', // Zimbabwe
  'SN', // Senegal
  'CI', // Côte d'Ivoire
  'ET', // Ethiopia
  'CD', // DR Congo
  'AO', // Angola
  'MZ', // Mozambique
  'MG', // Madagascar
  'ZM', // Zambia
  'MW', // Malawi
  'RW', // Rwanda
  'BJ', // Benin
  'TG', // Togo
  'ML', // Mali
  'NE', // Niger
  'BF', // Burkina Faso
  'SL', // Sierra Leone
  'LR', // Liberia
  'GM', // Gambia
  // Other blocked countries
  'PH', // Philippines
  'TH', // Thailand
  'IN', // India
  'BR', // Brazil
  'MX', // Mexico
  'ID', // Indonesia
  'VN', // Vietnam
  'CO', // Colombia
];

/**
 * Validates if a country code is allowed for registration
 */
export function isAllowedCountry(countryCode: string | undefined | null): boolean {
  if (!countryCode || typeof countryCode !== 'string') {
    return false;
  }
  const code = countryCode.toUpperCase().trim();
  
  // First check if explicitly blocked
  if (BLOCKED_COUNTRIES.includes(code)) {
    return false;
  }
  
  // Then check if in allowed list
  return ALLOWED_COUNTRIES.includes(code);
}

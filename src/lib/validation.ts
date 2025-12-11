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

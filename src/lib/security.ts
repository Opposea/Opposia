/**
 * Security utilities for input validation and sanitization
 * Prevents XSS, SQL injection, and other common attacks
 */

// HTML entity encoding map
const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

/**
 * Escapes HTML entities to prevent XSS attacks
 * Use this when displaying user-provided content
 */
export function escapeHtml(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITIES[char] || char);
}

/**
 * Removes all HTML tags from a string
 * Use this for text-only fields like names, messages
 */
export function stripHtmlTags(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim();
}

/**
 * Sanitizes input by removing HTML tags and limiting length
 * Primary sanitization function for user input
 */
export function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (!input || typeof input !== 'string') return '';
  return stripHtmlTags(input).slice(0, maxLength);
}

/**
 * Validates and sanitizes email addresses
 * Returns null if invalid
 */
export function sanitizeEmail(email: string): string | null {
  if (!email || typeof email !== 'string') return null;
  
  const sanitized = email.toLowerCase().trim();
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  
  if (!emailRegex.test(sanitized) || sanitized.length > 254) {
    return null;
  }
  
  return sanitized;
}

/**
 * Validates password strength
 * Returns error message or null if valid
 */
export function validatePassword(password: string): string | null {
  if (!password || typeof password !== 'string') {
    return 'Password is required';
  }
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  if (password.length > 128) {
    return 'Password is too long';
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return 'Password must contain at least one number';
  }
  
  return null;
}

/**
 * Validates and sanitizes a name field
 * Removes special characters, limits length
 */
export function sanitizeName(name: string, maxLength: number = 100): string {
  if (!name || typeof name !== 'string') return '';
  
  // Remove HTML tags and trim
  let sanitized = stripHtmlTags(name);
  
  // Remove control characters and null bytes
  sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');
  
  // Limit length
  return sanitized.slice(0, maxLength).trim();
}

/**
 * Validates UUID format (v1-5)
 */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidUUID(str: string | undefined | null): boolean {
  if (!str || typeof str !== 'string') return false;
  return UUID_REGEX.test(str);
}

/**
 * Validates URL format and ensures HTTPS
 * Returns sanitized URL or null if invalid
 */
export function sanitizeUrl(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  
  try {
    const parsed = new URL(url.trim());
    
    // Only allow HTTPS URLs
    if (parsed.protocol !== 'https:') {
      return null;
    }
    
    return parsed.href;
  } catch {
    return null;
  }
}

/**
 * Validates message content
 * Returns sanitized message or error
 */
export function sanitizeMessage(message: string, maxLength: number = 2000): { 
  valid: boolean; 
  sanitized: string; 
  error?: string 
} {
  if (!message || typeof message !== 'string') {
    return { valid: false, sanitized: '', error: 'Message is required' };
  }
  
  const sanitized = stripHtmlTags(message);
  
  if (sanitized.length === 0) {
    return { valid: false, sanitized: '', error: 'Message cannot be empty' };
  }
  
  if (sanitized.length > maxLength) {
    return { 
      valid: false, 
      sanitized: sanitized.slice(0, maxLength), 
      error: `Message is too long (max ${maxLength} characters)` 
    };
  }
  
  return { valid: true, sanitized };
}

/**
 * Rate limiting helper for client-side
 */
interface RateLimitState {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitState>();

export function checkClientRateLimit(
  key: string, 
  maxRequests: number = 10, 
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const state = rateLimitStore.get(key);
  
  if (!state || now > state.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (state.count >= maxRequests) {
    return false;
  }
  
  state.count++;
  return true;
}

/**
 * Prevents prototype pollution attacks
 * Safely parses JSON without prototype pollution
 */
export function safeJsonParse<T>(json: string): T | null {
  try {
    const parsed = JSON.parse(json);
    
    // Check for prototype pollution attempts
    if (typeof parsed === 'object' && parsed !== null) {
      if ('__proto__' in parsed || 'constructor' in parsed || 'prototype' in parsed) {
        console.warn('Potential prototype pollution attempt detected');
        return null;
      }
    }
    
    return parsed as T;
  } catch {
    return null;
  }
}

/**
 * Validates and sanitizes bio/description text
 */
export function sanitizeBio(bio: string, maxLength: number = 1000): string {
  if (!bio || typeof bio !== 'string') return '';
  
  let sanitized = stripHtmlTags(bio);
  
  // Remove control characters except newlines
  sanitized = sanitized.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // Normalize whitespace
  sanitized = sanitized.replace(/\s+/g, ' ').trim();
  
  return sanitized.slice(0, maxLength);
}

/**
 * Validates location string
 */
export function sanitizeLocation(location: string, maxLength: number = 200): string {
  if (!location || typeof location !== 'string') return '';
  
  let sanitized = stripHtmlTags(location);
  
  // Remove special characters except comma, space, and common location punctuation
  sanitized = sanitized.replace(/[^\w\s,.-]/g, '');
  
  return sanitized.slice(0, maxLength).trim();
}

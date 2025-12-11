-- Fix search_path security issues for functions
CREATE OR REPLACE FUNCTION public.validate_email(email TEXT)
RETURNS BOOLEAN 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$;

CREATE OR REPLACE FUNCTION public.sanitize_text_input(input_text TEXT)
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Remove HTML tags and limit length
  RETURN LEFT(regexp_replace(input_text, '<[^>]*>', '', 'g'), 1000);
END;
$$;
-- Update the handle_new_user function to include date_of_birth and country
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, date_of_birth, country)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'name',
    (NEW.raw_user_meta_data->>'date_of_birth')::DATE,
    NEW.raw_user_meta_data->>'country'
  );
  RETURN NEW;
END;
$$;
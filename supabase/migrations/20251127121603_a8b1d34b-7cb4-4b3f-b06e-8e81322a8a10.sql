-- Add date of birth, country, and age verification status to profiles
ALTER TABLE public.profiles 
ADD COLUMN date_of_birth DATE,
ADD COLUMN country TEXT,
ADD COLUMN age_verified BOOLEAN DEFAULT false;

-- Create index on country for filtering UK users
CREATE INDEX idx_profiles_country ON public.profiles(country);

-- Create index on age_verified for admin queries
CREATE INDEX idx_profiles_age_verified ON public.profiles(age_verified) WHERE age_verified = false;
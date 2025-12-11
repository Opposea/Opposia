-- Add age and location to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS age INTEGER,
ADD COLUMN IF NOT EXISTS location TEXT;

-- Create quiz_answers table to store user quiz responses
CREATE TABLE IF NOT EXISTS public.quiz_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, question_id)
);

-- Enable RLS on quiz_answers
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;

-- Create policies for quiz_answers
CREATE POLICY "Users can view their own quiz answers" 
ON public.quiz_answers 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz answers" 
ON public.quiz_answers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz answers" 
ON public.quiz_answers 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add trigger for quiz_answers updated_at
CREATE TRIGGER update_quiz_answers_updated_at
BEFORE UPDATE ON public.quiz_answers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to calculate compatibility score between two users
CREATE OR REPLACE FUNCTION public.calculate_compatibility_score(user1_id UUID, user2_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  total_questions INTEGER := 0;
  opposite_answers INTEGER := 0;
  compatibility_score INTEGER := 0;
BEGIN
  -- Get total questions both users answered
  SELECT COUNT(DISTINCT qa1.question_id)
  INTO total_questions
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id AND qa2.user_id = user2_id;
  
  -- Count opposite answers (for attraction of opposites)
  -- This is simplified - you can customize the logic for what makes good matches
  SELECT COUNT(*)
  INTO opposite_answers
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id 
    AND qa2.user_id = user2_id 
    AND qa1.answer != qa2.answer;
  
  -- Calculate compatibility as percentage of opposite answers
  IF total_questions > 0 THEN
    compatibility_score := ROUND((opposite_answers::DECIMAL / total_questions::DECIMAL) * 100);
  END IF;
  
  RETURN compatibility_score;
END;
$$;
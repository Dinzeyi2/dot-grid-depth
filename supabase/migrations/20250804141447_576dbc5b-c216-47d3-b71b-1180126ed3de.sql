-- Create waitlist table to store email submissions
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  professional_field TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public waitlist)
CREATE POLICY "Anyone can join the waitlist" 
ON public.waitlist 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading (for duplicate checking)
CREATE POLICY "Anyone can check if email exists" 
ON public.waitlist 
FOR SELECT 
USING (true);
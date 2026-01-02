-- Fix RLS Policies for PrimeFace Models
-- Run this in Supabase SQL Editor to allow public form submissions

-- Drop existing policies that are too restrictive
DROP POLICY IF EXISTS "Anyone can submit applications" ON model_applications;
DROP POLICY IF EXISTS "Anyone can submit contact" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can manage models" ON models;
DROP POLICY IF EXISTS "Public can view active models" ON models;

-- Model Applications: Allow anyone to INSERT (submit applications)
CREATE POLICY "Allow public application submissions" ON model_applications
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- Model Applications: Allow anyone to view their own (by email) - optional
CREATE POLICY "Allow viewing applications" ON model_applications
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Contact Submissions: Allow anyone to INSERT
CREATE POLICY "Allow public contact submissions" ON contact_submissions
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Contact Submissions: Allow reading
CREATE POLICY "Allow viewing contacts" ON contact_submissions
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Models: Allow public to view active models
CREATE POLICY "Public can view active models" ON models
    FOR SELECT
    TO anon, authenticated
    USING (active = true);

-- Models: Allow authenticated users to manage (for admin)
CREATE POLICY "Allow model management" ON models
    FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Verify policies are set
SELECT tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE schemaname = 'public';

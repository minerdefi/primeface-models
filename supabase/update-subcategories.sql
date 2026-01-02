-- Update subcategory constraint to match website structure
-- Run this in Supabase SQL Editor

-- STEP 1: Update existing models with old subcategories FIRST
UPDATE models SET subcategory = 'fashion' WHERE subcategory = 'main-board';
UPDATE models SET subcategory = 'commercial' WHERE subcategory = 'development';
UPDATE models SET subcategory = 'classic' WHERE subcategory = 'direct-booking';

-- STEP 2: Drop the old constraint
ALTER TABLE models DROP CONSTRAINT IF EXISTS models_subcategory_check;

-- STEP 3: Add new constraint with correct subcategories
ALTER TABLE models ADD CONSTRAINT models_subcategory_check 
CHECK (subcategory IN ('fashion', 'commercial', 'classic', 'girls', 'boys', 'tween'));

-- Verify the change
SELECT constraint_name, check_clause 
FROM information_schema.check_constraints 
WHERE constraint_name = 'models_subcategory_check';

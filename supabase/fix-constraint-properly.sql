-- Complete fix for subcategory constraint
-- This will properly remove and recreate the constraint

-- Step 1: Check what constraints exist
SELECT conname, contype, pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = 'models'::regclass
AND conname LIKE '%subcategory%';

-- Step 2: Drop ALL subcategory constraints (there might be multiple)
DO $$ 
DECLARE
    constraint_record RECORD;
BEGIN
    FOR constraint_record IN 
        SELECT conname 
        FROM pg_constraint 
        WHERE conrelid = 'models'::regclass 
        AND conname LIKE '%subcategory%'
    LOOP
        EXECUTE 'ALTER TABLE models DROP CONSTRAINT IF EXISTS ' || constraint_record.conname;
    END LOOP;
END $$;

-- Step 3: Update any existing models with old subcategories
UPDATE models SET subcategory = 'fashion' WHERE subcategory = 'main-board';
UPDATE models SET subcategory = 'commercial' WHERE subcategory = 'development';
UPDATE models SET subcategory = 'classic' WHERE subcategory = 'direct-booking';

-- Step 4: Add the new constraint with correct values
ALTER TABLE models ADD CONSTRAINT models_subcategory_check 
CHECK (subcategory IN ('fashion', 'commercial', 'classic', 'girls', 'boys', 'tween'));

-- Step 5: Verify the new constraint
SELECT conname, pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = 'models'::regclass
AND conname = 'models_subcategory_check';

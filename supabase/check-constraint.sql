-- Check current constraint
SELECT constraint_name, check_clause 
FROM information_schema.check_constraints 
WHERE constraint_name = 'models_subcategory_check';

-- Also check all models and their subcategories
SELECT id, name, category, subcategory 
FROM models 
ORDER BY created_at DESC;

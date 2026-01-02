// Check database models
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkModels() {
    try {
        const { data, error } = await supabase
            .from('models')
            .select('*')
            .eq('active', true);

        if (error) {
            console.error('Database Error:', error.message);
            return;
        }

        console.log('Models in database:');
        console.log(JSON.stringify(data, null, 2));

        if (data && data.length > 0) {
            console.log('\nFirst model measurements:');
            const firstModel = data[0];
            console.log('Height:', firstModel.height);
            console.log('Chest:', firstModel.chest);
            console.log('Waist:', firstModel.waist);
            console.log('Bust:', firstModel.bust);
            console.log('Hips:', firstModel.hips);
            console.log('Dress Size:', firstModel.dress_size);
            console.log('Inseam:', firstModel.inseam);
            console.log('Suit:', firstModel.suit);
            console.log('Suit Length:', firstModel.suit_length);
            console.log('Shoe Size:', firstModel.shoe_size);
            console.log('Hair Color:', firstModel.hair_color);
            console.log('Eye Color:', firstModel.eye_color);
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
}

checkModels();

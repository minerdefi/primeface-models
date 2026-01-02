// Quick test to verify Supabase connection
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing Supabase Connection...\n');
console.log('URL:', supabaseUrl);
console.log('Key length:', supabaseKey ? supabaseKey.length : 0);
console.log('Key preview:', supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'MISSING');

if (!supabaseUrl || !supabaseKey) {
    console.error('\n❌ Missing Supabase credentials in .env.local');
    console.log('\nYour .env.local should have:');
    console.log('NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co');
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...(very long token)');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection by querying models table
async function testConnection() {
    try {
        const { data, error } = await supabase
            .from('models')
            .select('count')
            .limit(1);

        if (error) {
            console.error('\n❌ Database Error:', error.message);
            console.log('\nMake sure you:');
            console.log('1. Ran the schema.sql in Supabase SQL Editor');
            console.log('2. Have the correct anon key (should be ~200+ characters)');
            return;
        }

        console.log('\n✅ Successfully connected to Supabase!');
        console.log('Database is accessible.');
    } catch (err) {
        console.error('\n❌ Connection Error:', err.message);
    }
}

testConnection();

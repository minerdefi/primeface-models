// Test Supabase Authentication
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing Supabase Auth...\n');
console.log('URL:', supabaseUrl);
console.log('Key (first 20 chars):', supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'MISSING');

if (!supabaseUrl || !supabaseKey) {
    console.error('\n❌ Missing credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
    // Test with the credentials you're trying to use
    const email = 'admin@primefacemodels.com'; // Change this to your email
    const password = 'your-password-here'; // Change this to your password

    console.log('\nAttempting to sign in with:');
    console.log('Email:', email);
    console.log('Password:', '*'.repeat(password.length));

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('\n❌ Authentication Error:');
        console.error('Code:', error.code);
        console.error('Message:', error.message);
        console.error('Status:', error.status);

        if (error.message.includes('Invalid login credentials')) {
            console.log('\n💡 Possible reasons:');
            console.log('1. User does not exist in Supabase Auth');
            console.log('2. Password is incorrect');
            console.log('3. Email is not confirmed (check "Auto Confirm User" was checked)');
            console.log('\nTo fix:');
            console.log('- Go to Supabase Dashboard → Authentication → Users');
            console.log('- Verify the user exists with this email');
            console.log('- Try resetting the password or creating a new user');
        }
        return;
    }

    console.log('\n✅ Authentication Successful!');
    console.log('User ID:', data.user.id);
    console.log('Email:', data.user.email);
    console.log('Session expires:', new Date(data.session.expires_at * 1000).toLocaleString());
}

testAuth();

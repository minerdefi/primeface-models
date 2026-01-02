// Check if any users exist in Supabase Auth
const { createClient } = require('@supabase/supabase-js');

// Read .env.local manually
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const getEnvVar = (name) => {
    const match = envContent.match(new RegExp(`${name}=(.+)`));
    return match ? match[1].trim() : null;
};

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
const serviceKey = getEnvVar('SUPABASE_SERVICE_ROLE_KEY');

console.log('Checking Supabase Auth Users...\n');

// Try with service role key if available
const keyToUse = serviceKey && serviceKey !== 'your-service-role-key-here' ? serviceKey : supabaseKey;
const supabase = createClient(supabaseUrl, keyToUse);

async function checkUsers() {
    try {
        // Try to list users (requires service_role key)
        const { data, error } = await supabase.auth.admin.listUsers();

        if (error) {
            console.log('❌ Cannot list users with current key');
            console.log('Error:', error.message);
            console.log('\nThis is normal - listing users requires service_role key.');
            console.log('You need to check users in Supabase Dashboard instead.\n');
            console.log('Go to: https://supabase.com/dashboard/project/zxwelgczcfdpyvqwpxri/auth/users');
            return;
        }

        if (data && data.users) {
            console.log(`✅ Found ${data.users.length} user(s) in authentication:\n`);

            if (data.users.length === 0) {
                console.log('⚠️  No users exist yet!');
                console.log('\nYou need to create an admin user:');
                console.log('1. Go to Supabase Dashboard → Authentication → Users');
                console.log('2. Click "Add User" → "Create new user"');
                console.log('3. Enter email and password');
                console.log('4. Check "Auto Confirm User"');
                console.log('5. Click "Create User"');
            } else {
                data.users.forEach((user, index) => {
                    console.log(`User ${index + 1}:`);
                    console.log(`  Email: ${user.email}`);
                    console.log(`  ID: ${user.id}`);
                    console.log(`  Confirmed: ${user.email_confirmed_at ? '✅ Yes' : '❌ No'}`);
                    console.log(`  Created: ${new Date(user.created_at).toLocaleString()}`);
                    console.log('');
                });
            }
        }
    } catch (err) {
        console.error('Error:', err.message);
        console.log('\n💡 To check users, go to:');
        console.log('https://supabase.com/dashboard/project/zxwelgczcfdpyvqwpxri/auth/users');
    }
}

checkUsers();

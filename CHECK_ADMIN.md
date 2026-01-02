# Check Admin User Setup

## Step 1: Verify User Exists in Supabase

1. Go to: https://supabase.com/dashboard/project/zxwelgczcfdpyvqwpxri/auth/users
2. Look for a user with email: `admin@primefacemodels.com`
3. Check the user's status:
   - ✅ Should show "Confirmed" (green checkmark)
   - ❌ If it shows "Waiting for verification", the user wasn't auto-confirmed

## Step 2: If User Doesn't Exist or Has Issues

### Option A: Create User via Dashboard
1. Click **Add User** button
2. Select **Create new user**
3. Enter:
   - Email: `admin@primefacemodels.com`
   - Password: `Admin123!` (or your choice)
4. **IMPORTANT**: ✅ Check "Auto Confirm User"
5. Click **Create User**

### Option B: If User Exists but Not Confirmed
1. Click on the user in the list
2. Click **Send confirmation email** OR
3. Delete the user and recreate with "Auto Confirm User" checked

## Step 3: Test Login

1. Go to: http://localhost:3000/backstage/login
2. Enter:
   - Email: `admin@primefacemodels.com`
   - Password: `Admin123!` (or whatever you set)
3. Click **Sign In**

## Common Issues

### "Invalid login credentials"
- User doesn't exist → Create it
- Wrong password → Reset or recreate user
- Email not confirmed → Check "Auto Confirm User" was enabled

### "Email not confirmed"
- The user needs to be confirmed
- Either click confirmation link in email OR
- Recreate with "Auto Confirm User" checked

### Still not working?
- Try a different email (e.g., your personal email)
- Make sure you're in the correct Supabase project
- Check browser console for detailed error messages (F12 → Console tab)

---

## Quick Test Credentials

For testing, try creating a user with:
- Email: `test@test.com`
- Password: `Test123!`
- ✅ Auto Confirm User

Then login with those credentials to verify the system works.

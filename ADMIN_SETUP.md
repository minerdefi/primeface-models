# Admin User Setup Guide

## Quick Setup (Recommended)

### Step 1: Go to Supabase Dashboard
1. Open your browser and go to: https://supabase.com/dashboard
2. Select your project: `primeface-models`

### Step 2: Create Admin User
1. Click **Authentication** in the left sidebar
2. Click **Users** tab
3. Click the green **Add User** button (top right)
4. Click **Create new user**
5. Fill in the form:
   ```
   Email: admin@primefacemodels.com
   Password: [Choose a strong password - write it down!]
   ```
6. **IMPORTANT**: Check the box ✅ **Auto Confirm User**
7. Click **Create User**

### Step 3: Login
1. Go to: http://localhost:3000/backstage/login
2. Enter:
   - Email: `admin@primefacemodels.com`
   - Password: [the password you just created]
3. Click **Sign In**

You should now be logged into the admin dashboard!

---

## Troubleshooting

### "Invalid credentials" error
- Make sure you created the user in Supabase Dashboard
- Double-check the email and password match exactly
- Ensure you checked "Auto Confirm User" when creating the user
- Wait a few seconds after creating the user, then try again

### "User already exists" in Supabase
- If you already created a user, just use that email/password to login
- Or delete the existing user and create a new one

### Can't access Supabase Dashboard
- Make sure you're logged into supabase.com
- Verify you're in the correct project
- Check your internet connection

---

## What You Can Do in the Admin Panel

Once logged in, you'll have access to:

- **Dashboard** - View stats and recent activity
- **Models** - Add, edit, delete models; toggle featured status
- **Applications** - Review "Become a Model" submissions
- **Contacts** - Manage contact form messages

---

## Security Notes

- Never share your admin credentials
- Use a strong, unique password
- The `/backstage` URL is protected - only authenticated users can access it
- Users are automatically redirected to login if not authenticated

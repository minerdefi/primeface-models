# Supabase Setup Guide for PrimeFace Models

This guide walks you through setting up Supabase for the PrimeFace Models application.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in (or create an account)
2. Click **New Project**
3. Fill in:
   - **Project name**: `primeface-models`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click **Create new project** and wait for setup (~2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (safe for client-side)
   - **service_role** key (keep secret, server-side only)

## Step 3: Create Environment Variables

Create a `.env.local` file in your project root:

```bash
# Copy from .env.example and fill in your values
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Step 4: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL editor
5. Click **Run** to execute

This creates:
- `models` table - Store model profiles
- `model_applications` table - Store "Become a Model" submissions
- `contact_submissions` table - Store contact form messages
- Row Level Security policies
- Auto-update triggers

## Step 5: Create Storage Buckets

1. Go to **Storage** in the Supabase dashboard
2. Click **New bucket**
3. Create two buckets:

### Bucket 1: model-images
- **Name**: `model-images`
- **Public**: ✅ Yes
- Used for model portfolio images

### Bucket 2: application-images
- **Name**: `application-images`
- **Public**: ✅ Yes
- Used for "Become a Model" form uploads

### Set Storage Policies

For each bucket, add policies to allow uploads:

1. Click on the bucket
2. Go to **Policies**
3. Click **New Policy** → **For full customization**
4. Use these settings:

**For `application-images` bucket:**

**Policy 1: Allow public read access**
- **Name**: `Public Access`
- **Allowed operations**: ✅ SELECT
- **Policy definition**:
  ```sql
  bucket_id = 'application-images'
  ```

**Policy 2: Allow public uploads**
- **Name**: `Allow uploads`
- **Allowed operations**: ✅ INSERT
- **Policy definition**:
  ```sql
  bucket_id = 'application-images'
  ```

**For `model-images` bucket:**

**Policy 1: Allow public read access**
- **Name**: `Public Access`
- **Allowed operations**: ✅ SELECT
- **Policy definition**:
  ```sql
  bucket_id = 'model-images'
  ```

**Policy 2: Allow public uploads**
- **Name**: `Allow uploads`
- **Allowed operations**: ✅ INSERT
- **Policy definition**:
  ```sql
  bucket_id = 'model-images'
  ```

### Alternative: Run in SQL Editor

If the dashboard method doesn't work, go to **SQL Editor** and run:

```sql
-- Allow public read access to application images
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'application-images');

-- Allow uploads to application images
CREATE POLICY "Allow uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'application-images');

-- Allow public read access to model images
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'model-images');

-- Allow uploads to model images
CREATE POLICY "Allow uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'model-images');
```

Repeat for `model-images` bucket.

## Step 6: Test Your Setup

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/become-a-model`
3. Fill out and submit the form
4. Check your Supabase dashboard → **Table Editor** → `model_applications`
5. You should see your test submission!

## API Endpoints Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/applications` | POST | Submit model application |
| `/api/applications` | GET | List applications (admin) |
| `/api/models` | GET | Get all models |
| `/api/models` | POST | Create model (admin) |
| `/api/models/[slug]` | GET | Get single model |
| `/api/models/[slug]` | PUT | Update model (admin) |
| `/api/models/[slug]` | DELETE | Delete model (admin) |
| `/api/contact` | POST | Submit contact form |
| `/api/contact` | GET | List contacts (admin) |
| `/api/upload` | POST | Upload image |

## Database Schema

### models
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR | Model's name |
| slug | VARCHAR | URL-friendly identifier |
| category | VARCHAR | women, men, or kids |
| subcategory | VARCHAR | main-board, development, etc. |
| height, chest, waist, etc. | VARCHAR | Measurements |
| images | TEXT[] | Array of image URLs |
| featured | BOOLEAN | Show on homepage |
| active | BOOLEAN | Soft delete flag |

### model_applications
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| first_name, last_name | VARCHAR | Personal info |
| email, phone, address | VARCHAR | Contact info |
| gender | VARCHAR | female, male, children |
| height, waist, bust, etc. | VARCHAR | Measurements |
| image_urls | TEXT[] | Uploaded photos |
| status | VARCHAR | pending, reviewed, accepted, rejected |

### contact_submissions
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name, email, phone | VARCHAR | Contact info |
| subject, message | TEXT | Message content |
| status | VARCHAR | new, read, replied |

## Troubleshooting

### "Failed to submit application"
- Check your `.env.local` has correct Supabase URL and keys
- Ensure database tables were created successfully
- Check browser console for specific errors

### Images not uploading
- Verify storage buckets exist
- Check storage policies allow uploads
- Ensure file size is under 5MB

### Row Level Security errors
- Make sure RLS policies were created
- For testing, you can temporarily disable RLS:
  ```sql
  ALTER TABLE model_applications DISABLE ROW LEVEL SECURITY;
  ```

## Admin Backstage Setup

The admin interface is available at `/backstage` - a unique URL for managing models, applications, and contacts.

### Create an Admin User

1. Go to your **Supabase Dashboard** → **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter:
   - **Email**: `admin@primefacemodels.com` (or your preferred email)
   - **Password**: Choose a strong password
   - **Auto Confirm User**: ✅ Check this box
4. Click **Create User**

### Access the Admin Panel

1. Go to `http://localhost:3000/backstage/login`
2. Enter the email and password you created
3. You'll be redirected to the dashboard

### Admin Features

| Page | URL | Features |
|------|-----|----------|
| Dashboard | `/backstage` | Stats overview, recent applications |
| Models | `/backstage/models` | Add, edit, delete models, toggle featured |
| Applications | `/backstage/applications` | Review applications, change status, add notes |
| Contacts | `/backstage/contacts` | View messages, mark as read/replied, delete |

## Next Steps

1. **Email Notifications**: Use Supabase Edge Functions to send emails on new submissions
2. **reCAPTCHA**: Integrate Google reCAPTCHA to prevent spam
3. **Image Upload to Storage**: Connect the form image uploads to Supabase Storage

## Files Created

```
lib/
  ├── supabase.ts          # Supabase client and types
  └── supabase-auth.ts     # Authentication helpers

app/api/
  ├── applications/
  │   └── route.ts         # Model application endpoints
  ├── models/
  │   ├── route.ts         # Models list/create endpoints
  │   └── [slug]/
  │       └── route.ts     # Single model CRUD
  ├── contact/
  │   └── route.ts         # Contact form endpoints
  └── upload/
      └── route.ts         # Image upload endpoint

app/backstage/
  ├── layout.tsx           # Admin layout with sidebar
  ├── page.tsx             # Dashboard
  ├── login/
  │   └── page.tsx         # Login page
  ├── models/
  │   └── page.tsx         # Models management
  ├── applications/
  │   └── page.tsx         # Applications management
  └── contacts/
      └── page.tsx         # Contacts management

supabase/
  ├── schema.sql           # Database schema
  ├── fix-rls.sql          # RLS policy fixes
  └── create-admin-user.sql # Admin user setup guide

.env.example               # Environment variables template
```

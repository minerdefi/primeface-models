-- PrimeFace Models Database Schema
-- Run this SQL in your Supabase SQL Editor to create the necessary tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- MODELS TABLE
-- Stores all model profiles
-- ============================================
CREATE TABLE IF NOT EXISTS models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL CHECK (category IN ('women', 'men', 'kids')),
    subcategory VARCHAR(50) CHECK (subcategory IN ('main-board', 'development', 'direct-booking', 'girls', 'boys')),
    
    -- Measurements
    height VARCHAR(20),
    chest VARCHAR(20),
    waist VARCHAR(20),
    bust VARCHAR(20),
    hips VARCHAR(20),
    inseam VARCHAR(20),
    suit VARCHAR(20),
    suit_length VARCHAR(20),
    dress_size VARCHAR(20),
    shoe_size VARCHAR(20),
    hair_color VARCHAR(50),
    eye_color VARCHAR(50),
    
    -- Images stored as array of URLs
    images TEXT[] DEFAULT '{}',
    
    -- Status
    featured BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_models_slug ON models(slug);
CREATE INDEX IF NOT EXISTS idx_models_category ON models(category);
CREATE INDEX IF NOT EXISTS idx_models_active ON models(active);

-- ============================================
-- MODEL APPLICATIONS TABLE
-- Stores form submissions from "Become a Model" page
-- ============================================
CREATE TABLE IF NOT EXISTS model_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Personal Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    
    -- Social Media
    instagram VARCHAR(100),
    facebook VARCHAR(100),
    message TEXT,
    
    -- Model Details
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('female', 'male', 'children')),
    height VARCHAR(20) NOT NULL,
    waist VARCHAR(20) NOT NULL,
    bust VARCHAR(20) NOT NULL,
    hips VARCHAR(20) NOT NULL,
    dress_size VARCHAR(20) NOT NULL,
    shoe_size VARCHAR(20) NOT NULL,
    hair_color VARCHAR(50) NOT NULL,
    eye_color VARCHAR(50) NOT NULL,
    
    -- Uploaded images stored as array of URLs
    image_urls TEXT[] DEFAULT '{}',
    
    -- Application Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
    admin_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_applications_status ON model_applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_email ON model_applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_created ON model_applications(created_at DESC);

-- ============================================
-- CONTACT SUBMISSIONS TABLE
-- Stores contact form submissions
-- ============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public can read active models
CREATE POLICY "Public can view active models" ON models
    FOR SELECT USING (active = TRUE);

-- Only authenticated users can manage models (for admin)
CREATE POLICY "Authenticated users can manage models" ON models
    FOR ALL USING (auth.role() = 'authenticated');

-- Anyone can submit applications
CREATE POLICY "Anyone can submit applications" ON model_applications
    FOR INSERT WITH CHECK (TRUE);

-- Only authenticated users can view/manage applications (for admin)
CREATE POLICY "Authenticated users can view applications" ON model_applications
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update applications" ON model_applications
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Anyone can submit contact forms
CREATE POLICY "Anyone can submit contact" ON contact_submissions
    FOR INSERT WITH CHECK (TRUE);

-- Only authenticated users can view/manage contacts (for admin)
CREATE POLICY "Authenticated users can view contacts" ON contact_submissions
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contacts" ON contact_submissions
    FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_models_updated_at
    BEFORE UPDATE ON models
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON model_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STORAGE BUCKETS
-- Run these in the Supabase Dashboard under Storage
-- ============================================
-- 1. Create a bucket named "model-images" for model portfolio images
-- 2. Create a bucket named "application-images" for application uploads
-- 3. Set both to public if you want images to be publicly accessible

-- Example storage policies (run in SQL editor):
-- INSERT INTO storage.buckets (id, name, public) VALUES ('model-images', 'model-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('application-images', 'application-images', true);

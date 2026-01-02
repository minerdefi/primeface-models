import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface Model {
    id: string
    name: string
    slug: string
    category: 'women' | 'men' | 'kids'
    subcategory?: 'main-board' | 'development' | 'direct-booking' | 'girls' | 'boys'
    height?: string
    chest?: string
    waist?: string
    bust?: string
    hips?: string
    inseam?: string
    suit?: string
    suit_length?: string
    dress_size?: string
    shoe_size?: string
    hair_color?: string
    eye_color?: string
    images: string[]
    featured: boolean
    active: boolean
    created_at: string
    updated_at: string
}

export interface ModelApplication {
    id: string
    first_name: string
    last_name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    date_of_birth: string
    instagram?: string
    facebook?: string
    message?: string
    gender: 'female' | 'male' | 'children'
    height: string
    waist: string
    bust: string
    hips: string
    dress_size: string
    shoe_size: string
    hair_color: string
    eye_color: string
    image_urls: string[]
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
    created_at: string
    updated_at: string
}

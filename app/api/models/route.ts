import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Get all models or filter by category
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const subcategory = searchParams.get('subcategory')
        const featured = searchParams.get('featured')
        const limit = parseInt(searchParams.get('limit') || '50')
        const offset = parseInt(searchParams.get('offset') || '0')

        let query = supabase
            .from('models')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1)

        if (category) {
            query = query.eq('category', category)
        }

        if (subcategory) {
            query = query.eq('subcategory', subcategory)
        }

        if (featured === 'true') {
            query = query.eq('featured', true)
        }

        const { data, error, count } = await query

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json(
                { error: 'Failed to fetch models' },
                { status: 500 }
            )
        }

        return NextResponse.json({ data, count })
    } catch (error) {
        console.error('Server error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST - Create a new model (admin only)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const {
            name,
            category,
            subcategory,
            height,
            chest,
            waist,
            bust,
            hips,
            inseam,
            suit,
            suitLength,
            dressSize,
            shoeSize,
            hairColor,
            eyeColor,
            images = [],
            featured = false
        } = body

        // Validate required fields
        if (!name || !category) {
            return NextResponse.json(
                { error: 'Name and category are required' },
                { status: 400 }
            )
        }

        // Generate slug from name
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

        // Check if slug already exists
        const { data: existing } = await supabase
            .from('models')
            .select('slug')
            .eq('slug', slug)
            .single()

        const finalSlug = existing ? `${slug}-${Date.now()}` : slug

        // Insert into database
        const { data, error } = await supabase
            .from('models')
            .insert({
                name,
                slug: finalSlug,
                category,
                subcategory,
                height,
                chest,
                waist,
                bust,
                hips,
                inseam,
                suit,
                suit_length: suitLength,
                dress_size: dressSize,
                shoe_size: shoeSize,
                hair_color: hairColor,
                eye_color: eyeColor,
                images,
                featured,
                active: true
            })
            .select()
            .single()

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json(
                { error: 'Failed to create model' },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { message: 'Model created successfully', data },
            { status: 201 }
        )
    } catch (error) {
        console.error('Server error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

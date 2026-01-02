import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Get a single model by slug
export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params

        const { data, error } = await supabase
            .from('models')
            .select('*')
            .eq('slug', slug)
            .eq('active', true)
            .single()

        if (error || !data) {
            return NextResponse.json(
                { error: 'Model not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ data })
    } catch (error) {
        console.error('Server error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// PUT - Update a model (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params
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
            images,
            featured,
            active
        } = body

        // Build update object with only provided fields
        const updateData: Record<string, unknown> = {}

        if (name !== undefined) updateData.name = name
        if (category !== undefined) updateData.category = category
        if (subcategory !== undefined) updateData.subcategory = subcategory
        if (height !== undefined) updateData.height = height
        if (chest !== undefined) updateData.chest = chest
        if (waist !== undefined) updateData.waist = waist
        if (bust !== undefined) updateData.bust = bust
        if (hips !== undefined) updateData.hips = hips
        if (inseam !== undefined) updateData.inseam = inseam
        if (suit !== undefined) updateData.suit = suit
        if (suitLength !== undefined) updateData.suit_length = suitLength
        if (dressSize !== undefined) updateData.dress_size = dressSize
        if (shoeSize !== undefined) updateData.shoe_size = shoeSize
        if (hairColor !== undefined) updateData.hair_color = hairColor
        if (eyeColor !== undefined) updateData.eye_color = eyeColor
        if (images !== undefined) updateData.images = images
        if (featured !== undefined) updateData.featured = featured
        if (active !== undefined) updateData.active = active

        const { data, error } = await supabase
            .from('models')
            .update(updateData)
            .eq('slug', slug)
            .select()
            .single()

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json(
                { error: 'Failed to update model' },
                { status: 500 }
            )
        }

        if (!data) {
            return NextResponse.json(
                { error: 'Model not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ message: 'Model updated successfully', data })
    } catch (error) {
        console.error('Server error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// DELETE - Soft delete a model (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params

        // Soft delete by setting active to false
        const { data, error } = await supabase
            .from('models')
            .update({ active: false })
            .eq('slug', slug)
            .select()
            .single()

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json(
                { error: 'Failed to delete model' },
                { status: 500 }
            )
        }

        if (!data) {
            return NextResponse.json(
                { error: 'Model not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ message: 'Model deleted successfully' })
    } catch (error) {
        console.error('Server error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

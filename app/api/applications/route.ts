import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST - Submit a new model application
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            state,
            dateOfBirth,
            instagram,
            facebook,
            message,
            gender,
            height,
            waist,
            bust,
            hips,
            dressSize,
            shoeSize,
            hairColor,
            eyeColor,
            imageUrls = []
        } = body

        // Validate required fields
        if (!firstName || !lastName || !email || !phone || !address || !city || !state || !dateOfBirth) {
            return NextResponse.json(
                { error: 'Missing required personal information fields' },
                { status: 400 }
            )
        }

        if (!gender || !height || !waist || !bust || !hips || !dressSize || !shoeSize || !hairColor || !eyeColor) {
            return NextResponse.json(
                { error: 'Missing required measurement fields' },
                { status: 400 }
            )
        }

        // Insert into database
        const { data, error } = await supabase
            .from('model_applications')
            .insert({
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                address,
                city,
                state,
                date_of_birth: dateOfBirth,
                instagram,
                facebook,
                message,
                gender,
                height,
                waist,
                bust,
                hips,
                dress_size: dressSize,
                shoe_size: shoeSize,
                hair_color: hairColor,
                eye_color: eyeColor,
                image_urls: imageUrls,
                status: 'pending'
            })
            .select()
            .single()

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json(
                { error: 'Failed to submit application' },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { message: 'Application submitted successfully', data },
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

// GET - Get all applications (for admin)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const limit = parseInt(searchParams.get('limit') || '50')
        const offset = parseInt(searchParams.get('offset') || '0')

        let query = supabase
            .from('model_applications')
            .select('*')
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1)

        if (status) {
            query = query.eq('status', status)
        }

        const { data, error, count } = await query

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json(
                { error: 'Failed to fetch applications' },
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

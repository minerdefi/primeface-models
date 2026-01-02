import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST - Upload image to Supabase Storage
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const bucket = formData.get('bucket') as string || 'application-images'

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            )
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' },
                { status: 400 }
            )
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024 // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File too large. Maximum size is 5MB' },
                { status: 400 }
            )
        }

        // Generate unique filename
        const timestamp = Date.now()
        const extension = file.name.split('.').pop()
        const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer()
        const buffer = new Uint8Array(arrayBuffer)

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: false
            })

        if (error) {
            console.error('Supabase storage error:', error)
            return NextResponse.json(
                { error: 'Failed to upload file' },
                { status: 500 }
            )
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path)

        return NextResponse.json({
            message: 'File uploaded successfully',
            url: urlData.publicUrl,
            path: data.path
        })
    } catch (error) {
        console.error('Server error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

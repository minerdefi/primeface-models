// Image compression utility
export async function compressImage(file: File, maxSizeMB: number = 1, maxWidthOrHeight: number = 1920): Promise<File> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (event) => {
            const img = new Image()
            img.src = event.target?.result as string
            img.onload = () => {
                const canvas = document.createElement('canvas')
                let width = img.width
                let height = img.height

                // Calculate new dimensions while maintaining aspect ratio
                if (width > height) {
                    if (width > maxWidthOrHeight) {
                        height = (height * maxWidthOrHeight) / width
                        width = maxWidthOrHeight
                    }
                } else {
                    if (height > maxWidthOrHeight) {
                        width = (width * maxWidthOrHeight) / height
                        height = maxWidthOrHeight
                    }
                }

                canvas.width = width
                canvas.height = height

                const ctx = canvas.getContext('2d')
                if (!ctx) {
                    reject(new Error('Failed to get canvas context'))
                    return
                }

                ctx.drawImage(img, 0, 0, width, height)

                // Start with quality 0.9 and reduce if needed
                let quality = 0.9
                const tryCompress = () => {
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error('Failed to compress image'))
                                return
                            }

                            const compressedSizeMB = blob.size / 1024 / 1024

                            // If still too large and quality can be reduced, try again
                            if (compressedSizeMB > maxSizeMB && quality > 0.5) {
                                quality -= 0.1
                                tryCompress()
                                return
                            }

                            // Create new file from blob
                            const compressedFile = new File([blob], file.name, {
                                type: 'image/jpeg',
                                lastModified: Date.now(),
                            })

                            console.log(`Original size: ${(file.size / 1024 / 1024).toFixed(2)}MB`)
                            console.log(`Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`)
                            console.log(`Compression ratio: ${((1 - compressedFile.size / file.size) * 100).toFixed(1)}%`)

                            resolve(compressedFile)
                        },
                        'image/jpeg',
                        quality
                    )
                }

                tryCompress()
            }
            img.onerror = () => reject(new Error('Failed to load image'))
        }
        reader.onerror = () => reject(new Error('Failed to read file'))
    })
}

import Image from 'next/image'
import Link from 'next/link'

interface ModelCardProps {
    name: string
    category: string
    image: string
    slug: string
    height?: string
    measurements?: string
}

export default function ModelCard({
    name,
    image,
    slug,
}: ModelCardProps) {
    return (
        <Link href={`/models/${slug}`} className="group block">
            <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
            </div>
            <div className="mt-3 text-center">
                <h3 className="font-medium text-sm tracking-wide text-brand-red">{name}</h3>
            </div>
        </Link>
    )
}

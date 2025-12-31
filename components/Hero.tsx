import Link from 'next/link'

interface HeroProps {
    title: string
    subtitle?: string
    description?: string
    ctaText?: string
    ctaLink?: string
    backgroundImage?: string
}

export default function Hero({
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
    backgroundImage = 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80'
}: HeroProps) {
    return (
        <section
            className="relative h-[600px] flex items-center justify-center text-white"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {subtitle && (
                    <p className="text-sm uppercase tracking-wider mb-4 text-gray-200">{subtitle}</p>
                )}
                <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
                {description && (
                    <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
                        {description}
                    </p>
                )}
                {ctaText && ctaLink && (
                    <Link
                        href={ctaLink}
                        className="inline-block bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
                    >
                        {ctaText}
                    </Link>
                )}
            </div>
        </section>
    )
}

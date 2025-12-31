import Link from 'next/link'
import Image from 'next/image'

interface PageHeaderProps {
    title: string
    subtitle?: string
    backgroundImage?: string
    tabs?: { label: string; href: string; active?: boolean }[]
}

export default function PageHeader({ title, subtitle, backgroundImage, tabs }: PageHeaderProps) {
    return (
        <section className="relative h-[50vh] min-h-[400px] flex items-end">
            {backgroundImage && (
                <>
                    <Image
                        src={backgroundImage}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </>
            )}
            {!backgroundImage && <div className="absolute inset-0 bg-black" />}

            <div className="relative z-10 w-full pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-6xl font-bold mb-2 text-brand-red">{title}</h1>
                    {subtitle && (
                        <p className="text-xl text-white/70">{subtitle}</p>
                    )}

                    {tabs && (
                        <div className="mt-8 flex flex-wrap gap-3">
                            {tabs.map((tab) => (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    className={`px-6 py-2 text-sm font-medium tracking-wide transition ${tab.active
                                        ? 'bg-white text-black'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    {tab.label.toUpperCase()}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

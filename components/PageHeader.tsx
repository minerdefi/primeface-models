import Link from 'next/link'
import Breadcrumb from './Breadcrumb'

interface PageHeaderProps {
    title: string
    subtitle?: string
    breadcrumbs?: { label: string; href?: string }[]
    tabs?: { label: string; href: string; active?: boolean }[]
}

export default function PageHeader({ title, subtitle, breadcrumbs, tabs }: PageHeaderProps) {
    return (
        <section className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {breadcrumbs && (
                    <div className="mb-4">
                        <Breadcrumb items={breadcrumbs} />
                    </div>
                )}

                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">{title}</h1>
                {subtitle && (
                    <p className="text-lg text-gray-600">{subtitle}</p>
                )}

                {tabs && (
                    <div className="mt-6 flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className={`px-6 py-2 text-sm font-medium tracking-wide transition ${tab.active
                                    ? 'bg-white text-brand-red border-2 border-brand-red'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                    }`}
                            >
                                {tab.label.toUpperCase()}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

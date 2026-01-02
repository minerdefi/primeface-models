import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-brand-red transition">
                Home
            </Link>
            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <ChevronRight size={16} className="text-gray-400" />
                    {item.href ? (
                        <Link href={item.href} className="text-gray-600 hover:text-brand-red transition">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900 font-medium">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    )
}

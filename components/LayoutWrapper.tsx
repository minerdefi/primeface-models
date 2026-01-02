'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isBackstage = pathname?.startsWith('/backstage')

    if (isBackstage) {
        return <>{children}</>
    }

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

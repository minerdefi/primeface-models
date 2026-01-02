'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { getSession, signOut, onAuthStateChange } from '@/lib/supabase-auth'
import {
    LayoutDashboard,
    Users,
    FileText,
    MessageSquare,
    LogOut,
    Menu,
    X,
    ChevronRight
} from 'lucide-react'

const navItems = [
    { href: '/backstage', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/backstage/models', label: 'Models', icon: Users },
    { href: '/backstage/applications', label: 'Applications', icon: FileText },
    { href: '/backstage/contacts', label: 'Contacts', icon: MessageSquare },
]

export default function BackstageLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        // Check initial session
        const checkSession = async () => {
            const { session } = await getSession()
            if (!session && pathname !== '/backstage/login') {
                router.push('/backstage/login')
            } else if (session) {
                setIsAuthenticated(true)
            }
            setIsLoading(false)
        }

        checkSession()

        // Listen for auth changes
        const { data: { subscription } } = onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                setIsAuthenticated(false)
                router.push('/backstage/login')
            } else if (session) {
                setIsAuthenticated(true)
            }
        })

        return () => subscription.unsubscribe()
    }, [pathname, router])

    const handleSignOut = async () => {
        await signOut()
        router.push('/backstage/login')
    }

    // Show login page without layout
    if (pathname === '/backstage/login') {
        return <>{children}</>
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
        )
    }

    // Not authenticated
    if (!isAuthenticated) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
                    <Link href="/backstage" className="flex items-center gap-2">
                        <span className="text-xl font-bold text-white">
                            PRIME<span className="text-brand-red">FACE</span>
                        </span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-6 px-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${isActive
                                        ? 'bg-brand-red text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                                {isActive && <ChevronRight size={16} className="ml-auto" />}
                            </Link>
                        )
                    })}
                </nav>

                {/* Sign Out */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-all"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Top Bar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-600 hover:text-gray-900"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            target="_blank"
                            className="text-sm text-gray-500 hover:text-brand-red transition"
                        >
                            View Site →
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}

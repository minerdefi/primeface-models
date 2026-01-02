'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Facebook, Instagram } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { name: "FEMALE MODELS", href: "/female-fashion" },
    { name: "MALE MODELS", href: "/male-fashion" },
    { name: "CHILDREN", href: "/children-male" },
    { name: "OUR WORK", href: "/our-work" },
    { name: "BECOME A MODEL", href: "/become-a-model" },
    { name: "CONTACT", href: "/contact" },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()
    const isHomePage = pathname === '/'

    return (
        <header className={isHomePage ? "absolute top-0 left-0 right-0 z-50" : "bg-white border-b border-gray-200 sticky top-0 z-50"}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mobile Header Bar - Logo left, Hamburger right */}
                {!isHomePage && (
                    <div className="lg:hidden flex justify-between items-center py-4">
                        <Link href="/" className="flex flex-col items-start">
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-light text-gray-900">primeface</span>
                                <span className="text-2xl italic text-brand-red" style={{ fontFamily: 'Georgia, serif' }}>models</span>
                            </div>
                            <span className="text-[8px] tracking-[0.2em] text-gray-600 uppercase">and talent agency</span>
                        </Link>

                        {/* Animated Hamburger Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="w-10 h-10 flex flex-col justify-center items-center"
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-gray-800 block mb-1.5"
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                animate={isMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                                className="w-6 h-0.5 bg-gray-800 block mb-1.5"
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-gray-800 block"
                                transition={{ duration: 0.3 }}
                            />
                        </button>
                    </div>
                )}

                {/* Desktop Logo - Centered */}
                {!isHomePage && (
                    <div className="hidden lg:block text-center py-6 border-b border-gray-100">
                        <Link href="/" className="flex flex-col items-center">
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-light text-gray-900">primeface</span>
                                <span className="text-3xl italic text-brand-red" style={{ fontFamily: 'Georgia, serif' }}>models</span>
                            </div>
                            <span className="text-[9px] tracking-[0.2em] text-gray-600 uppercase">and talent agency</span>
                        </Link>
                    </div>
                )}

                {isHomePage && (
                    <div className="text-center py-6">
                        <Link href="/" className="flex flex-col items-center">
                            <Image
                                src="/primeface_logo.png"
                                alt="PrimeFace Models"
                                width={200}
                                height={60}
                                className="h-12 w-auto"
                                priority
                            />
                        </Link>
                    </div>
                )}

                {/* Desktop Navigation */}
                <div className="hidden lg:flex justify-center items-center py-4">
                    <nav className="flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${isHomePage ? 'text-white/90 hover:text-white' : 'text-gray-800 hover:text-brand-red'} transition text-xs font-medium tracking-wider uppercase`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="absolute right-4 sm:right-6 lg:right-8 flex items-center space-x-4">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`${isHomePage ? 'text-white/80 hover:text-white' : 'text-gray-800 hover:text-brand-red'} transition`}>
                            <Instagram size={20} />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`${isHomePage ? 'text-white/80 hover:text-white' : 'text-gray-800 hover:text-brand-red'} transition`}>
                            <Facebook size={20} />
                        </a>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && !isHomePage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden fixed inset-0 top-[72px] bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-start pt-12"
                        >
                            <motion.nav
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="flex flex-col items-center gap-6"
                            >
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-xl tracking-wider text-gray-700 hover:text-brand-red transition"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.nav>

                            {/* Social Icons in Mobile Menu */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 }}
                                className="flex gap-6 mt-8"
                            >
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-red transition">
                                    <Instagram size={24} />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-red transition">
                                    <Facebook size={24} />
                                </a>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}

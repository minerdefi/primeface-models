'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Facebook, Instagram } from 'lucide-react'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()
    const isHomePage = pathname === '/'

    return (
        <header className={isHomePage ? "absolute top-0 left-0 right-0 z-50" : "bg-white border-b border-gray-200 sticky top-0 z-50"}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {!isHomePage && (
                    <div className="relative py-6 border-b border-gray-100">
                        <Link href="/" className="absolute left-4 sm:left-6 lg:left-8 flex flex-col items-start">
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-light text-gray-900">first</span>
                                <span className="text-3xl italic text-brand-red" style={{ fontFamily: 'Georgia, serif' }}>models</span>
                            </div>
                            <span className="text-[9px] tracking-[0.2em] text-gray-600 uppercase">and talent agency</span>
                        </Link>

                        <nav className="hidden lg:flex items-center justify-center space-x-8">
                            <Link href="/female-fashion" className="text-gray-800 hover:text-brand-red transition text-xs font-medium tracking-wider uppercase">FEMALE MODELS</Link>
                            <Link href="/male-fashion" className="text-gray-800 hover:text-brand-red transition text-xs font-medium tracking-wider uppercase">MALE MODELS</Link>
                            <Link href="/children-male" className="text-gray-800 hover:text-brand-red transition text-xs font-medium tracking-wider uppercase">CHILDREN</Link>
                            <Link href="/our-work" className="text-gray-800 hover:text-brand-red transition text-xs font-medium tracking-wider uppercase">OUR WORK</Link>
                            <Link href="/become-a-model" className="text-gray-800 hover:text-brand-red transition text-xs font-medium tracking-wider uppercase">BECOME A MODEL</Link>
                            <Link href="/contact" className="text-gray-800 hover:text-brand-red transition text-xs font-medium tracking-wider uppercase">CONTACT</Link>
                        </nav>

                        <div className="absolute right-4 sm:right-6 lg:right-8 hidden lg:flex items-center space-x-4">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-brand-red transition">
                                <Instagram size={20} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-brand-red transition">
                                <Facebook size={20} />
                            </a>
                        </div>

                        <button
                            className="lg:hidden absolute right-4 sm:right-6 lg:right-8 text-gray-900"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                )}

                {isHomePage && (
                    <Link href="/" className="absolute left-4 sm:left-6 lg:left-8 top-6">
                        <Image
                            src="/primeface_logo.png"
                            alt="PrimeFace Models"
                            width={200}
                            height={60}
                            className="h-12 w-auto"
                            priority
                        />
                    </Link>
                )}

                <div className="flex justify-center items-center py-4">
                    <nav className="hidden lg:flex items-center space-x-8">
                        <Link href="/female-fashion" className={`${isHomePage ? 'text-white/90 hover:text-white' : 'text-gray-800 hover:text-brand-red'} transition text-xs font-medium tracking-wider uppercase`}>FEMALE MODELS</Link>
                        <Link href="/male-fashion" className={`${isHomePage ? 'text-white/90 hover:text-white' : 'text-gray-800 hover:text-brand-red'} transition text-xs font-medium tracking-wider uppercase`}>MALE MODELS</Link>
                        <Link href="/children-male" className={`${isHomePage ? 'text-white/90 hover:text-white' : 'text-gray-800 hover:text-brand-red'} transition text-xs font-medium tracking-wider uppercase`}>CHILDREN</Link>
                        <Link href="/our-work" className={`${isHomePage ? 'text-white/90 hover:text-white' : 'text-gray-800 hover:text-brand-red'} transition text-xs font-medium tracking-wider uppercase`}>OUR WORK</Link>
                        <Link href="/become-a-model" className={`${isHomePage ? 'text-white/90 hover:text-white' : 'text-gray-800 hover:text-brand-red'} transition text-xs font-medium tracking-wider uppercase`}>BECOME A MODEL</Link>
                        <Link href="/contact" className={`${isHomePage ? 'text-white/90 hover:text-white' : 'text-gray-800 hover:text-brand-red'} transition text-xs font-medium tracking-wider uppercase`}>CONTACT</Link>
                    </nav>

                    <div className="absolute right-4 sm:right-6 lg:right-8 hidden lg:flex items-center space-x-4">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`${isHomePage ? 'text-white/80 hover:text-white' : 'text-gray-800 hover:text-brand-red'} transition`}>
                            <Instagram size={20} />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`${isHomePage ? 'text-white/80 hover:text-white' : 'text-gray-800 hover:text-brand-red'} transition`}>
                            <Facebook size={20} />
                        </a>
                    </div>

                    <button
                        className={`lg:hidden ${isHomePage ? 'text-white' : 'text-gray-900'}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {isMenuOpen && (
                    <nav className={`lg:hidden pb-6 ${isHomePage ? 'bg-black/90 backdrop-blur-md' : 'bg-white'} -mx-4 px-4`}>
                        <div className="space-y-1">
                            <Link href="/female-fashion" className={`block py-3 ${isHomePage ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-brand-red'} text-sm font-medium tracking-wide`} onClick={() => setIsMenuOpen(false)}>FEMALE MODELS</Link>
                            <Link href="/male-fashion" className={`block py-3 ${isHomePage ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-brand-red'} text-sm font-medium tracking-wide`} onClick={() => setIsMenuOpen(false)}>MALE MODELS</Link>
                            <Link href="/children-male" className={`block py-3 ${isHomePage ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-brand-red'} text-sm font-medium tracking-wide`} onClick={() => setIsMenuOpen(false)}>CHILDREN</Link>
                            <Link href="/our-work" className={`block py-3 ${isHomePage ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-brand-red'} text-sm font-medium tracking-wide`} onClick={() => setIsMenuOpen(false)}>OUR WORK</Link>
                            <Link href="/become-a-model" className={`block py-3 ${isHomePage ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-brand-red'} text-sm font-medium tracking-wide`} onClick={() => setIsMenuOpen(false)}>BECOME A MODEL</Link>
                            <Link href="/contact" className={`block py-3 ${isHomePage ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-brand-red'} text-sm font-medium tracking-wide`} onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    )
}

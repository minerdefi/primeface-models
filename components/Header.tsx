'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, ChevronDown, Facebook, Instagram } from 'lucide-react'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)

    const toggleDropdown = (menu: string) => {
        setOpenDropdown(openDropdown === menu ? null : menu)
    }

    return (
        <header className="absolute top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/primeface_logo.png"
                            alt="PrimeFace Models"
                            width={200}
                            height={60}
                            className="h-12 w-auto"
                            priority
                        />
                    </Link>

                    <nav className="hidden lg:flex items-center space-x-8">
                        <div className="relative group">
                            <button className="text-white/90 hover:text-white transition text-sm font-medium tracking-wide">
                                FEMALE
                            </button>
                            <div className="absolute left-0 mt-4 w-48 bg-black/90 backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <Link href="/female-fashion" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 text-sm">Fashion</Link>
                                <Link href="/female-commercial" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 text-sm">Commercial</Link>
                                <Link href="/female-classic" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 text-sm">Classic</Link>
                            </div>
                        </div>

                        <div className="relative group">
                            <button className="text-white/90 hover:text-white transition text-sm font-medium tracking-wide">
                                MALE
                            </button>
                            <div className="absolute left-0 mt-4 w-48 bg-black/90 backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <Link href="/male-fashion" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 text-sm">Fashion</Link>
                                <Link href="/male-commercial" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 text-sm">Commercial</Link>
                                <Link href="/male-classic" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 text-sm">Classic</Link>
                            </div>
                        </div>

                        <div className="relative group">
                            <button className="text-white/90 hover:text-white transition text-sm font-medium tracking-wide">
                                CHILDREN
                            </button>
                            <div className="absolute left-0 mt-4 w-48 bg-black/90 backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <Link href="/children-male" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 text-sm">Male</Link>
                                <Link href="/children-female" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 text-sm">Female</Link>
                                <Link href="/children-tween" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 text-sm">All Tween</Link>
                            </div>
                        </div>

                        <Link href="/our-work" className="text-white/90 hover:text-white transition text-sm font-medium tracking-wide">OUR WORK</Link>
                        <Link href="/become-a-model" className="text-white/90 hover:text-white transition text-sm font-medium tracking-wide">BECOME A MODEL</Link>
                        <Link href="/contact" className="text-white/90 hover:text-white transition text-sm font-medium tracking-wide">CONTACT</Link>

                        <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/20">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition">
                                <Instagram size={18} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </nav>

                    <button
                        className="lg:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {isMenuOpen && (
                    <nav className="lg:hidden pb-6 bg-black/90 backdrop-blur-md -mx-4 px-4">
                        <div className="space-y-1">
                            <div>
                                <button
                                    onClick={() => toggleDropdown('female')}
                                    className="w-full py-3 text-white/90 hover:text-white text-left"
                                >
                                    <span className="text-sm font-medium tracking-wide">FEMALE</span>
                                </button>
                                {openDropdown === 'female' && (
                                    <div className="pl-4 pb-2 space-y-1">
                                        <Link href="/female-fashion" className="block py-2 text-white/70 hover:text-white text-sm">Fashion</Link>
                                        <Link href="/female-commercial" className="block py-2 text-white/70 hover:text-white text-sm">Commercial</Link>
                                        <Link href="/female-classic" className="block py-2 text-white/70 hover:text-white text-sm">Classic</Link>
                                    </div>
                                )}
                            </div>

                            <div>
                                <button
                                    onClick={() => toggleDropdown('male')}
                                    className="w-full py-3 text-white/90 hover:text-white text-left"
                                >
                                    <span className="text-sm font-medium tracking-wide">MALE</span>
                                </button>
                                {openDropdown === 'male' && (
                                    <div className="pl-4 pb-2 space-y-1">
                                        <Link href="/male-fashion" className="block py-2 text-white/70 hover:text-white text-sm">Fashion</Link>
                                        <Link href="/male-commercial" className="block py-2 text-white/70 hover:text-white text-sm">Commercial</Link>
                                        <Link href="/male-classic" className="block py-2 text-white/70 hover:text-white text-sm">Classic</Link>
                                    </div>
                                )}
                            </div>

                            <div>
                                <button
                                    onClick={() => toggleDropdown('children')}
                                    className="w-full py-3 text-white/90 hover:text-white text-left"
                                >
                                    <span className="text-sm font-medium tracking-wide">CHILDREN</span>
                                </button>
                                {openDropdown === 'children' && (
                                    <div className="pl-4 pb-2 space-y-1">
                                        <Link href="/children-male" className="block py-2 text-white/70 hover:text-white text-sm">Male</Link>
                                        <Link href="/children-female" className="block py-2 text-white/70 hover:text-white text-sm">Female</Link>
                                        <Link href="/children-tween" className="block py-2 text-white/70 hover:text-white text-sm">All Tween</Link>
                                    </div>
                                )}
                            </div>

                            <Link href="/our-work" className="block py-3 text-white/90 hover:text-white text-sm font-medium tracking-wide">OUR WORK</Link>
                            <Link href="/become-a-model" className="block py-3 text-white/90 hover:text-white text-sm font-medium tracking-wide">BECOME A MODEL</Link>
                            <Link href="/contact" className="block py-3 text-white/90 hover:text-white text-sm font-medium tracking-wide">CONTACT</Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    )
}

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-black text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <Image
                            src="/primeface_logo.png"
                            alt="PrimeFace Models"
                            width={180}
                            height={54}
                            className="h-10 w-auto mb-4"
                        />
                        <p className="text-gray-400 text-sm">
                            Premier modeling agency representing top talent in fashion, commercial, and lifestyle.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Female Models</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/female-fashion" className="hover:text-white transition">Fashion</Link></li>
                            <li><Link href="/female-commercial" className="hover:text-white transition">Commercial</Link></li>
                            <li><Link href="/female-classic" className="hover:text-white transition">Classic</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Male Models</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/male-fashion" className="hover:text-white transition">Fashion</Link></li>
                            <li><Link href="/male-commercial" className="hover:text-white transition">Commercial</Link></li>
                            <li><Link href="/male-classic" className="hover:text-white transition">Classic</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Children</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/children-male" className="hover:text-white transition">Male</Link></li>
                            <li><Link href="/children-female" className="hover:text-white transition">Female</Link></li>
                            <li><Link href="/children-tween" className="hover:text-white transition">All Tween</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex space-x-6 mb-4 md:mb-0">
                        <Link href="/our-work" className="text-sm text-gray-400 hover:text-white transition">Our Work</Link>
                        <Link href="/become-a-model" className="text-sm text-gray-400 hover:text-white transition">Become a Model</Link>
                        <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition">Contact</Link>
                    </div>

                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                            <Facebook size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500">
                    © Copyright {new Date().getFullYear()} PrimeFace Models. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

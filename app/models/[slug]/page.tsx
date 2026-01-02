'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Info, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

// Sample model data - will be replaced with API data
const modelData = {
    name: 'ABDUL S',
    slug: 'abdul-s',
    measurements: {
        height: "6'1\"",
        chest: '34"',
        waist: '33"',
        inseam: '34"',
        suit: '32"',
        suitLength: 'L',
        shoe: '11.5 US',
        hair: 'Brown',
        eyes: 'Brown'
    },
    images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    ]
}

export default function ModelPage() {
    const router = useRouter()
    const [showMeasurements, setShowMeasurements] = useState(false)
    const [selectedImage, setSelectedImage] = useState<number | null>(null)

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImage === null) return

            if (e.key === 'Escape') {
                setSelectedImage(null)
            } else if (e.key === 'ArrowLeft') {
                setSelectedImage(prev => prev! > 0 ? prev! - 1 : modelData.images.length - 1)
            } else if (e.key === 'ArrowRight') {
                setSelectedImage(prev => prev! < modelData.images.length - 1 ? prev! + 1 : 0)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedImage])

    const handlePrevImage = () => {
        setSelectedImage(prev => prev! > 0 ? prev! - 1 : modelData.images.length - 1)
    }

    const handleNextImage = () => {
        setSelectedImage(prev => prev! < modelData.images.length - 1 ? prev! + 1 : 0)
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="py-6 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex justify-between items-start">
                        {/* Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="text-sm font-medium text-gray-800 hover:text-brand-red transition flex items-center gap-1"
                        >
                            <span>&lt;</span> BACK
                        </button>

                        {/* Model Name - Center */}
                        <div className="text-center flex-1">
                            <h1 className="text-4xl font-bold tracking-wide text-brand-red">
                                {modelData.name}
                            </h1>
                        </div>

                        {/* Portfolio Link */}
                        <Link
                            href="/our-work"
                            className="text-sm font-medium text-brand-red hover:text-gray-800 transition"
                        >
                            PORTFOLIO
                        </Link>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden">
                        {/* Top Row: Back Button and Info Icon */}
                        <div className="flex justify-between items-center mb-4">
                            <button
                                onClick={() => router.back()}
                                className="text-sm font-medium text-gray-800 hover:text-brand-red transition flex items-center gap-1"
                            >
                                <span>&lt;</span> BACK
                            </button>

                            {/* Info Icon */}
                            <button
                                onClick={() => setShowMeasurements(!showMeasurements)}
                                className="text-gray-600 hover:text-brand-red transition"
                                aria-label="Toggle model information"
                            >
                                <Info size={24} />
                            </button>
                        </div>

                        {/* Model Name - Full Width Below */}
                        <div className="text-center">
                            <h1 className="text-2xl font-bold tracking-wide text-brand-red">
                                {modelData.name}
                            </h1>
                        </div>
                    </div>

                    {/* Measurements - Desktop Only */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-4 hidden md:flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-600"
                    >
                        <span>Height <strong className="text-gray-900">{modelData.measurements.height}</strong></span>
                        <span>Chest <strong className="text-gray-900">{modelData.measurements.chest}</strong></span>
                        <span>Waist <strong className="text-gray-900">{modelData.measurements.waist}</strong></span>
                        <span>Inseam <strong className="text-gray-900">{modelData.measurements.inseam}</strong></span>
                        <span>Suit <strong className="text-gray-900">{modelData.measurements.suit}</strong></span>
                        <span>Suit Length <strong className="text-gray-900">{modelData.measurements.suitLength}</strong></span>
                        <span>Shoe <strong className="text-gray-900">{modelData.measurements.shoe}</strong></span>
                        <span>Hair <strong className="text-gray-900">{modelData.measurements.hair}</strong></span>
                        <span>Eyes <strong className="text-gray-900">{modelData.measurements.eyes}</strong></span>
                    </motion.div>

                    {/* Measurements - Mobile Dropdown */}
                    <AnimatePresence>
                        {showMeasurements && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 overflow-hidden md:hidden"
                            >
                                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-600 px-4">
                                    <span>Height <strong className="text-gray-900">{modelData.measurements.height}</strong></span>
                                    <span>Chest <strong className="text-gray-900">{modelData.measurements.chest}</strong></span>
                                    <span>Waist <strong className="text-gray-900">{modelData.measurements.waist}</strong></span>
                                    <span>Inseam <strong className="text-gray-900">{modelData.measurements.inseam}</strong></span>
                                    <span>Suit <strong className="text-gray-900">{modelData.measurements.suit}</strong></span>
                                    <span>Suit Length <strong className="text-gray-900">{modelData.measurements.suitLength}</strong></span>
                                    <span>Shoe <strong className="text-gray-900">{modelData.measurements.shoe}</strong></span>
                                    <span>Hair <strong className="text-gray-900">{modelData.measurements.hair}</strong></span>
                                    <span>Eyes <strong className="text-gray-900">{modelData.measurements.eyes}</strong></span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.header>

            {/* Images Section */}
            <section className="mt-6">
                {/* Desktop: Horizontal Scroll */}
                <div className="hidden md:block">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex gap-4 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 scrollbar-thin scrollbar-thumb-gray-300"
                        style={{ scrollbarWidth: 'thin' }}
                    >
                        {modelData.images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                className="flex-shrink-0 cursor-pointer"
                                onClick={() => setSelectedImage(index)}
                            >
                                <div className="relative w-[300px] h-[400px] lg:w-[350px] lg:h-[470px] overflow-hidden group">
                                    <Image
                                        src={image}
                                        alt={`${modelData.name} photo ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </motion.div>
                        ))}

                        {/* Contact Info Card - Desktop */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="flex-shrink-0 w-[300px] lg:w-[350px] flex flex-col justify-center px-8"
                        >
                            <p className="text-xs tracking-wider text-gray-500 mb-2">INQUIRE AT:</p>
                            <a
                                href="tel:+12812100012"
                                className="text-2xl font-bold text-gray-900 hover:text-brand-red transition"
                            >
                                (281) 210-0012
                            </a>
                            <a
                                href="mailto:info@primefacemodels.com"
                                className="text-sm text-gray-600 hover:text-brand-red transition mt-2"
                            >
                                info@primefacemodels.com
                            </a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Mobile: Vertical Scroll */}
                <div className="md:hidden px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col gap-4"
                    >
                        {modelData.images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                className="cursor-pointer"
                                onClick={() => setSelectedImage(index)}
                            >
                                <div className="relative w-full aspect-[3/4] overflow-hidden">
                                    <Image
                                        src={image}
                                        alt={`${modelData.name} photo ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-300 active:scale-95"
                                    />
                                </div>
                            </motion.div>
                        ))}

                        {/* Contact Info Card - Mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="py-8 text-center"
                        >
                            <p className="text-xs tracking-wider text-gray-500 mb-2">INQUIRE AT:</p>
                            <a
                                href="tel:+12812100012"
                                className="text-2xl font-bold text-gray-900 hover:text-brand-red transition"
                            >
                                (281) 210-0012
                            </a>
                            <a
                                href="mailto:info@primefacemodels.com"
                                className="block text-sm text-gray-600 hover:text-brand-red transition mt-2"
                            >
                                info@primefacemodels.com
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Image Preview Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10"
                            aria-label="Close"
                        >
                            <X size={32} />
                        </button>

                        {/* Previous Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                handlePrevImage()
                            }}
                            className="absolute left-4 text-white hover:text-gray-300 transition z-10"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={48} />
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                handleNextImage()
                            }}
                            className="absolute right-4 text-white hover:text-gray-300 transition z-10"
                            aria-label="Next image"
                        >
                            <ChevronRight size={48} />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm z-10">
                            {selectedImage + 1} / {modelData.images.length}
                        </div>

                        {/* Image */}
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={modelData.images[selectedImage]}
                                alt={`${modelData.name} photo ${selectedImage + 1}`}
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}

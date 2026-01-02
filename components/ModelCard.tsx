'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ModelCardProps {
    name: string
    category: string
    image: string
    slug: string
    height?: string
    measurements?: string
    index?: number
}

export default function ModelCard({
    name,
    image,
    slug,
    index = 0,
}: ModelCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
        >
            <Link href={`/models/${slug}`} className="group block">
                <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-all duration-300"
                    />
                </div>
                <div className="mt-3 text-center">
                    <h3 className="font-medium text-sm tracking-wide text-brand-red">{name}</h3>
                </div>
            </Link>
        </motion.div>
    )
}

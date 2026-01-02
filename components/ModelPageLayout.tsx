'use client'

import PageHeader from './PageHeader'
import ModelGrid from './ModelGrid'
import { motion } from 'framer-motion'

interface Model {
    id: string
    name: string
    category: string
    image: string
    slug: string
    height?: string
    measurements?: string
}

interface ModelPageLayoutProps {
    title: string
    category: 'female' | 'male' | 'children'
    subcategory: string
    models: Model[]
}

export default function ModelPageLayout({ title, category, subcategory, models }: ModelPageLayoutProps) {
    const getTabs = () => {
        if (category === 'female') {
            return [
                { label: 'Fashion', href: '/female-fashion', active: subcategory === 'fashion' },
                { label: 'Commercial', href: '/female-commercial', active: subcategory === 'commercial' },
                { label: 'Classic', href: '/female-classic', active: subcategory === 'classic' },
            ]
        }
        if (category === 'male') {
            return [
                { label: 'Fashion', href: '/male-fashion', active: subcategory === 'fashion' },
                { label: 'Commercial', href: '/male-commercial', active: subcategory === 'commercial' },
                { label: 'Classic', href: '/male-classic', active: subcategory === 'classic' },
            ]
        }
        return [
            { label: 'Male', href: '/children-male', active: subcategory === 'male' },
            { label: 'Female', href: '/children-female', active: subcategory === 'female' },
            { label: 'All Tween', href: '/children-tween', active: subcategory === 'tween' },
        ]
    }

    const getBreadcrumbs = () => {
        return [
            { label: title, href: undefined },
            { label: subcategory.charAt(0).toUpperCase() + subcategory.slice(1) }
        ]
    }

    const getSubtitle = () => {
        return `${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Division`
    }

    return (
        <main>
            <PageHeader
                title={title}
                subtitle={getSubtitle()}
                breadcrumbs={getBreadcrumbs()}
                tabs={getTabs()}
            />
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="py-16 bg-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ModelGrid models={models} />
                </div>
            </motion.section>
        </main>
    )
}

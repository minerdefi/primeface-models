'use client'

import { useEffect, useState } from 'react'
import PageHeader from './PageHeader'
import ModelGrid from './ModelGrid'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

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

export default function ModelPageLayout({ title, category, subcategory, models: fallbackModels }: ModelPageLayoutProps) {
    const [models, setModels] = useState<Model[]>(fallbackModels)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchModelsFromDB()
    }, [category, subcategory])

    const fetchModelsFromDB = async () => {
        try {
            // Map category names to match database schema
            const categoryMap: Record<string, string> = {
                'female': 'women',
                'male': 'men',
                'children': 'children'
            }

            const subcategoryMap: Record<string, string> = {
                'fashion': 'fashion',
                'commercial': 'commercial',
                'classic': 'classic',
                'male': 'boys',
                'female': 'girls',
                'tween': 'tween'
            }

            const dbCategory = categoryMap[category] || category
            const dbSubcategory = subcategoryMap[subcategory] || subcategory

            const { data, error } = await supabase
                .from('models')
                .select('*')
                .eq('category', dbCategory)
                .eq('subcategory', dbSubcategory)
                .eq('active', true)
                .order('featured', { ascending: false })
                .order('created_at', { ascending: false })

            if (error) throw error

            if (data && data.length > 0) {
                // Transform database models to match component interface
                const transformedModels: Model[] = data.map(model => ({
                    id: model.id,
                    name: model.name,
                    category: subcategory.charAt(0).toUpperCase() + subcategory.slice(1),
                    image: model.images && model.images.length > 0 ? model.images[0] : '',
                    slug: model.slug,
                    height: model.height || undefined,
                    measurements: model.measurements || undefined
                }))
                setModels(transformedModels)
            } else {
                // No models in database, use fallback
                setModels(fallbackModels)
            }
        } catch (error) {
            console.error('Error fetching models from database:', error)
            // On error, use fallback hardcoded models
            setModels(fallbackModels)
        } finally {
            setIsLoading(false)
        }
    }
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
                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
                        </div>
                    ) : (
                        <ModelGrid models={models} />
                    )}
                </div>
            </motion.section>
        </main>
    )
}

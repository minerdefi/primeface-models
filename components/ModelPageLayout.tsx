import PageHeader from './PageHeader'
import ModelGrid from './ModelGrid'

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
    backgroundImage?: string
}

export default function ModelPageLayout({ title, category, subcategory, models, backgroundImage }: ModelPageLayoutProps) {
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

    const getBackgroundImage = () => {
        if (backgroundImage) return backgroundImage
        if (category === 'female') return 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80'
        if (category === 'male') return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80'
        return 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1920&q=80'
    }

    const getSubtitle = () => {
        if (category === 'children') return `${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Division`
        return `${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Division`
    }

    return (
        <main>
            <PageHeader
                title={title}
                subtitle={getSubtitle()}
                backgroundImage={getBackgroundImage()}
                tabs={getTabs()}
            />
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ModelGrid models={models} />
                </div>
            </section>
        </main>
    )
}

import ModelCard from './ModelCard'

interface Model {
    id: string
    name: string
    category: string
    image: string
    slug: string
    height?: string
    measurements?: string
}

interface ModelGridProps {
    models: Model[]
    columns?: 3 | 4
}

export default function ModelGrid({ models, columns = 4 }: ModelGridProps) {
    const gridCols = columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-6`}>
            {models.map((model) => (
                <ModelCard
                    key={model.id}
                    name={model.name}
                    category={model.category}
                    image={model.image}
                    slug={model.slug}
                    height={model.height}
                    measurements={model.measurements}
                />
            ))}
        </div>
    )
}

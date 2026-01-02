'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { Plus, Search, Edit2, Trash2, X, Eye, Star, Loader2 } from 'lucide-react'

interface Model {
    id: string
    name: string
    slug: string
    category: string
    subcategory: string | null
    height: string | null
    images: string[]
    featured: boolean
    active: boolean
    created_at: string
}

export default function ModelsPage() {
    const [models, setModels] = useState<Model[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [showModal, setShowModal] = useState(false)
    const [editingModel, setEditingModel] = useState<Model | null>(null)
    const [isSaving, setIsSaving] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        category: 'women',
        subcategory: 'main-board',
        height: '',
        chest: '',
        waist: '',
        bust: '',
        hips: '',
        shoeSize: '',
        hairColor: '',
        eyeColor: '',
        images: [''],
        featured: false
    })

    useEffect(() => {
        fetchModels()
    }, [])

    const fetchModels = async () => {
        const { data, error } = await supabase
            .from('models')
            .select('*')
            .order('created_at', { ascending: false })

        if (!error && data) {
            setModels(data)
        }
        setIsLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        const modelData = {
            name: formData.name,
            slug: formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
            category: formData.category,
            subcategory: formData.subcategory,
            height: formData.height,
            chest: formData.chest,
            waist: formData.waist,
            bust: formData.bust,
            hips: formData.hips,
            shoe_size: formData.shoeSize,
            hair_color: formData.hairColor,
            eye_color: formData.eyeColor,
            images: formData.images.filter(img => img.trim() !== ''),
            featured: formData.featured,
            active: true
        }

        if (editingModel) {
            const { error } = await supabase
                .from('models')
                .update(modelData)
                .eq('id', editingModel.id)

            if (!error) {
                fetchModels()
                closeModal()
            }
        } else {
            const { error } = await supabase
                .from('models')
                .insert(modelData)

            if (!error) {
                fetchModels()
                closeModal()
            }
        }

        setIsSaving(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this model?')) return

        const { error } = await supabase
            .from('models')
            .update({ active: false })
            .eq('id', id)

        if (!error) {
            fetchModels()
        }
    }

    const toggleFeatured = async (model: Model) => {
        const { error } = await supabase
            .from('models')
            .update({ featured: !model.featured })
            .eq('id', model.id)

        if (!error) {
            fetchModels()
        }
    }

    const openEditModal = (model: Model) => {
        setEditingModel(model)
        setFormData({
            name: model.name,
            category: model.category,
            subcategory: model.subcategory || 'main-board',
            height: model.height || '',
            chest: '',
            waist: '',
            bust: '',
            hips: '',
            shoeSize: '',
            hairColor: '',
            eyeColor: '',
            images: model.images.length > 0 ? model.images : [''],
            featured: model.featured
        })
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setEditingModel(null)
        setFormData({
            name: '',
            category: 'women',
            subcategory: 'main-board',
            height: '',
            chest: '',
            waist: '',
            bust: '',
            hips: '',
            shoeSize: '',
            hairColor: '',
            eyeColor: '',
            images: [''],
            featured: false
        })
    }

    const addImageField = () => {
        setFormData({ ...formData, images: [...formData.images, ''] })
    }

    const updateImage = (index: number, value: string) => {
        const newImages = [...formData.images]
        newImages[index] = value
        setFormData({ ...formData, images: newImages })
    }

    const filteredModels = models
        .filter(m => m.active)
        .filter(m => categoryFilter === 'all' || m.category === categoryFilter)
        .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
        )
    }

    return (
        <div>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
            >
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Models</h1>
                    <p className="text-gray-500 mt-1">Manage your model roster</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-700 transition"
                >
                    <Plus size={20} />
                    Add Model
                </button>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row gap-4"
            >
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search models..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                    />
                </div>
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                >
                    <option value="all">All Categories</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                </select>
            </motion.div>

            {/* Models Grid */}
            {filteredModels.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                    <p className="text-gray-500">No models found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredModels.map((model, index) => (
                        <motion.div
                            key={model.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
                        >
                            <div className="relative aspect-[3/4] bg-gray-100">
                                {model.images && model.images[0] ? (
                                    <Image
                                        src={model.images[0]}
                                        alt={model.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                                {model.featured && (
                                    <div className="absolute top-2 left-2 bg-brand-red text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                                        <Star size={12} fill="white" /> Featured
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => openEditModal(model)}
                                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition"
                                    >
                                        <Edit2 size={18} className="text-gray-700" />
                                    </button>
                                    <button
                                        onClick={() => toggleFeatured(model)}
                                        className={`p-2 rounded-full transition ${model.featured ? 'bg-brand-red text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        <Star size={18} fill={model.featured ? 'white' : 'none'} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(model.id)}
                                        className="p-2 bg-white rounded-full hover:bg-red-50 transition"
                                    >
                                        <Trash2 size={18} className="text-red-500" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900">{model.name}</h3>
                                <p className="text-sm text-gray-500 capitalize">{model.category} • {model.subcategory}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">
                                    {editingModel ? 'Edit Model' : 'Add New Model'}
                                </h2>
                                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        >
                                            <option value="women">Women</option>
                                            <option value="men">Men</option>
                                            <option value="kids">Kids</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                                        <select
                                            value={formData.subcategory}
                                            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        >
                                            <option value="main-board">Main Board</option>
                                            <option value="development">Development</option>
                                            <option value="direct-booking">Direct Booking</option>
                                            {formData.category === 'kids' && (
                                                <>
                                                    <option value="girls">Girls</option>
                                                    <option value="boys">Boys</option>
                                                </>
                                            )}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                                        <input
                                            type="text"
                                            value={formData.height}
                                            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                            placeholder="5'9&quot;"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Waist</label>
                                        <input
                                            type="text"
                                            value={formData.waist}
                                            onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                                            placeholder="24&quot;"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bust</label>
                                        <input
                                            type="text"
                                            value={formData.bust}
                                            onChange={(e) => setFormData({ ...formData, bust: e.target.value })}
                                            placeholder="34&quot;"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Hips</label>
                                        <input
                                            type="text"
                                            value={formData.hips}
                                            onChange={(e) => setFormData({ ...formData, hips: e.target.value })}
                                            placeholder="36&quot;"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Shoe Size</label>
                                        <input
                                            type="text"
                                            value={formData.shoeSize}
                                            onChange={(e) => setFormData({ ...formData, shoeSize: e.target.value })}
                                            placeholder="8"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Hair Color</label>
                                        <input
                                            type="text"
                                            value={formData.hairColor}
                                            onChange={(e) => setFormData({ ...formData, hairColor: e.target.value })}
                                            placeholder="Blonde"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Eye Color</label>
                                        <input
                                            type="text"
                                            value={formData.eyeColor}
                                            onChange={(e) => setFormData({ ...formData, eyeColor: e.target.value })}
                                            placeholder="Blue"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        />
                                    </div>
                                </div>

                                {/* Images */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs</label>
                                    {formData.images.map((img, index) => (
                                        <input
                                            key={index}
                                            type="url"
                                            value={img}
                                            onChange={(e) => updateImage(index, e.target.value)}
                                            placeholder="https://..."
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red mb-2"
                                        />
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addImageField}
                                        className="text-sm text-brand-red hover:underline"
                                    >
                                        + Add another image
                                    </button>
                                </div>

                                {/* Featured */}
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-4 h-4 text-brand-red rounded focus:ring-brand-red"
                                    />
                                    <label htmlFor="featured" className="text-sm text-gray-700">Featured Model</label>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-1 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isSaving ? <Loader2 size={20} className="animate-spin" /> : null}
                                        {editingModel ? 'Save Changes' : 'Add Model'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

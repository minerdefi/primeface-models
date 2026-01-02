'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { Plus, Search, Edit2, Trash2, X, Star, Loader2, Upload, AlertCircle } from 'lucide-react'
import { compressImage } from '@/lib/image-compression'

interface Model {
    id: string
    name: string
    slug: string
    category: string
    subcategory: string | null
    height: string | null
    chest: string | null
    waist: string | null
    bust: string | null
    hips: string | null
    inseam: string | null
    suit: string | null
    suit_length: string | null
    dress_size: string | null
    shoe_size: string | null
    hair_color: string | null
    eye_color: string | null
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
        subcategory: 'fashion',
        height: '',
        chest: '',
        waist: '',
        bust: '',
        hips: '',
        inseam: '',
        suit: '',
        suitLength: '',
        dressSize: '',
        shoeSize: '',
        hairColor: '',
        eyeColor: '',
        images: [''],
        featured: false
    })

    const [uploadingImages, setUploadingImages] = useState<boolean[]>([])
    const [imageFiles] = useState<File[]>([])
    const [saveError, setSaveError] = useState<string | null>(null)

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
        setSaveError(null)

        try {
            const modelData = {
                name: formData.name,
                slug: formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                category: formData.category,
                subcategory: formData.subcategory,
                height: formData.height || null,
                chest: formData.chest || null,
                waist: formData.waist || null,
                bust: formData.bust || null,
                hips: formData.hips || null,
                inseam: formData.inseam || null,
                suit: formData.suit || null,
                suit_length: formData.suitLength || null,
                dress_size: formData.dressSize || null,
                shoe_size: formData.shoeSize || null,
                hair_color: formData.hairColor || null,
                eye_color: formData.eyeColor || null,
                images: formData.images.filter(img => img.trim() !== ''),
                featured: formData.featured,
                active: true
            }

            console.log('Saving model data:', modelData)

            if (editingModel) {
                const { data, error } = await supabase
                    .from('models')
                    .update(modelData)
                    .eq('id', editingModel.id)
                    .select()

                if (error) {
                    console.error('Update error:', error)
                    throw new Error(error.message)
                }
                console.log('Model updated:', data)
            } else {
                const { data, error } = await supabase
                    .from('models')
                    .insert(modelData)
                    .select()

                if (error) {
                    console.error('Insert error:', error)
                    throw new Error(error.message)
                }
                console.log('Model created:', data)
            }

            await fetchModels()
            closeModal()
        } catch (error: unknown) {
            console.error('Save error:', error)
            setSaveError(error instanceof Error ? error.message : 'Failed to save model')
        } finally {
            setIsSaving(false)
        }
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
            subcategory: model.subcategory || 'fashion',
            height: model.height || '',
            chest: model.chest || '',
            waist: model.waist || '',
            bust: model.bust || '',
            hips: model.hips || '',
            inseam: model.inseam || '',
            suit: model.suit || '',
            suitLength: model.suit_length || '',
            dressSize: model.dress_size || '',
            shoeSize: model.shoe_size || '',
            hairColor: model.hair_color || '',
            eyeColor: model.eye_color || '',
            images: model.images.length > 0 ? model.images : [''],
            featured: model.featured
        })
        setShowModal(true)
    }

    // Update subcategory when category changes
    useEffect(() => {
        if (formData.category === 'women' || formData.category === 'men') {
            if (!['fashion', 'commercial', 'classic'].includes(formData.subcategory)) {
                setFormData(prev => ({ ...prev, subcategory: 'fashion' }))
            }
        } else if (formData.category === 'kids') {
            if (!['boys', 'girls', 'tween'].includes(formData.subcategory)) {
                setFormData(prev => ({ ...prev, subcategory: 'boys' }))
            }
        }
    }, [formData.category])

    const closeModal = () => {
        setShowModal(false)
        setEditingModel(null)
        setFormData({
            name: '',
            category: 'women',
            subcategory: 'fashion',
            height: '',
            chest: '',
            waist: '',
            bust: '',
            hips: '',
            inseam: '',
            suit: '',
            suitLength: '',
            dressSize: '',
            shoeSize: '',
            hairColor: '',
            eyeColor: '',
            images: [''],
            featured: false
        })
    }

    const addImageField = () => {
        setFormData({ ...formData, images: [...formData.images, ''] })
        setUploadingImages([...uploadingImages, false])
    }

    const updateImage = (index: number, value: string) => {
        const newImages = [...formData.images]
        newImages[index] = value
        setFormData({ ...formData, images: newImages })
    }

    const removeImage = (index: number) => {
        const newImages = formData.images.filter((_, i) => i !== index)
        const newUploading = uploadingImages.filter((_, i) => i !== index)
        setFormData({ ...formData, images: newImages })
        setUploadingImages(newUploading)
    }

    const handleImageUpload = async (index: number, file: File) => {
        const newUploading = [...uploadingImages]
        newUploading[index] = true
        setUploadingImages(newUploading)

        try {
            // Compress image before upload
            console.log('Compressing image...')
            const compressedFile = await compressImage(file, 1, 1920)

            const formDataUpload = new FormData()
            formDataUpload.append('file', compressedFile)
            formDataUpload.append('bucket', 'model-images')

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formDataUpload,
            })

            if (!response.ok) {
                throw new Error('Upload failed')
            }

            const data = await response.json()
            updateImage(index, data.url)
        } catch (error) {
            console.error('Upload error:', error)
            alert('Failed to upload image: ' + (error as Error).message)
        } finally {
            newUploading[index] = false
            setUploadingImages(newUploading)
        }
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
                                            {(formData.category === 'women' || formData.category === 'men') && (
                                                <>
                                                    <option value="fashion">Fashion</option>
                                                    <option value="commercial">Commercial</option>
                                                    <option value="classic">Classic</option>
                                                </>
                                            )}
                                            {formData.category === 'kids' && (
                                                <>
                                                    <option value="boys">Boys</option>
                                                    <option value="girls">Girls</option>
                                                    <option value="tween">Tween</option>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Chest</label>
                                        <input
                                            type="text"
                                            value={formData.chest}
                                            onChange={(e) => setFormData({ ...formData, chest: e.target.value })}
                                            placeholder="34&quot;"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Inseam</label>
                                        <input
                                            type="text"
                                            value={formData.inseam}
                                            onChange={(e) => setFormData({ ...formData, inseam: e.target.value })}
                                            placeholder="32&quot;"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Suit</label>
                                        <input
                                            type="text"
                                            value={formData.suit}
                                            onChange={(e) => setFormData({ ...formData, suit: e.target.value })}
                                            placeholder="40R"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Suit Length</label>
                                        <input
                                            type="text"
                                            value={formData.suitLength}
                                            onChange={(e) => setFormData({ ...formData, suitLength: e.target.value })}
                                            placeholder="R"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Dress Size</label>
                                        <input
                                            type="text"
                                            value={formData.dressSize}
                                            onChange={(e) => setFormData({ ...formData, dressSize: e.target.value })}
                                            placeholder="6"
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                                    <div className="space-y-3">
                                        {formData.images.map((img, index) => (
                                            <div key={index} className="flex gap-2">
                                                {/* Preview */}
                                                {img && (
                                                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={img}
                                                            alt={`Preview ${index + 1}`}
                                                            width={80}
                                                            height={80}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}

                                                <div className="flex-1 flex gap-2">
                                                    {/* File Upload */}
                                                    <label className="flex-1 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-brand-red transition cursor-pointer flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-brand-red">
                                                        {uploadingImages[index] ? (
                                                            <>
                                                                <Loader2 size={16} className="animate-spin" />
                                                                Uploading...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Upload size={16} />
                                                                Upload Image
                                                            </>
                                                        )}
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0]
                                                                if (file) handleImageUpload(index, file)
                                                            }}
                                                            className="hidden"
                                                            disabled={uploadingImages[index]}
                                                        />
                                                    </label>

                                                    {/* URL Input */}
                                                    <input
                                                        type="url"
                                                        value={img}
                                                        onChange={(e) => updateImage(index, e.target.value)}
                                                        placeholder="Or paste URL..."
                                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red text-sm"
                                                    />

                                                    {/* Remove Button */}
                                                    {formData.images.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addImageField}
                                        className="mt-3 text-sm text-brand-red hover:underline flex items-center gap-1"
                                    >
                                        <Plus size={16} />
                                        Add another image
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

                                {/* Error Message */}
                                {saveError && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                                        <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                                        <div>
                                            <p className="text-sm font-medium text-red-800">Failed to save model</p>
                                            <p className="text-sm text-red-600 mt-1">{saveError}</p>
                                        </div>
                                    </div>
                                )}

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

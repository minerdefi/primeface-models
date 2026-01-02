'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { Search, Eye, X, Check, XCircle, Clock, CheckCircle } from 'lucide-react'

interface Application {
    id: string
    first_name: string
    last_name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    date_of_birth: string
    instagram: string | null
    facebook: string | null
    message: string | null
    gender: string
    height: string
    waist: string
    bust: string
    hips: string
    dress_size: string
    shoe_size: string
    hair_color: string
    eye_color: string
    image_urls: string[]
    status: string
    admin_notes: string | null
    created_at: string
}

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [selectedApp, setSelectedApp] = useState<Application | null>(null)
    const [adminNotes, setAdminNotes] = useState('')

    const fetchApplications = useCallback(async () => {
        const { data, error } = await supabase
            .from('model_applications')
            .select('*')
            .order('created_at', { ascending: false })

        if (!error && data) {
            setApplications(data)
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        fetchApplications()
    }, [fetchApplications])

    const updateStatus = async (id: string, status: string) => {
        const { error } = await supabase
            .from('model_applications')
            .update({ status, admin_notes: adminNotes })
            .eq('id', id)

        if (!error) {
            fetchApplications()
            if (selectedApp?.id === id) {
                setSelectedApp({ ...selectedApp, status, admin_notes: adminNotes })
            }
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'reviewed': return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'accepted': return 'bg-green-100 text-green-800 border-green-200'
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
            default: return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock size={14} />
            case 'reviewed': return <Eye size={14} />
            case 'accepted': return <CheckCircle size={14} />
            case 'rejected': return <XCircle size={14} />
            default: return null
        }
    }

    const filteredApplications = applications
        .filter(app => statusFilter === 'all' || app.status === statusFilter)
        .filter(app =>
            `${app.first_name} ${app.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase())
        )

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
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
                <p className="text-gray-500 mt-1">Review and manage model applications</p>
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
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
            >
                {['pending', 'reviewed', 'accepted', 'rejected'].map(status => {
                    const count = applications.filter(a => a.status === status).length
                    return (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status === statusFilter ? 'all' : status)}
                            className={`p-4 rounded-xl border transition ${statusFilter === status ? 'ring-2 ring-brand-red' : ''
                                } ${getStatusColor(status)}`}
                        >
                            <p className="text-2xl font-bold">{count}</p>
                            <p className="text-sm capitalize">{status}</p>
                        </button>
                    )
                })}
            </motion.div>

            {/* Applications Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
                {filteredApplications.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No applications found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">
                                                    {app.first_name[0]}{app.last_name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{app.first_name} {app.last_name}</p>
                                                    <p className="text-sm text-gray-500">{app.city}, {app.state}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm text-gray-900">{app.email}</p>
                                            <p className="text-sm text-gray-500">{app.phone}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="capitalize text-sm text-gray-700">{app.gender}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(app.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(app.status)}`}>
                                                {getStatusIcon(app.status)}
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button
                                                onClick={() => {
                                                    setSelectedApp(app)
                                                    setAdminNotes(app.admin_notes || '')
                                                }}
                                                className="text-brand-red hover:underline text-sm font-medium"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedApp && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedApp(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                                <div>
                                    <h2 className="text-xl font-semibold">{selectedApp.first_name} {selectedApp.last_name}</h2>
                                    <p className="text-sm text-gray-500">Applied on {new Date(selectedApp.created_at).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-gray-600">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Personal Info */}
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Personal Information</h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Email</span>
                                                <span className="text-gray-900">{selectedApp.email}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Phone</span>
                                                <span className="text-gray-900">{selectedApp.phone}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Address</span>
                                                <span className="text-gray-900 text-right">{selectedApp.address}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">City/State</span>
                                                <span className="text-gray-900">{selectedApp.city}, {selectedApp.state}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Date of Birth</span>
                                                <span className="text-gray-900">{selectedApp.date_of_birth}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Gender</span>
                                                <span className="text-gray-900 capitalize">{selectedApp.gender}</span>
                                            </div>
                                            {selectedApp.instagram && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Instagram</span>
                                                    <span className="text-gray-900">{selectedApp.instagram}</span>
                                                </div>
                                            )}
                                            {selectedApp.facebook && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Facebook</span>
                                                    <span className="text-gray-900">{selectedApp.facebook}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Measurements */}
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Measurements</h3>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Height</span>
                                                <span className="text-gray-900">{selectedApp.height}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Waist</span>
                                                <span className="text-gray-900">{selectedApp.waist}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Bust</span>
                                                <span className="text-gray-900">{selectedApp.bust}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Hips</span>
                                                <span className="text-gray-900">{selectedApp.hips}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Dress Size</span>
                                                <span className="text-gray-900">{selectedApp.dress_size}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Shoe Size</span>
                                                <span className="text-gray-900">{selectedApp.shoe_size}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Hair Color</span>
                                                <span className="text-gray-900">{selectedApp.hair_color}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Eye Color</span>
                                                <span className="text-gray-900">{selectedApp.eye_color}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                {selectedApp.message && (
                                    <div className="mt-8">
                                        <h3 className="font-semibold text-gray-900 mb-2">Message</h3>
                                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedApp.message}</p>
                                    </div>
                                )}

                                {/* Images */}
                                {selectedApp.image_urls && selectedApp.image_urls.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="font-semibold text-gray-900 mb-4">Photos</h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            {selectedApp.image_urls.map((url, index) => (
                                                <div key={index} className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                                                    <Image src={url} alt={`Photo ${index + 1}`} fill className="object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Admin Notes */}
                                <div className="mt-8">
                                    <h3 className="font-semibold text-gray-900 mb-2">Admin Notes</h3>
                                    <textarea
                                        value={adminNotes}
                                        onChange={(e) => setAdminNotes(e.target.value)}
                                        placeholder="Add notes about this application..."
                                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red resize-none"
                                        rows={3}
                                    />
                                </div>

                                {/* Actions */}
                                <div className="mt-8 flex flex-wrap gap-3">
                                    <button
                                        onClick={() => updateStatus(selectedApp.id, 'reviewed')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${selectedApp.status === 'reviewed'
                                            ? 'bg-blue-500 text-white border-blue-500'
                                            : 'border-blue-500 text-blue-500 hover:bg-blue-50'
                                            }`}
                                    >
                                        <Eye size={18} />
                                        Mark Reviewed
                                    </button>
                                    <button
                                        onClick={() => updateStatus(selectedApp.id, 'accepted')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${selectedApp.status === 'accepted'
                                            ? 'bg-green-500 text-white border-green-500'
                                            : 'border-green-500 text-green-500 hover:bg-green-50'
                                            }`}
                                    >
                                        <Check size={18} />
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => updateStatus(selectedApp.id, 'rejected')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${selectedApp.status === 'rejected'
                                            ? 'bg-red-500 text-white border-red-500'
                                            : 'border-red-500 text-red-500 hover:bg-red-50'
                                            }`}
                                    >
                                        <XCircle size={18} />
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

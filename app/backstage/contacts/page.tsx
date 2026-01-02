'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Search, Mail, Phone, X, CheckCircle, MessageCircle, Trash2 } from 'lucide-react'

interface Contact {
    id: string
    name: string
    email: string
    phone: string | null
    subject: string | null
    message: string
    status: string
    created_at: string
}

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        const { data, error } = await supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false })

        if (!error && data) {
            setContacts(data)
        }
        setIsLoading(false)
    }

    const updateStatus = async (id: string, status: string) => {
        const { error } = await supabase
            .from('contact_submissions')
            .update({ status })
            .eq('id', id)

        if (!error) {
            fetchContacts()
            if (selectedContact?.id === id) {
                setSelectedContact({ ...selectedContact, status })
            }
        }
    }

    const deleteContact = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return

        const { error } = await supabase
            .from('contact_submissions')
            .delete()
            .eq('id', id)

        if (!error) {
            fetchContacts()
            setSelectedContact(null)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'read': return 'bg-gray-100 text-gray-800 border-gray-200'
            case 'replied': return 'bg-green-100 text-green-800 border-green-200'
            default: return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const filteredContacts = contacts
        .filter(c => statusFilter === 'all' || c.status === statusFilter)
        .filter(c =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (c.subject && c.subject.toLowerCase().includes(searchTerm.toLowerCase()))
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
                <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
                <p className="text-gray-500 mt-1">Manage inquiries and messages</p>
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
                        placeholder="Search by name, email, or subject..."
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
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                </select>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="grid grid-cols-3 gap-4 mb-6"
            >
                {['new', 'read', 'replied'].map(status => {
                    const count = contacts.filter(c => c.status === status).length
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

            {/* Messages List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
                {filteredContacts.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <MessageCircle className="mx-auto mb-4 text-gray-300" size={48} />
                        <p>No messages found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {filteredContacts.map((contact) => (
                            <div
                                key={contact.id}
                                className={`p-4 hover:bg-gray-50 transition cursor-pointer ${contact.status === 'new' ? 'bg-blue-50/30' : ''
                                    }`}
                                onClick={() => {
                                    setSelectedContact(contact)
                                    if (contact.status === 'new') {
                                        updateStatus(contact.id, 'read')
                                    }
                                }}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <p className={`font-medium ${contact.status === 'new' ? 'text-gray-900' : 'text-gray-700'}`}>
                                                {contact.name}
                                            </p>
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(contact.status)}`}>
                                                {contact.status}
                                            </span>
                                        </div>
                                        {contact.subject && (
                                            <p className="text-sm font-medium text-gray-800 mb-1">{contact.subject}</p>
                                        )}
                                        <p className="text-sm text-gray-500 truncate">{contact.message}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-xs text-gray-400">
                                            {new Date(contact.created_at).toLocaleDateString()}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {new Date(contact.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedContact && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedContact(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">{selectedContact.name}</h2>
                                    <p className="text-sm text-gray-500">
                                        Received on {new Date(selectedContact.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <button onClick={() => setSelectedContact(null)} className="text-gray-400 hover:text-gray-600">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6">
                                {/* Contact Info */}
                                <div className="flex flex-wrap gap-4 mb-6">
                                    <a
                                        href={`mailto:${selectedContact.email}`}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                                    >
                                        <Mail size={18} className="text-gray-600" />
                                        <span className="text-gray-900">{selectedContact.email}</span>
                                    </a>
                                    {selectedContact.phone && (
                                        <a
                                            href={`tel:${selectedContact.phone}`}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                                        >
                                            <Phone size={18} className="text-gray-600" />
                                            <span className="text-gray-900">{selectedContact.phone}</span>
                                        </a>
                                    )}
                                </div>

                                {/* Subject */}
                                {selectedContact.subject && (
                                    <div className="mb-4">
                                        <p className="text-sm font-medium text-gray-500 mb-1">Subject</p>
                                        <p className="text-gray-900 font-medium">{selectedContact.subject}</p>
                                    </div>
                                )}

                                {/* Message */}
                                <div className="mb-6">
                                    <p className="text-sm font-medium text-gray-500 mb-2">Message</p>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="mb-6">
                                    <p className="text-sm font-medium text-gray-500 mb-2">Status</p>
                                    <div className="flex gap-2">
                                        {['new', 'read', 'replied'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => updateStatus(selectedContact.id, status)}
                                                className={`px-4 py-2 rounded-lg border capitalize transition ${selectedContact.status === status
                                                        ? getStatusColor(status)
                                                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4 pt-4 border-t border-gray-100">
                                    <a
                                        href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || 'Your inquiry'}`}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-700 transition"
                                        onClick={() => updateStatus(selectedContact.id, 'replied')}
                                    >
                                        <Mail size={18} />
                                        Reply via Email
                                    </a>
                                    <button
                                        onClick={() => deleteContact(selectedContact.id)}
                                        className="flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition"
                                    >
                                        <Trash2 size={18} />
                                        Delete
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

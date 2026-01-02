'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Users, FileText, MessageSquare } from 'lucide-react'
import Link from 'next/link'

interface Stats {
    totalModels: number
    totalApplications: number
    pendingApplications: number
    totalContacts: number
    newContacts: number
}

interface RecentApplication {
    id: string
    first_name: string
    last_name: string
    email: string
    status: string
    created_at: string
}

export default function BackstageDashboard() {
    const [stats, setStats] = useState<Stats>({
        totalModels: 0,
        totalApplications: 0,
        pendingApplications: 0,
        totalContacts: 0,
        newContacts: 0
    })
    const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            // Fetch models count
            const { count: modelsCount } = await supabase
                .from('models')
                .select('*', { count: 'exact', head: true })
                .eq('active', true)

            // Fetch applications
            const { data: applications, count: applicationsCount } = await supabase
                .from('model_applications')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .limit(5)

            const pendingCount = applications?.filter(a => a.status === 'pending').length || 0

            // Fetch contacts
            const { data: contacts, count: contactsCount } = await supabase
                .from('contact_submissions')
                .select('*', { count: 'exact' })

            const newContactsCount = contacts?.filter(c => c.status === 'new').length || 0

            setStats({
                totalModels: modelsCount || 0,
                totalApplications: applicationsCount || 0,
                pendingApplications: pendingCount,
                totalContacts: contactsCount || 0,
                newContacts: newContactsCount
            })

            setRecentApplications(applications || [])
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const statCards = [
        {
            label: 'Total Models',
            value: stats.totalModels,
            icon: Users,
            color: 'bg-blue-500',
            href: '/backstage/models'
        },
        {
            label: 'Applications',
            value: stats.totalApplications,
            icon: FileText,
            color: 'bg-brand-red',
            href: '/backstage/applications',
            badge: stats.pendingApplications > 0 ? `${stats.pendingApplications} pending` : null
        },
        {
            label: 'Contact Messages',
            value: stats.totalContacts,
            icon: MessageSquare,
            color: 'bg-green-500',
            href: '/backstage/contacts',
            badge: stats.newContacts > 0 ? `${stats.newContacts} new` : null
        },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800'
            case 'reviewed': return 'bg-blue-100 text-blue-800'
            case 'accepted': return 'bg-green-100 text-green-800'
            case 'rejected': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
        )
    }

    return (
        <div>
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome to the PrimeFace backstage</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={stat.href}>
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                        {stat.badge && (
                                            <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-brand-red/10 text-brand-red rounded-full">
                                                {stat.badge}
                                            </span>
                                        )}
                                    </div>
                                    <div className={`${stat.color} p-3 rounded-lg`}>
                                        <stat.icon className="text-white" size={24} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Recent Applications */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
                        <p className="text-sm text-gray-500">Latest model application submissions</p>
                    </div>
                    <Link
                        href="/backstage/applications"
                        className="text-sm text-brand-red hover:underline font-medium"
                    >
                        View All →
                    </Link>
                </div>

                {recentApplications.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <FileText className="mx-auto mb-4 text-gray-300" size={48} />
                        <p>No applications yet</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {recentApplications.map((app) => (
                            <div key={app.id} className="p-4 hover:bg-gray-50 transition">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                                            {app.first_name[0]}{app.last_name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {app.first_name} {app.last_name}
                                            </p>
                                            <p className="text-sm text-gray-500">{app.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                                            {app.status}
                                        </span>
                                        <span className="text-sm text-gray-400">
                                            {new Date(app.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    )
}

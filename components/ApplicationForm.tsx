'use client'

import { useState } from 'react'

export default function ApplicationForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        height: '',
        city: '',
        state: '',
        experience: '',
        aboutYou: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Application submitted:', formData)
        alert('Thank you for your application! We will review it and get back to you soon.')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                    </label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        required
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                        Gender *
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                        <option value="">Select...</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                        Height *
                    </label>
                    <input
                        type="text"
                        id="height"
                        name="height"
                        required
                        placeholder="e.g., 5'10&quot;"
                        value={formData.height}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                    </label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Modeling Experience
                </label>
                <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                >
                    <option value="">Select...</option>
                    <option value="none">No Experience</option>
                    <option value="some">Some Experience (1-2 years)</option>
                    <option value="experienced">Experienced (3+ years)</option>
                    <option value="professional">Professional</option>
                </select>
            </div>

            <div>
                <label htmlFor="aboutYou" className="block text-sm font-medium text-gray-700 mb-2">
                    Tell Us About Yourself
                </label>
                <textarea
                    id="aboutYou"
                    name="aboutYou"
                    rows={4}
                    value={formData.aboutYou}
                    onChange={handleChange}
                    placeholder="Share any relevant information about yourself, your goals, and why you want to join our agency..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                />
            </div>

            <div className="border-t pt-6">
                <p className="text-sm text-gray-500 mb-6">
                    Please note: Photos are required for your application. After submitting this form,
                    you will receive instructions on how to submit your photos via email.
                </p>
                <button
                    type="submit"
                    className="w-full bg-white text-brand-red border-2 border-brand-red py-4 px-6 rounded-md font-semibold text-lg hover:bg-brand-red hover:text-white transition"
                >
                    Submit Application
                </button>
            </div>
        </form>
    )
}

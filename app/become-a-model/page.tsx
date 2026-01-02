"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function BecomeAModelPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        dateOfBirth: '',
        instagram: '',
        facebook: '',
        message: '',
        gender: 'female',
        height: '',
        waist: '',
        bust: '',
        hips: '',
        dressSize: '',
        shoeSize: '',
        hairColor: '',
        eyeColor: '',
    });

    const [images, setImages] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.files && e.target.files[0]) {
            const newImages = [...images];
            newImages[index] = e.target.files[0];
            setImages(newImages);
        }
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('bucket', 'application-images');

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            return data.url;
        } catch (error) {
            console.error('Image upload error:', error);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            // Upload images first
            const imageUrls: string[] = [];
            for (const image of images) {
                if (image) {
                    const url = await uploadImage(image);
                    if (url) {
                        imageUrls.push(url);
                    }
                }
            }

            // Submit application
            const response = await fetch('/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    imageUrls,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit application');
            }

            setSubmitStatus('success');
            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                dateOfBirth: '',
                instagram: '',
                facebook: '',
                message: '',
                gender: 'female',
                height: '',
                waist: '',
                bust: '',
                hips: '',
                dressSize: '',
                shoeSize: '',
                hairColor: '',
                eyeColor: '',
            });
            setImages([]);
        } catch (error) {
            console.error('Submit error:', error);
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Images Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900"
                    >
                        BECOME A MODEL
                    </motion.h1>

                    {/* Hero Images Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                    >
                        <div className="relative aspect-[3/4] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80"
                                alt="Female model"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative aspect-[3/4] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80"
                                alt="Children models"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative aspect-[3/4] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80"
                                alt="Fashion model"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative aspect-[3/4] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                                alt="Male model"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Application Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="space-y-4"
                            >
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name *"
                                    required
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name *"
                                    required
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email *"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone *"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address *"
                                    required
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City *"
                                    required
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State *"
                                    required
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    placeholder="Date of Birth *"
                                    required
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="text"
                                    name="instagram"
                                    placeholder="Instagram"
                                    value={formData.instagram}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="text"
                                    name="facebook"
                                    placeholder="Facebook"
                                    value={formData.facebook}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition resize-none"
                                />
                            </motion.div>

                            {/* Right Column */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="space-y-4"
                            >
                                {/* Gender Selection */}
                                <div className="flex gap-8">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={formData.gender === 'female'}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-brand-red focus:ring-brand-red"
                                        />
                                        <span className="text-gray-700">Female</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={formData.gender === 'male'}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-brand-red focus:ring-brand-red"
                                        />
                                        <span className="text-gray-700">Male</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="children"
                                            checked={formData.gender === 'children'}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-brand-red focus:ring-brand-red"
                                        />
                                        <span className="text-gray-700">Children</span>
                                    </label>
                                </div>

                                <input
                                    type="text"
                                    name="height"
                                    placeholder="Height *"
                                    required
                                    value={formData.height}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="text"
                                    name="waist"
                                    placeholder="Waist *"
                                    required
                                    value={formData.waist}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="text"
                                    name="bust"
                                    placeholder="Bust *"
                                    required
                                    value={formData.bust}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="text"
                                    name="hips"
                                    placeholder="Hips *"
                                    required
                                    value={formData.hips}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="text"
                                    name="dressSize"
                                    placeholder="Dress Size *"
                                    required
                                    value={formData.dressSize}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="text"
                                    name="shoeSize"
                                    placeholder="Shoe Size *"
                                    required
                                    value={formData.shoeSize}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="text"
                                    name="hairColor"
                                    placeholder="Hair Color *"
                                    required
                                    value={formData.hairColor}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                <input
                                    type="text"
                                    name="eyeColor"
                                    placeholder="Eye Color *"
                                    required
                                    value={formData.eyeColor}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-red transition"
                                />

                                {/* Image Upload Fields */}
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Image 1 *"
                                            readOnly
                                            value={images[0]?.name || ''}
                                            className="flex-1 px-4 py-3 border border-gray-300 bg-gray-50"
                                        />
                                        <label className="px-6 py-3 bg-black text-white font-medium cursor-pointer hover:bg-gray-800 transition">
                                            Browse
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, 0)}
                                                className="hidden"
                                                required
                                            />
                                        </label>
                                    </div>

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Image 2 *"
                                            readOnly
                                            value={images[1]?.name || ''}
                                            className="flex-1 px-4 py-3 border border-gray-300 bg-gray-50"
                                        />
                                        <label className="px-6 py-3 bg-black text-white font-medium cursor-pointer hover:bg-gray-800 transition">
                                            Browse
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, 1)}
                                                className="hidden"
                                                required
                                            />
                                        </label>
                                    </div>

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Image 3"
                                            readOnly
                                            value={images[2]?.name || ''}
                                            className="flex-1 px-4 py-3 border border-gray-300 bg-gray-50"
                                        />
                                        <label className="px-6 py-3 bg-black text-white font-medium cursor-pointer hover:bg-gray-800 transition">
                                            Browse
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, 2)}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Status Messages and Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="mt-8 flex flex-col items-end gap-4"
                        >
                            {/* Success Message */}
                            {submitStatus === 'success' && (
                                <div className="w-full flex items-center gap-2 p-4 bg-green-50 border border-green-200 text-green-700 rounded">
                                    <CheckCircle size={20} />
                                    <span>Your application has been submitted successfully! We will be in touch soon.</span>
                                </div>
                            )}

                            {/* Error Message */}
                            {submitStatus === 'error' && (
                                <div className="w-full flex items-center gap-2 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                                    <AlertCircle size={20} />
                                    <span>{errorMessage || 'An error occurred. Please try again.'}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-12 py-3 bg-black text-white font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Send'
                                )}
                            </button>
                        </motion.div>
                    </motion.form>
                </div>
            </section>
        </main>
    );
}

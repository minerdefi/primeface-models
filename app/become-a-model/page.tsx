"use client";

import PageHeader from "@/components/PageHeader";
import ApplicationForm from "@/components/ApplicationForm";
import { motion } from "framer-motion";

export default function BecomeAModelPage() {
    return (
        <main>
            <PageHeader
                title="Become a Model"
                subtitle="Start Your Journey"
                breadcrumbs={[{ label: "Become a Model" }]}
            />

            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-4 text-brand-red">Join PrimeFace Models</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Interested in becoming a model? Complete our online application form below.
                            Be represented by Houston's premier model and talent agency.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gray-50 p-8 md:p-12"
                    >
                        <ApplicationForm />
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

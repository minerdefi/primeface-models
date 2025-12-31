import PageHeader from "@/components/PageHeader";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <main>
            <PageHeader
                title="Contact Us"
                subtitle="Get in Touch"
                backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            />

            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="text-center p-8 border border-gray-200 hover:border-black transition-colors">
                            <MapPin className="w-10 h-10 mx-auto mb-6 text-black" />
                            <h3 className="font-bold text-lg mb-4 uppercase tracking-wide text-brand-red">Visit Us</h3>
                            <p className="text-gray-600">
                                1095 Evergreen Circle, Suite 213<br />
                                The Woodlands, TX 77380
                            </p>
                        </div>

                        <div className="text-center p-8 border border-gray-200 hover:border-black transition-colors">
                            <Phone className="w-10 h-10 mx-auto mb-6 text-black" />
                            <h3 className="font-bold text-lg mb-4 uppercase tracking-wide text-brand-red">Call Us</h3>
                            <a
                                href="tel:+12812100012"
                                className="text-2xl font-bold text-black hover:text-gray-600 transition"
                            >
                                281-210-0012
                            </a>
                        </div>

                        <div className="text-center p-8 border border-gray-200 hover:border-black transition-colors">
                            <Mail className="w-10 h-10 mx-auto mb-6 text-black" />
                            <h3 className="font-bold text-lg mb-4 uppercase tracking-wide text-brand-red">Email Us</h3>
                            <a
                                href="mailto:info@primefacemodels.com"
                                className="text-lg font-semibold text-black hover:text-gray-600 transition"
                            >
                                info@primefacemodels.com
                            </a>
                            <p className="text-sm text-gray-500 mt-2">Client inquiries only</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-brand-red">Interested in Becoming a Model?</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        If you're interested in joining our agency, please visit our application page.
                    </p>
                    <Link
                        href="/become-a-model"
                        className="inline-block bg-black text-white px-10 py-4 font-medium hover:bg-gray-800 transition uppercase tracking-wide"
                    >
                        Apply Now
                    </Link>
                </div>
            </section>
        </main>
    );
}

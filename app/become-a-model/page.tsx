import PageHeader from "@/components/PageHeader";
import ApplicationForm from "@/components/ApplicationForm";

export default function BecomeAModelPage() {
    return (
        <main>
            <PageHeader
                title="Become a Model"
                subtitle="Start Your Journey"
                backgroundImage="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80"
            />

            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-brand-red">Join PrimeFace Models</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Interested in becoming a model? Complete our online application form below.
                            Be represented by Houston's premier model and talent agency.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-8 md:p-12">
                        <ApplicationForm />
                    </div>
                </div>
            </section>
        </main>
    );
}

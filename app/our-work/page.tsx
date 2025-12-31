import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";

export default function OurWorkPage() {
    const portfolioItems = [
        { id: 1, title: "Fashion Editorial", category: "Fashion", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" },
        { id: 2, title: "Commercial Campaign", category: "Commercial", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
        { id: 3, title: "Lifestyle Shoot", category: "Lifestyle", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80" },
        { id: 4, title: "Runway Show", category: "Fashion", image: "https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=800&q=80" },
        { id: 5, title: "Beauty Campaign", category: "Beauty", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80" },
        { id: 6, title: "Brand Partnership", category: "Commercial", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80" },
        { id: 7, title: "Magazine Feature", category: "Editorial", image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80" },
        { id: 8, title: "Product Launch", category: "Commercial", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80" },
    ];

    return (
        <main>
            <PageHeader
                title="Our Work"
                subtitle="Portfolio & Campaigns"
                backgroundImage="https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=1920&q=80"
            />

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {portfolioItems.map((item) => (
                            <div key={item.id} className="group relative overflow-hidden aspect-[3/4] bg-gray-100 cursor-pointer">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                                    <div className="p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="text-lg font-bold">{item.title}</h3>
                                        <p className="text-sm text-white/70 uppercase tracking-wide">{item.category}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-brand-red">Ready to Work Together?</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Let's create something amazing. Contact us to discuss your next project.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-black text-white px-10 py-4 font-medium hover:bg-gray-800 transition uppercase tracking-wide"
                    >
                        Get in Touch
                    </Link>
                </div>
            </section>
        </main>
    );
}

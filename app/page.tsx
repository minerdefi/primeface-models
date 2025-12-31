"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1920&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1920&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1920&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=1920&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1920&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1920&q=80",
];

const navLinks = [
  { name: "FEMALE MODELS", href: "/female-fashion" },
  { name: "MALE MODELS", href: "/male-fashion" },
  { name: "CHILDREN", href: "/children-male" },
  { name: "OUR WORK", href: "/our-work" },
  { name: "BECOME A MODEL", href: "/become-a-model" },
  { name: "CONTACT", href: "/contact" },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      title: "Female Models",
      links: [
        { name: "Fashion", href: "/female-fashion" },
        { name: "Commercial", href: "/female-commercial" },
        { name: "Classic", href: "/female-classic" },
      ],
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    },
    {
      title: "Male Models",
      links: [
        { name: "Fashion", href: "/male-fashion" },
        { name: "Commercial", href: "/male-commercial" },
        { name: "Classic", href: "/male-classic" },
      ],
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
    },
    {
      title: "Children",
      links: [
        { name: "Male", href: "/children-male" },
        { name: "Female", href: "/children-female" },
        { name: "All Tween", href: "/children-tween" },
      ],
      image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&q=80",
    },
  ];

  return (
    <main className="home-page">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ zIndex: 0 }}
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt="Model"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Light overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent z-[1]" />

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden fixed top-6 right-6 z-50 w-10 h-10 flex flex-col justify-center items-center"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-gray-800 block mb-1.5"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={isMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
            className="w-6 h-0.5 bg-gray-800 block mb-1.5"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-gray-800 block"
            transition={{ duration: 0.3 }}
          />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white/95 backdrop-blur-md z-40 md:hidden flex flex-col items-center justify-center"
            >
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-col items-center gap-6"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-xl tracking-wider text-gray-700 hover:text-brand-red transition"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Social Icons in Mobile Menu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="flex gap-6 mt-8"
                >
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-red transition">
                    <Instagram size={24} />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-red transition">
                    <Facebook size={24} />
                  </a>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center px-8 py-12">
          {/* Logo/Branding */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-10"
          >
            <h1 className="text-5xl md:text-6xl font-light text-gray-800 tracking-wide">
              primeface
            </h1>
            <p className="text-5xl md:text-6xl italic text-brand-red -mt-2" style={{ fontFamily: 'Georgia, serif' }}>
              models
            </p>
            <p className="text-sm tracking-[0.3em] text-gray-600 mt-2">
              AND TALENT AGENCY
            </p>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs tracking-wider text-gray-700 mb-8"
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-brand-red transition">
                {link.name}
              </Link>
            ))}
          </motion.nav>

          {/* Desktop Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden md:flex gap-4 mb-12"
          >
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition">
              <Facebook size={20} />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown size={24} className="text-gray-500 animate-bounce" />
        </motion.div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 right-8 z-10 hidden md:flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? "bg-brand-red w-6" : "bg-gray-400"
                }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-brand-red">Our Talent</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our diverse roster of professional models for your next project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div key={cat.title} className="group cursor-pointer">
                <Link href={cat.links[0].href}>
                  <div className="relative aspect-[3/4] overflow-hidden mb-6">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-2xl font-bold tracking-wide">{cat.title}</h3>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-center gap-6">
                  {cat.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-black transition uppercase tracking-wide"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-brand-red">About PrimeFace Models</h2>
          <p className="text-lg text-gray-600 mb-6">
            PrimeFace Models and Talent Agency, Inc. is Houston's top modeling agency, placing models in
            lifestyle print, commercial print, fashion print, social media, commercials, runway, and special events.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            We are a full-service modeling agency that goes the extra mile. Our hands-on approach sets us apart
            with 24/7 access to the Agency Director for specialized support.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-black text-white font-medium hover:bg-gray-800 transition"
          >
            GET IN TOUCH
          </Link>
        </div>
      </section>
    </main>
  );
}

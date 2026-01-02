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

  const _categories = [
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



      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className=" font-bold mb-6 text-brand-red">PrimeFace Models & Talent Agency of Houston and The Woodlands, Texas</h2>
          <p className="text-base text-gray-600 mb-4">
            PrimeFace Models and Talent Agency, Inc. is Houston&apos;s top modeling agency, placing models in lifestyle print, commercial print, fashion print, social media, commercials, runway, and special events. With over 36 years of industry experience, PrimeFace Models has an impeccable track record for successful and profitable events.
          </p>
          <p className="text-base text-gray-600 mb-4">
            We are a full-service modeling agency that will go the extra mile to make sure your event, photo shoot, casting, or commercial runs smoothly and effortlessly with our wonderful talent and crew! Our hands-on approach sets us apart and you will also have 24/7 access to the Agency Director, Colette Cole for specialized support.
          </p>
          <p className="text-base text-gray-600 mb-8">
            As a specialized boutique agency staffed with industry experts, we work closely with both clients and talent to provide a highly personalized experience.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-brand-red border-2 border-brand-red font-medium hover:bg-brand-red hover:text-white transition"
          >
            GET IN TOUCH
          </Link>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold mb-2 text-gray-900">@FIRSTMODELSANDTALENT</h2>
            <p className="text-gray-600">2.8K FOLLOWERS</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              {
                image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&q=80",
                caption: "Merry Christmas and Happy Holidays from all of us at PrimeFace Models to you and your family. 🎄🎅❤️"
              },
              {
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
                caption: "This little man found his Columbia visual in Academy Sports + Outdoors, that's a win..."
              },
              {
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
                caption: "That's a huge win, seeing Ronnie, Matthew, and Marissa pop up in a Fred Haas commercial..."
              },
              {
                image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
                caption: "Grace booked the big one in Houston and drove off 🚗 @graceperrizo @firstmodelsandtalent..."
              },
              {
                image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80",
                caption: "Our talent is having an amazing time modeling for the San Luis Resort in Galveston! It's a perfect..."
              },
              {
                image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80",
                caption: "Behind the scenes at our latest photo shoot with amazing talent!"
              },
              {
                image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80",
                caption: "Another successful commercial shoot wrapped up today!"
              },
              {
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
                caption: "Our models bringing their A-game to every project!"
              },
              {
                image: "https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=400&q=80",
                caption: "Fashion shoot highlights from this week's session!"
              },
              {
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
                caption: "Working with incredible brands and amazing talent!"
              }
            ].map((post, index) => (
              <div key={index} className="group relative aspect-square overflow-hidden cursor-pointer">
                <Image
                  src={post.image}
                  alt={`Instagram post ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center p-4">
                  <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    {post.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>
    </main>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { CONTENT } from '@/data/content';
import Section from '../ui/Section';

export default function Testimonials() {
  // State untuk Slider
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // State untuk Lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const testimonials = CONTENT.testimonials.images;

  // Handle Responsive Items per View
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3); // Desktop
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2); // Tablet
      } else {
        setItemsPerView(1); // Mobile
      }
    };

    // Set initial
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Logic Slider (Boundaries)
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // Logic Lightbox Navigation
  const nextLightbox = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <Section
      id='testimonials'
      bgColor='light'
      className='overflow-hidden'>
      <div className='text-center mb-10'>
        <h2 className='text-3xl md:text-4xl font-bold mb-4'>
          {CONTENT.testimonials.title}
        </h2>
        <p className='text-gray-600'>{CONTENT.testimonials.subtitle}</p>
      </div>

      {/* --- SLIDER CONTAINER --- */}
      <div className='relative max-w-6xl mx-auto px-4 sm:px-12'>
        {/* Navigation Buttons (Slider) */}
        <button
          onClick={prevSlide}
          className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg backdrop-blur-sm transition-all hidden sm:block'
          aria-label='Previous Slide'>
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg backdrop-blur-sm transition-all hidden sm:block'
          aria-label='Next Slide'>
          <ChevronRight size={24} />
        </button>

        {/* Slider Track */}
        <div className='overflow-hidden rounded-xl'>
          <motion.div
            className='flex gap-6'
            initial={false}
            animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }} // Geser berdasarkan persentase lebar item
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              width: `${(testimonials.length / itemsPerView) * 100}%`, // Lebar total track relatif terhadap container
            }}>
            {testimonials.map((src, idx) => (
              <div
                key={idx}
                className='relative shrink-0'
                style={{ width: `${100 / testimonials.length}%` }} // Setiap item mengambil porsi yang sama dari total track
              >
                <div
                  className='relative aspect-[9/16] bg-white rounded-xl overflow-hidden shadow-md group cursor-pointer border border-gray-100 mx-auto max-w-sm'
                  onClick={() => setLightboxIndex(idx)}>
                  <Image
                    src={src}
                    alt={`Bukti transaksi ${idx + 1}`}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                  {/* Overlay Icon */}
                  <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                    <div className='bg-white/20 backdrop-blur-md p-3 rounded-full'>
                      <ZoomIn className='text-white w-6 h-6' />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Navigation & Dots */}
        <div className='flex justify-center items-center gap-2 mt-6'>
          {/* Tombol nav mobile only */}
          <button
            onClick={prevSlide}
            className='sm:hidden p-2 text-gray-500'>
            <ChevronLeft />
          </button>

          <div className='flex gap-2'>
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className='sm:hidden p-2 text-gray-500'>
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm'
            onClick={() => setLightboxIndex(null)} // Close on background click
          >
            {/* Close Button */}
            <button
              className='absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50'
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
              aria-label='Close Lightbox'>
              <X size={32} />
            </button>

            {/* Main Image Container */}
            <div
              className='relative w-full max-w-lg h-full max-h-[90vh] flex items-center justify-center'
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking image area
            >
              <motion.div
                key={lightboxIndex} // Key change triggers animation
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className='relative w-full h-full'>
                {/* Placeholder check handled in image src logic or config */}
                <Image
                  src={testimonials[lightboxIndex]}
                  alt='Testimonial Fullscreen'
                  fill
                  className='object-contain'
                  sizes='100vw'
                  priority
                />
              </motion.div>
            </div>

            {/* Lightbox Navigation Buttons */}
            <button
              className='absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors'
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}>
              <ChevronLeft size={40} />
            </button>

            <button
              className='absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors'
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}>
              <ChevronRight size={40} />
            </button>

            {/* Counter */}
            <div className='absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/50 px-3 py-1 rounded-full'>
              {lightboxIndex + 1} / {testimonials.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { CONTENT } from '@/data/content';
import Section from '../ui/Section';

// Sensitivity geser (makin kecil makin sensitif)
const DRAG_BUFFER = 30;

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const testimonials = CONTENT.testimonials.images;

  // Menggunakan ref untuk menampung width container jika diperlukan (optional optimization)
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Responsive Items per View
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3); // Desktop: 3 gambar
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2); // Tablet: 2 gambar
      } else {
        setItemsPerView(1); // Mobile: 1 gambar
      }
    };

    handleResize(); // Set initial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Limit Max Index agar tidak slide ke area kosong
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  // Logic Index Update
  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  // Logic Drag / Swipe End
  const onDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Swipe ke Kiri (Next)
    if (offset < -DRAG_BUFFER || velocity < -500) {
      if (currentIndex < maxIndex) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
    // Swipe ke Kanan (Prev)
    else if (offset > DRAG_BUFFER || velocity > 500) {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
    // Jika swipe tidak cukup kuat, framer motion akan otomatis 'snap back' karena logic animate x dibawah
  };

  // Logic Navigasi Lightbox
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

      {/* --- SLIDER AREA --- */}
      <div
        className='relative max-w-6xl mx-auto px-0 sm:px-12'
        ref={containerRef}>
        {/* Tombol Navigasi Desktop (Hidden di Mobile biar bersih) */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className='absolute left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 bg-white text-primary p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all hidden sm:flex'
            aria-label='Previous Slide'>
            <ChevronLeft size={24} />
          </button>
        )}

        {currentIndex < maxIndex && (
          <button
            onClick={handleNext}
            className='absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 bg-white text-primary p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all hidden sm:flex'
            aria-label='Next Slide'>
            <ChevronRight size={24} />
          </button>
        )}

        {/* TRACK SLIDER */}
        <div className='overflow-hidden w-full touch-pan-y'>
          {' '}
          {/* touch-pan-y penting agar vertical scroll halaman tetap jalan */}
          <motion.div
            className='flex' // HAPUS gap-x disini untuk akurasi matematika
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={onDragEnd}
            // Rumus: Geser minus index * (100% / jumlah item per view)
            animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ width: '100%' }} // Container width 100%
          >
            {testimonials.map((src, idx) => (
              <div
                key={idx}
                className='shrink-0 p-3' // Gunakan PADDING sebagai pengganti gap
                style={{
                  // Lebar item dikunci presisi menggunakan flex-basis
                  flex: `0 0 ${100 / itemsPerView}%`,
                }}>
                <div
                  className='relative aspect-[9/16] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group mx-auto w-full max-w-[320px]'
                  onClick={() => setLightboxIndex(idx)}>
                  <Image
                    src={src}
                    alt={`Bukti transaksi ${idx + 1}`}
                    fill
                    className='object-cover pointer-events-none' // Mencegah image dragging native browser
                    sizes='(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw'
                  />

                  {/* Overlay Icon */}
                  <div className='absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                    <div className='bg-white/90 p-2 rounded-full shadow-sm'>
                      <ZoomIn className='text-primary w-5 h-5' />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* DOTS INDICATOR */}
        <div className='flex justify-center items-center gap-2 mt-6'>
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
      </div>

      {/* --- LIGHTBOX MODAL (Tetap Sama) --- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm'
            onClick={() => setLightboxIndex(null)}>
            <button
              className='absolute top-4 right-4 text-white/70 hover:text-white p-2'
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}>
              <X size={32} />
            </button>

            <div
              className='relative w-full max-w-lg h-full max-h-[85vh] flex items-center justify-center'
              onClick={(e) => e.stopPropagation()}>
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className='relative w-full h-full'>
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

            {/* Lightbox Nav */}
            <button
              className='absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-white/10 rounded-full'
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}>
              <ChevronLeft size={32} />
            </button>
            <button
              className='absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-white/10 rounded-full'
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}>
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

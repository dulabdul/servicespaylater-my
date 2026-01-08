/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { CONTENT } from '@/data/content';
import Section from '../ui/Section';

// Helper untuk menentukan kekuatan swipe
const DRAG_BUFFER = 50;

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const testimonials = CONTENT.testimonials.images;
  const x = useMotionValue(0);

  // Handle Responsive Items per View
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Batas Maksimal Slide
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  // Navigasi Button
  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Logic Swipe / Drag
  const onDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Swipe Kiri (Next)
    if (offset < -DRAG_BUFFER || velocity < -500) {
      if (currentIndex < maxIndex) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
    // Swipe Kanan (Prev)
    else if (offset > DRAG_BUFFER || velocity > 500) {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
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
        {/* Tombol Kiri (Hanya muncul jika bukan di awal) */}
        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className='absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-primary p-2 rounded-full shadow-lg hover:bg-white transition-all hidden sm:block'
            aria-label='Previous Slide'>
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Tombol Kanan (Hanya muncul jika belum habis) */}
        {currentIndex < maxIndex && (
          <button
            onClick={nextSlide}
            className='absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-primary p-2 rounded-full shadow-lg hover:bg-white transition-all hidden sm:block'
            aria-label='Next Slide'>
            <ChevronRight size={24} />
          </button>
        )}

        {/* Track Slider (Draggable) */}
        <div className='overflow-hidden rounded-xl cursor-grab active:cursor-grabbing'>
          <motion.div
            className='flex gap-6'
            drag='x' // Enable Swipe
            dragConstraints={{ left: 0, right: 0 }} // Snap back effect handled by animate
            dragElastic={0.2} // Memberikan efek karet saat ditarik
            onDragEnd={onDragEnd}
            animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }} // Logic posisi
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              width: `${(testimonials.length / itemsPerView) * 100}%`,
            }}>
            {testimonials.map((src, idx) => (
              <div
                key={idx}
                className='relative shrink-0 px-2' // Tambah padding dikit biar antar kartu ada jarak aman
                style={{ width: `${100 / testimonials.length}%` }}>
                <div
                  className='relative aspect-[9/16] bg-white rounded-xl overflow-hidden shadow-md group border border-gray-100 mx-auto max-w-sm'
                  onClick={() => setLightboxIndex(idx)} // Click tetap jalan walau ada drag
                >
                  <Image
                    src={src}
                    alt={`Bukti transaksi ${idx + 1}`}
                    fill
                    className='object-cover pointer-events-none' // Penting: pointer-events-none agar gambar tidak ke-drag browser
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

        {/* Dots Indicator */}
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

      {/* --- LIGHTBOX MODAL (Tidak Berubah) --- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm'
            onClick={() => setLightboxIndex(null)}>
            <button
              className='absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full z-50'
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}>
              <X size={32} />
            </button>

            <div
              className='relative w-full max-w-lg h-full max-h-[90vh] flex items-center justify-center'
              onClick={(e) => e.stopPropagation()}>
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
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

            <button
              className='absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3'
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}>
              <ChevronLeft size={40} />
            </button>

            <button
              className='absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3'
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}>
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

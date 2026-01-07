import Image from 'next/image';
import { CONTENT, SITE_CONFIG } from '@/data/content';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section
      id='home'
      className='relative w-full min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Image with Overlay */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/hero.jpg' // Ganti dengan gambar real
          alt='Layanan Cashout Malaysia Terpercaya'
          fill
          priority
          className='object-cover'
          sizes='100vw'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/40' />
      </div>

      {/* Content */}
      <div className='container-custom relative z-10 grid md:grid-cols-2 gap-12 items-center pt-20'>
        <div className='text-white space-y-6'>
          <span className='inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/50 text-primary-50 text-xs font-bold tracking-wider uppercase mb-2'>
            Malaysia #1 Trusted Service
          </span>
          <h1 className='text-4xl md:text-6xl font-extrabold leading-tight'>
            {CONTENT.hero.title} <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400'>
              {CONTENT.hero.subtitle}
            </span>
          </h1>
          <p className='text-lg md:text-xl text-gray-200 max-w-lg leading-relaxed'>
            {CONTENT.hero.description}
          </p>
          <div className='flex flex-col sm:flex-row gap-4 pt-4'>
            <Button
              href={SITE_CONFIG.whatsappLink}
              ariaLabel='Whatsapp untuk Cashout'>
              {CONTENT.hero.cta}
            </Button>
            <Button
              href='#services'
              variant='outline'
              className='border-white text-white hover:bg-white hover:text-primary'>
              Lihat Servis
            </Button>
          </div>
        </div>

        {/* Optional: Hero Visual/Card on Right (Hidden on small mobile) */}
        <div className='hidden md:block relative animate-fade-in-up'>
          <div className='bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-2xl'>
            <div className='flex items-center gap-4 mb-4'>
              <div className='w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold'>
                RM
              </div>
              <div>
                <p className='text-white text-sm'>Dana Dicairkan</p>
                <p className='text-white font-bold text-xl'>RM 1,500.00</p>
              </div>
            </div>
            <p className='text-green-300 text-sm'>
              ✅ Transaksi Berjaya - 2 minit lalu
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

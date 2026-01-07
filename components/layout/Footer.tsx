import Link from 'next/link';
import { SITE_CONFIG } from '@/data/content';
import { Wallet } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 text-gray-300 py-12 border-t border-gray-800'>
      <div className='container-custom'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          <div className='flex items-center gap-2'>
            <Wallet className='text-primary' />
            <span className='font-bold text-white text-lg'>
              {SITE_CONFIG.name}
            </span>
          </div>

          <div className='flex gap-6 text-sm font-medium'>
            <Link
              href='#home'
              className='hover:text-primary transition-colors'>
              Utama
            </Link>
            <Link
              href='#services'
              className='hover:text-primary transition-colors'>
              Servis
            </Link>
            <Link
              href='#contact'
              className='hover:text-primary transition-colors'>
              Hubungi
            </Link>
          </div>

          <div className='text-xs text-gray-500'>
            &copy; {year} {SITE_CONFIG.name}. Hak Cipta Terpelihara.
          </div>
        </div>
      </div>
    </footer>
  );
}

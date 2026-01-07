'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Wallet } from 'lucide-react'; // Gunakan Wallet icon sebagai logo placeholder
import { CONTENT, SITE_CONFIG } from '@/data/content';
import Button from '../ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: CONTENT.nav.home, href: '#home' },
    { name: CONTENT.nav.about, href: '#about' },
    { name: CONTENT.nav.services, href: '#services' },
    { name: CONTENT.nav.testimonials, href: '#testimonials' },
    { name: CONTENT.nav.contact, href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}>
      <div className='container-custom flex justify-between items-center'>
        {/* Logo */}
        <Link
          href='/'
          className='flex items-center gap-2 group'>
          <div className='bg-primary p-2 rounded-lg text-white'>
            <Wallet size={24} />
          </div>
          <span
            className={`font-bold text-xl tracking-tight ${
              scrolled ? 'text-gray-900' : 'text-gray-900 md:text-white'
            }`}>
            ServicesPayLater
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-primary transition-colors ${
                scrolled ? 'text-gray-600' : 'text-white/90 hover:text-white'
              }`}>
              {link.name}
            </Link>
          ))}
          <Button
            href={SITE_CONFIG.whatsappLink}
            variant={scrolled ? 'primary' : 'white'}
            className='py-2 px-5 text-sm'>
            Cashout Sekarang
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className='md:hidden p-2 text-gray-600'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle Menu'>
          {isOpen ? (
            <X />
          ) : (
            <Menu className={scrolled ? 'text-gray-900' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-6 px-6 flex flex-col gap-4 border-t'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-gray-700 font-medium py-2 border-b border-gray-100'
              onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>
          ))}
          <Button
            href={SITE_CONFIG.whatsappLink}
            className='w-full mt-2'>
            Cashout Sekarang
          </Button>
        </div>
      )}
    </nav>
  );
}

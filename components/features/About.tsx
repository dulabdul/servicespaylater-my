import { CheckCircle } from 'lucide-react';
import { CONTENT, SITE_CONFIG } from '@/data/content';
import Section from '../ui/Section';
import Button from '../ui/Button';
import Image from 'next/image';

export default function About() {
  return (
    <Section id='about'>
      <div className='grid md:grid-cols-2 gap-12 items-center'>
        <div className='order-2 md:order-1 relative rounded-2xl overflow-hidden shadow-2xl'>
          {/* Placeholder for About Image */}
          <Image
            src='/images/about.jpg' // Ganti dengan gambar real
            alt='Malaysian Shopping'
            width={800}
            height={800}
            priority
            className='object-cover'
          />
        </div>

        <div className='order-1 md:order-2 space-y-6'>
          <h2 className='text-sm font-bold text-primary uppercase tracking-wider'>
            {CONTENT.about.title}
          </h2>
          <h3 className='text-3xl md:text-4xl font-bold text-gray-900'>
            {CONTENT.about.heading}
          </h3>
          <p className='text-gray-600 leading-relaxed text-lg'>
            {CONTENT.about.description}
          </p>

          <ul className='space-y-4 mt-4'>
            {CONTENT.about.features.map((feature, idx) => (
              <li
                key={idx}
                className='flex items-center gap-3'>
                <CheckCircle className='text-primary w-6 h-6 shrink-0' />
                <span className='text-gray-700 font-medium'>{feature}</span>
              </li>
            ))}
          </ul>

          <div className='pt-4'>
            <Button href={SITE_CONFIG.whatsappLink}>{CONTENT.about.cta}</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

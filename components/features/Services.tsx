import { CONTENT, SITE_CONFIG } from '@/data/content';
import Section from '../ui/Section';
import { CreditCard, Zap, Smartphone } from 'lucide-react';
import Button from '../ui/Button';

const iconMap: Record<string, React.ReactNode> = {
  shopee: <Smartphone className='w-10 h-10 text-orange-500' />,
  boost: <Zap className='w-10 h-10 text-red-500' />,
  grab: <CreditCard className='w-10 h-10 text-green-500' />,
};

export default function Services() {
  return (
    <Section
      id='services'
      bgColor='light'>
      <div className='text-center max-w-2xl mx-auto mb-12'>
        <h2 className='text-3xl md:text-4xl font-bold mb-4'>
          {CONTENT.services.title}
        </h2>
        <p className='text-gray-600'>{CONTENT.services.subtitle}</p>
      </div>

      <div className='grid md:grid-cols-3 gap-8'>
        {CONTENT.services.list.map((service, idx) => (
          <div
            key={idx}
            className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col items-center text-center'>
            <div className='bg-gray-50 p-4 rounded-full mb-6'>
              {iconMap[service.icon]}
            </div>
            <h3 className='text-xl font-bold mb-3 text-gray-900'>
              {service.title}
            </h3>
            <p className='text-gray-600 mb-6 flex-grow'>{service.desc}</p>
            <Button
              href={SITE_CONFIG.whatsappLink}
              variant='outline'
              className='w-full'>
              Cairkan {service.title}
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}

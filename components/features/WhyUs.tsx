import { CONTENT } from '@/data/content';
import Section from '../ui/Section';
import {
  ShieldCheck,
  Clock,
  HeartHandshake,
  Lock,
  Phone,
  HelpCircle,
} from 'lucide-react';

const icons = [Clock, ShieldCheck, HelpCircle, HeartHandshake, Lock, Phone];

export default function WhyUs() {
  return (
    <Section id='why-us'>
      <div className='text-center max-w-3xl mx-auto mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold mb-4'>
          {CONTENT.whyUs.title}
        </h2>
        <p className='text-gray-600 text-lg'>{CONTENT.whyUs.subtitle}</p>
      </div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
        {CONTENT.whyUs.items.map((item, idx) => {
          const Icon = icons[idx] || ShieldCheck;
          return (
            <div
              key={idx}
              className='flex gap-4 items-start'>
              <div className='bg-primary/10 p-3 rounded-lg shrink-0'>
                <Icon className='w-6 h-6 text-primary' />
              </div>
              <div>
                <h4 className='font-bold text-lg mb-2'>{item.title}</h4>
                <p className='text-gray-600 leading-relaxed'>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

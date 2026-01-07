import { CONTENT } from '@/data/content';

export default function Stats() {
  return (
    <div className='py-10 bg-white shadow-lg relative z-20 -mt-10 mx-4 md:mx-auto md:max-w-5xl rounded-2xl border border-gray-100'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100'>
        {CONTENT.stats.map((stat, idx) => (
          <div
            key={idx}
            className='text-center px-4'>
            <p className='text-3xl md:text-4xl font-bold text-primary mb-1'>
              {stat.value}
            </p>
            <p className='text-gray-500 font-medium'>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

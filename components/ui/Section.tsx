import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bgColor?: 'white' | 'light';
}

export default function Section({
  id,
  className = '',
  children,
  bgColor = 'white',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${
        bgColor === 'light' ? 'bg-secondary' : 'bg-white'
      } ${className}`}>
      <div className='container-custom'>{children}</div>
    </section>
  );
}

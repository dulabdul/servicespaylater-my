import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'white';
  className?: string;
  ariaLabel?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  ariaLabel,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl cursor-pointer';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-dark border border-transparent',
    outline:
      'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
    white: 'bg-white text-primary hover:bg-gray-100 border border-transparent',
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        aria-label={
          ariaLabel || typeof children === 'string'
            ? (children as string)
            : 'Button'
        }
        target={href.startsWith('http') ? '_blank' : '_self'}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedClasses}
      aria-label={ariaLabel}>
      {children}
    </button>
  );
}

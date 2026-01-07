import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google'; // Modern Font
import './globals.css';
import JsonLd from '@/components/layout/JsonLd';
import { SITE_CONFIG } from '@/data/content';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Cashout SPayLater, Boost & Grab Malaysia | ServicesPayLater',
    template: '%s | ServicesPayLater',
  },
  description: SITE_CONFIG.description,
  keywords: [
    'cashout spaylater',
    'tukar paylater jadi tunai',
    'boost payflex cashout',
    'grab paylater cashout',
    'malaysia',
  ],
  authors: [{ name: 'ServicesPayLater Team' }],
  openGraph: {
    title: 'Cashout PayLater Pantas & Selamat Malaysia',
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'ms_MY',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cashout PayLater Malaysia',
    description: SITE_CONFIG.description,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='ms'
      className='scroll-smooth'>
      <head>
        <JsonLd />
      </head>
      <body className={`${fontSans.className} antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}

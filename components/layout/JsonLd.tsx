import { SITE_CONFIG } from '@/data/content';

export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/icon.png`,
    description: 'Perkhidmatan pencairan PayLater terpantas di Malaysia.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MY',
    },
    priceRange: '$$',
    openingHours: 'Mo-Su 00:00-24:00',
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

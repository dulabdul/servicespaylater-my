import { ImageResponse } from 'next/og';
import { CONTENT, SITE_CONFIG } from '@/data/content';

// Konfigurasi Route Segment
export const runtime = 'edge';

// Metadata Image
export const alt = SITE_CONFIG.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // Kita ambil font Plus Jakarta Sans agar sesuai branding
  // Menggunakan fetch ke Google Fonts untuk mendapatkan buffer font bold
  const fontBold = await fetch(
    new URL(
      'https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4Ko20yGi.ttf',
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  const fontRegular = await fetch(
    new URL(
      'https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4Ko20yGo.ttf',
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // Container Utama
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0fdfa', // Teal-50
          backgroundImage: 'linear-gradient(to bottom right, #ccfbf1, #ffffff)',
          position: 'relative',
        }}>
        {/* Dekorasi Background Circle 1 */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            backgroundColor: 'rgba(13, 148, 136, 0.1)', // Primary color low opacity
          }}
        />
        {/* Dekorasi Background Circle 2 */}
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            left: '-50px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            backgroundColor: 'rgba(20, 184, 166, 0.1)',
          }}
        />

        {/* Logo / Brand Name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            padding: '12px 24px',
            backgroundColor: '#0d9488', // Primary Teal
            borderRadius: '50px',
            boxShadow: '0 4px 20px rgba(13, 148, 136, 0.25)',
          }}>
          <span
            style={{
              color: 'white',
              fontSize: 24,
              fontFamily: '"Plus Jakarta Sans"',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}>
            {SITE_CONFIG.name}
          </span>
        </div>

        {/* Main Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '900px',
          }}>
          <div
            style={{
              fontSize: 72,
              fontFamily: '"Plus Jakarta Sans"',
              fontWeight: 700,
              color: '#0f172a', // Slate-900
              lineHeight: 1.1,
              marginBottom: '20px',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}>
            {CONTENT.hero.title}
          </div>

          <div
            style={{
              fontSize: 36,
              fontFamily: '"Plus Jakarta Sans"',
              fontWeight: 700,
              color: '#0d9488', // Primary Teal
              marginBottom: '24px',
              textTransform: 'uppercase',
            }}>
            {CONTENT.hero.subtitle}
          </div>

          <div
            style={{
              fontSize: 24,
              fontFamily: '"Plus Jakarta Sans"',
              fontWeight: 400,
              color: '#475569', // Slate-600
              textAlign: 'center',
              lineHeight: 1.5,
              maxWidth: '800px',
            }}>
            Pencairan pantas untuk ShopeePay Later, Boost PayFlex & Grab
            PayLater. Selamat, Kadar Terbaik & Dipercayai di Malaysia.
          </div>
        </div>

        {/* Footer Badge / URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
          <div
            style={{
              fontSize: 20,
              fontFamily: '"Plus Jakarta Sans"',
              fontWeight: 700,
              color: '#0f766e',
            }}>
            {SITE_CONFIG.url.replace('https://', '')}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Plus Jakarta Sans',
          data: fontBold,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Plus Jakarta Sans',
          data: fontRegular,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}

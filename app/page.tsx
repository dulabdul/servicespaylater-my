import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/features/Hero';
import Stats from '@/components/features/Stats';
import About from '@/components/features/About';
import Services from '@/components/features/Services';
import WhyUs from '@/components/features/WhyUs';
import Testimonials from '@/components/features/Testimonials';
import Contact from '@/components/features/Contact';

import ScrollToTop from '@/components/common/ScrollToTop';
import FloatingWhatsApp from '@/components/common/FloatingWhatsapp';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col'>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </main>
  );
}

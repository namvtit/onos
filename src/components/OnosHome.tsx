'use client';

import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { NetworkSlider } from './sections/NetworkSlider';
import { WhyChoose } from './sections/WhyChoose';
import { GalleryTestimonials } from './sections/GalleryTestimonials';
import { Ecosystem } from './sections/Ecosystem';
import { FAQSection } from './sections/FAQSection';
import { ContactSection } from './sections/ContactSection';
import { MotionControl, SiteProvider, useSite } from './interactions/SiteContext';
import { SiteRuntime } from './SiteRuntime';
import type { Language } from '@/data/translations';

function PageContent() {
  const { t } = useSite();

  return (
    <>
      <a className="onos-skip-link" href="#main">
        {t('Skip to content')}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <NetworkSlider />
        <WhyChoose />
        <GalleryTestimonials />
        <Ecosystem />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <MotionControl />
      <SiteRuntime pageId="68d1288562216d12f8801f19" />
    </>
  );
}

export default function OnosHome({ initialLanguage = 'en' }: { initialLanguage?: Language }) {
  return (
    <SiteProvider initialLanguage={initialLanguage}>
      <PageContent />
    </SiteProvider>
  );
}

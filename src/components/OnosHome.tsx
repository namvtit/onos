'use client';
import { useState } from 'react';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { Hero, About } from './sections/Introduction';
import { Capabilities, ProductionFinder } from './sections/Capabilities';
import { Network, ManufacturingProcess } from './sections/NetworkProcess';
import { Ecosystem, FAQ, Contact } from './sections/ContactEcosystem';
import { ProductionGallery } from './interactions/ProductionGallery';
import { MotionControl, PageMotion, SiteProvider, useSite } from './interactions/SiteContext';
import type { MethodId } from '@/data/onos-content';
import type { Language } from '@/data/translations';
function PageContent() {
  const [method, setMethod] = useState<MethodId>('dtg'); const { t } = useSite();
  return <><a className="onos-skip-link" href="#main">{t('Skip to content')}</a><Navbar /><main id="main" tabIndex={-1}><Hero /><About /><Capabilities choose={setMethod} /><ProductionFinder method={method} choose={setMethod} /><Network /><ManufacturingProcess /><ProductionGallery /><Ecosystem /><FAQ /><Contact /></main><Footer /><MotionControl /><PageMotion /></>;
}
export default function OnosHome({ initialLanguage = 'en' }: { initialLanguage?: Language }) { return <SiteProvider initialLanguage={initialLanguage}><PageContent /></SiteProvider>; }

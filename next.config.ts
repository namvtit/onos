import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  images: { qualities: [85, 90] },
  async redirects() {
    const sections: Record<string, string> = {
      '/index': '/', '/home-2': '/', '/about': '/#about', '/services': '/#capabilities',
      '/products': '/#production-fit', '/contact': '/#contact', '/faqs': '/#faq',
      '/en': '/', '/vi': '/?lang=vi',
    };
    return Object.entries(sections).flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `${source}.html`, destination, permanent: true },
    ]);
  },
};
export default config;

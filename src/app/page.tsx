import OnosHome from '@/components/OnosHome';
export default async function HomePage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  return <OnosHome initialLanguage={lang === 'vi' ? 'vi' : 'en'} />;
}

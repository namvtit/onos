// Verified business facts, choices, facilities, media and copy from https://onosglobal.pages.dev/ (2026-10-29).
import type { Language } from './translations';

export const contact = {
  email: 'onospod.com@gmail.com',
  phone: '+84 986 385 112',
  telephone: '+84986385112',
  address: '3rd floor, 705 Lac Long Quan, Tay Ho, Hanoi, Vietnam',
  hours: 'Mon–Fri: 7:30–17:30 · Sat: 8:00–17:00 (Vietnam time)',
};

export interface ProductionMethod {
  id: 'dtg' | 'embroidery' | 'sublimation' | 'laser';
  short: string;
  title: string;
  choice: string;
  tag: string;
  model: string;
  description: string;
  applications: string;
  equipment: string;
  image: string;
  finderImage: string;
  material: string;
  preparation: string;
  features: string[];
}

export const methods: readonly ProductionMethod[] = [
  {
    id: 'dtg',
    short: 'DTG printing',
    title: 'DTG printing',
    choice: 'Detailed artwork on cotton',
    tag: 'T-shirts · Apparel',
    model: 'Machine: SL-DTG-X2S',
    description: 'Direct-to-garment printing for photographs, gradients and detailed artwork on cotton and cotton-rich apparel.',
    applications: 'T-shirts · Apparel',
    equipment: 'Machine: SL-DTG-X2S',
    image: 'dtg-machine-detail',
    finderImage: 'production-floor',
    material: 'Cotton and cotton-rich apparel.',
    preparation: 'Confirm fabric composition, garment colour, artwork size and placement. Approve colour on a physical sample.',
    features: [
      'Machine: SL-DTG-X2S',
      'Cotton and cotton-rich apparel',
      'Photographs, gradients & detailed artwork',
      'Physical sample colour approval',
    ],
  },
  {
    id: 'embroidery',
    short: 'Embroidery',
    title: 'Computerised embroidery',
    choice: 'Embroidered logos on apparel and caps',
    tag: 'Caps · Polos · Bags',
    model: 'Equipment: multi-head embroidery',
    description: 'Digitised designs and multi-head embroidery bring texture and a distinctive finish to your brand identity.',
    applications: 'Caps · Polos · Bags',
    equipment: 'Equipment: multi-head embroidery',
    image: 'equipment-embroidery',
    finderImage: 'embroidery',
    material: 'Caps, polos and bags suitable for embroidery.',
    preparation: 'Share the logo size and placement. Small lettering and fine details need review when digitising the stitch file.',
    features: [
      'Equipment: multi-head embroidery',
      'Caps, polos and bags',
      'Digitised stitch-file review',
      'Distinctive texture & premium finish',
    ],
  },
  {
    id: 'sublimation',
    short: 'Sublimation',
    title: 'Sublimation printing',
    choice: 'All-over designs on polyester',
    tag: 'All-over print · Sportswear',
    model: 'Epson SC-F11030 · heat press PD-1800D-800',
    description: 'All-over printing bonds colour into polyester fibres for expressive, full-coverage apparel and sportswear.',
    applications: 'All-over print · Sportswear',
    equipment: 'Epson SC-F11030 · heat press PD-1800D-800',
    image: 'press-machines-row',
    finderImage: 'press-machines-row',
    material: 'Polyester apparel and sportswear suitable for sublimation.',
    preparation: 'Confirm fabric composition, base colour, pattern layout and seams. Test colour on the intended material.',
    features: [
      'Epson SC-F11030 · PD-1800D-800 heat press',
      'Polyester apparel and sportswear',
      'All-over printing bonded into fibres',
      'Material colour testing before run',
    ],
  },
  {
    id: 'laser',
    short: 'Laser cutting',
    title: 'Laser cutting & engraving',
    choice: 'Cut and engraved gifts',
    tag: 'Decor · Personalised gifts',
    model: 'Laser FW-1822 · auto cutter LP-2219',
    description: 'Precision cutting and engraving for personalised gifts and decor in wood, acrylic, leather and fabric.',
    applications: 'Decor · Personalised gifts',
    equipment: 'Laser FW-1822 · auto cutter LP-2219',
    image: 'laser-cut-gifts',
    finderImage: 'laser-cut-gifts',
    material: 'Wood, acrylic, leather or fabric confirmed as suitable by the team.',
    preparation: 'Provide material type, thickness and cutting paths. Confirm the finish on a sample before approving the run.',
    features: [
      'Laser FW-1822 · LP-2219 auto cutter',
      'Wood, acrylic, leather & fabric',
      'Custom cutting paths & vector specs',
      'Sample finish approval before run',
    ],
  },
] as const;

export type MethodId = typeof methods[number]['id'];

export const artwork = 'Send vector artwork (AI, EPS, SVG or PDF), or a transparent PNG at 300 DPI at the final print size.';

export interface Facility {
  code: string;
  name: string;
  role: string;
  location: string;
  description: string;
  primarySlide: number;
  slideIndices: number[];
  qcProcess?: string;
  operator?: string;
}

export const factories: readonly Facility[] = [
  {
    code: 'VN—01',
    name: 'Thai Nguyen',
    role: 'High-volume production',
    location: 'Dai Tu · Thai Nguyen · Vietnam',
    description: 'DTG, sublimation, embroidery and laser production, supported by a five-step quality control process.',
    primarySlide: 0,
    slideIndices: [0, 3, 4],
    qcProcess: 'Five-step quality control process',
  },
  {
    code: 'VN—02',
    name: 'Me Linh',
    role: 'Sampling & coordination',
    location: 'Me Linh · Hanoi · Vietnam',
    description: 'Sampling, production, final inspection and packing, with direct links to international carriers.',
    primarySlide: 1,
    slideIndices: [1],
  },
  {
    code: 'US—01',
    name: 'California',
    role: 'US print & fulfillment',
    location: 'California · United States',
    description: 'DTG and DTF production for the North American market, operated by ONOS American Ventures Corp.',
    primarySlide: 2,
    slideIndices: [2],
    operator: 'ONOS American Ventures Corp.',
  },
] as const;

export interface FactorySlide {
  id: number;
  image: string;
  caption: string;
  location: string;
  facilityCode: string;
  facilityName: string;
  alt: string;
  equipmentNote: string;
}

export const factoryPhotos: readonly FactorySlide[] = [
  {
    id: 0,
    image: 'facility-thai-nguyen',
    caption: 'A skilled team at work',
    location: 'THAI NGUYEN / VIETNAM',
    facilityCode: 'VN—01',
    facilityName: 'Thai Nguyen',
    alt: 'Sewing floor at the Thai Nguyen plant',
    equipmentNote: 'Sewing floor and garment assembly lines',
  },
  {
    id: 1,
    image: 'facility-me-linh',
    caption: 'Automated fabric cutting',
    location: 'ME LINH / HANOI',
    facilityCode: 'VN—02',
    facilityName: 'Me Linh',
    alt: 'Automated fabric cutting at the Me Linh plant',
    equipmentNote: 'Automated fabric cutting & dedicated sampling line',
  },
  {
    id: 2,
    image: 'facility-california',
    caption: 'Our California team at work',
    location: 'CALIFORNIA / UNITED STATES',
    facilityCode: 'US—01',
    facilityName: 'California',
    alt: 'Onos team discussing operations in California',
    equipmentNote: 'US print & fulfillment · ONOS American Ventures Corp.',
  },
  {
    id: 3,
    image: 'production-floor',
    caption: 'Automated Epson conveyor line',
    location: 'THAI NGUYEN / VIETNAM',
    facilityCode: 'VN—01',
    facilityName: 'Thai Nguyen',
    alt: 'Epson print production with an automated conveyor at Onos',
    equipmentNote: 'Epson print production with automated conveyor',
  },
  {
    id: 4,
    image: 'embroidery-hero',
    caption: 'Craft, at an industrial scale.',
    location: 'THAI NGUYEN / VIETNAM',
    facilityCode: 'VN—01',
    facilityName: 'Thai Nguyen',
    alt: 'Multi-head embroidery machines producing garments at Onos',
    equipmentNote: 'Multi-head industrial embroidery machines',
  },
] as const;

export const processSteps = [
  {
    num: '01',
    title: 'Share the idea',
    description: 'Tell us your product, expected volume and destination. We recommend the material and production method.',
  },
  {
    num: '02',
    title: 'Get it production-ready',
    description: 'We review your artwork, colour and placement. For a bulk run, agree the sample before moving ahead.',
  },
  {
    num: '03',
    title: 'Make. Check. Finish.',
    description: 'The production team prints or stitches your design, inspects the output and prepares the finished product.',
  },
  {
    num: '04',
    title: 'On its way',
    description: 'Products are packed and handed to shipping partners, with tracking through the fulfillment process.',
  },
] as const;

export const galleryPhotos = [
  {
    image: 'partner-meeting',
    mono: '01',
    caption: 'Better, together.',
    alt: 'The Onos team at a working meeting',
  },
  {
    image: 'finishing-table',
    mono: '02',
    caption: 'The finishing touches.',
    alt: 'Printed garments organised at the finishing table',
  },
  {
    image: 'laser-cut-gifts',
    mono: '03',
    caption: 'Ideas you can hold.',
    alt: 'Personalised laser-cut wooden decor and gift products',
  },
  {
    image: 'warehouse-inventory',
    mono: '04',
    caption: 'Ready for the next order.',
    alt: 'Organised garment inventory at the Onos warehouse',
  },
] as const;

export interface EcosystemEntity {
  symbol: string;
  name: string;
  audience: string;
  description: string;
  url: string;
  domain: string;
}

export const ecosystem: readonly EcosystemEntity[] = [
  {
    symbol: '◒',
    name: 'Onos Global',
    audience: 'FOR INTERNATIONAL BRANDS',
    description: 'Manufacturing and fulfillment across borders.',
    url: 'https://onosglobal.pages.dev/',
    domain: 'onosglobal.pages.dev',
  },
  {
    symbol: '✳',
    name: 'onospod',
    audience: 'FOR VIETNAMESE SELLERS',
    description: 'The production partner for your POD business.',
    url: 'https://onospod.pages.dev/',
    domain: 'onospod.pages.dev',
  },
  {
    symbol: '⊕',
    name: 'Onos Group',
    audience: 'THE PEOPLE BEHIND IT ALL',
    description: 'Our company, our people and the next chapter.',
    url: 'https://onosgroup.pages.dev/',
    domain: 'onosgroup.pages.dev',
  },
] as const;

export const faqs = [
  {
    question: 'Can I start with a small order?',
    answer: 'Yes. DTG and sublimation orders can start from a single unit. Custom blanks and made-to-measure uniforms have minimum quantities agreed for each project.',
  },
  {
    question: 'What artwork files do you need?',
    answer: 'Send vector artwork (AI, EPS, SVG or PDF), or a transparent PNG at 300 DPI at the final print size. Our team checks the file before it moves into production.',
  },
  {
    question: 'Can we approve a sample first?',
    answer: 'Yes. Our Me Linh plant has a dedicated sampling line. For larger orders, we recommend agreeing a sample before the full production run.',
  },
  {
    question: 'How do we confirm pricing and lead time?',
    answer: 'Share the product, design, expected quantity and shipping destination. We will review the production requirements and discuss pricing, timing and shipping with you before you proceed.',
  },
] as const;

export const media: Record<string, { width: number; height: number; alt: string }> = {
  'embroidery-hero': { width: 1440, height: 1080, alt: 'Multi-head embroidery machines producing garments at Onos' },
  'dtg-machine-detail': { width: 1100, height: 644, alt: 'DTG printing machine at Onos' },
  'equipment-embroidery': { width: 1024, height: 768, alt: 'An Onos operator checking embroidery on garments' },
  'press-machines-row': { width: 1200, height: 1600, alt: 'Heat press equipment on the Onos production floor' },
  'laser-cut-gifts': { width: 1600, height: 1200, alt: 'Personalised laser-cut wooden decor and gift products' },
  'production-floor': { width: 2688, height: 1520, alt: 'Epson print production with an automated conveyor at Onos' },
  embroidery: { width: 2568, height: 1926, alt: 'Embroidery equipment at Onos' },
  'facility-thai-nguyen': { width: 1600, height: 900, alt: 'Sewing floor at the Thai Nguyen plant' },
  'facility-me-linh': { width: 1600, height: 900, alt: 'Automated fabric cutting at the Me Linh plant' },
  'facility-california': { width: 1400, height: 788, alt: 'Onos team discussing operations in California' },
  'sample-development': { width: 1200, height: 900, alt: 'The Onos team reviewing product samples and materials' },
  'partner-meeting': { width: 1600, height: 1200, alt: 'The Onos team at a working meeting' },
  'finishing-table': { width: 1600, height: 1200, alt: 'Printed garments organised at the finishing table' },
  'warehouse-inventory': { width: 1600, height: 1200, alt: 'Organised garment inventory at the Onos warehouse' },
};

export function inquiryHref(language: Language, method?: string) {
  const en = language === 'en';
  const subject = en
    ? (method ? `Production enquiry | Onos Global` : `Production enquiry — Onos Global`)
    : (method ? `Yêu cầu sản xuất | Onos Global` : `Yêu cầu sản xuất — Onos Global`);
  const body = method
    ? en
      ? `Hello Onos team,\n\nProduction method: ${method}\nProduct / material:\nExpected quantity:\nDestination country / postcode:\nArtwork link / print size:\nTarget date:\n\nPlease advise on sampling, pricing and production lead time.`
      : `Chào đội ngũ Onos,\n\nCông nghệ: ${method}\nSản phẩm / chất liệu:\nSố lượng dự kiến:\nQuốc gia / mã bưu chính nhận hàng:\nLink thiết kế / kích thước in:\nThời gian mong muốn:\n\nNhờ Onos tư vấn mẫu, báo giá và tiến độ sản xuất.`
    : en
    ? 'Hello Onos team,\n\nProduct:\nExpected quantity:\nDestination:\nTarget date:\nArtwork link:\n'
    : 'Chào đội ngũ Onos,\n\nSản phẩm:\nSố lượng dự kiến:\nĐịa chỉ nhận:\nThời gian dự kiến:\nLink thiết kế:\n';
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

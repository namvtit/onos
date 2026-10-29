import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const assetsJson = JSON.parse(fs.readFileSync('audit/content-mapping/assets.json', 'utf8'));
const authenticMedia = assetsJson.filter(item => item.source);

// Map of components where each asset is used
const usageMap = {
  '/assets/onos-dtg-machine-detail.webp': ['src/components/sections/Services.tsx', 'src/components/sections/IndustryFinder.tsx'],
  '/assets/onos-equipment-embroidery.webp': ['src/components/sections/Services.tsx', 'src/components/sections/IndustryFinder.tsx'],
  '/assets/onos-press-machines-row.webp': ['src/components/sections/Services.tsx', 'src/components/sections/IndustryFinder.tsx'],
  '/assets/onos-laser-cut-gifts.webp': ['src/components/sections/Services.tsx', 'src/components/sections/IndustryFinder.tsx', 'src/components/sections/GalleryTestimonials.tsx'],
  '/assets/onos-embroidery-hero.webp': ['src/components/sections/Hero.tsx', 'src/components/sections/Services.tsx'],
  '/assets/onos-embroidery-hero-640.webp': ['src/components/sections/Hero.tsx'],
  '/assets/onos-facility-thai-nguyen.webp': ['src/components/sections/NetworkSlider.tsx'],
  '/assets/onos-facility-me-linh.webp': ['src/components/sections/NetworkSlider.tsx'],
  '/assets/onos-facility-california.webp': ['src/components/sections/NetworkSlider.tsx'],
  '/assets/onos-production-floor.webp': ['src/components/sections/NetworkSlider.tsx'],
  '/assets/onos-sample-development.webp': ['src/components/sections/WhyChoose.tsx'],
  '/assets/onos-partner-meeting.webp': ['src/components/sections/GalleryTestimonials.tsx'],
  '/assets/onos-finishing-table.webp': ['src/components/sections/GalleryTestimonials.tsx'],
  '/assets/onos-warehouse-inventory.webp': ['src/components/sections/GalleryTestimonials.tsx'],
  '/assets/onos-embroidery.webp': ['src/components/sections/Hero.tsx', 'src/components/sections/Services.tsx']
};

// Bilingual Alt text map
const altMap = {
  '/assets/onos-dtg-machine-detail.webp': {
    en: 'DTG printing machine at Onos',
    vi: 'Máy in trực tiếp trên vải DTG tại xưởng Onos'
  },
  '/assets/onos-equipment-embroidery.webp': {
    en: 'An Onos operator checking embroidery on garments',
    vi: 'Kỹ thuật viên Onos kiểm tra đường thêu trên trang phục'
  },
  '/assets/onos-press-machines-row.webp': {
    en: 'Heat press equipment at Onos',
    vi: 'Hệ thống máy ép nhiệt công nghiệp tại xưởng Onos'
  },
  '/assets/onos-laser-cut-gifts.webp': {
    en: 'Personalised laser-cut wooden decor and gift products',
    vi: 'Sản phẩm trang trí gỗ và quà tặng cắt khắc laser theo yêu cầu'
  },
  '/assets/onos-embroidery-hero.webp': {
    en: 'Multi-head embroidery machines producing garments at Onos',
    vi: 'Dàn máy thêu vi tính nhiều đầu vận hành tại xưởng Onos'
  },
  '/assets/onos-embroidery-hero-640.webp': {
    en: 'Multi-head embroidery machines producing garments at Onos (mobile optimized)',
    vi: 'Dàn máy thêu vi tính nhiều đầu vận hành tại xưởng Onos (bản tối ưu di động)'
  },
  '/assets/onos-facility-thai-nguyen.webp': {
    en: 'Sewing floor at the Thai Nguyen plant',
    vi: 'Xưởng may và in ấn quy mô lớn tại Đại Từ, Thái Nguyên'
  },
  '/assets/onos-facility-me-linh.webp': {
    en: 'Automated fabric cutting at the Me Linh plant',
    vi: 'Khu vực cắt vải tự động và đóng gói xuất khẩu tại Mê Linh, Hà Nội'
  },
  '/assets/onos-facility-california.webp': {
    en: 'Onos team discussing operations in California',
    vi: 'Đội ngũ điều hành sản xuất và hoàn tất đơn hàng tại California, Hoa Kỳ'
  },
  '/assets/onos-production-floor.webp': {
    en: 'Epson print production with an automated conveyor at Onos',
    vi: 'Dây chuyền in Epson công nghiệp cùng băng chuyền sấy tự động tại Thái Nguyên'
  },
  '/assets/onos-sample-development.webp': {
    en: 'The Onos team reviewing product samples and materials',
    vi: 'Đội ngũ Onos thẩm định mẫu và chất liệu cùng khách hàng'
  },
  '/assets/onos-partner-meeting.webp': {
    en: 'Onos team collaborating with international partners',
    vi: 'Đội ngũ chuyên gia kỹ thuật Onos trao đổi quy trình sản xuất'
  },
  '/assets/onos-finishing-table.webp': {
    en: 'Printed garments organised at the finishing table',
    vi: 'Khu vực kiểm tra đường may, gấp xếp và đóng gói sản phẩm hoàn thiện'
  },
  '/assets/onos-warehouse-inventory.webp': {
    en: 'Organised garment inventory at the Onos warehouse',
    vi: 'Kho lưu trữ phôi áo, vải và thành phẩm sẵn sàng bàn giao'
  },
  '/assets/onos-embroidery.webp': {
    en: 'Embroidery equipment at Onos',
    vi: 'Hệ thống thiết bị thêu công nghiệp tại xưởng Onos'
  }
};

const results = authenticMedia.map(item => {
  const localFile = path.join('public', item.local);
  const exists = fs.existsSync(localFile);
  const buf = exists ? fs.readFileSync(localFile) : null;
  const actualHash = exists ? crypto.createHash('sha256').update(buf).digest('hex') : null;
  const hashMatches = actualHash === item.sha256;
  return {
    local: item.local,
    source: item.source,
    bytes: item.bytes,
    sha256: item.sha256,
    actualHash,
    hashMatches,
    exists,
    usage: usageMap[item.local] || ['src/components/OnosHome.tsx'],
    altEn: altMap[item.local]?.en || item.alt,
    altVi: altMap[item.local]?.vi || item.alt
  };
});

fs.writeFileSync('audit/media-manifest-summary.json', JSON.stringify(results, null, 2));
console.log(`Verified ${results.filter(r => r.hashMatches).length} of ${results.length} media items.`);

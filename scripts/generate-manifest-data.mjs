import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const projectRoot = process.cwd();
const imageDir = path.join(projectRoot, 'public/images');
const files = fs.readdirSync(imageDir).filter(f => !fs.statSync(path.join(imageDir, f)).isDirectory());

// Helper to get image dimensions if available
function getDimensions(buf) {
  // Simple check for webp or png or jpg
  if (buf.length > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    // WebP VP8X or VP8 or VP8L
    const format = buf.toString('ascii', 12, 16);
    if (format === 'VP8X') {
      const width = 1 + buf.readUIntLE(24, 3);
      const height = 1 + buf.readUIntLE(27, 3);
      return { width, height };
    }
  }
  return { width: 'N/A', height: 'N/A' };
}

const manifest = files.map(f => {
  const fullPath = path.join(imageDir, f);
  const buf = fs.readFileSync(fullPath);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  const size = buf.length;
  const dims = getDimensions(buf);
  return {
    file: f,
    sizeBytes: size,
    sizeKb: (size / 1024).toFixed(1) + ' KB',
    hash,
    dimensions: `${dims.width}x${dims.height}`,
    path: `/images/${f}`
  };
});

fs.writeFileSync(path.join(projectRoot, 'audit/image-hashes.json'), JSON.stringify(manifest, null, 2));
console.log(`Gathered data for ${manifest.length} images.`);

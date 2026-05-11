import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC = 'c:/Users/RIYA/Desktop/pizza';
const DEST = 'c:/Users/RIYA/Desktop/pizza/piozza/public/frames';

fs.mkdirSync(DEST, { recursive: true });

const files = fs.readdirSync(SRC)
  .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
  .sort();

console.log(`Found ${files.length} frames to convert`);

for (let i = 0; i < files.length; i++) {
  const src = path.join(SRC, files[i]);
  const num = String(i + 1).padStart(4, '0');
  const dest = path.join(DEST, `frame_${num}.webp`);
  await sharp(src).webp({ quality: 80 }).toFile(dest);
  if ((i + 1) % 40 === 0 || i === files.length - 1) {
    console.log(`Converted ${i + 1}/${files.length}`);
  }
}
console.log('Done! All frames converted to WebP.');

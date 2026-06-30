import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, '../public/ds/logo-symbol.svg');
const OUT = resolve(__dirname, '../public');

const sizes = [192, 512];
for (const size of sizes) {
  await sharp(SRC, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 15, g: 15, b: 15, alpha: 1 } })
    .png()
    .toFile(resolve(OUT, `logo-symbol-${size}.png`));
  console.log(`✓ logo-symbol-${size}.png`);
}

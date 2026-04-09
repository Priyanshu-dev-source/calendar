import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '..', 'public', 'images');

const images = ['january', 'february', 'march', 'april', 'may', 'june'];

async function optimizeImages() {
  for (const name of images) {
    const inputPath = path.join(imagesDir, `${name}.png`);
    const outputPath = path.join(imagesDir, `${name}.webp`);

    if (!fs.existsSync(inputPath)) {
      // console.log(`Skipping ${name}.png — not found`);
      continue;
    }

    const inputStats = fs.statSync(inputPath);
    console.log(`\n${name}.png — ${(inputStats.size / 1024).toFixed(0)} KB`);

    await sharp(inputPath)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 75, effort: 6 })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    console.log(`${name}.webp — ${(outputStats.size / 1024).toFixed(0)} KB (${((1 - outputStats.size / inputStats.size) * 100).toFixed(0)}% smaller)`);

    const blurPath = path.join(imagesDir, `${name}-blur.webp`);
    await sharp(inputPath)
      .resize({ width: 20 })
      .webp({ quality: 20 })
      .toFile(blurPath);

    const blurStats = fs.statSync(blurPath);
    // console.log(`${name}-blur.webp — ${blurStats.size} bytes`);
  }

}

optimizeImages().catch(console.error);

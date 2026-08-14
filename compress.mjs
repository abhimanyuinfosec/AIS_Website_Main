import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
const heroPath = path.join(publicDir, 'hero.png');
const heroWebpPath = path.join(publicDir, 'hero.webp');

async function compress() {
  if (fs.existsSync(heroPath)) {
    console.log('Compressing hero.png to hero.webp...');
    await sharp(heroPath)
      .webp({ quality: 75 })
      .toFile(heroWebpPath);
    console.log('Done.');
  } else {
    console.log('hero.png not found.');
  }
}

compress().catch(console.error);

import { existsSync } from 'fs';
import { resolve } from 'path';
import sharp from 'sharp';

async function main() {
  if (!existsSync(resolve(__dirname, '../public/images/Logo.png'))) {
    await sharp(resolve(__dirname, '../assets/images/Logo.png'))
      .resize(480, 270)
      .toFile(resolve(__dirname, '../public/images/Logo.png'));
  }

  if (!existsSync(resolve(__dirname, '../public/images/Logo.webp'))) {
    await sharp(resolve(__dirname, '../assets/images/Logo.png'))
      .resize(240, 135)
      .toFile(resolve(__dirname, '../public/images/Logo.webp'));
  }

  if (!existsSync(resolve(__dirname, '../public/images/Logo@2x.webp'))) {
    await sharp(resolve(__dirname, '../assets/images/Logo.png'))
      .resize(480, 270)
      .toFile(resolve(__dirname, '../public/images/Logo@2x.webp'));
  }

  if (!existsSync(resolve(__dirname, '../public/images/Logo@3x.webp'))) {
    await sharp(resolve(__dirname, '../assets/images/Logo.png'))
      .resize(720, 405)
      .toFile(resolve(__dirname, '../public/images/Logo@3x.webp'));
  }
}

main().finally(async () => {
  process.exit();
});

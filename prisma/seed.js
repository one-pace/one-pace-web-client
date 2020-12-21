/* eslint-disable no-restricted-syntax,no-loop-func,no-await-in-loop */

import dotenvLoad from 'dotenv-load';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { PrismaClient } from '@prisma/client';
import 'regenerator-runtime';
import sharp from 'sharp';

import { arcs } from './dump-onepace-arcs';
import { episodes } from './dump-onepace-episodes';

dotenvLoad();

const prisma = new PrismaClient();

const resolveImage = (filename, directory = 'public', model = 'episodes') =>
  resolve(__dirname, `../${directory}/images/${model}/${filename}`);

const findImage = (filename, directory = 'public', model = 'episodes') =>
  existsSync(resolveImage(filename, directory, model));

let errorCount = 0;

async function main() {
  for (const arc of arcs) {
    prisma.arc
      .upsert({
        create: {
          title: arc.title,
          description: '',
          anime_episodes: arc.episodes,
          manga_chapters: arc.chapters,
          torrent_hash: arc.torrent_hash,
          resolution: arc.resolution,
          image_url: arc.image_url,
          is_completed: arc.completed === 1,
          is_hidden: arc.hidden === 1,
          is_released: arc.released === 1,
        },
        update: {
          title: arc.title,
          description: '',
          anime_episodes: arc.episodes,
          manga_chapters: arc.chapters,
          torrent_hash: arc.torrent_hash,
          resolution: arc.resolution,
          image_url: arc.image_url,
          is_completed: arc.completed === 1,
          is_hidden: arc.hidden === 1,
          is_released: arc.released === 1,
        },
        where: {
          title: arc.title,
        },
      })
      // .then(res => console.info(res))
      .catch(err => {
        console.error(err, arc);
        errorCount += 1;
      });
  }

  for (const episode of episodes) {
    let new_arc = '';
    let image_ratio = null;
    switch (episode.arc_id) {
      case 1:
        new_arc = 'Impel Down';
        image_ratio = '16:9';
        break;
      case 2:
        new_arc = 'Zou';
        image_ratio = '16:9';
        break;
      case 3:
        new_arc = 'Dressrosa';
        image_ratio = '16:9';
        break;
      case 4:
        new_arc = 'Punk Hazard';
        image_ratio = '16:9';
        break;
      case 5:
        new_arc = 'Fishman Island';
        image_ratio = '16:9';
        break;
      case 6:
        new_arc = 'Romance Dawn';
        image_ratio = '4:3';
        break;
      case 7:
        new_arc = 'Orange Town';
        image_ratio = '4:3';
        break;
      case 8:
        new_arc = 'Loguetown';
        image_ratio = '4:3';
        break;
      case 9:
        new_arc = 'Reverse Mountain';
        image_ratio = '4:3';
        break;
      case 10:
        new_arc = 'Long Ring Long Land';
        image_ratio = '16:9';
        break;
      case 11:
        new_arc = 'Post-Enies Lobby';
        image_ratio = '16:9';
        break;
      case 12:
        new_arc = 'Thriller Bark';
        image_ratio = '16:9';
        break;
      case 13:
        new_arc = 'Sabaody Archipelago';
        image_ratio = '16:9';
        break;
      case 14:
        new_arc = 'Amazon Lily';
        image_ratio = '16:9';
        break;
      case 16:
        new_arc = 'Return to Sabaody';
        image_ratio = '16:9';
        break;
      case 17:
        new_arc = 'Skypiea';
        image_ratio = '4:3';
        break;
      case 18:
        new_arc = 'Syrup Village';
        image_ratio = '4:3';
        break;
      case 19:
        new_arc = 'Whole Cake Island';
        image_ratio = '16:9';
        break;
      case 21:
        new_arc = 'Specials';
        image_ratio = '16:9';
        break;
      case 40:
        new_arc = 'Enies Lobby';
        image_ratio = '16:9';
        break;
      case 41:
        new_arc = 'Whisky Peak';
        image_ratio = '4:3';
        break;
      case 42:
        new_arc = 'Marineford';
        image_ratio = '16:9';
        break;
      case 43:
        new_arc = 'Post-War';
        image_ratio = '16:9';
        break;
      case 44:
        new_arc = 'Arlong Park';
        image_ratio = '4:3';
        break;
      case 45:
        new_arc = 'Little Garden';
        image_ratio = '4:3';
        break;
      case 46:
        new_arc = 'Drum Island';
        image_ratio = '4:3';
        break;
      case 47:
        new_arc = 'Arabasta';
        image_ratio = '4:3';
        break;
      case 48:
        new_arc = 'Jaya';
        image_ratio = '4:3';
        break;
      case 49:
        new_arc = 'Water Seven';
        image_ratio = '16:9';
        break;
      case 50:
        new_arc = 'Baratie';
        image_ratio = '4:3';
        break;
      case 51:
        new_arc = 'Gaimon';
        image_ratio = '4:3';
        break;
      case 52:
        new_arc = 'Reverie';
        image_ratio = '16:9';
        break;
      case 53:
        new_arc = 'Wano';
        image_ratio = '16:9';
        break;
      default:
        break;
    }

    let new_title = episode.title;
    if (episode.title === '') {
      if (episode.part >= 1 && episode.part < 10) {
        new_title = `${new_arc} 0${episode.part}`;
      } else if (episode.part >= 10 || episode.part === 0) {
        new_title = `${new_arc} ${episode.part}`;
      }
    }

    const images = [];
    let image_url = null;
    if (new_arc !== 'Specials') {
      let new_part = `${episode.part}`;
      if (episode.part >= 1 && episode.part < 10) {
        new_part = `0${episode.part}`;
      }
      image_url = `cover-${new_arc
        .replace(/\s/g, '-')
        .toLowerCase()}-${new_part}`;

      // console.info(image_url);

      const resolveBaseImage = resolveImage(`${image_url}.jpg`, 'assets');
      const findBaseImage = findImage(`${image_url}.jpg`, 'assets');

      if (findBaseImage) {
        // Add fallback image
        if (!findImage(`${image_url}_480w.jpg`)) {
          await sharp(resolveBaseImage)
            .resize(480, image_ratio === '4:3' ? 360 : 270)
            .toFile(resolveImage(`${image_url}_480w.jpg`));
        }

        images.push({
          src: `${image_url}_480w.jpg`,
          type: 'image/jpeg',
          width: 480,
        });

        // Add mobile image
        if (!findImage(`${image_url}_240w.webp`)) {
          await sharp(resolveBaseImage)
            .resize(240, image_ratio === '4:3' ? 180 : 135)
            .toFile(resolveImage(`${image_url}_240w.webp`));
        }

        images.push({
          src: `${image_url}_240w.webp`,
          type: 'image/webp',
          width: 240,
        });

        // Add desktop and 2x DPI image
        if (!findImage(`${image_url}_480w.webp`)) {
          await sharp(resolveBaseImage)
            .resize(480, image_ratio === '4:3' ? 360 : 270)
            .toFile(resolveImage(`${image_url}_480w.webp`));
        }

        images.push({
          src: `${image_url}_480w.webp`,
          type: 'image/webp',
          width: 480,
        });

        // Add 4K and Ultrawide / 3x DPI image
        if (!findImage(`${image_url}_720w.webp`)) {
          await sharp(resolveBaseImage)
            .resize(720, image_ratio === '4:3' ? 540 : 405)
            .toFile(resolveImage(`${image_url}_720w.webp`));
        }

        images.push({
          src: `${image_url}_720w.webp`,
          type: 'image/webp',
          width: 720,
        });
      }
    }

    const findEpisode = await prisma.episode
      .findOne({ where: { title: new_title } })
      .catch(err => {
        console.error(err, episode);
        errorCount += 1;
      });

    if (findEpisode) {
      prisma.episode
        .update({
          data: {
            anime_episodes: episode.episodes,
            manga_chapters: episode.chapters,
            crc32: episode.crc32,
            torrent_hash: episode.torrent_hash,
            part: episode.part,
            resolution: episode.resolution,
            released_date: episode.released_date || 'Unreleased',
            status: episode.status || '',
          },
          where: { title: new_title },
        })
        .catch(err => {
          console.error(err, episode);
          errorCount += 1;
        });

      for (const image of images) {
        // console.info(image);
        const createImage = await prisma.image
          .create({
            data: {
              alt: null,
              episode: {
                connect: {
                  title: new_title,
                },
              },
              src: image.src,
              type: image.type,
              width: image.width,
            },
          })
          .catch(err => {
            console.error(err, image);
            errorCount += 1;
          });

        console.info(createImage);
        // return createImage;
      }
    } else {
      await prisma.episode
        .create({
          data: {
            arc: {
              connect: {
                title: new_arc,
              },
            },
            title: new_title,
            description: '',
            anime_episodes: episode.episodes,
            manga_chapters: episode.chapters,
            crc32: episode.crc32,
            torrent_hash: episode.torrent_hash,
            part: episode.part,
            resolution: episode.resolution,
            released_date: episode.released_date || 'Unreleased',
            status: episode.status || '',
            openload: episode.openload || '',
          },
        })
        .then(data => data)
        .catch(err => {
          console.error(err, episode);
          errorCount += 1;
        });

      for (const image of images) {
        // console.info(image);
        const createImage = await prisma.image
          .create({
            data: {
              alt: null,
              episode: {
                connect: {
                  title: new_title,
                },
              },
              src: image.src,
              type: image.type,
              width: image.width,
            },
          })
          .catch(err => {
            console.error(err, image);
            errorCount += 1;
          });

        console.info(createImage);
        // return createImage;
      }
    }
  }

  console.info('Seeding complete!');
  console.info(`Total Number of Errors: ${errorCount}`);
}

main().finally(async () => {
  console.info('Disconnecting from datasource...');
  await prisma.$disconnect();

  process.exit();
});

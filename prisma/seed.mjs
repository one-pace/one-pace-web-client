import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { arcs } from './dump-onepace-arcs.js';
import { episodes } from './dump-onepace-episodes.js';

async function main() {
  let errorCount = 0;

  for (const arc of arcs) {
    await prisma.arc.upsert({
      create: {
        title: arc.title,
        description: '',
        anime_episodes: arc.episodes,
        manga_chapters: arc.chapters,
        torrent_hash: arc.torrent_hash,
        resolution: arc.resolution,
        image_url: arc.image_url,
        is_completed: arc.completed === 1 ? true : false,
        is_hidden: arc.hidden === 1 ? true : false,
        is_released: arc.released === 1 ? true : false,
      },
      update: {
        title: arc.title,
        description: '',
        anime_episodes: arc.episodes,
        manga_chapters: arc.chapters,
        torrent_hash: arc.torrent_hash,
        resolution: arc.resolution,
        image_url: arc.image_url,
        is_completed: arc.completed === 1 ? true : false,
        is_hidden: arc.hidden === 1 ? true : false,
        is_released: arc.released === 1 ? true : false,
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
    switch (episode.arc_id) {
      case 1:
        new_arc = 'Impel Down';
        break;
      case 2:
        new_arc = 'Zou';
        break;
      case 3:
        new_arc = 'Dressrosa';
        break;
      case 4:
        new_arc = 'Punk Hazard';
        break;
      case 5:
        new_arc = 'Fishman Island';
        break;
      case 6:
        new_arc = 'Romance Dawn';
        break;
      case 7:
        new_arc = 'Orange Town';
        break;
      case 8:
        new_arc = 'Loguetown';
        break;
      case 9:
        new_arc = 'Reverse Mountain';
        break;
      case 10:
        new_arc = 'Long Ring Long Land';
        break;
      case 11:
        new_arc = 'Post-Enies Lobby';
        break;
      case 12:
        new_arc = 'Thriller Bark';
        break;
      case 13:
        new_arc = 'Sabaody Archipelago';
        break;
      case 14:
        new_arc = 'Amazon Lily';
        break;
      case 16:
        new_arc = 'Return to Sabaody';
        break;
      case 17:
        new_arc = 'Skypiea';
        break;
      case 18:
        new_arc = 'Syrup Village';
        break;
      case 19:
        new_arc = 'Whole Cake Island';
        break;
      case 21:
        new_arc = 'Specials';
        break;
      case 40:
        new_arc = 'Enies Lobby';
        break;
      case 41:
        new_arc = 'Whisky Peak';
        break;
      case 42:
        new_arc = 'Marineford';
        break;
      case 43:
        new_arc = 'Post-War';
        break;
      case 44:
        new_arc = 'Arlong Park';
        break;
      case 45:
        new_arc = 'Little Garden';
        break;
      case 46:
        new_arc = 'Drum Island';
        break;
      case 47:
        new_arc = 'Alabasta';
        break;
      case 48:
        new_arc = 'Jaya';
        break;
      case 49:
        new_arc = 'Water 7';
        break;
      case 50:
        new_arc = 'Baratie';
        break;
      case 51:
        new_arc = 'Gaimon';
        break;
      case 52:
        new_arc = 'Reverie';
        break;
      case 53:
        new_arc = 'Wano';
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

    let new_image_url = null;
    if (!episode.image_url) {
      if (new_arc !== 'Specials') {
        let new_part = episode.part;
        if (episode.part >= 1 && episode.part < 10) {
          new_part = `0${episode.part}`;
        }
        new_image_url = `cover-${new_arc.replace(/\s/g, '-').toLowerCase()}-${new_part}.png`;
      }
    }

    // console.info(new_image_url);

    await prisma.episode.create({
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
        image_url: new_image_url,
        released_date: episode.released_date || 'Unreleased',
        status: episode.status || '',
        openload: episode.openload || '',
      },
    })
    .catch(err => {
      console.error(err, episode);
      errorCount += 1;
    });
  }

  console.info(`Total Number of Errors: ${errorCount}`);
}

main().finally(async () => {
  console.info('Disconnecting from datasource...');
  await prisma.disconnect();
});

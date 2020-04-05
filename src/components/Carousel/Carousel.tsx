import React, { useContext } from 'react';
import cn from 'classnames';

import AppContext from '../../context';
import Image from '../Image';

import s from './Carousel.css';

interface Props {
  aspectRatio?: '4:3' | '16:9';
  items?: [
    {
      arc?: string;
      image_url?: string;
      part?: number;
      streams_hash?: string;
      title?: string;
    },
  ];
  title?: string;
}

const Carousel = (props: Props) => {
  const { torrentClient } = useContext(AppContext);

  const getTrackers = () => {
    const trackers = [
      'http://nyaa.tracker.wf:7777/announce',
      'udp://tracker.openbittorrent.com:80',
      'udp://tracker.publicbt.com:80',
      'udp://tracker.opentrackr.org:1337',
      'udp://tracker.coppersurfer.tk:6969',
      'udp://tracker.leechers-paradise.org:6969',
      'udp://zer0day.ch:1337',
      'udp://explodie.org:6969',
      'http://anidex.moe:6969/announce',
      'wss://tracker.btorrent.xyz',
      'wss://tracker.fastcast.nz',
      'wss://tracker.openwebtorrent.com',
    ];
    return trackers
      .join('&tr=')
      .replace(/:/g, '%3A')
      .replace(/\//g, '%2F');
  };

  const getTorrentId = (hash: string) =>
    `magnet:?xt=urn:btih:${hash}&tr=${getTrackers()}`;

  const torrentId = getTorrentId('0f8f5cecab38920308889ab9290f16aa36f8190e');

  const handleClick = () => {
    const findTorrent = torrentClient.get(torrentId);

    if (findTorrent) {
      console.info(
        findTorrent,
        `${torrentClient.downloadSpeed} Bytes/sec`,
        `${torrentClient.progress}% Complete`,
        `${findTorrent.numPeers} Peers`,
      );
      const video = findTorrent.files.find((file: any) =>
        file.name.endsWith('.mp4'),
      );
      if (video) {
        console.info(video);
        video.getBlobURL(blob => console.info(blob));
      }
    } else {
      torrentClient.add(torrentId, (torrent: any) => {
        // Torrents can contain many files. Let's use the .mp4 file
        console.info(torrent);

        // Display the file by adding it to the DOM. Supports video, audio, image, etc. files
      });
    }
  };

  return (
    <section className={s.root}>
      <h2>
        <span>
          <div>{props.title}</div>
        </span>
      </h2>
      <div className={s.container}>
        <div className={s.carousel}>
          <div className={cn(s.mask, s.showBeyond)}>
            <div className={s.items}>
              {props.items?.map(item => {
                let image = <div className={s.imagePlaceholder} />;
                if (item.image_url) {
                  image = (
                    <Image
                      alt={item.image_url}
                      aspectRatio={props.aspectRatio === '4:3' ? 3 / 4 : 9 / 16}
                      className={s.image}
                      color="#4d4d4d"
                      src={`/images/episodes/${item.image_url}`}
                    />
                  );
                }
                return (
                  <div
                    className={cn(s.item, item.streams_hash && s.canClick)}
                    onClick={handleClick}
                    onKeyPress={() => {}}
                  >
                    <div className={s.image}>{image}</div>
                    <span className={s.part}>{item.part}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <span className={cn(s.scroller, s.next)}>
            <b />
          </span>
        </div>
      </div>
    </section>
  );
};

Carousel.defaultProps = {
  aspectRatio: '16:9',
};

export default Carousel;

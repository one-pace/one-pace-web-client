import React from 'react';
// import cn from 'classnames';

import s from './Carousel.css';

// import AppContext from '../../context';
import CarouselSlider from '../CarouselSlider';
import CarouselSliderItem from '../CarouselSliderItem';
import Image, { media1x, media2x, media3x } from '../Image';

interface Props {
  activeRowItemIndex?: number;
  aspectRatio?: '4:3' | '16:9';
  handleSliderMove?(lowestIndex: number, direction: number);
  isLooping?: boolean;
  items: [
    {
      // arc?: string;
      images?: Array<{
        src: string;
        type: string;
        width: number;
      }>;
      part?: number;
      streams_hash?: string;
      title?: string;
    },
  ];
  rowNum?: number;
  title?: string;
}

// interface State {
//   lowestVisibleItemIndex: number;
//   sliderMoveDirection: 1 | -1;
// }
//
// const HANDLE_SLIDER_MOVE = 'HANDLE_SLIDER_MOVE';
//
// const reducer = (state: State, action: { type: string; payload?: any }) => {
//   switch (action.type) {
//     case HANDLE_SLIDER_MOVE:
//       return { ...state, ...action.payload };
//     default:
//       return state;
//   }
// };

const Carousel: React.FunctionComponent<Props> = (props: Props) => {
  // const { torrentClient } = useContext(AppContext);
  // const [state, dispatch] = useReducer(reducer, {
  //   lowestVisibleItemIndex: 0,
  //   sliderMoveDirection: 1,
  // });

  // const handleSliderMove = (lowestIndex: number, direction: 1 | -1) => {
  //   dispatch({
  //     type: HANDLE_SLIDER_MOVE,
  //     payload: {
  //       lowestVisibleItemIndex: lowestIndex,
  //       sliderMoveDirection: direction,
  //     },
  //   });
  //   if (typeof props.handleSliderMove === 'function')
  //     props.handleSliderMove(lowestIndex, direction);
  // };

  // const getTrackers = () => {
  //   const trackers = [
  //     'http://nyaa.tracker.wf:7777/announce',
  //     'udp://tracker.openbittorrent.com:80',
  //     'udp://tracker.publicbt.com:80',
  //     'udp://tracker.opentrackr.org:1337',
  //     'udp://tracker.coppersurfer.tk:6969',
  //     'udp://tracker.leechers-paradise.org:6969',
  //     'udp://zer0day.ch:1337',
  //     'udp://explodie.org:6969',
  //     'http://anidex.moe:6969/announce',
  //     'wss://tracker.btorrent.xyz',
  //     'wss://tracker.fastcast.nz',
  //     'wss://tracker.openwebtorrent.com',
  //   ];
  //   return trackers
  //     .join('&tr=')
  //     .replace(/:/g, '%3A')
  //     .replace(/\//g, '%2F');
  // };
  //
  // const getTorrentId = (hash: string) =>
  //   `magnet:?xt=urn:btih:${hash}&tr=${getTrackers()}`;
  //
  // const torrentId = getTorrentId('0f8f5cecab38920308889ab9290f16aa36f8190e');
  //
  // const handleClick = () => {
  //   const findTorrent = torrentClient.get(torrentId);
  //
  //   if (findTorrent) {
  //     console.info(
  //       findTorrent,
  //       `${torrentClient.downloadSpeed} Bytes/sec`,
  //       `${torrentClient.progress}% Complete`,
  //       `${findTorrent.numPeers} Peers`,
  //     );
  //     const video = findTorrent.files.find((file: any) =>
  //       file.name.endsWith('.mp4'),
  //     );
  //     if (video) {
  //       console.info(video);
  //       video.getBlobURL(blob => console.info(blob));
  //     }
  //   } else {
  //     torrentClient.add(torrentId, (torrent: any) => {
  //       // Torrents can contain many files. Let's use the .mp4 file
  //       console.info(torrent);
  //
  //       // Display the file by adding it to the DOM. Supports video, audio, image, etc. files
  //     });
  //   }
  // };

  const placeholderImage =
    props.aspectRatio === '4:3'
      ? '/images/unreleased-placeholder-4x3.jpg'
      : '/images/unreleased-placeholder-16x9.jpg';

  return (
    <section className={s.root}>
      <h2>
        <span>
          <div>{props.title}</div>
        </span>
      </h2>
      <div className={s.container}>
        <CarouselSlider
          activeRowItemIndex={props.activeRowItemIndex}
          enableLooping
          // onSliderMove={handleSliderMove}
          parentContext={{ rowIndex: props.rowNum }}
          totalItems={props.items.length}
        >
          {props.items?.map(item => {
            let srcFallback = placeholderImage;
            let src1x = null;
            let src2x = null;
            let src3x = null;

            if (item.images?.length) {
              if (item.images[0]?.src)
                srcFallback = `/images/episodes/${item.images[0].src}`;

              if (item.images[1]?.src)
                src1x = `/images/episodes/${item.images[1].src}`;

              if (item.images[2]?.src)
                src2x = `/images/episodes/${item.images[2].src}`;

              if (item.images[3]?.src)
                src3x = `/images/episodes/${item.images[3].src}`;
            }

            const image = (
              <Image
                alt={`${item.title} image`}
                aspectRatio={props.aspectRatio === '4:3' ? 0.75 : 0.5625}
                color="#282828"
                src={srcFallback}
              >
                {src1x && src2x && src3x && (
                  <picture>
                    <source media={media3x} srcSet={src3x} type="image/webp" />
                    <source media={media2x} srcSet={src2x} type="image/webp" />
                    <source media={media1x} srcSet={src1x} type="image/webp" />
                    <source srcSet={srcFallback} type="image/jpeg" />
                    <img alt="" />
                  </picture>
                )}
              </Image>
            );

            return (
              <CarouselSliderItem key={item.title}>
                {image}
                <span className={s.part}>{item.part}</span>
              </CarouselSliderItem>
            );
          })}
        </CarouselSlider>
      </div>
    </section>
  );
};

Carousel.defaultProps = {
  activeRowItemIndex: undefined,
  aspectRatio: '16:9',
  rowNum: 0,
};

export default Carousel;

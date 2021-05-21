import React, { useState } from 'react';
// import cn from 'classnames';
import { DateTime } from 'luxon';
import { mdiMagnet } from '@mdi/js';
import Icon from '@mdi/react';
import { Button } from '@react-md/button';
import { TextIconSpacing } from '@react-md/icon';
import { CloseSVGIcon, CloudDownloadSVGIcon } from '@react-md/material-icons';
import { Collapse } from '@react-md/transition';

import s from './Carousel.module.css';

import CarouselSlider from '../CarouselSlider';
import CarouselSliderItem from '../CarouselSliderItem';
import { useTranslation } from '../../core/i18n';
import Image, { media1x, media2x, media3x } from '../Image';

interface Item {
  anime_episodes: string;
  description?: string;
  duration?: string;
  episodes?: Item[];
  images?: Array<{
    src: string;
    type: string;
    width: number;
  }>;
  manga_chapters: string;
  part?: number;
  released_date?: string | null;
  resolution: string;
  title: string;
  torrent_hash?: string;
  translations?: Array<{
    description?: string;
    language: {
      code: string;
    };
    title: string;
  }>;
}

interface Props {
  activeRowItemIndex?: number;
  aspectRatio?: '4:3' | '16:9';
  handleSliderMove?: (lowestIndex: number, direction: number) => void;
  isLooping?: boolean;
  items: Item[];
  rowNum?: number;
  title?: string;
  type?: 'arcs' | 'episodes';
}

interface State {
  currentItem?: Item;
  isInfoCollapsed: boolean;
}

const Carousel: React.FunctionComponent<Props> = (props: Props) => {
  const [state, setState] = useState<State>({
    currentItem: null,
    isInfoCollapsed: true,
  });

  const { i18n, t } = useTranslation('common');

  const handleClickItem = (
    event: React.MouseEvent<HTMLDivElement>,
    item: Item,
  ) => {
    event.preventDefault();

    setState(prevState => ({
      ...prevState,
      currentItem: item,
      isInfoCollapsed: false,
    }));
  };

  const handleCloseInfo = () =>
    setState(prevState => ({
      ...prevState,
      currentItem: null,
      isInfoCollapsed: true,
    }));

  const placeholderImage =
    props.type === 'arcs' // eslint-disable-line no-nested-ternary
      ? '/images/arcs/cover-placeholder-arc.jpg'
      : props.aspectRatio === '4:3'
      ? '/images/unreleased-placeholder-4x3.jpg'
      : '/images/unreleased-placeholder-16x9.jpg';

  const unavailable = <em>Unavailable</em>;

  let currentItemReleaseDate: React.ReactNode | string = unavailable;

  // Run this check once for optimization
  let isThereCurrentItem = state.currentItem;

  let title = (isThereCurrentItem && state.currentItem.title) || 'Untitled';

  let description: React.ReactElement | string = (isThereCurrentItem && state.currentItem.description) || (
    <em>{t('description-unavailable')}.</em>
  );

  if (isThereCurrentItem) {
    if (state.currentItem.released_date?.length) {
      if (state.currentItem.released_date === 'Unreleased') {
        currentItemReleaseDate = t('unreleased');
      } else {
        currentItemReleaseDate = DateTime.fromISO(
          state.currentItem.released_date,
        ).toLocaleString();
      }
    }

    if (state.currentItem.translations?.length) {
      state.currentItem.translations.some(tl => {
        if (tl.language.code === i18n.language) {
          if (tl.title) title = tl.title;
          if (tl.description) description = tl.description;

          return true;
        }

        return false;
      });
    }
  }


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
          totalItems={props.items?.length || 0}
        >
          {props.items?.map(item => {
            let srcFallback = placeholderImage;
            let src1x = null;
            let src2x = null;
            let src3x = null;

            if (item.images?.length) {
              if (item.images[0]?.src)
                srcFallback = `/images/${props.type}/${item.images[0].src}`;

              if (item.images[1]?.src)
                src1x = `/images/${props.type}/${item.images[1].src}`;

              if (item.images[2]?.src)
                src2x = `/images/${props.type}/${item.images[2].src}`;

              if (item.images[3]?.src)
                src3x = `/images/${props.type}/${item.images[3].src}`;
            }

            const image = (
              <Image
                alt={`${item.title} image`}
                aspectRatio={
                  props.type === 'arcs' // eslint-disable-line no-nested-ternary
                    ? 1.77777777778
                    : props.aspectRatio === '4:3'
                    ? 0.75
                    : 0.5625
                }
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
              <CarouselSliderItem
                key={item.title}
                onClick={event => handleClickItem(event, item)}
              >
                {image}
                {typeof item.part === 'number' && (
                  <span className={s.part}>{item.part}</span>
                )}
              </CarouselSliderItem>
            );
          })}
        </CarouselSlider>
        <div className={s.expander}>
          <Collapse collapsed={state.isInfoCollapsed} temporary>
            <div>
              {state.currentItem && (
                <div className={s.infoContainer}>
                  <h2>{title}</h2>
                  <p className={s.description}>
                    {description}
                  </p>
                  <p>
                    {t('chapters')}:{' '}
                    <strong>
                      {state.currentItem.manga_chapters || unavailable}
                    </strong>
                  </p>
                  <p>
                    {t('episodes')}:{' '}
                    <strong>
                      {state.currentItem.anime_episodes || unavailable}
                    </strong>
                  </p>
                  <p>
                    {t('duration')}:{' '}
                    <strong>{state.currentItem.duration || unavailable}</strong>
                  </p>
                  <p>
                    {t('resolution')}:{' '}
                    <strong>
                      {state.currentItem.resolution || unavailable}
                    </strong>
                  </p>
                  <p>
                    {t('released-on')}:{' '}
                    <strong>{currentItemReleaseDate}</strong>
                  </p>
                  <div className={s.buttons}>
                    <Button theme="primary" themeType="outline">
                      <TextIconSpacing icon={<CloudDownloadSVGIcon />}>
                        {t('direct-download')}
                      </TextIconSpacing>
                    </Button>
                    <Button theme="primary" themeType="outline">
                      <TextIconSpacing
                        icon={
                          <Icon
                            className="rmd-icon rmd-icon--svg"
                            path={mdiMagnet}
                          />
                        }
                      >
                        {t('magnet-link')}
                      </TextIconSpacing>
                    </Button>
                  </div>
                  <Button
                    buttonType="icon"
                    className={s.closeButton}
                    onClick={handleCloseInfo}
                  >
                    <CloseSVGIcon />
                  </Button>
                </div>
              )}
            </div>
          </Collapse>
        </div>
      </div>
    </section>
  );
};

Carousel.defaultProps = {
  activeRowItemIndex: undefined,
  aspectRatio: '16:9',
  rowNum: 0,
  type: 'episodes',
};

export default Carousel;

import React from 'react';
import cn from 'classnames';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import Icon from '@mdi/react';

import s from './CarouselSlider.css';

import { SliderContext } from '../../context';
import useSizeElement from './useSizeElement';
import useSliding from './useSliding';
// import CarouselLoadingTitle from '../CarouselLoadingTitle';
// import CarouselSliderItem from '../CarouselSliderItem';

interface Props {
  activeRowItemIndex?: number;
  aspectRatio?: '4:3' | '16:9'; // remove
  children: React.ReactNode[];
  enableLooping?: boolean;
  initialLowestVisibleIndex?: number;
  itemsInRow?: number;
  onSliderMove?: (firstVisibleItemIndex: number, direction: 1 | -1) => void;
  parentContext?: {
    rowIndex?: number;
  };
  ref?: any; // TODO type correctly
  totalItems: number;
  title?: string; // remove
}

const CarouselSlider: React.FunctionComponent<Props> = (props: Props) => {
  const { elementRef, width } = useSizeElement();
  const {
    containerRef,
    handleNext,
    handlePrev,
    hasNext,
    hasPrev,
    slideProps,
  } = useSliding(width, props.totalItems);

  const renderScroller = (
    isPrev: boolean,
    onClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void,
  ) => {
    const className = cn(
      s.scroller,
      isPrev ? s.prev : s.next,
      hasPrev && s.active,
    );

    // if (!hasPrev || (isPrev && !state.hasMovedOnce)) {
    //   return null;
    // }

    const d = 'prev';
    const c = 'next';
    const p = isPrev ? d : c;

    return (
      <span
        aria-label={p}
        className={className}
        onBlur={() => {}}
        onClick={onClick}
        onFocus={() => {}}
        onKeyDown={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        role="button"
        tabIndex={isPrev ? 0 : 1}
      >
        <Icon
          className="md-icon material-icons"
          color="#fff"
          path={isPrev ? mdiChevronLeft : mdiChevronRight}
        />
      </span>
    );
  };

  return (
    <SliderContext.Provider
      value={{
        currentSlide: 0,
        elementRef,
        onCloseSlide: () => {},
        onSelectSlide: () => {},
      }}
    >
      <div className={s.carousel}>
        {hasPrev && renderScroller(true, handlePrev)}
        <div className={cn(s.mask, s.showPeek)}>
          <div
            className={cn(s.sliderContent, s.animating)}
            ref={containerRef}
            {...slideProps}
          >
            {props.children}
          </div>
        </div>
        {hasNext && renderScroller(false, handleNext)}
      </div>
    </SliderContext.Provider>
  );
};

CarouselSlider.defaultProps = {
  aspectRatio: '16:9',
  parentContext: {},
};

export default CarouselSlider;

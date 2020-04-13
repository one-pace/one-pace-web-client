import React, { useContext } from 'react';
import cn from 'classnames';

import s from './CarouselSliderItem.css';

import { SliderContext } from '../../context';

interface Props {
  className?: string;
  children?: React.ReactNode;
  key?: string;
}

const CarouselSliderItem: React.FunctionComponent<Props> = (props: Props) => {
  const { elementRef } = useContext(SliderContext);

  return (
    <div
      className={cn(s.item, props.className)}
      key={props.key}
      ref={elementRef}
    >
      {props.children}
    </div>
  );
};

CarouselSliderItem.defaultProps = {
  className: null,
};

export default CarouselSliderItem;

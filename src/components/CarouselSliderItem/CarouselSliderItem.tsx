import React, { useContext } from 'react';
import cn from 'classnames';

import s from './CarouselSliderItem.module.css';

import { SliderContext } from '../../context';

interface Props {
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>, args?: any) => void;
}

const CarouselSliderItem: React.FunctionComponent<Props> = (props: Props) => {
  const { elementRef } = useContext(SliderContext);

  return (
    <div
      className={cn(s.item, props.className)}
      onClick={props.onClick}
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

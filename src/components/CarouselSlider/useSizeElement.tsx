import { useEffect, useRef, useState } from 'react';
import useResize from 'react-resize-observer-hook';

const useSizeElement = () => {
  const elementRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (elementRef.current?.clientWidth)
      setWidth(elementRef.current.clientWidth);
  }, [elementRef]);

  useResize(elementRef, (entry: { width: number }) => setWidth(entry.width));

  return { elementRef, width };
};

export default useSizeElement;

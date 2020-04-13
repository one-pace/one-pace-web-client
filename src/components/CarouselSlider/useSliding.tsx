import { useEffect, useReducer, useRef } from 'react';

interface State {
  containerWidth: number;
  distance: number;
  totalInViewport: number;
  viewed: number;
}

const reducer = (state: State, action: { payload: object }) => ({
  ...state,
  ...action.payload,
});

const useSliding = (elementWidth: number, countElements: number) => {
  const [state, dispatch] = useReducer(reducer, {
    containerWidth: 0,
    distance: 0,
    totalInViewport: 0,
    viewed: 0,
  });
  const containerRef = useRef(null);

  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth;

    dispatch({
      payload: {
        containerWidth,
        distance: 0,
        totalInViewport: Math.round(containerWidth / elementWidth),
        viewed: 0,
      },
    });
  }, [containerRef, elementWidth]);

  const handleNext = () =>
    dispatch({
      payload: {
        distance: state.distance - state.containerWidth,
        viewed: state.viewed + state.totalInViewport,
      },
    });

  const handlePrev = () =>
    dispatch({
      payload: {
        distance: state.distance + state.containerWidth,
        viewed: state.viewed - state.totalInViewport,
      },
    });

  const hasNext = state.viewed + state.totalInViewport < countElements;

  const hasPrev = state.distance < 0;

  const slideProps = {
    style: {
      WebkitTransform: `translate3d(${state.distance}px, 0, 0)`,
      MsTransform: `translate3d(${state.distance}px, 0, 0)`,
      transform: `translate3d(${state.distance}px, 0, 0)`,
    },
  };

  return { containerRef, handleNext, handlePrev, hasNext, hasPrev, slideProps };
};

export default useSliding;

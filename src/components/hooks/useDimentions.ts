import { RefObject, useState, useEffect } from 'react';

const defaultdimensions = { width: 0, height: 0 };

export const useDimensions = (targetRef: RefObject<null>) => {
  let [dimensions, setDimensions] = useState(defaultdimensions);
  const node = targetRef.current;

  const updateDimensions = (node: HTMLElement | null) => {
    return node === null
      ? defaultdimensions
      : {
          width: node.offsetWidth,
          height: node.offsetHeight,
        };
  };
  dimensions = updateDimensions(node);

  useEffect(() => {
    const resizedimensions = () => {
      setDimensions(updateDimensions(node));
    };

    window.removeEventListener('resize', resizedimensions);
    window.addEventListener('resize', resizedimensions);
  }, [node]);

  return { dimensions };
};

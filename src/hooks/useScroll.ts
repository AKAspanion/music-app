import { useMemo, useLayoutEffect, useState, useCallback } from 'react';

const useScroll = () => {
  const [currPos, setCurrPos] = useState<any>({
    x: undefined,
    y: undefined,
  });
  const [prevPos, setPrevPos] = useState<any>({
    x: undefined,
    y: undefined,
  });
  const [node, setNode] = useState<HTMLElement | null>(null);

  const onscroll = useCallback(() => {
    if (node) {
      setPrevPos({ x: currPos.x, y: currPos.y });
      setCurrPos({ x: node.scrollLeft, y: node.scrollTop });
    }
  }, [node, currPos]);

  const scroll = useCallback(() => {
    node && node.addEventListener('scroll', onscroll);
  }, [node, onscroll]);

  useLayoutEffect(() => {
    scroll();
    return () => {
      node && node.removeEventListener('scroll', onscroll);
    };
  }, [scroll, onscroll, node]);

  return useMemo(() => [setNode, { currPos, prevPos }], [
    setNode,
    currPos,
    prevPos,
  ]);
};

export default useScroll;

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useLayoutEffect } from 'react';

const useScrollPosition = (deps) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useLayoutEffect(() => {
    window.scroll({ top: scrollPosition });
  }, [scrollPosition, ...deps]);

  return [setScrollPosition];
};

export default useScrollPosition;

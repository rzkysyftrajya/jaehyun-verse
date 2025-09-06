"use client";

import { useEffect, useState, useCallback } from 'react';

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export const useKonamiCode = (callback: () => void) => {
  const [keys, setKeys] = useState<string[]>([]);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    setKeys((prevKeys) => [...prevKeys, event.key].slice(-konamiCode.length));
  }, []);

  useEffect(() => {
    if (keys.join('') === konamiCode.join('')) {
      callback();
      setKeys([]);
    }
  }, [keys, callback]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
};

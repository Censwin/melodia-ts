/*
 * @Date: 2021-12-13 10:31:28
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-13 10:34:33
 * @Description:
 * @FilePath: \melodia-ts\src\hooks\useDebounce.tsx
 */
import { useState, useEffect } from 'react';

function useDebounce(value: any, delay = 500) {
  const [state, setState] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setState(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  return state;
}

export default useDebounce;

import { useEffect, useState } from 'react';

export const useDebounceValue = (value: string) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), 400);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  return debounceValue;
};

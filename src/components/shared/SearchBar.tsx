'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useDebounceValue } from '@/hooks/useDebounceValue';

function SearchBar() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const [value, setValue] = useState(title || '');
  const router = useRouter();

  const debouncedValue = useDebounceValue(value);
  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          title: debouncedValue,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }, [router, debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <Input
        value={value}
        onChange={handleChange}
        type="text"
        className="w-[300px]"
        placeholder="Search"
      />
    </div>
  );
}

export default SearchBar;

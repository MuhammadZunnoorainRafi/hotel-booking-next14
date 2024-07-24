import React from 'react';
import { Input } from '../ui/input';

function SearchBar() {
  return (
    <div>
      <Input type="text" className="w-[300px]" placeholder="Search" />
    </div>
  );
}

export default SearchBar;

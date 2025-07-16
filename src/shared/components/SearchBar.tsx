import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center w-full max-w-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-200px h-30px border border-gray-300 rounded-xl px-4 py-2 font-noto font-medium text-sm focus:outline-none"
      />
      <img src="/icons/search.svg" alt="Search" className="w-30px h-30px ml-2 opacity-90" />
    </div>
  );
};

export default SearchBar;

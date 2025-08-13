import React, { useState } from 'react';

interface InfoInputCardProps {
  label: string;
  type: 'text' | 'textarea' | 'date' | 'dropdown';
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  options?: string[]; // dropdown일 때 사용
  required?: boolean; // * 표시 여부
}

const InfoInputCard: React.FC<InfoInputCardProps> = ({
  label,
  type,
  value,
  placeholder,
  onChange,
  options = [],
  required = false,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex flex-col relative">
      <label className="text-[#00193E] font-semibold text-[18px] mb-[10px]">
        {label}
        {required && <span className="ml-1 text-[#FFB38A]">*</span>}
      </label>

      {type === 'text' && (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white rounded-[10px] px-4 py-[10px] text-[15px] font-medium placeholder-[#9B9DA1]"
        />
      )}

      {type === 'textarea' && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white rounded-[10px] px-4 py-[10px] text-[15px] font-medium placeholder-[#9B9DA1] min-h-[120px] resize-none"
        />
      )}

      {type === 'date' && (
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white rounded-[10px] px-4 py-[10px] text-[15px] font-medium text-black"
        />
      )}

      {type === 'dropdown' && (
        <>
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full bg-white rounded-[10px] px-4 py-[10px] text-[15px] font-medium flex justify-between items-center"
          >
            <span className={value ? 'text-black' : 'text-[#9B9DA1]'}>
              {value || '선택해주세요'}
            </span>
            <img src="/icons/toggle.svg" alt="dropdown toggle" className="w-5 h-5" />
          </button>
          {showDropdown && (
            <ul className="absolute z-10 mt-2 w-full bg-white rounded-[10px] shadow-md">
              {options.map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[15px] text-black"
                  onClick={() => {
                    onChange(option);
                    setShowDropdown(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default InfoInputCard;

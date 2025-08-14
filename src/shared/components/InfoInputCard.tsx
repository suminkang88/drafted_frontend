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
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');

  const handleDropdownClick = () => {
    if (value === '기타') {
      setIsCustomInput(true);
      setCustomValue('');
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const handleCustomInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customValue.trim()) {
      onChange(customValue.trim());
      setIsCustomInput(false);
      setCustomValue('');
    }
  };

  const handleCustomInputBlur = () => {
    if (customValue.trim()) {
      onChange(customValue.trim());
    } else {
      onChange('');
    }
    setIsCustomInput(false);
    setCustomValue('');
  };

  return (
    <div className="flex flex-col relative">
      <label className="text-[#00193E] font-semibold text-[16px] mb-2">
        {label}
        {required && <span className="ml-1 text-[#FFB38A]">*</span>}
      </label>

      {type === 'text' && (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white rounded-[10px] px-3 py-2 text-[14px] font-medium placeholder-[#9B9DA1]"
        />
      )}

      {type === 'textarea' && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white rounded-[10px] px-3 py-2 text-[14px] font-medium placeholder-[#9B9DA1] min-h-[80px] resize-none"
        />
      )}

      {type === 'date' && (
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white rounded-[10px] px-3 py-2 text-[14px] font-medium placeholder-[#9B9DA1] text-black"
          style={{
            colorScheme: 'light',
          }}
          placeholder="YYYY.MM.DD"
        />
      )}

      {type === 'dropdown' && (
        <>
          {isCustomInput ? (
            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              onKeyDown={handleCustomInputSubmit}
              onBlur={handleCustomInputBlur}
              placeholder="카테고리를 입력해주세요"
              className="w-full bg-white rounded-[10px] px-3 py-2 text-[14px] font-medium placeholder-[#9B9DA1]"
              autoFocus
            />
          ) : (
            <button
              type="button"
              onClick={handleDropdownClick}
              className="w-full bg-white rounded-[10px] px-3 py-2 text-[14px] font-medium flex justify-between items-center"
            >
              <span className={value ? 'text-black' : 'text-[#9B9DA1]'}>
                {value || '선택해주세요'}
              </span>
              <img src="/icons/toggle.svg" alt="dropdown toggle" className="w-4 h-4" />
            </button>
          )}

          {showDropdown && (
            <ul className="absolute z-10 mt-1 w-full bg-white rounded-[10px] shadow-md max-h-48 overflow-y-auto">
              {options.map((option) => (
                <li
                  key={option}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-[14px] text-black"
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

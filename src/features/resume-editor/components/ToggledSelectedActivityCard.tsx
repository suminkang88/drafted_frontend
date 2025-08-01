import React, { useState } from 'react';

interface DetailSection {
  title: string;
  content: string;
}

interface ToggledSelectedActivityCardProps {
  header: React.ReactNode;
  sections: DetailSection[];
}

const ToggledSelectedActivityCard: React.FC<ToggledSelectedActivityCardProps> = ({
  header,
  sections,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full rounded-xl border font-noto border-gray-200">
      {/* Header Section */}
      <div className="flex h-[49px] justify-between items-center bg-orange-500 text-white px-4 py-2 rounded-xl">
        <div className="flex-grow">{header}</div>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <img
            src="/icons/toggle.svg"
            alt="toggle"
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Detail Section */}
      {isOpen && (
        <div className="bg-[#FFDBC7] px-3 pt-10 pb-5 space-y-3 rounded-xl text-sm text-gray-800">
          {sections.map((section, index) => (
            <div key={index}>
              <strong>{section.title}</strong>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p>{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToggledSelectedActivityCard;

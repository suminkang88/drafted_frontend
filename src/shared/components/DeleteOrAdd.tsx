import React from 'react';
import { TbTrash } from 'react-icons/tb';
import { FiPlus } from 'react-icons/fi';

interface IconActionsProps {
  onAddClick?: () => void;
  onDeleteClick?: () => void;
  className?: string;
}

export const DeleteOrAdd: React.FC<IconActionsProps> = ({
  onAddClick = () => {},
  onDeleteClick = () => {},
  className = '',
}) => {
  return (
    <div className={`h-[30px] justify-start items-center gap-[15px] inline-flex ${className}`}>
      {/* Plus Icon Container */}
      <button
        onClick={onAddClick}
        className="w-[30px] h-[30px] p-[6.25px] justify-center items-center flex overflow-hidden hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded"
        aria-label="Add item"
      >
        <FiPlus className="w-full h-full object-contain text-[#9B9DA1]" />
      </button>

      {/* Trash Icon Container */}
      <button
        onClick={onDeleteClick}
        className="w-[30px] h-[30px] px-[5px] py-[3.75px] justify-center items-center flex overflow-hidden hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50 rounded"
        aria-label="Delete item"
      >
        <TbTrash className="w-full h-full object-contain text-[#9B9DA1]" />
      </button>
    </div>
  );
};

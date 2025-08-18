import React from 'react';
import { TbTrash } from 'react-icons/tb';
import { FiPlus } from 'react-icons/fi';

interface IconActionsProps {
  onAddClick?: () => void;
  onDeleteClick?: () => void;
  className?: string;
}

const DeleteOrAdd: React.FC<IconActionsProps> = ({
  onAddClick = () => {},
  onDeleteClick = () => {},
  className = '',
}) => {
  return (
    <div className={`h-[35px] justify-start items-center gap-[15px] inline-flex ${className}`}>
      {/* Plus Icon Container */}
      <button
        onClick={onAddClick}
        className="w-[35px] p-[6.25px] justify-center items-center flex overflow-hidden hover:opacity-80 transition-opacity focus:outline-none rounded group"
        aria-label="Add item"
      >
        <FiPlus className="w-full h-full object-contain text-[#9B9DA1] group-hover:text-[#4e5155]" />
      </button>

      {/* Trash Icon Container */}
      <button
        onClick={onDeleteClick}
        className="w-[35px] px-[5px] py-[3.75px] justify-center items-center flex overflow-hidden hover:opacity-80 transition-opacity focus:outline-none rounded group"
        aria-label="Delete item"
      >
        <TbTrash className="w-full h-full object-contain text-[#9B9DA1] group-hover:text-[#4e5155]" />
      </button>
    </div>
  );
};

export default DeleteOrAdd;

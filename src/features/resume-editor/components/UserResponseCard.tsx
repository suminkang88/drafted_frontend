import React from 'react';

interface UserResponseCardProps {
  content: string;
}

const UserResponseCard: React.FC<UserResponseCardProps> = ({ content }) => {
  return (
    <div
      className="w-full max-w-[419px] px-[20px] py-[15px] bg-[#F8F9FA] 
                 border border-[#9B9DA1] border-opacity-100 
                 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] 
                 rounded-[12px] text-[#767676] text-[16px] leading-[1.4] text-left"
    >
      {content}
    </div>
  );
};

export default UserResponseCard;

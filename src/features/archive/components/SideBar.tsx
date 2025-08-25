import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Event } from '@/app/types';
import { TbFilter } from 'react-icons/tb';

type SideBarItem = {
  id: string;
  title: string;
};

interface SideBarProps {
  title: string; // 사이드바 상단 제목을 props로 받음
  items: SideBarItem[];
}

const SideBar: React.FC<SideBarProps> = ({ title, items }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-w-[300px] max-w-md space-y-4">
      <h2 className="text-[17pt] text-[#00193E] font-semibold">{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            // onClick={() => navigate(event.path)}
            className="text-[13pt] text-[#9B9DA1] font-semibold cursor-pointer hover:text-[#00193E] transition-colors"
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;

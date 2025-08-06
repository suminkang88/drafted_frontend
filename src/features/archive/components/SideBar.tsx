import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '@/app/types';

interface SideBarProps {
  title: string; // 사이드바 상단 제목을 props로 받음
  events: Event[];
}

const SideBar: React.FC<SideBarProps> = ({ title, events }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-[17pt] text-[#00193E] font-semibold">{title}</h2>
      <ul className="space-y-2">
        {events.map((event) => (
          <li
            key={event.id}
            onClick={() => navigate(event.path)}
            className="text-[13pt] text-[#9B9DA1] font-semibold cursor-pointer hover:text-[#00193E] transition-colors"
          >
            {event.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;

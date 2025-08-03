import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RecentActivity {
  id: string;
  title: string;
  path: string;
}

interface SideBarProps {
  title: string; // 사이드바 상단 제목을 props로 받음
  activities: RecentActivity[]; // 활동 리스트도 재사용 가능하도록 props화
}

const SideBar: React.FC<SideBarProps> = ({ title, activities }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-[17pt] text-[#00193E] font-semibold">{title}</h2>
      <ul className="space-y-2">
        {activities.map((activity) => (
          <li
            key={activity.id}
            onClick={() => navigate(activity.path)}
            className="text-[13pt] text-[#9B9DA1] font-semibold cursor-pointer hover:text-[#00193E] transition-colors"
          >
            {activity.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;

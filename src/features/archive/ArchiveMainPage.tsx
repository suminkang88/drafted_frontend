import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileCard, SideBar, ActivityShowCard } from '@/features/archive/components';
import DeleteOrAdd from '@/shared/components/DeleteOrAdd';
import SortingBar from '@/shared/components/SortingBar';
import { mockActivities as dummyData } from './dummy';

const mockUser = {
  name: '조은성',
  university: '서울대학교',
  majors: '독어독문학과, 소비자학과, 언론정보학과 전공',
  graduationYear: 2027,
  interest: '서비스기획/UX디자인',
};

// 공통 활동 리스트 (카드 + 사이드바 둘 다 이 리스트에서 필드 분기)
const data = dummyData;
const ArchiveMainPage: React.FC = () => {
  const [sortOption, setSortOption] = useState('진행 중');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activities, setActivities] = useState(data);

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleDelete = () => {
    // api 연결 시 수정
    if (selectedId) {
      setActivities((prev) => prev.filter((a) => a.id !== selectedId));
    }
  };

  // SideBar에서 사용할 최소 필드만 변환
  const recentActivityList = data.slice(0, 3).map((activity) => ({
    id: activity.id,
    title: activity.title,
    path: `/archive/${activity.id}`, // url "activity" > "archive" 로 수정
  }));

  return (
    <div className="min-h-screen bg-[#F9FAFC] px-16 py-10 space-y-10">
      <div className="flex justify-between gap-x-20">
        {/* 왼쪽 영역 */}
        <div className="flex flex-col gap-y-10 min-w-[300px] max-w-[350px]">
          <ProfileCard user={mockUser} />
          <SideBar title="최근 접속한 활동" events={recentActivityList} />
        </div>

        {/* 오른쪽 활동 영역 */}
        <div className="flex-1 flex flex-col space-y-6">
          {/* 상단: 나의 활동 + 버튼 정렬 */}
          <div className="flex justify-between items-start w-full">
            <h2 className="text-[20pt] font-bold text-[#00193E]">나의 활동</h2>

            {/* 버튼과 필터 묶음 */}
            <div className="flex flex-col items-end gap-2">
              <DeleteOrAdd onDeleteClick={handleDelete} />
              <SortingBar
                selected={sortOption}
                onSelect={(val) => setSortOption(val)}
                options={['진행 중', '진행 완료']}
              />
            </div>
          </div>

          {/* 활동 카드 영역 */}
          <div className="flex flex-wrap gap-2.5">
            {activities.map((activity) => (
              <ActivityShowCard
                key={activity.id}
                {...activity}
                isSelected={selectedId === activity.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveMainPage;

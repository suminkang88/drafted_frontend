import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfileCard, SideBar, ActivityShowCard } from '@/features/archive/components';
import DeleteOrAdd from '@/shared/components/DeleteOrAdd';
import SortingBar from '@/shared/components/SortingBar';
import { useActivities, useDeleteActivity } from './hooks/useActivities';
import type { Activity } from './types/activity';

const mockUser = {
  name: '조은성',
  university: '서울대학교',
  majors: '독어독문학과, 소비자학과, 언론정보학과 전공',
  graduationYear: 2027,
  interest: '서비스기획/UX디자인',
};

const ArchiveMainPage: React.FC = () => {
  const { data, isLoading, error } = useActivities();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('진행 중');

  const { mutate: deleteActivity } = useDeleteActivity();
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleDelete = () => {
    if (selectedId) {
      deleteActivity(Number(selectedId), {
        onSuccess: () => {
          setSelectedId(null);
        },
        onError: (error) => {
          console.error('삭제 실패:', error);
          alert('삭제에 실패했습니다.');
        },
      });
    }
  };

  const handleAddClick = () => {
    navigate('/archive/new'); // "new"를 id처럼 보냄
  };

  const recentActivityList =
    data?.activities?.slice(0, 3).map((activity: Activity) => ({
      id: activity.id,
      title: activity.title,
      path: `/archive/${activity.id}`,
    })) || [];

  if (isLoading) return <p className="p-10 text-gray-500">로딩 중입니다...</p>;
  if (error) return <p className="p-10 text-red-500">에러 발생: {(error as Error).message}</p>;

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
          {/* 상단 */}
          <div className="flex justify-between items-start w-full">
            <h2 className="text-[20pt] font-bold text-[#00193E]">나의 활동</h2>
            <div className="flex flex-col items-end gap-2">
              <DeleteOrAdd onAddClick={handleAddClick} onDeleteClick={handleDelete} />
              <SortingBar
                selected={sortOption}
                onSelect={(val) => setSortOption(val)}
                options={['진행 중', '진행 완료']}
              />
            </div>
          </div>

          {/* 활동 카드 */}
          <div className="flex flex-wrap gap-2.5">
            {data?.activities?.map((activity: Activity) => (
              <ActivityShowCard
                key={activity.id}
                id={String(activity.id)}
                title={activity.title}
                type={activity.category}
                period={`${activity.startDate} ~ ${activity.endDate}`}
                highlights={activity.keywords ? activity.keywords.split(',') : []}
                eventCount={0}
                isSelected={selectedId === String(activity.id)}
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

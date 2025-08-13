//delete 할 때 카드 선택하면 표시되도록 고쳐야 함!
//카드에서 보기 버튼 hover하면 검정배경으로 색 바뀌도록 고쳐야 함!
//startDate, endDate 받아온 거 날짜만 뜨도록 고쳐야함!

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileCard, SideBar, ActivityShowCard } from '@/features/archive/components';
import DeleteOrAdd from '@/shared/components/DeleteOrAdd';
import SortingBar from '@/shared/components/SortingBar';
import { useActivities, useDeleteActivity } from './hooks/useActivities';
import type { ActivityRecord } from './types/activity';

const mockUser = {
  name: '조은성',
  university: '서울대학교',
  majors: '독어독문학과, 소비자학과, 언론정보학과 전공',
  graduationYear: 2027,
  interest: '서비스기획/UX디자인',
};

// YYYY-MM-DD 형태만 보여주기
const formatDate = (value?: string | null) => {
  if (!value) return '';
  return value.includes('T') ? value.split('T')[0] : value.slice(0, 10);
};

const ArchiveMainPage: React.FC = () => {
  const { data, isLoading, error } = useActivities();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('진행 중');
  const [isDeleteMode, setIsDeleteMode] = useState(false); // 삭제 모드 토글

  const { mutate: deleteActivity } = useDeleteActivity();
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  // 삭제 버튼: 1) 첫 클릭 → 삭제 모드 ON, 2) 둘째 클릭 → 선택 항목 삭제
  const handleDeleteClick = () => {
    if (!isDeleteMode) {
      setIsDeleteMode(true);
      return;
    }
    if (!selectedId) {
      alert('삭제할 카드를 선택하세요.');
      return;
    }
    deleteActivity(Number(selectedId), {
      onSuccess: () => {
        setSelectedId(null);
        setIsDeleteMode(false);
      },
      onError: (err) => {
        console.error('삭제 실패:', err);
        alert('삭제에 실패했습니다.');
      },
    });
  };

  const handleAddClick = () => {
    navigate('/archive/new');
  };

  const recentActivityList =
    data?.activities?.slice(0, 3).map((activity: ActivityRecord) => ({
      id: activity.id,
      title: activity.title,
      path: `/archive/${activity.id}`,
    })) || [];

  if (isLoading) return <p className="p-10 text-gray-500">로딩 중입니다...</p>;
  if (error) return <p className="p-10 text-red-500">에러 발생: {(error as Error).message}</p>;

  // (선택) 정렬/필터링 로직이 필요하면 여기서 sortOption에 따라 가공
  const activitiesToShow = data?.activities ?? [];

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
              <DeleteOrAdd onAddClick={handleAddClick} onDeleteClick={handleDeleteClick} />
              <SortingBar
                selected={sortOption}
                onSelect={(val) => setSortOption(val)}
                options={['진행 중', '진행 완료']}
              />
              {isDeleteMode && (
                <span className="text-xs text-red-600">삭제 모드: 카드를 선택하세요</span>
              )}
            </div>
          </div>

          {/* 활동 카드 */}
          <div className="flex flex-wrap gap-2.5">
            {activitiesToShow.map((activity: ActivityRecord) => {
              const idStr = String(activity.id);
              const isSelected = selectedId === idStr;
              const period = `${formatDate(activity.startDate)} ~ ${formatDate(activity.endDate)}`;

              return (
                <div
                  key={activity.id}
                  onClick={() => isDeleteMode && handleSelect(idStr)} // 삭제 모드에서만 선택
                  className={[
                    'rounded-2xl transition-all',
                    isDeleteMode ? 'cursor-pointer' : 'cursor-default',
                    isSelected
                      ? 'ring-2 ring-black ring-offset-2 bg-white/70' // 선택 상태: 검정 굵은 테두리 유지
                      : 'ring-1 ring-transparent',
                    isDeleteMode && !isSelected
                      ? 'hover:ring-2 hover:ring-black hover:ring-offset-2' // 삭제 모드 & hover: 검정 굵은 테두리
                      : '',
                  ].join(' ')}
                >
                  <ActivityShowCard
                    id={activity.id}
                    title={activity.title}
                    category={activity.category}
                    period={period} // 날짜만 출력
                    recentEvents={activity.recentEvents}
                    isFavorite={activity.isFavorite}
                    event_count={activity.event_count}
                    isSelected={isSelected}
                    onSelect={handleSelect}
                  />
                </div>
              );
            })}
          </div>

          {/* (선택) 삭제 모드 해제 버튼 등 추가 가능 */}
        </div>
      </div>
    </div>
  );
};

export default ArchiveMainPage;

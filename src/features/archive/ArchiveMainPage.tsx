import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileCard, SideBar, ActivityShowCard } from '@/features/archive/components';
import DeleteOrAdd from '@/shared/components/DeleteOrAdd';
import SortingBar from '@/shared/components/SortingBar';
import { useActivities, useDeleteActivity, usePartialUpdateActivity } from './hooks/useActivities';
import type { ActivityRecord } from './types/activity';
import { useUserProfile } from './hooks/useUserProfile';
import { useUser } from '@clerk/clerk-react';

const formatDate = (value?: string | null) => {
  if (!value) return '';
  return value.includes('T') ? value.split('T')[0] : value.slice(0, 10);
};

const ArchiveMainPage: React.FC = () => {
  const { user } = useUser();
  const { data, isLoading, error } = useActivities();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('진행 중');
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const { mutate: deleteActivity } = useDeleteActivity();
  const { mutate: updateActivity } = usePartialUpdateActivity();
  const navigate = useNavigate();

  // ✅ 즐겨찾기 토글 핸들러
  const handleToggleFavorite = (id: number, current: boolean) => {
    updateActivity(
      { id, data: { isFavorite: !current } },
      {
        onError: (err) => {
          console.error('즐겨찾기 토글 실패:', err);
          alert('즐겨찾기 변경에 실패했습니다.');
        },
      }
    );
  };

  // ✅ 유저 프로필 API
  const userId = user?.id;
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserProfile(userId || '');

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

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

  if (isLoading) return <p className="p-10 text-gray-500">활동 데이터를 불러오는 중...</p>;
  if (error)
    return <p className="p-10 text-red-500">활동 데이터 에러: {(error as Error).message}</p>;

  return (
    <div className="min-h-screen bg-[#F9FAFC] px-16 py-10 space-y-10">
      <div className="flex justify-between gap-x-20">
        {/* 왼쪽 */}
        <div className="flex flex-col gap-y-10 min-w-[300px] max-w-[350px]">
          {isUserLoading && <p className="text-gray-500">프로필 불러오는 중...</p>}
          {isUserError && <p className="text-red-500">프로필 불러오기 실패</p>}
          {userData && <ProfileCard user={userData} />}
          <SideBar title="최근 접속한 활동" items={recentActivityList} />
        </div>

        {/* 오른쪽 */}
        <div className="flex-1 flex flex-col space-y-6">
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

          {/* 활동 카드 리스트 */}
          <div className="flex flex-wrap gap-2.5">
            {data?.activities
              ?.filter((activity: ActivityRecord) => {
                if (sortOption === '진행 중') {
                  return !activity.endDate;
                } else if (sortOption === '진행 완료') {
                  return !!activity.endDate;
                }
                return true;
              })
              .map((activity: ActivityRecord) => {
                const idStr = String(activity.id);
                const isSelected = selectedId === idStr;
                const period = `${formatDate(activity.startDate)} ~ ${formatDate(
                  activity.endDate
                )}`;

                return (
                  <div
                    key={activity.id}
                    onClick={() => isDeleteMode && handleSelect(idStr)}
                    className={[
                      'rounded-2xl transition-all',
                      isDeleteMode ? 'cursor-pointer' : 'cursor-default',
                      isSelected
                        ? 'ring-2 ring-black ring-offset-2 bg-white/70'
                        : 'ring-1 ring-transparent',
                      isDeleteMode && !isSelected
                        ? 'hover:ring-2 hover:ring-black hover:ring-offset-2'
                        : '',
                    ].join(' ')}
                  >
                    <ActivityShowCard
                      id={activity.id}
                      title={activity.title}
                      category={activity.category}
                      period={period}
                      recentEvents={
                        Array.isArray(activity.recentEvents)
                          ? activity.recentEvents.map((event, idx) =>
                              typeof event === 'string' ? { id: idx, event_name: event } : event
                            )
                          : null
                      }
                      isFavorite={activity.isFavorite}
                      event_count={activity.event_count}
                      isSelected={isSelected}
                      onSelect={handleSelect}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveMainPage;

import React, { useState } from 'react';
import ProfileCard from '@/features/archive/components/ProfileCard';
import SideBar from '@/features/archive/components/SideBar';
import DeleteOrAdd from '@/shared/components/DeleteOrAdd';
import SortingBar from '@/shared/components/SortingBar';
import ActivityShowCard from '@/features/archive/components/ActivityShowCard';

const mockUser = {
  name: '조은성',
  university: '서울대학교',
  majors: '독어독문학과, 소비자학과, 언론정보학과 전공',
  graduationYear: 2027,
  interest: '서비스기획/UX디자인',
};

// 공통 활동 리스트 (카드 + 사이드바 둘 다 이 리스트에서 필드 분기)
const mockActivities = [
  {
    id: '1',
    title: '서울대학교 소비자학과 심포지엄',
    type: '교내 동아리',
    period: '2022.02.12 ~ 2024.05.31.',
    highlights: [
      '사설 프로세스 개선 어쩌고 저쩌고 이름이 카드를 넘치게 되면',
      'SNS 리브랜딩',
      '편집 시스템 개선',
    ],
    eventCount: 10,
    isFavorite: true,
  },
  {
    id: '2',
    title: '대학신문 편집장',
    type: '교내 동아리',
    period: '2022.02.12 ~ 2024.05.31.',
    highlights: ['기획 회의 리드', 'SNS 전략 수립'],
    eventCount: 8,
    isFavorite: false,
  },
  {
    id: '3',
    title: '대학신문 편집장 (2)',
    type: '교내 동아리',
    period: '2022.02.12 ~ 2024.05.31.',
    highlights: ['기획 회의 리드', 'SNS 전략 수립'],
    eventCount: 9,
    isFavorite: false,
  },
  {
    id: '4',
    title: '대학신문 편집장 (3)',
    type: '교내 동아리',
    period: '2022.02.12 ~ 2024.05.31.',
    highlights: ['기획 회의 리드', 'SNS 전략 수립'],
    eventCount: 9,
    isFavorite: false,
  },
];

const ArchiveMainPage: React.FC = () => {
  const [sortOption, setSortOption] = useState('진행 중');

  // SideBar에서 사용할 최소 필드만 변환
  const recentActivityList = mockActivities.slice(0, 3).map((activity) => ({
    id: activity.id,
    title: activity.title,
    path: `/activity/${activity.id}`,
  }));

  return (
    <div className="min-h-screen bg-[#F9FAFC] px-16 py-10 space-y-10">
      <div className="flex justify-between gap-x-20">
        {/* 왼쪽 영역 */}
        <div className="flex flex-col gap-y-10 min-w-[300px] max-w-[350px]">
          <ProfileCard user={mockUser} />
          <SideBar title="최근 접속한 활동" activities={recentActivityList} />
        </div>

        {/* 오른쪽 활동 영역 */}
        <div className="flex-1 flex flex-col space-y-6">
          {/* 상단: 나의 활동 + 버튼 정렬 */}
          <div className="flex justify-between items-start w-full">
            <h2 className="text-[20pt] font-bold text-[#00193E]">나의 활동</h2>

            {/* 버튼과 필터 묶음 */}
            <div className="flex flex-col items-end gap-2">
              <DeleteOrAdd />
              <SortingBar
                selected={sortOption}
                onSelect={(val) => setSortOption(val)}
                options={['진행 중', '진행 완료']}
              />
            </div>
          </div>

          {/* 활동 카드 영역 */}
          <div className="flex flex-wrap gap-2.5">
            {mockActivities.map((activity) => (
              <ActivityShowCard key={activity.id} {...activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveMainPage;

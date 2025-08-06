import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '@/features/archive/components/SideBar';
import { UndoButton, ActivityRecordCard } from '@/shared/components';
import { useActivity, usePartialUpdateActivity, useCreateActivity } from './hooks/useActivities';
import { Activity, ActivityRecord } from './types/activity';

interface KeywordProps {
  keywords: string[];
  onAdd: (keyword: string) => void;
  onRemove: (keyword: string) => void;
}

const KeywordInput: React.FC<KeywordProps> = ({ keywords, onAdd, onRemove }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      e.preventDefault();
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {keywords.map((kw, idx) => (
        <div
          key={idx}
          className="px-3 py-1 rounded-md bg-[#00193E] text-white text-sm flex items-center gap-1"
        >
          #{kw}
          <button onClick={() => onRemove(kw)} className="ml-1 text-xs">
            ×
          </button>
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="outline-none text-[#00193E] text-[15pt] bg-[#F8F9FA]"
        placeholder="Enter keyword"
      />
    </div>
  );
};

const ArchiveDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';

  const { data: activity, isLoading, error } = useActivity(!isNew ? id! : '');
  const { mutate: updateActivity } = usePartialUpdateActivity();
  const { mutate: createActivity } = useCreateActivity();

  const [events, setEvents] = useState<ActivityRecord[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [title, setTitle] = useState('새 활동');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');

  // 기존 활동 데이터 로딩
  useEffect(() => {
    if (activity) {
      setTitle(activity.title);
      setCategory(activity.category);
      setStartDate(activity.startDate);
      setEndDate(activity.endDate);
      setRole(activity.role);
      setDescription(activity.description);
      setKeywords(activity.keywords?.split(',') || []);
      setEvents(activity.events ?? []);
    }
  }, [activity]);

  // 키워드 추가 및 제거 함수
  const handleAddKeyword = (keyword: string) => {
    if (!keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const handleSave = () => {
    const payload = {
      title,
      category,
      startDate,
      endDate,
      role,
      description,
      keywords: keywords.join(','),
    };

    if (isNew) {
      // POST 요청
      createActivity(payload, {
        onSuccess: (newActivity) => {
          alert('새 활동이 생성되었습니다.');
          navigate(`/archive/${newActivity.id}`);
        },
        onError: () => alert('생성 중 오류가 발생했습니다.'),
      });
    } else {
      // PATCH 요청
      updateActivity(
        { id: id!, data: payload },
        {
          onSuccess: () => alert('성공적으로 저장되었습니다!'),
          onError: () => alert('저장 중 오류가 발생했습니다.'),
        }
      );
    }
  };

  return (
    <div className="flex gap-16 px-12 py-10 bg-[#F8F9FA] min-h-screen">
      {/* 좌측 사이드바 */}
      <div className="w-[300px] flex flex-col gap-4">
        <UndoButton onClick={() => navigate('/archive')} />
        <SideBar title="목차" events={activity?.events ?? []} />
      </div>

      {/* 우측 본문 */}
      <div className="flex-1 flex flex-col gap-14">
        {/* 제목 및 저장 버튼 */}
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-[30pt] text-[#00193E] font-semibold">{activity?.title}</h1>
            <button
              onClick={handleSave}
              className="text-sm bg-[#00193E] text-white px-4 py-1 rounded-md hover:bg-[#003366]"
            >
              저장
            </button>
          </div>

          {/* 기본 정보 */}
          <div className="flex flex-col gap-4 text-[15pt] text-[#00193E]">
            <div className="flex items-center gap-4">
              <p className="w-[150px] text-[#9B9DA1] font-semibold">카테고리</p>
              <input className="flex-1 bg-[#F8F9FA]" value={activity?.category} readOnly />
            </div>
            <div className="flex items-center gap-4">
              <p className="w-[150px] text-[#9B9DA1] font-semibold">활동 기간</p>
              <input
                className="flex-1 bg-[#F8F9FA]"
                value={`${activity?.startDate} ~ ${activity?.endDate}`}
                readOnly
              />
            </div>
            <div className="flex items-center gap-4">
              <p className="w-[150px] text-[#9B9DA1] font-semibold">역할</p>
              <input className="flex-1 bg-[#F8F9FA]" value={activity?.role} readOnly />
            </div>
            <div className="flex items-center gap-4">
              <p className="w-[150px] text-[#9B9DA1] font-semibold">활동 설명</p>
              <input className="flex-1 bg-[#F8F9FA]" value={activity?.description} readOnly />
            </div>
            <div className="flex items-center gap-4">
              <p className="w-[150px] text-[#9B9DA1] font-semibold">활동 키워드</p>
              <KeywordInput
                keywords={keywords}
                onAdd={handleAddKeyword}
                onRemove={handleRemoveKeyword}
              />
            </div>
          </div>

          <hr className="border-[#9B9DA1] border-t-[1px] mt-6" />
        </div>

        {/* 카드 */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-16">
            {events.length > 0 ? (
              events.map((event: ActivityRecord) => (
                <ActivityRecordCard key={event.id} event={event} />
              ))
            ) : (
              <ActivityRecordCard isEmpty />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveDetailPage;

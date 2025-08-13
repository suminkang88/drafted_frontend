import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '@/features/archive/components/SideBar';
import { UndoButton, ActivityRecordCard } from '@/shared/components';
import { useActivity, usePartialUpdateActivity, useCreateActivity } from './hooks/useActivities';
import { Activity } from './types/activity';

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
  // id=="new"이면 새로 만들기 모드, 아니면 수정 모드
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';

  // 수정 모드에서 상세 조회 (새로 만들기면 요청 비활성화)
  const { data: activity, isLoading, error } = useActivity(id ?? '', {
    enabled: !isNew && !!id,
  });
  const { mutate: updateActivity } = usePartialUpdateActivity(); // PATCH(부분 수정)
  const { mutate: createActivity } = useCreateActivity(); // POST(생성)

  const [title, setTitle] = useState('새 활동');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]); // ← 배열로 관리
  const [events, setEvents] = useState<Activity[]>([]);

  useEffect(() => {
    if (activity && !isNew) {
      setTitle(activity.title);
      setCategory(activity.category);
      setStartDate(activity.startDate);
      setEndDate(activity.endDate);
      setRole(activity.role);
      setDescription(activity.description);

      // keywords 정규화
      if (Array.isArray(activity.keywords)) {
        setKeywords(activity.keywords.filter((x): x is string => typeof x === 'string'));
      } else if (typeof activity.keywords === 'string') {
        const arr = activity.keywords
          .split(',')
          .map((kw: string) =>
            kw.trim().replace(/^[{\[]\s*|\s*[}\]]$/g, '').replace(/^['"]|['"]$/g, '')
          )
          .filter(Boolean);
        setKeywords(arr);
      } else {
        setKeywords([]);
      }

      // events 정규화
      setEvents(Array.isArray(activity.events) ? activity.events : []);
    }
  }, [activity, isNew]);

  const handleAddKeyword = (keyword: string) => {
    if (!keywords.includes(keyword)) {
      setKeywords((prev) => [...prev, keyword]);
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const handleSave = () => {
    if (!title || !category || !startDate || !endDate || !role) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    // 저장 시에만 {a,b} 포맷으로 변환
    const toCurlyCsv = (arr: string[]) =>
      arr.length ? `{${arr.map((s) => s.trim()).filter(Boolean).join(',')}}` : '{}';

    const payload = {
      title,
      category,
      startDate,
      endDate,
      role,
      description,
      keywords: toCurlyCsv(keywords), // 예: {"a","b"}가 아니라 {a,b}로 보냄
    };

    if (isNew) {
      createActivity(payload, {
        onSuccess: (newActivity) => {
          alert('새 활동이 생성되었습니다.');
          navigate(`/archive/${newActivity.id}`);
        },
        onError: (error) => {
          console.error('❌ 활동 생성 중 오류', error);
          console.log('📦 payload 확인:', payload);
          alert('생성 중 오류가 발생했습니다.');
        },
      });
    } else if (id) {
      updateActivity(
        { id, data: payload },
        {
          onSuccess: () => alert('성공적으로 저장되었습니다!'),
          onError: (error) => {
            console.error('❌ 저장 중 오류', error);
            alert('저장 중 오류가 발생했습니다.');
          },
        }
      );
    }
  };

  // 간단 가드(선택): 수정 모드일 때만 표시
  if (!isNew && isLoading) return <div className="p-8">로딩 중…</div>;
  if (!isNew && error) return <div className="p-8">불러오기 실패</div>;

  return (
    <div className="flex gap-16 px-12 py-10 bg-[#F8F9FA] min-h-screen">
      {/* 좌측 사이드바 */}
      <div className="w-[300px] flex flex-col gap-4">
        <UndoButton onClick={() => navigate('/archive')} />
        <SideBar title="목차" events={activity?.events ?? []} />
      </div>

      {/* 우측 본문 */}
      <div className="flex-1 flex flex-col gap-14">
        <div className="space-y-8">
          {/* 제목 + 저장 버튼 */}
          <div className="flex justify-between items-center">
            <input
              type="text"
              className="text-[30pt] font-semibold text-[#00193E] bg-[#F8F9FA] outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="활동 제목을 입력하세요"
            />
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
              <input
                className="flex-1 bg-[#F8F9FA] outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="예: 대외활동"
              />
            </div>
            <div className="flex items-center gap-4">
              <p className="w-[150px] text-[#9B9DA1] font-semibold">활동 기간</p>
              <input
                type="date"
                className="w-[150px] bg-[#F8F9FA] outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span>~</span>
              <input
                type="date"
                className="w-[150px] bg-[#F8F9FA] outline-none"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <p className="w-[150px] text-[#9B9DA1] font-semibold">역할</p>
              <input
                className="flex-1 bg-[#F8F9FA] outline-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="예: 팀장"
              />
            </div>
            <div className="flex items-center gap-4">
              <p className="w-[150px] text-[#9B9DA1] font-semibold">활동 설명</p>
              <textarea
                className="flex-1 bg-[#F8F9FA] outline-none resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="이 활동에 대해 설명해주세요"
                rows={3}
              />
            </div>
            <div className="flex items-center gap-4">
              <p className="w-[150px] text-[#9B9DA1] font-semibold">활동 키워드</p>
              <KeywordInput keywords={keywords} onAdd={handleAddKeyword} onRemove={handleRemoveKeyword} />
            </div>
          </div>

          <hr className="border-[#9B9DA1] border-t-[1px] mt-6" />
        </div>

        {/* 카드 */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-16">
            {events.length > 0 ? (
              events.map((event: Activity) => <ActivityRecordCard key={event.id} event={event} />)
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

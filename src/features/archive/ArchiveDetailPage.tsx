import React, { useState, useEffect } from 'react';
import SideBar from '@/features/archive/components/SideBar';
import { UndoButton, ActivityRecordCard as EventCard, DeleteOrAdd } from '@/shared/components';
import { useNavigate, useParams } from 'react-router-dom';
import { Event, CreateEventInput } from '@/app/types';
import { useActivity, usePartialUpdateActivity, useCreateActivity } from './hooks/useActivities';
import { useUpdateEvent, useEvents, useCreateEvent, useDeleteEvent } from './hooks/useEvents';

const categories = ['공모전', '대외활동', '동아리', '연구', '학회', '인턴십'];

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

// ✅ payload 정리 유틸 함수 (빈 문자열/undefined/null 제거)
const cleanPayload = (data: Record<string, any>): Record<string, any> => {
  const cleaned = { ...data };
  Object.keys(cleaned).forEach((key) => {
    const val = cleaned[key];
    if (val === '' || val === undefined) {
      if (key === 'endDate') {
        cleaned[key] = '9999-12-31'; // ✅ 끝나는 날짜 없음 → 가짜 미래 날짜 (왜냐면 백엔드가 null못받음.. null로 덮어씌울 수가 없음)
      } else {
        delete cleaned[key]; // ✅ 나머지는 그냥 제거
      }
    }
  });
  return cleaned;
};

// ✅ 날짜 정규화 유틸
const normalizeDate = (value?: string) => {
  if (!value) return undefined;
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined;
};

const ArchiveDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';

  const { data: activity, isLoading, error } = useActivity(id ?? '', { enabled: !isNew && !!id });

  const { mutate: updateActivity } = usePartialUpdateActivity();
  const { mutate: createActivity } = useCreateActivity();
  const { mutate: createEvent } = useCreateEvent(!isNew ? id! : '');
  const { mutate: deleteEvent } = useDeleteEvent(!isNew ? id! : '');
  const { mutate: updateEvent } = useUpdateEvent(!isNew ? id! : '');

  const [keywords, setKeywords] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (activity && !isNew) {
      setTitle(activity.title || '');
      setCategory(activity.category || '');
      setStartDate(activity.startDate || '');
      setEndDate(activity.endDate || '');
      setRole(activity.role || '');
      setDescription(activity.description || '');

      if (typeof activity.keywords === 'string') {
        const arr = activity.keywords
          .split(',')
          .map((kw: string) =>
            kw
              .trim()
              .replace(/^[{\[]\s*|\s*[}\]]$/g, '')
              .replace(/^['"]|['"]$/g, '')
          )
          .filter(Boolean);
        setKeywords(arr);
      } else {
        setKeywords([]);
      }
    }
  }, [activity, isNew]);

  const eventsActivityId = !isNew && activity ? activity.id : '';
  const {
    data: events = [],
    isLoading: eventsLoading,
    error: eventsError,
  } = useEvents(eventsActivityId);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newEventId, setNewEventId] = useState<string | null>(null);

  const handleSelect = (id: string) => setSelectedId((prev) => (prev === id ? null : id));
  const handleAddEvent = () => setNewEventId(`temp-${Date.now()}`);

  // ✅ 새 이벤트 저장
  const handleSaveNewEvent = (eventData: CreateEventInput) => {
    if (!eventData.title.trim()) {
      alert('이벤트 제목을 입력해주세요.');
      return;
    }

    const payload: CreateEventInput = cleanPayload({
      title: eventData.title.trim(),
      situation: eventData.situation?.trim(),
      task: eventData.task?.trim(),
      action: eventData.action?.trim(),
      result: eventData.result?.trim(),
      startDate: normalizeDate(eventData.startDate),
      endDate: normalizeDate(eventData.endDate), // ✅ 선택 안 하면 undefined
    });

    console.log('📦 새 이벤트 생성 payload:', payload);

    createEvent(payload, {
      onSuccess: (newEvent) => {
        console.log('✅ 새 이벤트가 생성되었습니다:', newEvent);
        setNewEventId(null);
      },
      onError: (error) => {
        console.error('❌ 이벤트 생성 중 오류:', error);
        alert('이벤트 생성 중 오류가 발생했습니다.');
        setNewEventId(null);
      },
    });
  };

  // ✅ 기존 이벤트 업데이트
  const handleUpdateEvent = (id: string, data: Partial<Event>) => {
    const finalPayload = cleanPayload({
      ...data,
      startDate: normalizeDate(data.startDate),
      endDate: normalizeDate(data.endDate),
    });

    console.log('📦 이벤트 업데이트 payload:', finalPayload);

    updateEvent(
      { id, data: finalPayload },
      {
        onSuccess: () => {
          console.log('✅ 이벤트 업데이트 성공!');
          alert('이벤트가 수정되었습니다.');
        },
        onError: (error) => {
          console.error('❌ 이벤트 업데이트 실패:', error);
          alert('이벤트 수정 중 오류가 발생했습니다.');
        },
      }
    );
  };

  const handleDeleteEvent = () => {
    if (!selectedId || !activity?.id) return alert('삭제할 이벤트를 선택해주세요.');
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    deleteEvent(selectedId, {
      onSuccess: () => {
        console.log('✅ 이벤트 삭제 완료');
        setSelectedId(null);
        alert('이벤트가 삭제되었습니다.');
      },
      onError: (error) => {
        console.error('❌ 이벤트 삭제 실패:', error);
        alert('이벤트 삭제 중 오류가 발생했습니다.');
      },
    });
  };

  const handleAddKeyword = (kw: string) => setKeywords((prev) => [...prev, kw]);
  const handleRemoveKeyword = (kw: string) => setKeywords((prev) => prev.filter((k) => k !== kw));

  // ✅ 활동 저장
  const handleSave = () => {
    if (!title || !category || !startDate || !role) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const toCurlyCsv = (arr: string[]) =>
      arr.length
        ? `{${arr
            .map((s) => s.trim())
            .filter(Boolean)
            .join(',')}}`
        : '{}';

    const payload = cleanPayload({
      title,
      category,
      startDate: normalizeDate(startDate),
      endDate: normalizeDate(endDate), // ✅ 선택 안 하면 undefined
      role,
      description,
      keywords: toCurlyCsv(keywords),
    });

    console.log('📦 전송할 payload:', payload);

    if (isNew) {
      createActivity(payload, {
        onSuccess: (newActivity) => {
          alert('새 활동이 생성되었습니다.');
          navigate(`/archive/${newActivity.id}`);
        },
        onError: (error) => {
          console.error('❌ 활동 생성 중 오류', error);
          alert('생성 중 오류가 발생했습니다.');
        },
      });
    } else if (id) {
      updateActivity(
        { id: id!, data: payload },
        {
          onSuccess: () => {
            console.log('✅ 활동 업데이트 성공!');
            alert('성공적으로 저장되었습니다!');
          },
          onError: (error: any) => {
            console.error('❌ 저장 중 오류', error);
            alert('저장 중 오류가 발생했습니다.');
          },
        }
      );
    }
  };

  return (
    <div className="flex gap-16 px-12 py-5 bg-[#F8F9FA]">
      <div className="flex flex-col gap-4">
        <UndoButton onClick={() => navigate('/archive')} />
        <SideBar title="목차" items={events ?? []} />
      </div>

      <div className="flex-1 flex flex-col gap-10 h-screen overflow-y-auto">
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-gray-500">로딩 중입니다...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-red-500">에러가 발생했습니다: {(error as Error).message}</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {/* 제목 및 활동 기본 정보 */}
            <div className="flex justify-between items-center">
              <input
                type="text"
                className="text-[30pt] font-semibold text-[#00193E] bg-[#F8F9FA] outline-none"
                value={title ?? '새 활동'}
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

            {/* 활동 정보 */}
            <div className="flex flex-col gap-4 text-[13pt] text-[#00193E]">
              <div className="flex items-center gap-4">
                <p className="w-[150px] text-[#9B9DA1] font-semibold">카테고리</p>
                <select
                  className="flex-1 w-[100px] bg-[#F8F9FA] outline-none p-2 rounded"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option key="default" value="" disabled className="text-[#9B9DA1]">
                    선택하세요
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-4">
                <p className="w-[150px] text-[#9B9DA1] font-semibold">활동 기간</p>
                <input
                  type="date"
                  className="w-[150px] bg-[#F8F9FA] outline-none"
                  value={startDate ?? ''}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span>~</span>
                <input
                  type="date"
                  className="w-[150px] bg-[#F8F9FA] outline-none"
                  value={endDate ?? ''}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-4">
                <p className="w-[150px] text-[#9B9DA1] font-semibold">역할</p>
                <input
                  className="flex-1 bg-[#F8F9FA] outline-none"
                  placeholder="예: 편집장"
                  onChange={(e) => setRole(e.target.value)}
                  value={role ?? ''}
                />
              </div>

              <div className="flex items-center gap-4">
                <p className="w-[150px] text-[#9B9DA1] font-semibold">활동 설명</p>
                <input
                  className="flex-1 bg-[#F8F9FA] outline-none"
                  placeholder="예: 리더십, 사회문화 분석..."
                  onChange={(e) => setDescription(e.target.value)}
                  value={description ?? ''}
                />
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

            <DeleteOrAdd
              className="flex sticky top-0 justify-end items-center bg-[#F8F9FA] p-5"
              onDeleteClick={handleDeleteEvent}
              onAddClick={handleAddEvent}
            />

            <div className="flex flex-col gap-16">
              {newEventId && (
                <EventCard
                  tempId={newEventId}
                  onSelect={handleSelect}
                  isSelected={selectedId === newEventId}
                  onSave={handleSaveNewEvent}
                  isNew={true}
                />
              )}

              {events && events.length > 0 ? (
                events.map((event: Event) => (
                  <EventCard
                    key={event.id}
                    onSelect={handleSelect}
                    isSelected={selectedId === event.id}
                    event={event}
                    onSave={(data: Partial<Event>) => handleUpdateEvent(event.id, data)}
                  />
                ))
              ) : (
                <span>이벤트 목록이 없습니다.</span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArchiveDetailPage;

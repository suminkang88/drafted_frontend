import React, { useState, useEffect } from 'react';
import SideBar from '@/features/archive/components/SideBar';
import { UndoButton, ActivityRecordCard as EventCard, DeleteOrAdd } from '@/shared/components';
import { useNavigate, useParams } from 'react-router-dom';
import { Event, CreateEventInput } from '@/app/types';
import { useActivity, usePartialUpdateActivity, useCreateActivity } from './hooks/useActivities';
import { useUpdateEvent, useEvents, useCreateEvent, useDeleteEvent } from './hooks/useEvents';
import { useQueryClient } from '@tanstack/react-query';

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

// ✅ payload 정리
const cleanPayload = (data: Record<string, any>): Record<string, any> => {
  const cleaned = { ...data };
  Object.keys(cleaned).forEach((key) => {
    const val = cleaned[key];
    if (val === '' || val === undefined) {
      if (key === 'endDate' || key === 'end_date') {
        cleaned[key] = null;
      } else {
        delete cleaned[key];
      }
    }
  });
  return cleaned;
};

// ✅ 날짜 포맷 함수
const toDateOnly = (value?: string | null) => {
  if (!value) return '';
  return value.includes('T') ? value.split('T')[0] : value;
};

const normalizeDate = (value?: string) => {
  if (!value) return undefined;
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined;
};

const ArchiveDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';

  const { data: activity, isLoading, error } = useActivity(id ?? '', { enabled: !isNew && !!id });

  const { mutate: updateActivity } = usePartialUpdateActivity();
  const { mutate: createActivity } = useCreateActivity();
  const { mutate: createEvent } = useCreateEvent(!isNew ? id! : '');
  const { mutate: deleteEvent } = useDeleteEvent(!isNew ? id! : '');
  const { mutate: updateEvent } = useUpdateEvent(!isNew ? id! : '');

  const [isEditing, setIsEditing] = useState(false);

  const [keywords, setKeywords] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');

  // ✅ 서버 응답 들어오면 state 세팅
  useEffect(() => {
    if (activity && !isNew) {
      setTitle(activity.title || activity.title || '');
      setCategory(activity.category || '');
      // ✅ snake_case 매핑
      setStartDate(activity.startDate);
      setEndDate(activity.endDate ? activity.endDate : '');
      setRole(activity.role || '');
      setDescription(activity.description || '');

      const rawKeywords = activity.keywords;
      if (typeof rawKeywords === 'string') {
        const arr = rawKeywords
          .replace(/^{|}$/g, '')
          .split(',')
          .map((kw: string) => kw.trim().replace(/^['"]|['"]$/g, ''))
          .filter(Boolean);
        setKeywords(arr);
      } else if (Array.isArray(rawKeywords)) {
        setKeywords(
          (rawKeywords as string[]).filter((kw) => typeof kw === 'string' && kw.trim() !== '')
        );
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

    const payload = cleanPayload({
      title: eventData.title.trim(),
      situation: eventData.situation?.trim(),
      task: eventData.task?.trim(),
      action: eventData.action?.trim(),
      result: eventData.result?.trim(),
      startDate: normalizeDate(toDateOnly(eventData.startDate)),
      endDate: normalizeDate(toDateOnly(eventData.endDate)),
    }) as CreateEventInput;

    createEvent(payload, {
      onSuccess: () => {
        setNewEventId(null);
        queryClient.invalidateQueries({ queryKey: ['activity', id] });
      },
      onError: () => {
        alert('이벤트 생성 중 오류가 발생했습니다.');
        setNewEventId(null);
      },
    });
  };

  // ✅ 이벤트 업데이트
  const handleUpdateEvent = (id: string, data: Partial<Event>) => {
    const finalPayload = cleanPayload({
      ...data,
      start_date: normalizeDate(toDateOnly(data.startDate)),
      end_date: normalizeDate(toDateOnly(data.endDate)),
    });

    updateEvent(
      { id, data: finalPayload },
      {
        onSuccess: () => {
          alert('이벤트가 수정되었습니다.');
          queryClient.invalidateQueries({ queryKey: ['activity', id] });
        },
        onError: () => {
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
        setSelectedId(null);
        alert('이벤트가 삭제되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['activity', id] });
      },
      onError: () => {
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

    const payload = cleanPayload({
      title,
      category,
      start_date: normalizeDate(startDate),
      end_date: normalizeDate(endDate),
      role,
      description,
      keywords,
    });

    if (isNew) {
      createActivity(payload, {
        onSuccess: (newActivity) => {
          alert('새 활동이 생성되었습니다.');
          queryClient.invalidateQueries({ queryKey: ['activity', newActivity.id] });
          navigate(`/archive/${newActivity.id}`);
        },
        onError: () => {
          alert('생성 중 오류가 발생했습니다.');
        },
      });
    } else if (id) {
      updateActivity(
        { id: id!, data: payload },
        {
          onSuccess: () => {
            alert('성공적으로 저장되었습니다!');
            queryClient.invalidateQueries({ queryKey: ['activity', id] });
          },
          onError: () => {
            alert('저장 중 오류가 발생했습니다.');
          },
        }
      );
    }
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      handleSave();
    }
    setIsEditing((prev) => !prev);
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
              {isEditing ? (
                <input
                  type="text"
                  className="text-[30pt] font-semibold text-[#00193E] bg-[#F8F9FA] outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="활동 제목을 입력하세요"
                />
              ) : (
                <h1 className="text-[30pt] font-semibold text-[#00193E]">{title || '새 활동'}</h1>
              )}
              <button
                onClick={handleToggleEdit}
                className="text-sm bg-[#00193E] text-white px-4 py-1 rounded-md hover:bg-[#003366] transition"
              >
                {isEditing ? '저장' : '수정'}
              </button>
            </div>

            {/* 활동 정보 */}
            <div className="flex flex-col gap-4 text-[13pt] text-[#00193E]">
              {/* 카테고리 */}
              <div className="flex items-center gap-4">
                <p className="w-[150px] text-[#9B9DA1] font-semibold">카테고리</p>
                {isEditing ? (
                  <select
                    className="flex-1 w-[100px] bg-[#F8F9FA] outline-none p-2 rounded"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option value="" disabled>
                      선택하세요
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span>{category || '-'}</span>
                )}
              </div>

              {/* 활동 기간 */}
              <div className="flex items-center gap-4">
                <p className="w-[150px] text-[#9B9DA1] font-semibold">활동 기간</p>
                {isEditing ? (
                  <>
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
                  </>
                ) : (
                  <span>
                    {startDate ? startDate : ' '} ~ {endDate ? endDate : ' '}
                  </span>
                )}
              </div>

              {/* 역할 */}
              <div className="flex items-center gap-4">
                <p className="w-[150px] text-[#9B9DA1] font-semibold">역할</p>
                {isEditing ? (
                  <input
                    className="flex-1 bg-[#F8F9FA] outline-none"
                    placeholder="예: 편집장"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                ) : (
                  <span>{role || '-'}</span>
                )}
              </div>

              {/* 설명 */}
              <div className="flex items-center gap-4">
                <p className="w-[150px] text-[#9B9DA1] font-semibold">활동 설명</p>
                {isEditing ? (
                  <input
                    className="flex-1 bg-[#F8F9FA] outline-none"
                    placeholder="예: 리더십, 사회문화 분석..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                ) : (
                  <span>{description || '-'}</span>
                )}
              </div>

              {/* 키워드 */}
              <div className="flex items-center gap-4">
                <p className="w-[150px] text-[#9B9DA1] font-semibold">활동 키워드</p>
                {isEditing ? (
                  <KeywordInput
                    keywords={keywords}
                    onAdd={handleAddKeyword}
                    onRemove={handleRemoveKeyword}
                  />
                ) : (
                  <div className="flex gap-2">
                    {keywords.length > 0 ? (
                      keywords.map((kw, i) => (
                        <span key={i} className="px-2 py-1 bg-[#00193E] text-white text-sm rounded">
                          #{kw}
                        </span>
                      ))
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <hr className="border-[#9B9DA1] border-t-[1px] mt-6" />

            {/* 이벤트 카드 영역 */}
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

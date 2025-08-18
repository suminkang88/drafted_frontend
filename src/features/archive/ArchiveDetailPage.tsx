import React, { useState, useEffect } from 'react';
import SideBar from '@/features/archive/components/SideBar';
import { UndoButton, ActivityRecordCard as EventCard, DeleteOrAdd } from '@/shared/components';
import { useNavigate, useParams } from 'react-router-dom';
import { mockActivities as dummyData } from './dummy';
import { Event, CreateEventInput } from '@/app/types';
import { useActivity, usePartialUpdateActivity, useCreateActivity } from './hooks/useActivities';
import { useEvents, useCreateEvent, useDeleteEvent } from './hooks/useEvents';

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

const ArchiveDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const isNew = id === 'new';

  const {
    data: activity,
    isLoading,
    error,
  } = useActivity(id ?? '', {
    enabled: !isNew && !!id,
  });

  const { mutate: updateActivity } = usePartialUpdateActivity();
  const { mutate: createActivity } = useCreateActivity();
  const { mutate: createEvent } = useCreateEvent(!isNew ? id! : '');
  const { mutate: deleteEvent } = useDeleteEvent(!isNew ? id! : '');
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

      // keywords 정규화 - 이미 정규화된 데이터이므로 간단하게 처리
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

  // 이벤트 불러오기
  const eventsActivityId = !isNew && activity ? activity.id : '';

  const {
    data: events = [],
    isError,
    isLoading: eventsLoading,
    error: eventsError,
  } = useEvents(eventsActivityId);

  // 이벤트 데이터 로깅
  useEffect(() => {
    if (events && events.length > 0) {
      console.log('📋 받아온 이벤트 목록:', events);
    } else if (!eventsLoading && !eventsError && eventsActivityId) {
      console.log('📋 이벤트가 없습니다. (activityId:', eventsActivityId, ')');
    } else if (!eventsActivityId) {
      console.log('📋 activityId가 없어서 이벤트를 조회하지 않습니다.');
    }
  }, [events, eventsLoading, eventsError, eventsActivityId]);

  if (eventsError) {
    console.error('❌ 이벤트 조회 에러:', eventsError);
  }

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newEventId, setNewEventId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleAddEvent = () => {
    // 새 이벤트 생성을 위한 임시 ID 생성
    const tempId = `temp-${Date.now()}`;
    setNewEventId(tempId);
  };

  const handleSaveNewEvent = (eventData: CreateEventInput) => {
    if (!eventData.title.trim()) {
      alert('이벤트 제목을 입력해주세요.');
      return;
    }

    // title만 있어도 생성 가능하도록 payload 생성
    const payload: CreateEventInput = {
      title: eventData.title.trim(),
    };

    // 추가 필드가 있으면 포함
    if (eventData.situation?.trim()) {
      payload.situation = eventData.situation.trim();
    }
    if (eventData.task?.trim()) {
      payload.task = eventData.task.trim();
    }
    if (eventData.action?.trim()) {
      payload.action = eventData.action.trim();
    }
    if (eventData.result?.trim()) {
      payload.result = eventData.result.trim();
    }

    console.log('📦 새 이벤트 생성 payload:', payload);

    createEvent(payload, {
      onSuccess: (newEvent) => {
        console.log('✅ 새 이벤트가 생성되었습니다:', newEvent);
        setNewEventId(null); // 임시 ID 제거
      },
      onError: (error) => {
        console.error('❌ 이벤트 생성 중 오류:', error);
        alert('이벤트 생성 중 오류가 발생했습니다.');
        setNewEventId(null); // 에러 시에도 임시 ID 제거
      },
    });
  };

  // const deleteEventMutation = useMutation({
  //   mutationFn: ({ activityId, id }: { activityId: string; id: string }) =>
  //     eventApi.deleteEvent(activityId, id),
  //   onSuccess: () => {
  //     console.log('✅ 삭제 완료');
  //     queryClient.invalidateQueries({ queryKey: ['events', activity.id] });
  //   },
  //   onError: (error) => {
  //     console.error('❌ 삭제 실패:', error);
  //   },
  // });

  const handleDeleteEvent = () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;
    if (selectedId && activity?.id) {
      console.log(`🗑️ 이벤트 삭제 시작: eventId=${selectedId}, activityId=${activity.id}`);

      deleteEvent(selectedId, {
        onSuccess: () => {
          console.log('✅ 이벤트 삭제 완료');
          setSelectedId(null); // 선택 해제
          alert('이벤트가 삭제되었습니다.');
        },
        onError: (error) => {
          console.error('❌ 이벤트 삭제 실패:', error);
          alert('이벤트 삭제 중 오류가 발생했습니다.');
        },
      });
    } else {
      alert('삭제할 이벤트를 선택해주세요.');
    }
  };
  const handleAddKeyword = (kw: string) => setKeywords((prev) => [...prev, kw]);
  const handleRemoveKeyword = (kw: string) => setKeywords((prev) => prev.filter((k) => k !== kw));

  const handleSave = () => {
    if (!title || !category || !startDate || !endDate || !role) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    // 저장 시에만 {a,b} 포맷으로 변환
    const toCurlyCsv = (arr: string[]) =>
      arr.length
        ? `{${arr
            .map((s) => s.trim())
            .filter(Boolean)
            .join(',')}}`
        : '{}';

    // 백엔드에서 기대하는 필드명으로 변환
    const payload = {
      title,
      category,
      startDate,
      endDate,
      role,
      description,
      keywords: toCurlyCsv(keywords), // 예: {a,b} 형식으로 보냄
    };

    // undefined 값 제거
    Object.keys(payload).forEach((key) => {
      if (payload[key as keyof typeof payload] === undefined) {
        delete payload[key as keyof typeof payload];
      }
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
          console.log('📦 payload 확인:', payload);
          alert('생성 중 오류가 발생했습니다.');
        },
      });
    } else if (id) {
      console.log(`🔄 활동 ID ${id} 업데이트 시작...`);
      updateActivity(
        { id: id!, data: payload },
        {
          onSuccess: () => {
            console.log('✅ 활동 업데이트 성공!');
            alert('성공적으로 저장되었습니다!');
          },
          onError: (error: any) => {
            console.error('❌ 저장 중 오류', error);
            console.error('❌ 에러 상세:', {
              message: error?.message,
              response: error?.response?.data,
              status: error?.response?.status,
              statusText: error?.response?.statusText,
            });
            alert(
              `저장 중 오류가 발생했습니다.\n상태: ${error?.response?.status}\n메시지: ${error?.response?.data?.message || error?.message}`
            );
          },
        }
      );
    }
  };

  return (
    <div className="flex gap-16 px-12 py-5 bg-[#F8F9FA]">
      {/* 좌측 사이드바 */}
      <div className="flex flex-col gap-4">
        <UndoButton onClick={() => navigate('/archive')} />
        <SideBar title="목차" items={events ?? []} />
      </div>

      {/* 우측 본문 */}
      <div className="flex-1 flex flex-col gap-10 h-screen overflow-y-auto">
        {/* 로딩 상태 */}
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-gray-500">로딩 중입니다...</p>
          </div>
        )}

        {/* 에러 상태 */}
        {error && (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-red-500">에러가 발생했습니다: {(error as Error).message}</p>
          </div>
        )}

        {/* 정상 데이터 표시 */}
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
                  {categories.map((cat) => {
                    return (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    );
                  })}
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
              {/* 새로 생성된 이벤트가 있으면 맨 위에 표시 */}
              {newEventId && (
                <EventCard
                  tempId={newEventId}
                  onSelect={handleSelect}
                  isSelected={selectedId === newEventId}
                  onSave={handleSaveNewEvent}
                  isNew={true}
                />
              )}

              {/* 기존 이벤트 목록 */}
              {events && events.length > 0 ? (
                events.map((event: Event) => (
                  <EventCard
                    key={event.id}
                    onSelect={handleSelect}
                    isSelected={selectedId === event.id}
                    event={event}
                  />
                ))
              ) : (
                <>
                  <span>이벤트 목록이 없습니다.</span>
                  {/* <ActivityRecordCard onSelect={handleSelect} /> */}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArchiveDetailPage;

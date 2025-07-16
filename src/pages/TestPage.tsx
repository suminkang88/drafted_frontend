import SearchBar from '@/shared/components/SearchBar';
import SortingBar from '@/shared/components/SortingBar';
import UndoButton from '@/shared/components/UndoButton';
import ActivityRecordCard from '@/shared/components/ActivityRecordCard';
import ChatInput from '@/features/resume-editor/components/ChatInput';
import ToggledSelectedActivityCard from '@/features/resume-editor/components/ToggledSelectedActivityCard';
import AutoSaved, { useDebounceSave } from '@/features/resume-editor/components/AutoSaved';
import DragContentCard from '@/features/resume-editor/components/DragContentCard';
import React, { useState } from 'react';

const sortOptions = ['시간순', '기여도 높은 순', '시간 역순', 'option을 프롭으로 전달해요'];

export default function TestPage() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  const [text, setText] = useState('');
  const { status, lastSaved } = useDebounceSave(text, 1000); // 1초 디바운스
  return (
    <div style={{ padding: '2rem' }}>
      <SearchBar value={searchValue} onChange={setSearchValue} />
      <SortingBar selected={selectedSort} onSelect={setSelectedSort} options={sortOptions} />
      <UndoButton onClick={() => console.log('Undo clicked')} bgColorClass="bg-gray-200" />
      <ActivityRecordCard />
      <ChatInput />
      <ToggledSelectedActivityCard
        header={<span>서비스기획(PM) 온라인 교육 수강</span>}
        sections={[
          {
            title: '활동 요약',
            content: '연말부터 8주간 서비스기획 직무 관련 국비지원 프로그램 수료...',
          },
          {
            title: '나의 활동 및 개선',
            content: '‘지그재그’ 커머스 플랫폼의 커뮤니티 기능을 개선하는 파일럿 프로젝트...',
          },
          {
            title: '결과 및 성과',
            content: '긍정적인 피드백, PM 직무에 대한 이해도 제고...',
          },
        ]}
      />
      <div className="w-[700px] mt-10 p-4 border rounded">
        <h1 className="text-lg font-semibold mb-2">글 작성</h1>

        <textarea
          className="w-full h-48 p-2 border rounded resize-none"
          placeholder="내용을 입력하세요..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <AutoSaved status={status} lastSaved={lastSaved} />
      </div>
      <DragContentCard />
    </div>
  );
}

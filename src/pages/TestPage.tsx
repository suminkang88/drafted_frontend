import React, { useState } from 'react';

import {
  SearchBar,
  SortingBar,
  UndoButton,
  ActivityRecordCard,
  SelectedActivityCard,
  ApplicationTitle,
  Header,
  GuideLineCard,
  QuestionShowCard,
  BlackBgButton,
  GrayBgButton,
  DeleteOrAdd,
  QuestionSelectButton,
} from '@/shared/components';
import {
  AISuggestionCard,
  ChatInput,
  ToggledSelectedActivityCard,
  AutoSaved,
  useDebounceSave,
  DragContentCard,
  ContentInputBox,
} from '../features/resume-editor/components';
import { activities } from '@/features/resume-setup/components/dummy';
import {
  SideBar,
  EventRecommendationCard,
  BasicInfoInputCard,
  QuestionInputCard,
  StepText,
  ActivityAddModal,
  ActivitySearchModal,
} from '@/features/resume-setup/components';

const sortOptions = ['시간순', '기여도 높은 순', '시간 역순', 'option을 프롭으로 전달해요'];

export default function TestPage() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

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
        {/* <AutoSaved status={status} lastSaved={lastSaved} /> */}
      </div>
      <DragContentCard />
      <GuideLineCard />
      <QuestionShowCard question="이 활동을 통해 어떤 경험을 얻었나요?" />
      <SelectedActivityCard
        event="서비스기획 동아리"
        activity="프로젝트 기획 및 실행"
        onClose={() => console.log('Card closed')}
      />
      <ApplicationTitle targetName="서비스기획 동아리" />
      <Header />

      <BlackBgButton />
      <GrayBgButton innerText="수정하기" />
      <DeleteOrAdd />
      <QuestionSelectButton questionNumbers={3} />

      <div className="p-30">
        <AISuggestionCard AISuggestion="사용자 경험을 고민하며 비즈니스 가치를 만들어가는 서비스 기획의 과정이 흥미롭게 다가왔습니다." />
        <ContentInputBox />
      </div>

      <div className="p-40">
        <SideBar></SideBar>
      </div>

      <>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-700 text-white rounded-lg"
        >
          활동 추가
        </button>

        {showAddModal && <ActivityAddModal onClose={() => setShowAddModal(false)} />}
      </>
      <>
        <div className="p-10 font-noto">
          <button
            onClick={() => setShowSearchModal(true)}
            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
          >
            활동 검색하기
          </button>

          {showSearchModal && <ActivitySearchModal onClose={() => setShowSearchModal(false)} />}
        </div>
      </>
      <div className="p-10 space-y-10">
        {/* 단계 안내 텍스트 */}
        <StepText step={1} description="지원서 작성을 위해 기본 정보를 입력해주세요" />

        {/* 기본 정보 입력 카드 */}
        <section className="border p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">📝 BasicInfoInputCard 테스트</h2>
          <BasicInfoInputCard />
        </section>

        {/* 문항 입력 카드 */}
        <section className="border p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">📄 QuestionInputCard 테스트</h2>
          <QuestionInputCard
            index={0}
            onLengthChange={function (index: number, value: number): void {
              throw new Error('Function not implemented.');
            }}
          />
        </section>
      </div>
    </div>
  );
}

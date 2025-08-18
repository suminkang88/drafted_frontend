import React, { useState } from 'react';
import { GrayBgButton, BlackBgButton } from '@/shared/components';
import {
  AIResponseCard,
  AISuggestionCard,
  AutoSaved,
  ChatInput,
  ContentInputBox,
  DragContentCard,
  ToggledSelectedActivityCard,
  UserResponseCard,
} from './components';

import { useDebounceSave } from './components';

import {
  ApplicationTitle,
  QuestionSelectButton,
  QuestionShowCard,
  GuideLineCard,
} from '@/shared/components';

import Header from '@/shared/layout/Header';

interface ActivityDetailSection {
  title: string;
  content: string;
}
const dummySections: ActivityDetailSection[] = [
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
];

type MessageType = 'drag' | 'user';

interface MessageItem {
  type: MessageType;
  content: string;
}

//
const ResumeEditPage = () => {
  const [text, setText] = useState('');
  const { status, lastSaved } = useDebounceSave(text, 1000);

  const [dragText, setDragText] = useState(''); // 임시 드래그 상태
  const [chatText, setChatText] = useState('');

  const [messageThread, setMessageThread] = useState<MessageItem[]>([]);

  //임시 questionId(guidelinecard의 api 연결을 위함)
  const questionId = 4;
  return (
    <>
      <div className="flex w-full min-h-screen bg-gray-50">
        {/* 좌측 영역 */}
        <div className="w-[1200px] p-6 bg-white border-r border-gray-200">
          <div className="flex justify-between items-end w-full">
            <ApplicationTitle targetName={'멋쟁이 사자처럼 13기'} />
            <AutoSaved status={status} lastSaved={lastSaved} />
          </div>

          <QuestionSelectButton
            className="flex justify-end"
            questionNumbers={4}
            extraLabel="전체 보기"
          />
          {/* 질문 영역 */}
          {/* <div className="flex justify-end items-start mb-4">
            <QuestionSelectButton questionNumbers={4} />
            <GrayBgButton
              className="w-20 h-7 p-[5px] mt-[15.5px] rounded-[10px] justify-center items-center gap-[5px] flex transition-colors duration-200"
              onClick={() => console.log('전체 보기 클릭')}
              textClassName="text-center text-[13px] font-semibold font-noto"
              innerText="전체 보기"
            />
          </div> */}

          <div className="mb-4">
            <QuestionShowCard question="멋쟁이사자처럼 13기에 지원한 동기를 적어주세요" />
          </div>

          <div className="mb-4">
            <ToggledSelectedActivityCard
              event="서비스기획 동아리"
              activity="프로젝트 기획 및 실행"
              sections={dummySections}
            />
          </div>

          <div>
            <ContentInputBox
              text={text}
              setText={setText}
              onTextDrag={(selectedText) => setDragText(selectedText)}
            />
          </div>
        </div>

        {/* 우측 가이드 및 메시지 스레드 */}
        {/* 우측 가이드 및 메시지 스레드 */}
        <div className="flex flex-col p-6 flex-1">
          {/* 상단: 가이드 카드 */}
          <div className="mb-4">
            <GuideLineCard questionId={questionId} />
            {/*여기 가이드라인 컴포넌트 안에 들어가서 수정해야 할 듯! api넣어야해*/}
          </div>

          <div className="flex flex-col justify-end h-full">
            {/* 메시지 스레드 (스크롤 가능) */}
            <div className="flex flex-col items-end space-y-4 overflow-y-auto max-h-[300px] pr-2 mb-4">
              {messageThread.map((msg, idx) => (
                <div key={idx}>
                  {msg.type === 'user' ? (
                    <UserResponseCard content={msg.content} />
                  ) : (
                    <DragContentCard content={msg.content} />
                  )}
                </div>
              ))}
              {dragText && <DragContentCard content={dragText} />}
            </div>

            {/* 하단 고정 입력창 */}
            <div className="mt-auto">
              <ChatInput
                text={chatText}
                setText={setChatText}
                onSubmit={(text) => {
                  if (text.trim()) {
                    const newThread = [...messageThread];
                    if (dragText.trim()) {
                      newThread.push({ type: 'drag', content: dragText });
                      setDragText('');
                    }
                    newThread.push({ type: 'user', content: text });
                    setMessageThread(newThread);
                    setChatText('');
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResumeEditPage;

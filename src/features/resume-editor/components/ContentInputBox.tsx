import React, { useState } from 'react';
import { BlackBgButton } from '@/shared/components';
//import { AutoSaved, useDebounceSave } from '@/features/resume-editor/components';

type ContentInputBoxProps = {
  // other props
  text: string;
  limit: number;
  setText: (text: string) => void;
  onTextDrag?: (text: string) => void;
};

export const ContentInputBox: React.FC<ContentInputBoxProps> = ({
  text,
  limit,
  setText,
  onTextDrag,
}) => {
  function onQuestionClick(): void {}
  function onCopyClick(): void {}

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selected = selection?.toString();
    if (onTextDrag) {
      onTextDrag(selected || '');
    }
  }; //이게뭐지?

  const [focused, setFocused] = useState(false);

  //const { status, lastSaved } = useDebounceSave(text, 1000); // 1초 후 자동 저장

  return (
    <div className="flex flex-wrap items-end gap-[13px_349px] relative">
      <div className="relative w-full h-[379px]">
        <div className="relative h-[379px] rounded-[10px]">
          <div className="absolute inset-0 bg-white rounded-[10px] border-[0.5px] border-solid border-[#9b9da0]" />

          {/* placeholder 텍스트 (text 없고, 포커스 안됐을 때만 보임) */}
          {text === '' && !focused && (
            <div className="absolute inset-0 flex items-center justify-start px-[27px] py-[30px] pointer-events-none">
              <p className="font-noto font-normal text-[#9b9da0] text-lg leading-[30px] whitespace-pre-line">
                이 보드에서 자유롭게 생각을 정리해보세요.
                {'\n'}중간에 문장이나 단어를 드래그해서 AI에게 바로 수정 요청도 가능해요.
                {'\n'}또, AI 채팅에서 마음에 드는 답변이 있다면 이곳에 쉽게 붙여넣을 수 있어요!
              </p>
            </div>
          )}

          {/* 실제 textarea */}
          <textarea
            className="
          absolute inset-0 w-full h-full
          bg-transparent
          outline-none
          resize-none
          px-[27px] py-[30px]
          [font-family:'Noto_Sans-DisplayRegular',Helvetica]
          font-normal
          text-[#1a1a1a]
          text-lg
          leading-[30px]
        "
            value={text}
            onChange={(e) => setText(e.target.value)}
            onMouseUp={handleMouseUp}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />

          {/* 글자 수 */}
          <div className="absolute bottom-[35px] right-[27px] text-[#9b9da0] text-sm font-semibold font-noto">
            {text.length} / {limit}
          </div>
        </div>
      </div>

      <div className="flex w-[306px] items-center justify-between relative">
        <button className="flex w-[149px] items-center justify-center gap-[5px] p-[5px] relative bg-[#e4e8ee] rounded-[10px]">
          <div className="relative flex-1 mt-[-1.00px] font-noto font-semibold text-[#9b9da0] text-[13px] text-center tracking-[0] leading-[normal]">
            내 글 완성도 평가
          </div>
        </button>

        <button
          onClick={onQuestionClick}
          className="flex w-[149px] items-center justify-center gap-[5px] p-[5px] relative bg-[#e4e8ee] rounded-[10px]"
        >
          <div className="relative flex-1 mt-[-1.00px] font-noto font-semibold text-[#9b9da0] text-[13px] text-center tracking-[0] leading-[normal]">
            면접 예상 질문
          </div>
        </button>
      </div>

      <div className="absolute bottom-0 right-0">
        <BlackBgButton
          onClick={onCopyClick}
          className="w-[130px] font-noto h-auto relative mt-[-1.00px] font-semibold text-center tracking-[0] leading-[normal]"
          textClassName="text-[14px]"
          innerText="클립보드 복사"
        />
      </div>
    </div>
  );
};

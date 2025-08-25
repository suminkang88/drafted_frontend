import React, { useState } from 'react';

interface ChatInputProps {
  text: string;
  setText: (text: string) => void;
  onSubmit: (text: string) => void;
  disabled?: boolean;
  isLoading?: boolean; // ⬅️ 추가
}

const ChatInput = ({ text, setText, onSubmit }: ChatInputProps) => {
  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      handleSubmit(); // 메시지 전송
    }
  };

  return (
    <div className="relative w-full">
      <textarea
        className="w-full h-24 p-4 pr-10 font-noto text-sm text-gray-700 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="지원서 초안을 작성하면서 궁금한 점, 작성된 지원서에 대한 피드백 등 자유롭게 채팅하세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown} // ✅ 엔터 이벤트 처리
      />
      <button
        className="absolute bottom-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
        onClick={handleSubmit}
      >
        <img src="/icons/chatbutton.svg" alt="chat send" className="size-[30px]" />
      </button>
    </div>
  );
};

export default ChatInput;

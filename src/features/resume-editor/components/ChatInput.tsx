import React, { useState } from 'react';

const ChatInput = () => {
  const [value, setValue] = useState('');

  return (
    <div className="relative max-w-md">
      <textarea
        className="w-full h-24 p-4 pr-10 font-noto text-sm text-gray-700 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="지원서 초안을 작성하면서 궁금한 점, 작성된 지원서에 대한 피드백 등 자유롭게 채팅하세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="absolute bottom-2 right-2 w-6 h-6 rounded-full flex items-center justify-center">
        <img src="/icons/chatbutton.svg" alt="chat send" className="size-[30px]" />
      </button>
    </div>
  );
};

export default ChatInput;

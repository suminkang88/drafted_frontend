import React, { useRef, useState } from 'react';
import clsx from 'clsx';

interface QuestionInputProps {
  index: number;
  onLengthChange: (index: number, value: number) => void;
  onContentChange: (content: string) => void;
}

const PREDEFINED_LENGTHS = [300, 500, 700, 1000];

const QuestionInputCard: React.FC<QuestionInputProps> = ({
  index,
  onLengthChange,
  onContentChange,
}) => {
  const [selectedLength, setSelectedLength] = useState<number | null>(null);
  const [customInputMode, setCustomInputMode] = useState(false);
  const [customLength, setCustomLength] = useState('');
  const [customLengths, setCustomLengths] = useState<number[]>([]);
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onContentChange(newContent);

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  const handleLengthClick = (value: number) => {
    setSelectedLength(value);
    setCustomInputMode(false);
    onLengthChange(index, value);
  };

  const handleCustomLengthSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const num = parseInt(customLength);
      if (!isNaN(num)) {
        setCustomLengths((prev) => [...prev, num]);
        setSelectedLength(num);
        onLengthChange(index, num);
        setCustomInputMode(false);
        setCustomLength('');
      }
    }
  };

  const buttonClass = (len: number) =>
    clsx(
      'px-3 py-2 rounded-md text-[13px] font-medium transition',
      selectedLength === len
        ? 'bg-[#00193E] text-[#E4E8EE]'
        : 'bg-[#E4E8EE] text-[#00193E] hover:bg-[#00193E] hover:text-[#E4E8EE]'
    );

  return (
    <div>
      {/* 문항 제목 */}
      <p className="text-[#00193E] text-[20px] font-semibold mb-2">문항 {index + 1}</p>

      {/* 입력 텍스트박스 */}
      <textarea
        ref={textareaRef}
        className="w-full resize-none overflow-hidden border border-gray-300 rounded-md p-4 text-sm"
        placeholder="지원서 주요 문항을 붙여넣어 주세요."
        rows={1}
        value={content}
        onChange={handleTextareaChange}
      />

      {/* 버튼 라인 */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        {PREDEFINED_LENGTHS.map((len) => (
          <button key={len} className={buttonClass(len)} onClick={() => handleLengthClick(len)}>
            {len}자
          </button>
        ))}

        {/* 직접입력 버튼 왼쪽에 커스텀 버튼 배치 */}
        {customLengths.map((len) => (
          <button
            key={`custom-${len}`}
            className={buttonClass(len)}
            onClick={() => handleLengthClick(len)}
          >
            {len}자
          </button>
        ))}

        {customInputMode ? (
          <input
            autoFocus
            type="number"
            value={customLength}
            onChange={(e) => setCustomLength(e.target.value)}
            onKeyDown={handleCustomLengthSubmit}
            className="w-20 px-2 py-2 border border-gray-300 text-[13px] rounded-md"
            placeholder="입력"
          />
        ) : (
          <button
            onClick={() => setCustomInputMode(true)}
            className="px-3 py-2 border border-gray-300 text-[13px] font-medium rounded-md hover:bg-[#00193E] hover:text-[#E4E8EE] transition"
          >
            직접 입력
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionInputCard;

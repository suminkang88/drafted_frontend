import React, { useState } from 'react';
import QuestionInputCard from '@/features/resume-setup/components/QuestionInputCard';

const QuestionInputPage = () => {
  const [questions, setQuestions] = useState([0, 1, 2, 3]);

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, prev.length]);
  };

  // ✅ onLengthChange 함수 정의 (빈 기능으로 일단 전달)
  const handleLengthChange = (index: number, value: number) => {
    console.log(`문항 ${index + 1}의 글자 수 제한: ${value}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#F9FAFC] flex flex-col items-center px-4 py-10">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-[#00193E] mb-4">STEP 2</h2>
        <p className="text-4xl font-semibold text-[#00193E]">지원서 문항 입력하기</p>
      </div>

      <div
        className={`w-full max-w-4xl transition-all duration-300 ${
          questions.length > 4 ? 'max-h-[70vh] overflow-y-auto' : ''
        }`}
      >
        {questions.map((q, index) => (
          <div key={q} className="mb-10">
            <QuestionInputCard index={index} onLengthChange={handleLengthChange} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleAddQuestion}
          className="bg-[#00193E] text-white px-6 py-2 rounded hover:bg-[#00193E]/90 transition"
        >
          문항 추가
        </button>
      </div>
    </div>
  );
};

export default QuestionInputPage;

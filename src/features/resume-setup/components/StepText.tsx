import React from 'react';

interface StepTextProps {
  step: number; // 현재 단계 (1~3)
  description: string;
}

const StepText: React.FC<StepTextProps> = ({ step, description }) => {
  const totalSteps = 3;

  return (
    <div className="text-center mb-10">
      {/* 숫자 단계 */}
      <div className="flex justify-center items-center space-x-4 mb-4">
        {Array.from({ length: totalSteps }, (_, i) => {
          const current = i + 1;
          const isActive = current === step;

          return (
            <div key={current} className="flex items-center space-x-4">
              {/* 숫자 원 */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  isActive ? 'bg-[#00193E] text-white' : 'bg-[#C6CBD1] text-[#00193E]'
                }`}
              >
                {current}
              </div>

              {/* 다음 단계가 있으면 선을 그려줌 */}
              {current !== totalSteps && <div className="w-6 h-px bg-[#C6CBD1]"></div>}
            </div>
          );
        })}
      </div>

      {/* 하단 설명 텍스트 */}
      <h2 className="text-[20pt] font-bold text-[#00193E]">{description}</h2>
    </div>
  );
};

export default StepText;

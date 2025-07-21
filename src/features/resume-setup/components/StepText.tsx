import React from 'react';

interface StepTextProps {
  step: number;
  description: string;
}

const StepText: React.FC<StepTextProps> = ({ step, description }) => {
  return (
    <div className="text-center mb-6">
      {/* STEP 텍스트 */}
      <p className="text-[18pt] font-semibold text-[#00193E]">STEP {step}</p>

      {/* 설명 텍스트 */}
      <h2 className="text-[24pt] font-bold text-[#00193E] mt-2">{description}</h2>
    </div>
  );
};

export default StepText;

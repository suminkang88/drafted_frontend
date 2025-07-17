import React from 'react';

interface ApplicationTitleProps {
  targetName: string; // 예: "멋쟁이사자처럼"
}

const ApplicationTitle: React.FC<ApplicationTitleProps> = ({ targetName }) => {
  return (
    <div className="pl-8 pt-6">
      <h1
        className="text-[28px] text-[#00193E] font-extrabold"
        style={{ fontFamily: 'Noto Sans, sans-serif' }}
      >
        {targetName} 지원서
      </h1>
    </div>
  );
};

export default ApplicationTitle;

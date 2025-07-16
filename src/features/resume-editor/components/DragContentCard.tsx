import React from 'react';

const DragContentCard = () => {
  return (
    <div className="flex items-start w-fit max-w-[90%] rounded-[10px] border border-gray-300 bg-[#F4F7FB] px-4 py-2 text-[14px] leading-relaxed text-[#1C1C1E] shadow-sm">
      <img src="/icons/dragplane.svg" alt="icon" className="w-5 h-5 mt-[3px] mr-2" />
      <p>
        “지난해 연말부터 8주간 서비스 기획 국비지원 교육을 수료하며 PM 직무에 대한 관심이 더욱
        깊어졌습니다.”
      </p>
    </div>
  );
};

export default DragContentCard;

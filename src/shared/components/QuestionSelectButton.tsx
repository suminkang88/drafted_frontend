import { useState } from 'react';
import React from 'react';
import { BlackBgButton, GrayBgButton } from '@/shared/components';

interface QuestionSelectButtonProps {
  questionNumbers: number;
  selectedTab?: number;
  onClick?: (tabNumber: number) => void;
  className?: string;
  extraLabel?: string; // ✅ 추가: 추가 버튼용 라벨
  onExtraClick?: () => void; // ✅ 선택적으로 클릭 핸들링
}

const QuestionSelectButton: React.FC<QuestionSelectButtonProps> = ({
  questionNumbers,
  className = '',
  selectedTab: controlledTab,
  onClick,
  extraLabel,
  onExtraClick,
}) => {
  const tabs = [...Array(questionNumbers)].map((_, i) => i);

  type TabType = number | 'extra';
  const [selectedTab, setSelectedTab] = useState<TabType>(0);
  const buttonStyleClass = `
    w-20
    h-7 
    p-[5px] 
    rounded-[10px] 
    justify-center 
    items-center 
    gap-[5px] 
    flex 
    transition-colors 
    duration-200
  `;

  const handleClick = (index: number) => {
    if (onClick) {
      onClick(index);
    } else {
      setSelectedTab(index);
    }
  };

  return (
    <div className={`bg-white p-4 ${className}`}>
      <div className="h-7 justify-start items-center gap-[15px] inline-flex">
        {tabs.map((tabNumber) => {
          const isActive = tabNumber === selectedTab;
          return isActive ? (
            <BlackBgButton
              key={tabNumber}
              className={buttonStyleClass}
              onClick={() => handleClick(tabNumber)}
              textClassName="text-center text-[13px] font-semibold font-noto"
              innerText={`문항 ${tabNumber + 1}`}
            />
          ) : (
            <GrayBgButton
              key={tabNumber}
              className={buttonStyleClass}
              onClick={() => handleClick(tabNumber)}
              textClassName="text-center text-[13px] font-semibold font-noto"
              innerText={`문항 ${tabNumber + 1}`}
            />
          );
        })}
        {extraLabel &&
          (selectedTab === 'extra' ? (
            <BlackBgButton
              key="extra"
              className={buttonStyleClass}
              onClick={() => setSelectedTab('extra')}
              textClassName="text-center text-[13px] font-semibold font-noto"
              innerText={extraLabel}
            />
          ) : (
            <GrayBgButton
              key="extra"
              className={buttonStyleClass}
              onClick={() => setSelectedTab('extra')}
              textClassName="text-center text-[13px] font-semibold font-noto"
              innerText={extraLabel}
            />
          ))}
      </div>
    </div>
  );
};

export default QuestionSelectButton;

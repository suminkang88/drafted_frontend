import React from 'react';
import { GrayBgButton } from '../../../shared/components';

interface AISuggestionCardProps {
  AISuggestion: string;
  onButtonClick?: () => void;
}

export const AISuggestionCard: React.FC<AISuggestionCardProps> = ({
  AISuggestion,
  onButtonClick = () => {},
}) => {
  return (
    <div className="relative w-[554px] h-[180px] bg-white rounded-[10px] border-[0.5px] border-solid border-[#9b9da0]">
      <div className="absolute w-[514px] h-[25px] top-3.5 left-5 [font-family:'Noto_Sans-DisplayMedium',Helvetica] font-medium text-black text-base tracking-[0] leading-[25px]">
        이렇게 고쳐보시면 어떨까요?
      </div>

      <div className="w-[516px] items-center justify-center gap-2.5 p-2.5 top-[49px] flex absolute left-[18px] bg-[#e4e8ee] rounded-[10px]">
        <p className="relative flex-1 mt-[-1.00px] [font-family:'Noto_Sans-DisplaySemiBold',Helvetica] font-semibold text-black text-base tracking-[0] leading-[25px]">
          “{AISuggestion}”
        </p>
      </div>

      <GrayBgButton
        onClick={onButtonClick}
        className="w-[132px] items-end gap-[5px] p-[5px] top-32 flex absolute left-[18px] bg-[#e4e8ee] rounded-[10px]"
        innerText="내 보드에 반영하기"
      ></GrayBgButton>
    </div>
  );
};

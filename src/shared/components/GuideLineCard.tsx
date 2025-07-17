import React from 'react';

interface GuideLineCardProps {
  text?: string;
}

const GuideLineCard: React.FC<GuideLineCardProps> = ({
  text = `1. 관점 설정
단순히 ‘이 활동이 좋아서’가 아니라, 평소 자신이 어떤 문제의식이나 흥미를 가지고 있었는지 먼저 짚어주세요.
예: “기획자로서 사용자 행동을 더 깊이 이해하고 싶습니다.”

2. 경험 연결
그 관점이 어떻게 쌓였는지, 내가 이전에 어떤 활동을 하면서 이와 맞닿은 경험을 했는지를 연결해보세요.
예: “이전 활동에서 직접 유저 설문을 기획하며 행동을 수치로 확인한 경험이 흥미로웠습니다.”

3. 해당 활동의 의미
지금 이 활동이 내 흐름 안에서 어떤 역할을 해줄 수 있을지 설명해주세요.
예: “그래서 이번 동아리에서 그 흥미를 직접 실무로 추진해보고 싶습니다.”

4. 구체적인 목표와 열정 강조
단순 기대보다는, 내가 무엇을 준비했고 어떤 태도로 임할 것인지 보여주면 설득력이 올라가요.
예: “기획에 대한 관심을 바탕으로, 앞으로 동아리 내에서도 프로젝트 초기 구조 설계에 적극 참여하겠습니다.”`,
}) => {
  return (
    <div className="bg-[#FFFFFF] border border-[#9B9DA1] border-opacity-50 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-lg p-5">
      <div className="text-[#000000] font-bold text-lg flex items-center mb-3">
        📍 이렇게 작성해보세요
      </div>
      <hr className="border-[#9B9DA1] mb-3" />
      <p className="text-[#000000] text-base whitespace-pre-line">{text}</p>
    </div>
  );
};

export default GuideLineCard;

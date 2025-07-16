import React from 'react';

interface QuestionSelectButtonProps {
  onClick?: () => void;
  className?: string;
}

// interface 작성
// BlackBgButton, GrayBgButton 가져와서 커스텀한 것 바탕으로 구현
// 나머지 상호작용 내용은 onclick 함수 property로 넣어서 구현

export const QuestionSelectButton: React.FC<QuestionSelectButtonProps> = ({
  onClick = () => {},
  className = '',
}) => {
  return <></>;
};

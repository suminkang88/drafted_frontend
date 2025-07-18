import {
  BlackBgButton,
  GrayBgButton,
  DeleteOrAdd,
  QuestionSelectButton,
} from '../shared/components';
import { AISuggestionCard, ContentInputBox } from '../features/resume-editor/components';

const ButtonSample = () => {
  return (
    <>
      <BlackBgButton />
      <GrayBgButton innerText="안녕" />
      <DeleteOrAdd />
      <QuestionSelectButton questionNumbers={3} selectedTab={2} />

      <div className="p-30">
        <AISuggestionCard AISuggestion="사용자 경험을 고민하며 비즈니스 가치를 만들어가는 서비스 기획의 과정이 흥미롭게 다가왔습니다." />
        <ContentInputBox />
      </div>
    </>
  );
};

export default ButtonSample;

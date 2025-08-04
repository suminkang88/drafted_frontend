import { Header, GuideLineCard, QuestionShowCard } from '@/shared/components';
import { activities } from './components/dummy';
import { StepText, SideBar, EventRecommendationCard } from './components';

const ActivityRecommendationPage = () => {
  // const

  return (
    <>
      {/* 헤더 지우기 */}
      <Header />
      <StepText step={3} description="지원서 구조화하기" />

      <QuestionShowCard question="멋쟁이사자처럼 13기에 지원한 동기를 적어주세요." />
    </>
  );
};

export default ActivityRecommendationPage;

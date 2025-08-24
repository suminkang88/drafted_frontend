import ActivityRecommendInner from './ActivityRecommendInner';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSetupApi } from './api/setupAPI';
import { QuestionsProvider, Question } from './QuestionsContext';

const ActivityRecommendationPage = () => {
  const { id } = useParams();
  const { fetchApplication } = useSetupApi();

  // 지원서 문항 목록 상태 관리
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 지원서 문항 가져오기 (id가 있을 때만)
  useEffect(() => {
    const loadApplicationQuestions = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const applicationData = await fetchApplication(id);

        console.log('받아온 전체 applicationData:', applicationData);

        // 필요한 데이터만 추출
        const extractedQuestions: Question[] = applicationData.map((q: any) => {
          return {
            questionId: q.questionId,
            questionOrder: q.questionOrder,
            content: q.content,
            limit: q.limit,
          };
        });

        setQuestions(extractedQuestions);
      } catch (err) {
        console.error('지원서 문항 로딩 실패:', err);
        setError('지원서 문항을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadApplicationQuestions();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="font-noto font-semibold text-[#00193E]">
          지원서 문항을 불러오고 있습니다...
        </div>
      </div>
    );
  }

  return (
    <QuestionsProvider questions={questions}>
      <ActivityRecommendInner questions={questions} />
    </QuestionsProvider>
  );
};

export default ActivityRecommendationPage;

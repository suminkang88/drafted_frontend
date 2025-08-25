import { createContext, useContext, useState, useEffect } from 'react';

// 필요한 데이터만 추출한 타입 정의
export interface Question {
  questionId: number;
  questionOrder: string;
  content: string;
  limit: number;
}

interface SelectedEvent {
  id: number;
  title: string;
  activity: string;
}

type QuestionState =
  | { status: 'none' }
  | { status: 'later' }
  | { status: 'selected'; event: SelectedEvent };

type QuestionsState = Record<number, QuestionState>;

interface QuestionsContextType {
  questionsState: QuestionsState;
  setQuestionsState: React.Dispatch<React.SetStateAction<QuestionsState>>;
  selectEvent: (qId: number, event: SelectedEvent) => void;
  selectLater: (qId: number) => void;
  clearSelection: (qId: number) => void;
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

export { QuestionsContext };

export const QuestionsProvider = ({
  children,
  questions,
}: {
  children: React.ReactNode;
  questions: Question[];
}) => {
  const initialState: QuestionsState = {};
  questions.forEach((q) => {
    initialState[q.questionId] = { status: 'none' };
  });

  const [questionsState, setQuestionsState] = useState<QuestionsState>(initialState);

  // questionsState가 변경될 때마다 로그 출력
  useEffect(() => {
    console.log('🔍 QuestionsContext 변경됨:', questionsState);
    // console.log('📊 변경된 상태 상세:', JSON.stringify(questionsState, null, 2));
  }, [questionsState]);

  const selectEvent = (qId: number, event: SelectedEvent) => {
    console.log(`🎯 이벤트 선택됨 - 질문 ID: ${qId}, 이벤트:`, event);
    setQuestionsState((prev) => ({
      ...prev,
      [qId]: { status: 'selected', event },
    }));
  };

  const selectLater = (qId: number) => {
    console.log(`⏰ 나중에 하기 선택됨 - 질문 ID: ${qId}`);
    setQuestionsState((prev) => ({
      ...prev,
      [qId]: { status: 'later' },
    }));
  };

  const clearSelection = (qId: number) => {
    console.log(`🗑️ 선택 해제됨 - 질문 ID: ${qId}`);
    setQuestionsState((prev) => ({
      ...prev,
      [qId]: { status: 'none' },
    }));
  };

  return (
    <QuestionsContext.Provider
      value={{ questionsState, setQuestionsState, selectEvent, selectLater, clearSelection }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

// Custom hook for using QuestionsContext
export const useQuestionsContext = () => {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error('useQuestionsContext must be used within a QuestionsProvider');
  }
  return context;
};

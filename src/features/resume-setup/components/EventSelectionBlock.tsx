// QuestionBlock.tsx
import { useQuestionsContext } from '../QuestionsContext';

interface Props {
  qId: number;
  mode: 'current' | 'other';
  // current → 현재 선택된 문항 (none/later/selected 모두 표시)
  // other → 다른 문항들 (selected일 때만 표시)
}

const EventSelectionBlock: React.FC<Props> = ({ qId, mode }) => {
  const { questionsState, clearSelection } = useQuestionsContext();
  const qState = questionsState[qId];

  // "other" 모드일 때 selected가 아니면 렌더링 안 함
  if (mode === 'other' && qState.status === 'none') {
    return null;
  }

  switch (qState.status) {
    case 'later':
      return (
        <div className="flex w-full h-[75px] bg-[#E4E8EE] gap-[50px] px-[27px] py-3.5 rounded-[10px] border border-[#9b9da0] items-center">
          <div className="flex-1 font-noto font-semibold text-[21px] text-[#00193e]">미선택</div>
          <button
            onClick={() => clearSelection(qId)}
            className="w-5 h-5 flex items-center justify-center text-2xl font-bold hover:text-gray-600"
          >
            ×
          </button>
        </div>
      );

    case 'selected':
      return (
        <div className="flex w-full h-[75px] bg-[#FFB38A] gap-[50px] px-[27px] py-3.5 rounded-[10px] border border-[#9b9da0] items-center">
          <div className="flex-1 font-noto font-semibold text-[21px] text-[#00193e]">
            {qState.event.title}
          </div>
          <div className="text-base font-medium text-[#00193E]">{qState.event.activity}</div>
          <button
            onClick={() => clearSelection(qId)}
            className="w-5 h-5 flex items-center justify-center text-2xl font-bold hover:text-gray-600"
          >
            ×
          </button>
        </div>
      );

    default:
      // none 상태 → current 모드일 때만 안내문 표시
      return mode === 'current' ? (
        <div className="flex w-full h-[75px] gap-[50px] px-[27px] py-3.5 bg-[#e4e8ee] rounded-[10px] items-center">
          <p className="text-[#9b9da0] text-[21px] font-noto font-semibold flex-1">
            오른쪽 이벤트 추천 탭에서 지원서 작성에 참고할 문항을 선택해 주세요.
          </p>
        </div>
      ) : null;
  }
};

export default EventSelectionBlock;

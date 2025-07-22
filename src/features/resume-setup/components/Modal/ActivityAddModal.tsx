// src/shared/components/ActivityAddModal.tsx
import React, { useState } from 'react';
import { ActivityRecordCard, GrayBgButton } from '@/shared/components';

interface ActivityAddModalProps {
  onClose: () => void;
}

const ActivityAddModal: React.FC<ActivityAddModalProps> = ({ onClose }) => {
  const [eventName, setEventName] = useState('이벤트 이름');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-[960px] bg-[#F8F9FA] rounded-2xl shadow-xl p-10 relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          ×
        </button>

        {/* 제목 입력 필드 */}
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="text-[#00193e] text-[30px] font-bold font-noto w-full mb-6 focus:outline-none border-b bg-[#F8F9FA] pb-1"
        />

        {/* 활동 내용 입력 카드 */}
        <div className="mx-auto">
          <ActivityRecordCard />
        </div>

        {/* 하단 버튼 */}
        <div className="mt-8 flex justify-end gap-4">
          <GrayBgButton
            innerText="임시 저장하고 닫기"
            onClick={onClose}
            className="w-[200px] h-[44px]"
          />
          <GrayBgButton innerText="항목 모두 완료했어요" className="w-[200px] h-[44px]" />
        </div>
      </div>
    </div>
  );
};

export default ActivityAddModal;

import { useEffect, useRef, useState } from 'react';

export type SaveStatus = 'idle' | 'saving' | 'success' | 'error';
export function useDebounceSave(
  value: string,
  delay: number = 1000
): {
  status: SaveStatus;
  lastSaved: Date | null;
} {
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!value) {
      setStatus('idle');
      return;
    }

    setStatus('saving');
    timerRef.current = setTimeout(() => {
      // 여기에 나중에 실제 API 호출 들어가면 됨
      setLastSaved(new Date());
      setStatus('success');
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value]);

  return { status, lastSaved };
}

import React from 'react';
import dayjs from 'dayjs';

interface AutoSavedProps {
  lastSaved: Date | null;
  status: SaveStatus;
}

const AutoSaved: React.FC<AutoSavedProps> = ({ lastSaved, status }) => {
  const renderText = () => {
    if (status === 'saving') return '저장 중...';
    if (status === 'success' && lastSaved)
      return `${dayjs(lastSaved).format('YYYY-M-D HH:mm')} 자동저장됨`;
    if (status === 'error') return '저장 실패!';
    return '작성 중...';
  };

  const renderIcon = () => {
    if (status === 'success') return <span className="ml-1">✅</span>;
    if (status === 'saving') return <span className="ml-1 animate-pulse"></span>;
    if (status === 'error') return <span className="ml-1"></span>;
    return null;
  };

  return (
    <div className="text-sm text-gray-500 flex items-center mt-1">
      {renderText()} {renderIcon()}
    </div>
  );
};

export default AutoSaved;

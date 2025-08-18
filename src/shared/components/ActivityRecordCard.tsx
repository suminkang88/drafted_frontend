import React, { useRef, useState } from 'react';
import { CreateEventInput, Event } from '@/app/types';

interface RecordField {
  label: string;
  placeholder: string;
  key: string;
}

const defaultFields: RecordField[] = [
  {
    label: '상황 (Situation)',
    placeholder: '어떤 계기나 배경에서 활동이 시작되었는지 설명해보세요.',
    key: 'situation',
  },
  {
    label: '과업 (Task)',
    placeholder: '당시 맡았던 역할이나 해결하고자 했던 문제를 적어보세요.',
    key: 'task',
  },
  {
    label: '행동 (Action)',
    placeholder: '문제 해결을 위해 실제로 어떤 행동을 했는지 구체적으로 적어보세요.',
    key: 'action',
  },
  {
    label: '결과 (Result)',
    placeholder: '성과와 같은 활동 결과나 변화, 배운 점을 정리해보세요.',
    key: 'result',
  },
];

const FileUploader = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const filtered = selectedFiles.filter((file) => file.name.match(/\.(pdf|doc|docx)$/i));
      setUploadedFiles((prev) => [...prev, ...filtered]);
    }
  };

  const handleRemove = (indexToRemove: number) => {
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleView = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  };

  return (
    <div className="mt-6 px-2">
      {/* 업로드 아이콘 */}
      <div className="flex items-center space-x-2 mb-2">
        <img
          src="/icons/fileadd.png"
          alt="Upload"
          width={30}
          height={30}
          className="cursor-pointer"
          onClick={() => inputRef.current?.click()}
        />
        <span className="block font-noto font-semibold text-[18px] text-gray-700">
          파일 추가 (PDF, Word)
        </span>
      </div>

      {/* 숨겨진 input */}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        multiple
        className="hidden"
        onChange={handleChange}
      />

      {/* 업로드된 파일 리스트 */}
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
        {uploadedFiles.map((file, index) => (
          <li key={index} className="flex items-center justify-between rounded-md">
            <button onClick={() => handleView(file)} title="View">
              <img src="/icons/view.svg" alt="View" width={40} height={40} />
            </button>
            <div className="flex-1 ml-2 mr-4">
              <span className="truncate max-w-[60%]">{file.name}</span>
            </div>
            <button onClick={() => handleRemove(index)} title="Delete">
              <img src="/icons/delete.svg" alt="Delete" width={20} height={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface EmptyProps {
  tempId: string;
  onSelect: (id: string) => void;
  isSelected: boolean;
  onSave: (eventData: CreateEventInput) => void;
  isNew?: boolean;
}

interface EventProps {
  event: Event;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

type ActivityRecordCardProps = EmptyProps | EventProps;

const ActivityRecordCard: React.FC<ActivityRecordCardProps> = ({
  isSelected = false,
  onSelect,
  ...props
}) => {
  const [situation, setSituation] = useState('');
  const [task, setTask] = useState('');
  const [action, setAction] = useState('');
  const [result, setResult] = useState('');
  const [title, setTitle] = useState('');

  const fields = defaultFields;

  if ('event' in props) {
    const event = props.event;
    return (
      <div onClick={() => onSelect(event.id)} className="flex flex-col gap-6 w-[918px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[20pt] font-bold text-[#00193E]">{event.title}</h2>
          <span className="text-[#9B9DA1] text-[12pt] font-noto whitespace-nowrap">
            {`${event.startDate} ~ ${event.endDate}`}
          </span>
        </div>
        <div className={`bg-[#E4E8EE]  rounded-xl p-4 border ${isSelected ? 'border-black' : ''}`}>
          {fields.map((field) => (
            <div className="pl-3" key={field.key}>
              <div key={field.key} className="  w-[858px] h-[50px] rounded-md px-3 py-3">
                <div className="flex items-start justify-between">
                  <label className="block font-noto font-semibold text-[18px] text-gray-700">
                    {field.label}
                  </label>
                </div>
              </div>
              <textarea
                placeholder={field.placeholder}
                className="w-[858px] h-[99px] border rounded-md p-2 text-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                rows={2}
                value={
                  field.key === 'situation'
                    ? event.situation
                    : field.key === 'task'
                      ? event.task
                      : field.key === 'action'
                        ? event.action
                        : field.key === 'result'
                          ? event.result
                          : ''
                }
                onChange={(e) => {
                  if (field.key === 'situation') {
                    setSituation(e.target.value);
                  } else if (field.key === 'task') {
                    setTask(e.target.value);
                  } else if (field.key === 'action') {
                    setAction(e.target.value);
                  } else if (field.key === 'result') {
                    setResult(e.target.value);
                  }
                }}
              />
            </div>
          ))}
          <FileUploader />
        </div>
      </div>
    );
  } else {
    // 새 이벤트 생성 (비어 있는 이벤트)
    const tempId = props.tempId;

    const handleSave = () => {
      props.onSave({ title, situation, task, action, result });
    };

    return (
      <div className="flex flex-col gap-6 w-[918px]">
        <div className="flex items-center justify-between">
          <input
            className="text-[20pt] font-bold text-[#00193E] bg-transparent outline-none"
            placeholder="이벤트 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
        <div className="bg-[#E4E8EE] border-gray-300 rounded-xl p-4">
          {fields.map((field) => (
            <div className="pl-3" key={field.key}>
              <div key={field.key} className="w-[858px] h-[50px] rounded-md px-3 py-3">
                <div className="flex items-start justify-between">
                  <label className="block font-noto font-semibold text-[18px] text-gray-700">
                    {field.label}
                  </label>
                </div>
              </div>
              <textarea
                placeholder={field.placeholder}
                className="w-[858px] h-[99px] border rounded-md p-2 text-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                rows={2}
                value={
                  field.key === 'situation'
                    ? situation
                    : field.key === 'task'
                      ? task
                      : field.key === 'action'
                        ? action
                        : field.key === 'result'
                          ? result
                          : ''
                }
                onChange={(e) => {
                  if (field.key === 'situation') {
                    setSituation(e.target.value);
                  } else if (field.key === 'task') {
                    setTask(e.target.value);
                  } else if (field.key === 'action') {
                    setAction(e.target.value);
                  } else if (field.key === 'result') {
                    setResult(e.target.value);
                  }
                }}
              />
            </div>
          ))}
          <FileUploader />
        </div>
      </div>
    );
  }
};

export default ActivityRecordCard;

import React, { useState } from 'react';

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

const ActionBar = ({ onAdd, onEdit, onDelete, onHelp }: any) => {
  return (
    <div className="flex justify-end space-x-3 mb-4">
      <button onClick={onAdd}>
        <img src="/icons/plus.svg" alt="add" className="size-[25px]" />
      </button>
      <button onClick={onEdit}>
        <img src="/icons/edit.svg" alt="edit" className="size-[25px]" />
      </button>
      <button onClick={onDelete}>
        <img src="/icons/trash.svg" alt="delete" className="size-[25px]" />
      </button>
      <button onClick={onHelp}>
        <img src="/icons/help.svg" alt="help" className="size-[25px]" />
      </button>
    </div>
  );
};

const ActivityRecordCard: React.FC = () => {
  const [fields, setFields] = useState(defaultFields);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const toggleSelect = (key: string) => {
    setSelectedKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) newSet.delete(key);
      else newSet.add(key);
      return newSet;
    });
  };

  const handleAdd = () => {
    const newKey = `new-${Date.now()}`;
    setFields((prev) => [
      ...prev,
      {
        label: `새 항목`,
        placeholder: '새 항목 내용을 입력하세요.',
        key: newKey,
      },
    ]);
  };

  const handleEdit = () => {
    if (selectedKeys.size === 1) {
      const editKey = Array.from(selectedKeys)[0];
      setFields((prev) =>
        prev.map((f) => (f.key === editKey ? { ...f, label: f.label + ' (수정됨)' } : f))
      );
    }
  };

  const handleDelete = () => {
    setFields((prev) => prev.filter((f) => !selectedKeys.has(f.key)));
    setSelectedKeys(new Set());
  };

  const handleHelp = () => {
    alert('도움말');
  };

  return (
    <div className=" w-[918px] bg-[#E4E8EE] border-gray-300 rounded-xl p-4 ">
      <ActionBar
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onHelp={handleHelp}
      />
      {fields.map((field) => (
        <div className="pl-3" key={field.key}>
          <div
            key={field.key}
            className="  w-[858px] h-[50px] bg-[#F8F9FA] border-gray-200 rounded-md px-3 py-3"
          >
            <div className="flex items-start justify-between">
              <label className="block font-noto font-semibold text-[18px] text-gray-700">
                {field.label}
              </label>
              <input
                type="checkbox"
                className="size-[25px] ml-3 mt-1"
                checked={selectedKeys.has(field.key)}
                onChange={() => toggleSelect(field.key)}
              />
            </div>
          </div>
          <textarea
            placeholder={field.placeholder}
            className="w-[858px] h-[99px] border rounded-md p-2 text-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            rows={2}
          />
        </div>
      ))}
    </div>
  );
};

export default ActivityRecordCard;

import { useState } from 'react';
import { Header, DeleteOrAdd } from '@/shared/components';
import { applications as dummyData } from './dummy';
import { Application } from '@/app/types';
import { useNavigate } from 'react-router-dom';

interface tableProps {
  data: Application[];
  toggleSelect: (id: string) => void;
}

const ApplicationTable: React.FC<tableProps> = ({ data, toggleSelect }) => {
  return (
    <div className="overflow-x-auto rounded-md">
      <table className="min-w-full border-b border-[#9B9DA1] table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-10 p-4 text-left"></th>
            <th className="p-4 text-left font-semibold text-gray-500">지원서 명</th>
            <th className="p-4 text-left font-semibold text-gray-500">카테고리</th>
            <th className="p-4 text-left font-semibold text-gray-500">지원 포지션</th>
            <th className="p-4 text-left font-semibold text-gray-500">지원 마감일</th>
          </tr>
        </thead>
        <tbody>
          {data.map((application) => (
            <tr key={application.id} className="border-t border-[#9B9DA1] hover:bg-gray-50">
              <td className="p-4">
                <input type="checkbox" onChange={() => toggleSelect?.(application.id)} />
              </td>
              <td className="p-4 font-semibold text-[#00193E] border-l border-[#9B9DA1]">
                <a href={`/resume/${application.id}`}>{application.name}</a>
              </td>
              <td className="p-4 font-semibold text-[#00193E] border-l border-[#9B9DA1]">
                {application.category}
              </td>
              <td className="p-4 font-semibold text-[#00193E] border-l border-[#9B9DA1]">
                {application.position}
              </td>
              <td className="p-4 font-semibold text-[#00193E] border-l border-[#9B9DA1]">
                {application.deadline}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ResumeHistoryPage = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<Application[]>(dummyData);
  // db와 연결 시 위 부분 수정.
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onDeleteClick = () => {
    alert(`select`);
    setApplications((prev) => prev.filter((app) => !selectedIds.includes(app.id)));
    setSelectedIds([]); // 선택 초기화)
  };

  const onToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((_id) => _id !== id) : [...prev, id]
    );
  };

  const onAddClick = () => {
    navigate('/resume/setup');
  };

  return (
    <div>
      <div className="m-32 mt-16">
        {/* margin 값 모든 페이지에서 통일 필요 */}
        <div className="">
          <h1 className="text-[#00193e] text-[42px] font-extrabold font-noto">나의 지원서</h1>
        </div>
        <div className="flex justify-end items-center gap-4 mt-16 mb-8">
          <DeleteOrAdd onAddClick={onAddClick} onDeleteClick={onDeleteClick} />
        </div>
        <ApplicationTable data={applications} toggleSelect={onToggleSelect} />
      </div>
    </div>
  );
};

export default ResumeHistoryPage;

import React, { useState, useEffect } from 'react';
import { DeleteOrAdd } from '@/shared/components';
import { Application } from '@/app/types';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useHistoryApi } from './hooks/useHistory';

interface tableProps {
  data: Application[];
  toggleSelect: (id: string) => void;
}

const ApplicationTable: React.FC<tableProps> = ({ data, toggleSelect }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center py-8 font-noto text-gray-500">작성된 지원서가 없습니다.</div>
    );
  }

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
                <Link
                  to={`/resume/${application.id}`}
                  state={{
                    title: application.title,
                    category: application.category,
                    deadline: application.deadline,
                  }}
                >
                  {application.title}
                </Link>
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
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchResumes, deleteResume } = useHistoryApi();
  const { data, isLoading, isError } = fetchResumes();

  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // data가 변경될 때마다 applications 상태 업데이트
  useEffect(() => {
    if (data) {
      setApplications(data);
      console.log('📊 applications 상태 업데이트됨:', data);
    }
  }, [data]);

  const onDeleteClick = async () => {
    if (selectedIds.length === 0) {
      alert('삭제할 지원서를 선택해주세요.');
      return;
    }

    const isConfirmed = window.confirm('선택한 지원서를 삭제하시겠습니까?');

    if (isConfirmed) {
      try {
        console.log('🗑️ 삭제 시작 - 선택된 ID들:', selectedIds);

        // 선택된 모든 지원서를 삭제
        for (const id of selectedIds) {
          await deleteResume(id);
          console.log('✅ 지원서 삭제 완료 - ID:', id);
        }

        // 성공적으로 삭제된 후 목록에서 제거
        setApplications((prev) => prev.filter((app) => !selectedIds.includes(app.id)));
        setSelectedIds([]); // 선택 초기화

        alert('선택한 지원서가 삭제되었습니다.');
      } catch (error) {
        console.error('❌ 지원서 삭제 실패:', error);
        alert('지원서 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const onToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((_id) => _id !== id) : [...prev, id]
    );
  };

  const onAddClick = () => {
    navigate('/resume/new');
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
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">지원서 목록을 로딩 중입니다...</div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            지원서 목록을 불러오는데 실패했습니다.
          </div>
        ) : (
          <ApplicationTable data={applications} toggleSelect={onToggleSelect} />
        )}
      </div>
    </div>
  );
};

export default ResumeHistoryPage;

import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      {/* 왼쪽 로고 */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="/assets/icons/Drafted_logo.svg" alt="Drafted Logo" className="h-8" />{' '}
      </Link>

      {/* 오른쪽 메뉴 */}
      <nav className="flex items-center space-x-8 text-[#00193E]">
        <Link to="/archive" className="transition-all hover:text-[#FFB38A] hover:font-semibold">
          활동 아카이빙
        </Link>

        <Link to="/resume/new" className="transition-all hover:text-[#FFB38A] hover:font-semibold">
          새 지원서 작성
        </Link>

        <Link
          to="/resume/history"
          className="transition-all hover:text-[#FFB38A] hover:font-semibold"
        >
          내 지원서 관리
        </Link>

        {/* 로그아웃 버튼 */}
        <button
          className="bg-[#F1F5F9] text-[#00193E] font-medium px-4 py-1 rounded-md 
             hover:bg-[#00193E] hover:text-white transition-colors"
        >
          로그아웃
        </button>

        {/* 마이페이지 아이콘 */}
        <Link to="/mypage">
          <img
            src={isHovered ? '/assets/icons/Vector_navy.svg' : '/assets/icons/Vector_gray.svg'}
            alt="마이페이지"
            className="w-6 h-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </Link>
      </nav>
    </header>
  );
};

export default Header;

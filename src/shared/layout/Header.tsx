import { Link } from 'react-router-dom';
import { useState } from 'react';

// ✅ Clerk 연동 전까지 임시 분기용 상태
const isLoggedIn = false; // → Clerk 연동 시 SignedIn/SignedOut 컴포넌트로 대체 예정

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      {/* 왼쪽 로고 */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="/icons/Drafted_logo.svg" alt="Drafted Logo" className="h-8" />
      </Link>

      <nav className="flex items-center space-x-8 text-[#00193E]">
        {isLoggedIn ? (
          <>
            {/* ✅ 로그인된 경우: 전체 메뉴 노출 */}
            <Link
              to="/archive"
              className="font-noto transition-all hover:text-[#FFB38A] hover:font-semibold"
            >
              활동 아카이빙
            </Link>

            <Link
              to="/resume/new"
              className="font-noto transition-all hover:text-[#FFB38A] hover:font-semibold"
            >
              새 지원서 작성
            </Link>

            <Link
              to="/resume/history"
              className="font-noto transition-all hover:text-[#FFB38A] hover:font-semibold"
            >
              내 지원서 관리
            </Link>

            <button
              className="bg-[#F1F5F9] font-noto text-[#00193E] font-medium px-4 py-1 rounded-md 
              hover:bg-[#00193E] hover:text-white transition-colors"
            >
              로그아웃
            </button>

            <Link to="/mypage">
              <img
                src={isHovered ? '/icons/Vector_navy.svg' : '/icons/Vector_gray.svg'}
                alt="마이페이지"
                className="w-6 h-6"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </Link>
          </>
        ) : (
          <>
            {/* ✅ 로그인되지 않은 경우: 로그인/회원가입만 노출 */}
            <Link to="/login" className="text-[#00193E] font-noto font-medium hover:underline">
              로그인
            </Link>
            <Link
              to="/signup"
              className="bg-[#00193E] text-white font-noto px-4 py-1 rounded-md hover:bg-opacity-90 transition-colors"
            >
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

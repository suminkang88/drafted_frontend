import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-[#F8F9FA]">
      {/* 헤더 영역 */}
      <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
        {/* 왼쪽 로고 */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/icons/Drafted_logo.svg" alt="Drafted Logo" className="h-8" />
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center space-x-8 text-[#00193E]">
          {/* 비로그인 상태 */}
          <SignedOut>
            <SignInButton mode="redirect">
              <button className="text-[#00193E] font-noto font-medium hover:underline">
                로그인
              </button>
            </SignInButton>
          </SignedOut>

          {/* 로그인 상태 */}
          <SignedIn>
            <>
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
                to="/resume"
                className="font-noto transition-all hover:text-[#FFB38A] hover:font-semibold"
              >
                내 지원서 관리
              </Link>

              <UserButton afterSignOutUrl="/" />
            </>
          </SignedIn>
        </nav>
      </header>

      {/* 헤더 아래에 각 페이지가 렌더링되는 영역 */}
      <main className="px-0 py-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Header;

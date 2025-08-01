import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  useSession,
  useUser,
  SignedIn,
  SignIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';
//import { createClient } from '@supabase/supabase-js';

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
        {/* ✅ 로그인되지 않은 경우: 로그인/회원가입만 노출 */}
        <SignedOut>
          <SignInButton mode="redirect">
            <button className="text-[#00193E] font-noto font-medium hover:underline">로그인</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
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

            <UserButton afterSignOutUrl="/" />
          </>
        </SignedIn>
      </nav>
    </header>
  );
};

export default Header;

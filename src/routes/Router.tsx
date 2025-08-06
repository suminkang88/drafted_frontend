import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import SetupTestPage from '@/pages/SetupTestPage';
import TestPage from '@/pages/TestPage';
import BasicInfoInputPage from '@/features/resume-setup/BasicInfoInputPage';
import QuestionInputPage from '@/features/resume-setup/QuestionInputPage';
import MainPage from '@/pages/MainPage';
import Header from '@/shared/layout/Header';
import ResumeEditPage from '@/features/resume-editor/ResumeEditPage';
import ArchiveMainPage from '@/features/archive/ArchiveMainPage';
import ArchiveDetailPage from '@/features/archive/ArchiveDetailPage';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const AppRouter = () => {
  return (
    // ✅ 전체 배경색 감싸기
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* 공통 헤더 */}
      <Header />

      {/* 페이지 내용 */}
      <main className="px-6 py-8">
        <Routes>
          {/* 비로그인 상태에서 보여줄 경로 */}
          <Route path="/" element={<SignedOut>{<MainPage />}</SignedOut>} />

          {/* 로그인 상태에서 보여줄 경로들 */}
          {/* <Route path="/testpage" element={<TestPage />} /> */}
          <Route
            path="/resume/basic-info"
            element={
              <SignedIn>
                <BasicInfoInputPage />
              </SignedIn>
            }
          />
          <Route
            path="/resume/question-input"
            element={
              <SignedIn>
                <QuestionInputPage />
              </SignedIn>
            }
          />
          <Route
            path="/resume/editor"
            element={
              <SignedIn>
                <ResumeEditPage />
              </SignedIn>
            }
          />
          <Route path="/archive" element={<ArchiveMainPage />} />
          <Route path="/archive/:id" element={<ArchiveDetailPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default AppRouter;

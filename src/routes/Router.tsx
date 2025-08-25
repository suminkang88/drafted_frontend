import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import SetupTestPage from '@/pages/SetupTestPage';
import TestPage from '@/pages/TestPage';
import BasicInfoInputPage from '@/features/resume-setup/BasicInfoInputPage';
import QuestionInputPage from '@/features/resume-setup/QuestionInputPage';
import ActivityRecommendPage from '@/features/resume-setup/ActivityRecommendPage';
import MainPage from '@/pages/MainPage';
import Header from '@/shared/layout/Header';
import ResumeEditPage from '@/features/resume-editor/ResumeEditPage';
import ResumeHistoryPage from '@/features/resume-history/ResumeHistoryPage';
import ResumeViewPage from '@/features/resume-history/ResumeViewPage';
import ArchiveMainPage from '@/features/archive/ArchiveMainPage';
import ArchiveDetailPage from '@/features/archive/ArchiveDetailPage';
import AdditionalInfoPage from '@/features/auth/AdditionalInfoPage';
import TermPage from '@/features/auth/TermPage';
import PolicyPage from '@/features/auth/PrivatePolicyPage';
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
          {/* 루트 경로 - 로그인 상태에 따라 다르게 처리 */}
          <Route
            path="/"
            element={
              <>
                <SignedOut>
                  <MainPage />
                </SignedOut>
                <SignedIn>
                  <Navigate to="/auth/additional-info" replace />
                </SignedIn>
              </>
            }
          />

          {/* 추가 정보 입력 페이지 */}
          <Route
            path="/auth/additional-info"
            element={
              <SignedIn>
                <AdditionalInfoPage />
              </SignedIn>
            }
          />

          {/* 약관/개인정보 처리방침 페이지 (로그인 여부와 무관하게 접근 가능) */}
          <Route path="/terms" element={<TermPage />} />
          <Route path="/privacy" element={<PolicyPage />} />

          {/* 새 지원서 작성 플로우 */}
          <Route
            path="/resume/new"
            element={
              <SignedIn>
                <Navigate to="/resume/basic-info" replace />
              </SignedIn>
            }
          />
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
            path="/resume/:id/activity-recommend"
            element={
              <SignedIn>
                <ActivityRecommendPage />
              </SignedIn>
            }
          />

          {/* 잘못된 지원서 경로로 접근 시 기본 페이지로 리다이렉트 */}
          <Route
            path="/resume/*"
            element={
              <SignedIn>
                <Navigate to="/resume/basic-info" replace />
              </SignedIn>
            }
          />

          {/* 기타 로그인 상태에서 보여줄 경로들 */}
          {/* <Route path="/testpage" element={<TestPage />} /> */}
          <Route
            path="/resume/:id/editor"
            element={
              <SignedIn>
                <ResumeEditPage />
              </SignedIn>
            }
          />
          <Route
            path="/resume"
            element={
              <SignedIn>
                <ResumeHistoryPage />
              </SignedIn>
            }
          />
          <Route
            path="/resume/:id"
            element={
              <SignedIn>
                <ResumeViewPage />
              </SignedIn>
            }
          />
          <Route
            path="/archive"
            element={
              <SignedIn>
                <ArchiveMainPage />
              </SignedIn>
            }
          />
          <Route
            path="/archive/:id"
            element={
              <SignedIn>
                <ArchiveDetailPage />
              </SignedIn>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default AppRouter;

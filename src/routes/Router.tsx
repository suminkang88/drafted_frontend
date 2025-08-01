import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import SetupTestPage from '@/pages/SetupTestPage';
import TestPage from '@/pages/TestPage';
import BasicInfoInputPage from '@/pages/BasicInfoInputPage';
import QuestionInputPage from '@/pages/QuestionInputPage';
import MainPage from '@/pages/MainPage';
import Header from '@/shared/layout/Header';

import {
  useSession,
  useUser,
  SignedIn,
  SignIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';

const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* 비로그인 상태에서 보여줄 경로 */}
        <Route
          path="/"
          element={
            <SignedOut>
              <MainPage />
            </SignedOut>
          }
        />

        {/* 로그인 상태에서 보여줄 경로들 */}
        <Route
          path="/resume/setup"
          element={
            <SignedIn>
              <BasicInfoInputPage />
            </SignedIn>
          }
        />
        <Route
          path="/resume/question"
          element={
            <SignedIn>
              <QuestionInputPage />
            </SignedIn>
          }
        />
      </Routes>
    </>
  );
};

export default AppRouter;

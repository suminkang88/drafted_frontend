import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import SetupTestPage from '@/pages/SetupTestPage';
import TestPage from '@/pages/TestPage';
import BasicInfoInputPage from '@/pages/BasicInfoInputPage';
import QuestionInputPage from '@/pages/QuestionInputPage';
import MainPage from '@/pages/MainPage';
import Header from '@/shared/layout/Header';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/main" element={<MainPage />} />
        {/*<Route path="/test" element={<SetupTestPage />} />*/}
        {/* STEP 1 - 기본 지원 정보 입력 */}
        <Route path="/resume/setup" element={<BasicInfoInputPage />} />
        {/* STEP 2 - 문항 입력 */}
        <Route path="/resume/question" element={<QuestionInputPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

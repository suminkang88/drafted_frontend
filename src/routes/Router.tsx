import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import SetupTestPage from '@/pages/SetupTestPage';
import TestPage from '@/pages/TestPage';
// import ActivityRecommendationPage from '@/features/resume-setup/ActivityRecommendPage';
import ResumeHistoryPage from '@/features/resume-history/ResumeHistoryPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/applications" element={<ResumeHistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

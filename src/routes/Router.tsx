import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SetupTestPage from '@/pages/SetupTestPage';
import TestPage from '@/pages/TestPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/test" element={<SetupTestPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

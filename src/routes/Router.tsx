import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ButtonSample from './ButtonSample';
import TestPage from '../pages/TestPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ButtonSample />} />
        <Route path="/" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

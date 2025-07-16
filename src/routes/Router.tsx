import React from 'react';
// 디버깅용 테스트 페이지 추가
import ButtonSample from './ButtonSample';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ButtonSample />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

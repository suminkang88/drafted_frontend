// src/pages/MainPage.tsx
import React, { useEffect, useRef } from 'react';
import { SignInButton } from '@clerk/clerk-react';
import BlackBgButton from '../shared/components/BlackBgButton';
import GrayBgButton from '../shared/components/GrayBgButton';
import boxIcon from '/icons/box_main.svg';
import robotIcon from '/icons/robot_main.svg';
import folderIcon from '/icons/folder_main.svg';
import checkIcon from '/icons/check_main.svg';

const MainPage: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 페이지 로드 시 애니메이션 효과 - 바로 위로 올라오는 효과만
    const elements = rootRef.current?.querySelectorAll('.animate-on-load');
    if (elements) {
      elements.forEach((element, index) => {
        const el = element as HTMLElement;
        // 초기 상태: 투명하고 위에 위치 (아래에서 시작하지 않음)
        el.style.opacity = '0';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'opacity 0.8s ease-out';

        // 순차적으로 애니메이션 실행 - opacity만 변경
        setTimeout(() => {
          el.style.opacity = '1';
        }, index * 150); // 각 요소마다 150ms씩 지연
      });
    }
  }, []);

  return (
    <div ref={rootRef} className="text-[#00193E] min-h-screen">
      {/* Hero Section - 화면 전체 높이로 설정 */}
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="container mx-auto px-4">
          {/* 메인 타이틀과 서브타이틀 - 간격 축소 */}
          <div className="text-center mb-20 pt-20">
            <h1 className="text-8xl md:text-5xl font-bold leading-tight mb-8 animate-on-load">
              당신의 합격 파트너, DRAFTY
            </h1>
            <p className="text-lg text-[#9B9DA1] max-w-3xl mx-auto mb-8 animate-on-load">
              누구보다 빠르게, 그리고 누구보다 정확하게 <br /> 당신의 이야기를 지원서로 연결하는
              똑똑한 AI
            </p>
            <div className="text-center animate-on-load">
              <SignInButton mode="redirect">
                <BlackBgButton
                  innerText="지금 내 지원서 작성하기"
                  className="inline-block w-auto px-8 py-3 rounded-full font-bold text-center transition"
                />
              </SignInButton>
            </div>
          </div>

          {/* 문항과 AI 추천 통합 섹션 - 이미지와 정확히 동일한 구조 */}
          <div className="max-w-6xl mx-auto">
            {/* 문항 입력 섹션 */}
            <div className="mb-8 animate-on-load">
              <h2 className="text-xl font-bold mb-4 text-[#00193E]">문항 1</h2>
              {/* 팀워크 질문 박스 추가 */}
              <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-gray-50 mb-6">
                <p className="text-gray-800">팀워크를 발휘한 경험을 적어주세요.</p>
                <span className="text-gray-500 text-sm">500자</span>
              </div>
            </div>

            {/* AI 추천 카드 3개 - 가로 배치, 각 카드에 AI 추천 라벨 추가 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 카드 1: 스터디 그룹 */}
              <div className="bg-white rounded-2xl shadow-lg p-6 relative animate-on-load border border-[#9B9DA1] border-opacity-30">
                {/* AI 추천 라벨 - 각 카드에 개별 추가 */}
                <div className="absolute -top-3 -left-3 bg-[#FFECE3] text-[#FF6B00] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  AI 추천
                </div>
                <h3 className="text-lg font-bold text-[#00193E] mb-2">스터디 그룹 기획 및 운영</h3>
                <p className="text-sm text-[#9B9DA1] mb-3">교내 학습 동아리</p>
                <div className="border-t border-[#E4E8EE] pt-3 mb-4">
                  <p className="text-sm text-[#00193E] leading-relaxed">
                    친구들과 자율적으로 관심 주제 스터디를 조직해 역할을 나누고 세션을 운영한 경험은
                    협업 능력과 책임감을 보여줘요.
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  {/* 호버 효과 제거한 버튼 */}
                  <div className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md text-sm font-medium cursor-default">
                    이벤트 보기
                  </div>
                  <div className="px-4 py-2 bg-[#00193E] text-white rounded-md text-sm font-medium cursor-default">
                    선택
                  </div>
                </div>
              </div>

              {/* 카드 2: 동아리 행사 */}
              <div className="bg-white rounded-2xl shadow-lg p-6 relative animate-on-load border border-[#9B9DA1] border-opacity-30">
                {/* AI 추천 라벨 - 각 카드에 개별 추가 */}
                <div className="absolute -top-3 -left-3 bg-[#FFECE3] text-[#FF6B00] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  AI 추천
                </div>
                <h3 className="text-lg font-bold text-[#00193E] mb-2">동아리 정기 행사 준비</h3>
                <p className="text-sm text-[#9B9DA1] mb-3">대학 동아리 활동</p>
                <div className="border-t border-[#E4E8EE] pt-3 mb-4">
                  <p className="text-sm text-[#00193E] leading-relaxed">
                    동아리에서 소규모 발표회와 교류 행사를 기획·진행하며, 팀원 간 역할을 조율한
                    경험은 조직력과 커뮤니케이션 능력을 드러낼 수 있어요.
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  {/* 호버 효과 제거한 버튼 */}
                  <div className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md text-sm font-medium cursor-default">
                    이벤트 보기
                  </div>
                  <div className="px-4 py-2 bg-[#00193E] text-white rounded-md text-sm font-medium cursor-default">
                    선택
                  </div>
                </div>
              </div>

              {/* 카드 3: 조별과제 */}
              <div className="bg-white rounded-2xl shadow-lg p-6 relative animate-on-load border border-[#9B9DA1] border-opacity-30">
                {/* AI 추천 라벨 - 각 카드에 개별 추가 */}
                <div className="absolute -top-3 -left-3 bg-[#FFECE3] text-[#FF6B00] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  AI 추천
                </div>
                <h3 className="text-lg font-bold text-[#00193E] mb-2">조별과제 프로젝트</h3>
                <p className="text-sm text-[#9B9DA1] mb-3">대학 주전공 강의</p>
                <div className="border-t border-[#E4E8EE] pt-3 mb-4">
                  <p className="text-sm text-[#00193E] leading-relaxed">
                    수업에서 과제를 팀원들과 분담해 결과물을 도출한 경험은 문제 해결력과 협력 과정에
                    대한 이해를 보여줄 수 있어요.
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  {/* 호버 효과 제거한 버튼 */}
                  <div className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md text-sm font-medium cursor-default">
                    이벤트 보기
                  </div>
                  <div className="px-4 py-2 bg-[#00193E] text-white rounded-md text-sm font-medium cursor-default">
                    선택
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 기능 섹션 - 별도 섹션으로 분리하여 스크롤 효과 */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">DRAFTY의 핵심 기능</h2>
            <p className="text-[#9B9DA1] max-w-2xl mx-auto">
              지원 준비의 처음부터 끝까지, 끊김 없는 편리함은 오직 DRAFTY에서만
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 기능 1: 스펙 정리 */}
            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-[#E4E8EE] flex items-center justify-center text-white mb-6">
                <img src={boxIcon} alt="스펙 정리" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#00193E]">스펙 정리</h3>
              <p className="text-[#9B9DA1] mb-6 leading-relaxed">
                당신의 모든 경험이 흩어지지 않고 하나로 모입니다. <br /> 언제든 꺼내 쓸 수 있도록
                정리하세요.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <img src={checkIcon} alt="체크" className="w-4 h-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#00193E]">한눈에 확인하는 나의 스펙 진행 상황</span>
                </li>
                <li className="flex items-start gap-3">
                  <img src={checkIcon} alt="체크" className="w-4 h-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#00193E]">프로젝트 단위의 깔끔한 정리</span>
                </li>
                <li className="flex items-start gap-3">
                  <img src={checkIcon} alt="체크" className="w-4 h-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#00193E]">PDF/docs 파일 첨부 지원</span>
                </li>
              </ul>
            </div>

            {/* 기능 2: AI 지원서 작성 */}
            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-[#E4E8EE] flex items-center justify-center text-white mb-6">
                <img src={robotIcon} alt="AI 지원서 작성" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#00193E]">AI 지원서 작성</h3>
              <p className="text-[#9B9DA1] mb-6 leading-relaxed">
                혼자 고민하지 마세요. <br /> 당신의 스펙을 활용해 문항별로 꼭 맞는 답변을
                제안해드립니다.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <img src={checkIcon} alt="체크" className="w-4 h-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#00193E]">지원서 작성에 특화된 AI와의 대화</span>
                </li>
                <li className="flex items-start gap-3">
                  <img src={checkIcon} alt="체크" className="w-4 h-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#00193E]">문항 의도를 파악한 맞춤형 분석</span>
                </li>
                <li className="flex items-start gap-3">
                  <img src={checkIcon} alt="체크" className="w-4 h-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#00193E]">내 경험을 살려주는 답변 추천</span>
                </li>
              </ul>
            </div>

            {/* 기능 3: 지원내역 관리 */}
            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-[#E4E8EE] flex items-center justify-center text-white mb-6">
                <img src={folderIcon} alt="지원내역 관리" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#00193E]">지원내역 관리</h3>
              <p className="text-[#9B9DA1] mb-6 leading-relaxed">
                헷갈리는 지원 현황, <br /> 이제 자동으로 기록하고 편리하게 추적할 수 있습니다.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <img src={checkIcon} alt="체크" className="w-4 h-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#00193E]">무제한 지원서 작성 및 저장</span>
                </li>
                <li className="flex items-start gap-3">
                  <img src={checkIcon} alt="체크" className="w-4 h-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#00193E]">직관적인 지원별 결과 기록</span>
                </li>
                <li className="flex items-start gap-3">
                  <img src={checkIcon} alt="체크" className="w-4 h-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#00193E]">언제든 꺼내보는 쉬운 히스토리 관리</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 팀 소개 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">DRAFTY 팀 소개</h2>
            <p className="text-[#9B9DA1] max-w-2xl mx-auto">
              대학생·사회초년생의 지원 경험을 바꾸기 위해 모인 서울대학교 멋쟁이사자처럼 13기
              팀입니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8F9FA] p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#E4E8EE] flex items-center justify-center text-[#00193E] mr-4">
                  <i className="fas fa-user text-xl" />
                </div>
                <div>
                  <h4 className="font-bold">은성</h4>
                  <p className="text-sm text-[#9B9DA1]">PM · UX Design</p>
                </div>
              </div>
              <p className="text-[#9B9DA1] text-sm">어쩌고 저쩌고</p>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#E4E8EE] flex items-center justify-center text-[#00193E] mr-4">
                  <i className="fas fa-user text-xl" />
                </div>
                <div>
                  <h4 className="font-bold">민지</h4>
                  <p className="text-sm text-[#9B9DA1]">Frontend</p>
                </div>
              </div>
              <p className="text-[#9B9DA1] text-sm">내용내용</p>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#E4E8EE] flex items-center justify-center text-[#00193E] mr-4">
                  <i className="fas fa-user text-xl" />
                </div>
                <div>
                  <h4 className="font-bold">수민</h4>
                  <p className="text-sm text-[#9B9DA1]">Frontend</p>
                </div>
              </div>
              <p className="text-[#9B9DA1] text-sm">얄리얄리</p>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-2xl shadow-sm md:col-start-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#E4E8EE] flex items-center justify-center text-[#00193E] mr-4">
                  <i className="fas fa-user text-xl" />
                </div>
                <div>
                  <h4 className="font-bold">명현</h4>
                  <p className="text-sm text-[#9B9DA1]">Backend · AI</p>
                </div>
              </div>
              <p className="text-[#9B9DA1] text-sm">어쩌고 저쩌고</p>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#E4E8EE] flex items-center justify-center text-[#00193E] mr-4">
                  <i className="fas fa-user text-xl" />
                </div>
                <div>
                  <h4 className="font-bold">서정</h4>
                  <p className="text-sm text-[#9B9DA1]">Backend · AI</p>
                </div>
              </div>
              <p className="text-[#9B9DA1] text-sm">이러쿵저렁쿵</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 text-white"
        style={{ background: 'linear-gradient(135deg, #00193E 0%, #003366 100%)' }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">지금 DRAFTY로 지원서를 더 똑똑하게</h2>
          <p className="text-[#E4E8EE] max-w-2xl mx-auto mb-8">
            스펙 정리부터 작성·관리까지, 한 번에 끝냅니다.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#00193E] text-[#E4E8EE] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold text-white">DRAFTY</span>
              </div>
              <p className="max-w-xs">
                20대를 위한 스마트 지원서 작성 AI 솔루션
                <br />
                당신의 가능성을 DRAFTY가 실현합니다.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-white mb-4">제품</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-[#FFB38A] transition">
                      기능
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#FFB38A] transition">
                      데모
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#FFB38A] transition">
                      가이드
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">팀</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-[#FFB38A] transition">
                      소개
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#FFB38A] transition">
                      블로그
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#FFB38A] transition">
                      채용
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">지원</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-[#FFB38A] transition">
                      문의
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#FFB38A] transition">
                      도움말
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#FFB38A] transition">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-[#003366] flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#9B9DA1] text-sm mb-4 md:mb-0">
              © 2025 DRAFTY. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-[#E4E8EE] hover:text-[#FFB38A] transition">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="text-[#E4E8EE] hover:text-[#FFB38A] transition">
                <i className="fab fa-twitter" />
              </a>
              <a href="#" className="text-[#E4E8EE] hover:text-[#FFB38A] transition">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" className="text-[#E4E8EE] hover:text-[#FFB38A] transition">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;

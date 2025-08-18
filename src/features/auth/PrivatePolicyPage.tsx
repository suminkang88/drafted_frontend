import React from 'react';

const PolicyPage: React.FC = () => {
  return (
    <div className="w-full px-6 py-10 max-w-3xl mx-auto text-[#00193E] text-[15px] leading-relaxed">
      <h1 className="text-2xl font-bold mb-6 text-center">개인정보처리방침</h1>

      <div className="whitespace-pre-wrap space-y-6">
        <section>
          <strong>[서비스명]</strong>(이하 ‘회사’)는 이용자의 개인정보 보호를 매우 중요하게
          생각하며, 「개인정보 보호법」 등 관련 법령을 준수합니다. 회사는 개인정보처리방침을 통하여
          이용자의 개인정보가 어ㅞ떻게 수집, 이용, 보관, 파기되는지에 대해 안내드립니다.
        </section>

        <section>
          <h2 className="text-lg font-semibold mt-6 mb-2">
            제 1 조 (수집하는 개인정보 항목 및 수집 방법)
          </h2>
          회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>회원가입 시:</strong> 이메일, 비밀번호 또는 외부 계정 식별자 / 선택: 이름,
              소속 등
            </li>
            <li>
              <strong>서비스 이용 시 자동 수집:</strong> IP 주소, 브라우저 정보, 접속 일시, 서비스
              이용 기록, AI 응답 관련 데이터
            </li>
            <li>
              <strong>고객 문의 시:</strong> 이메일 주소, 문의 내용, 첨부파일
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mt-6 mb-2">
            제 2 조 (개인정보의 수집 및 이용 목적)
          </h2>
          수집된 개인정보는 다음과 같은 목적으로 활용됩니다.
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>회원 식별 및 서비스 제공</li>
            <li>지원서 작성 및 저장 기능 제공</li>
            <li>AI 기반 문항 추천 및 맞춤형 콘텐츠 제공</li>
            <li>서비스 개선을 위한 통계 분석 및 기능 개발</li>
            <li>문의 응대 및 공지사항 전달</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mt-6 mb-2">제 3 조 (개인정보 보유 및 이용기간)</h2>
          회사는 원칙적으로 이용자가 회원 탈퇴 시 수집된 개인정보를 지체 없이 파기합니다. 단, 관련
          법령에 따라 일정 기간 보관이 필요한 경우는 아래와 같습니다.
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-left border border-gray-300 text-[14px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 font-semibold">구분</th>
                  <th className="border px-4 py-2 font-semibold">보존 이유</th>
                  <th className="border px-4 py-2 font-semibold">보존 기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">로그인 기록</td>
                  <td className="border px-4 py-2">통신비밀보호법</td>
                  <td className="border px-4 py-2">3개월</td>
                </tr>
                {/* 결제 기능이 없다면 아래 항목은 삭제해도 됩니다 */}
                {/* <tr>
                  <td className="border px-4 py-2">계약/결제정보</td>
                  <td className="border px-4 py-2">전자상거래 등 소비자 보호법</td>
                  <td className="border px-4 py-2">5년</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mt-6 mb-2">제 4 조 (개인정보의 제3자 제공)</h2>
          회사는 원칙적으로 개인정보를 외부에 제공하지 않습니다. 단, 다음의 경우에는 예외로 합니다.
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>이용자의 사전 동의를 받은 경우</li>
            <li>법령에 따른 요청이 있는 경우</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mt-6 mb-2">제 5 조 (개인정보 처리의 위탁)</h2>
          회사는 서비스 운영을 위해 일부 업무를 외부 전문업체에 위탁할 수 있으며, 위탁 내용은 아래와
          같습니다.
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-left border border-gray-300 text-[14px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 font-semibold">수탁자</th>
                  <th className="border px-4 py-2 font-semibold">위탁 업무</th>
                  <th className="border px-4 py-2 font-semibold">보유 및 이용 기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Amazon Web Services</td>
                  <td className="border px-4 py-2">데이터 보관 및 서버 운영</td>
                  <td className="border px-4 py-2">회원 탈퇴 또는 위탁 계약 종료 시까지</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mt-6 mb-2">제 6 조 (이용자의 권리와 행사 방법)</h2>
          이용자는 언제든지 자신의 개인정보에 대해 다음 권리를 행사할 수 있습니다.
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>개인정보 조회, 수정, 삭제 요청</li>
            <li>동의 철회 및 처리 정지 요청</li>
            <li>회원 탈퇴 및 계정 삭제 요청</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mt-6 mb-2">
            제 7 조 (개인정보의 파기 절차 및 방법)
          </h2>
          개인정보는 수집 목적 달성 시 지체 없이 파기하며, 전자적 정보는 복구할 수 없는 방식으로
          삭제합니다. 종이 문서는 파쇄 또는 소각 방식으로 파기합니다.
        </section>

        <section>
          <h2 className="text-lg font-semibold mt-6 mb-2">
            제 8 조 (개인정보 보호를 위한 기술적·관리적 조치)
          </h2>
          회사는 개인정보의 안전한 처리를 위해 다음 조치를 취하고 있습니다.
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>개인정보 접근 제한 및 암호화 저장</li>
            <li>보안 시스템 적용 및 주기적 점검</li>
            <li>접속 기록의 보관 및 관리</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mt-6 mb-2">제 9 조 (쿠키 등 자동 수집 장치 관련)</h2>
          회사는 로그인 상태 유지를 위해 세션/쿠키를 사용할 수 있으며, 사용자는 브라우저 설정을 통해
          쿠키 저장을 거부할 수 있습니다.
        </section>

        <section>
          <h2 className="text-lg font-semibold mt-6 mb-2">
            제 10 조 (개인정보 보호책임자 및 문의)
          </h2>
          회사는 개인정보 보호 관련 문의를 처리하기 위해 아래와 같은 책임자를 지정합니다.
          <ul className="mt-2 space-y-1">
            <li>
              <strong>개인정보 보호책임자:</strong> 조은성
            </li>
            <li>
              <strong>이메일:</strong> dmstjddl02@snu.ac.kr
            </li>
          </ul>
          <p className="mt-2">
            또한, 개인정보 침해에 대한 신고나 상담은 아래 기관을 통해 하실 수 있습니다.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              개인정보침해신고센터:{' '}
              <a href="https://privacy.kisa.or.kr" className="text-blue-700">
                privacy.kisa.or.kr
              </a>{' '}
              / 국번 없이 118
            </li>
            <li>
              경찰청 사이버수사국:{' '}
              <a href="https://cyberbureau.police.go.kr" className="text-blue-700">
                cyberbureau.police.go.kr
              </a>{' '}
              / 국번 없이 182
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mt-6 mb-2">제 11 조 (고지의 의무)</h2>본
          개인정보처리방침은 시행일자 기준으로 적용되며, 내용 변경 시 서비스 내 공지사항 또는
          이메일을 통해 안내드립니다.
          <p className="mt-2">
            <strong>공고일자:</strong> 2025년 8월 6일
            <br />
            <strong>시행일자:</strong> 2025년 8월 6일
          </p>
        </section>
      </div>
    </div>
  );
};

export default PolicyPage;

import React from 'react';

interface UserProfile {
  name: string;
  university: string;
  major: string;
  graduation_year: number;
  field_of_interest: string;
}

const ProfileCard: React.FC<{ user: UserProfile }> = ({ user }) => {
  return (
    <div className="flex flex-col items-start space-y-4 w-full max-w-md">
      {/* 상단 타이틀 */}
      <div className="text-[22pt] text-[#00193E] font-bold leading-snug">
        {user.name}님의
        <br />
        아카이빙 보드
      </div>

      {/* 상세 정보 */}
      <div className="text-[12pt] text-[#9B9DA1] space-y-1 pl-1 leading-snug">
        <p>{user.university}</p>
        <p>{user.major}</p>
        <p>{user.graduation_year}년 졸업예정</p>
        <p>관심분야: {user.field_of_interest}</p>
      </div>
    </div>
  );
};

export default ProfileCard;

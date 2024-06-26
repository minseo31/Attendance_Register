const Profile: React.FC = () => {
  return (
    <section className="w-full h-[30%] flex justify-between p-[2.5%] box-border shadow-xl shadow-[#80B9AD] rounded-2xl bg-[#55AD9B] text-[#F1F8E8] hover:scale-105 duration-300">
      {/* 이름 - 출석률 */}
      <div className="w-fit h-full flex flex-col justify-between">
        {/* 이름 */}
        <div className="flex gap-2 items-end">
          <span className="text-4xl font-bold">김민서</span>
          <span className="text-xl">학생</span>
        </div>
        {/* 츨석룰 */}
        <div className="flex gap-2 items-end">
          <span className="text-sm">출석률</span>
          <span className="text-2xl font-bold">95%</span>
        </div>
      </div>

      <div></div>

      {/* 전화번호 - 주소 */}
      <div className="w-fit h-full flex flex-col justify-between items-end">
        {/* 전화번호 */}
        <div className="w-fit h-1/3 flex gap-2 items-end">
          <span className="text-sm">Tel.</span>
          <span className="text-lg font-bold">010-1234-1234</span>
        </div>
        {/* 주소 */}
        <div className="w-fit h-1/3 flex gap-2 items-end">
          <span className="text-sm">Addr.</span>
          <span className="text-lg font-bold">인천광역시 부평구 문화로 지하상가 2번출구</span>
        </div>
      </div>
    </section>
  );
};

export default Profile;

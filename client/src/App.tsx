import { useEffect } from "react";
import Header from "./Header";
import { studentAdd } from "./service/studentAdd";
import StudentPage from "./studentpage/StudentPage";
import { allGet } from "./service/allGet";
import { studentDel } from "./service/studentDel";
import { studentGet } from "./service/studentGet";
// import { HiArrowUturnLeft } from "react-icons/hi2";

const App: React.FC = () => {
  useEffect(() => {
    // studentAdd(); // 학생 데이터 추가
    // allGet() // 전체 데이터 읽기
    // studentDel() // 학생 삭제 요청
    // studentGet() // 학생 조회 요청
  }, []);

  return (
    <main className="">
      <Header />
      <StudentPage />

      <div className="w-[50px] h-[50px] fixed bottom-8 right-8 bg-[#55AD9B] rounded-full flex justify-center items-center text-[#F1F8E8] text-2xl">
        {/* <HiArrowUturnLeft /> */}
      </div>
    </main>
  );
};

export default App;

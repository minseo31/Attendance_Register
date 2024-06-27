import { useEffect } from "react";
import { studentAdd } from "./service/studentAdd";
import { allGet } from "./service/allGet";
import { studentDel } from "./service/studentDel";
import { studentGet } from "./service/studentGet";
import { update_status } from "./service/update_status";

const App: React.FC = () => {
  useEffect(() => {
    // studentAdd(); // 학생 데이터 추가
    // allGet() // 전체 데이터 읽기
    // studentDel() // 학생 삭제 요청
    // studentGet() // 학생 조회 요청
    // update_status() // 학생 출석 상태 변경
  }, []);

  return (
    <main className="">
    </main>
  );
};

export default App;

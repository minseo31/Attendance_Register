import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { studentAdd } from "./service/studentAdd";
import { allGet } from "./service/allGet";
import { studentDel } from "./service/studentDel";
import { studentGet } from "./service/studentGet";
import { update_status } from "./service/update_status";
import Attendance from "./page/Attendance";
import Student from "./page/Student";
import Login from "./page/Login";
import Layout from "./Layout";
import { studdentAll_Get } from "./service/studentAll_Get";

const App: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false); // 로그인 상태
  const [studentNum, setStudentNum] = useState<string>(""); // 학생 출석 페이지의 데이터를 가져올 해당 학생의 학번

  useEffect(() => {
    // studentAdd(); // 학생 데이터 추가
    // allGet() // 전체 데이터 읽기
    // studentDel() // 학생 삭제 요청
    // studentGet() // 학생 조회 요청
    // update_status() // 학생 출석 상태 변경
    // studdentAll_Get() // 학생 전체 읽어오기
  }, []);

  return (
    <Router>
      <Routes>
        {/* 공통 레이아웃 */}
        <Route path="/" element={<Layout setLogin={setLogin} login={login} setStudentNum={setStudentNum} />}>
          {/* 로그인 상태 여부에 따라 보여줄 컴포넌트를 변경 */}
          <Route
            path="/"
            element={login ? <Attendance /> : <Login setLogin={setLogin} />}
          />

          <Route path="/student" element={<Student studentNum={studentNum} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

import { useEffect } from "react";
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
        <Route path="/" element={<Layout/>}>
          <Route index element={<Login />}/>
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/student" element={<Student />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

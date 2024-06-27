import express from "express";
import { Request, Response } from "express"; // 요청과 응답 객체
import cors from "cors";
require("dotenv").config(); // env 파일 로드
import { createDB } from "./sql"; // 데이터베이스 초기 상태 생성

import { deleteStudent } from "./controller/stydentDel"; // 학생 삭제 처리 함수
import { studentGet } from "./controller/studentGet"; // 학생 조회 처리 함수
import { studendAdd } from "./controller/studentAdd"; // 학생 추가 처리 함수
import { allGet } from "./controller/allGet"; // 전체 데이터 조회 함수
import { update_Status } from "./controller/update_Status"; // 출석상태 변경 처리 함수

export const app = express(); // 서버 앱
const router = express.Router(); // 서버 라우팅
const api = process.env.API_KEY; // 서버 엔드포인트
export const port = 5000; // 포트

app.use(cors()); // cors 적용
app.use(express.json()); // JSON 파싱을 위한 미들웨어 설정

createDB();

// 라우팅  - /students 경로 생성 하고 삭제 요청 연결
router.delete("/students", (req: Request, res: Response) => {
  res.send("학생을 삭제하였습니다.");
});
// 라우팅  - /students 경로 생성 하고 읽기 요청 연결
router.get("/students", (req: Request, res: Response) => {
  res.send("학생을 읽어왔습니다.");
});
// 라우팅  - /students 경로 생성 하고 읽기 요청 연결
router.post("/students", (req: Request, res: Response) => {
  res.send("학생을 추가하였습니다.");
});
// 라우팅  - /attendance 경로 생성 하고 읽기 요청 연결
router.get("/attendance", (req: Request, res: Response) => {
  res.send("모든 데이터를 읽어왔습니다.");
});
// 라우팅  - /status 경로 생성 하고 추가(변경) 요청 연결
router.get("/status", (req: Request, res: Response) => {
  res.send("출석 상태를 변경합니다.");
});

app.listen(port, () => {
  console.log(`서버가 실행되었습니다. http://localhost:${port}`); // 서버가 실행될 때 출력
});

// 학생 삭제 처리
app.delete("/students", deleteStudent);
// 학생 데이터 읽기 처리
app.get("/students", studentGet);
// POST /api/student 라우트 핸들러
app.post("/students", studendAdd);
// 출석부 전체 조회 엔드포인트
app.get("/attendance", allGet);
// 출석 상태 변경 처리
app.post("/status", update_Status);

module.exports = router;

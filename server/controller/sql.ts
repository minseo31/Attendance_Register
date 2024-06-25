import express from "express";
import cors from "cors";
import mysql from "mysql2";
require("dotenv").config();

export const app = express();
export const port = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from TypeScript!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const dbHost: string = process.env.DB_HOST || "";
const dbUser: string = process.env.DB_USER || "";
const dbPassword: string = process.env.DB_PASSWORD || "";
const dbPort: number = parseInt(process.env.DB_PORT || "3306");

// 데이터베이스 연결 정보 객체
const connection = mysql.createConnection({
  host: dbHost, // MySQL 서버 호스트
  user: dbUser, // MySQL 사용자
  password: dbPassword, // MySQL 비밀번호-
  port: dbPort, // MySQL 포트
});

console.log(dbHost, dbUser, dbPassword, dbPort);

// 학생 테이블 쿼리
const StudentTableQuery = `
  CREATE TABLE IF NOT EXISTS student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    student_number VARCHAR(255) UNIQUE NOT NULL
  )
`;

// 수업 테이블 쿼리
const ClassTableQuery = `
CREATE TABLE IF NOT EXISTS class (
  id INT AUTO_INCREMENT PRIMARY KEY,
  class_name VARCHAR(255) NOT NULL
)
`;

// 출결 테이블 쿼리
const AttendanceTableQuery = `
CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  status VARCHAR(255),
  student_id INT,
  class_id INT,
  FOREIGN KEY (student_id) REFERENCES student(id),
  FOREIGN KEY (class_id) REFERENCES class(id)
)
`;

connection.connect((err) => {
  if (err) {
    console.error("데이터베이스 연결에 실패했습니다: " + err.stack);
    return;
  }
  console.log("데이터베이스에 연결되었습니다. ID: " + connection.threadId);

  connection.query(
    "CREATE DATABASE IF NOT EXISTS attendance_register",
    (err, results) => {
      if (err) {
        console.error("데이터베이스 생성에 실패했습니다: " + err.stack);
        return;
      }
      console.log("데이터베이스가 성공적으로 생성되었거나 이미 존재합니다.");

      // 데이터베이스 변경
      connection.changeUser({ database: "attendance_register" }, (err) => {
        if (err) {
          console.error("데이터베이스 변경에 실패했습니다: " + err.stack);
          return;
        }
        console.log("데이터베이스가 성공적으로 변경되었습니다.");

        // 학생 테이블 생성
        connection.query(StudentTableQuery, (err, results) => {
          if (err) {
            console.error("학생 테이블 생성에 실패했습니다: " + err.stack);
            return;
          }
          console.log("학생 테이블이 성공적으로 생성되었거나 이미 존재합니다.");
        });

        // 수업 테이블 생성
        connection.query(ClassTableQuery, (err, results) => {
          if (err) {
            console.error("수업 테이블 생성에 실패했습니다: " + err.stack);
            return;
          }
          console.log("수업 테이블이 성공적으로 생성되었거나 이미 존재합니다.");
        });

        // 출결 테이블 생성
        connection.query(AttendanceTableQuery, (err, results) => {
          if (err) {
            console.error("출결 테이블 생성에 실패했습니다: " + err.stack);
            return;
          }
          console.log("출결 테이블이 성공적으로 생성되었거나 이미 존재합니다.");

          // 모든 작업이 완료되면 연결 종료
          connection.end((err) => {
            if (err) {
              console.error("연결 종료에 실패했습니다: " + err.stack);
              return;
            }
            console.log("연결이 성공적으로 종료되었습니다.");
          });
        });
      });
    }
  );
});

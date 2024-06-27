import mysql from "mysql2";
require("dotenv").config();
import {
  createStudentsTableQuery,
  createCalendarTableQuery,
  createClassesTableQuery,
  createStudent_ClassesTableQuery,
  createAttendanceTableQuery,
} from "./query/create_query";
import {
  seedAttendance,
  seedCalendar,
  seedClasses,
  seedStudent_Classes,
  seedStudnet,
} from "./seed";
import { resetQueries } from "./query/delete_query";

const dbHost: string = process.env.DB_HOST || "";
const dbUser: string = process.env.DB_USER || "";
const dbPassword: string = process.env.DB_PASSWORD || "";
const dbPort: number = parseInt(process.env.DB_PORT || "3306");

// 데이터베이스 연결 정보 객체
export const connection = mysql.createConnection({
  host: "localhost", // MySQL 서버 호스트
  user: "root", // MySQL 사용자
  password: "manseo3058", // MySQL 비밀번호-npx
  port: 3306, // MySQL 포트
});

export const createDB = () => {
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

          // // 테이블 초기화
          // resetQueries.forEach((query, i) => {
          //   connection.query(query, (err, results) => {
          //     if (err) {
          //       console.error(
          //         `${i}번째 테이블 초기화에 실패하였습니다.: ` + err.stack
          //       );
          //     }
          //     console.log("테이블 초기화에 성공하였습니다.");
          //   });
          // });

          // 학생 테이블 생성
          connection.query(createStudentsTableQuery, (err, results) => {
            if (err) {
              console.error("학생 테이블 생성에 실패했습니다: " + err.stack);
              return;
            }
            console.log(
              "학생 테이블이 성공적으로 생성되었거나 이미 존재합니다."
            );
          });

          // 달력 테이블 생성
          connection.query(createCalendarTableQuery, (err, results) => {
            if (err) {
              console.error("달력 테이블 생성에 실패했습니다: " + err.stack);
              return;
            }
            console.log(
              "달력 테이블이 성공적으로 생성되었거나 이미 존재합니다."
            );
          });

          // 수업 테이블 생성
          connection.query(createClassesTableQuery, (err, results) => {
            if (err) {
              console.error("수업 테이블 생성에 실패했습니다: " + err.stack);
              return;
            }
            console.log(
              "수업 테이블이 성공적으로 생성되었거나 이미 존재합니다."
            );
          });

          // 학생 + 수업 맵핑 테이블 생성
          connection.query(createStudent_ClassesTableQuery, (err, results) => {
            if (err) {
              console.error(
                "학생 + 수업 맵핑 테이블 생성에 실패했습니다: " + err.stack
              );
              return;
            }
            console.log(
              "학생 + 수업 맵핑 테이블이 성공적으로 생성되었거나 이미 존재합니다."
            );
          });

          // 출석부 맵핑 테이블 생성
          connection.query(createAttendanceTableQuery, (err, results) => {
            if (err) {
              console.error("출석부 테이블 생성에 실패했습니다: " + err.stack);
              return;
            }
            console.log(
              "출석부 테이블이 성공적으로 생성되었거나 이미 존재합니다."
            );
          });

          // 학생 시드 데이터 생성
          connection.query(seedStudnet, (err, results) => {
            if (err) {
              console.error(
                "학생 시드 데이터 생성에 실패했습니다: " + err.stack
              );
              return;
            }
            console.log(
              "학생 시드 데이터 성공적으로 생성되었거나 이미 존재합니다."
            );
          });

          // 달력 데이터 생성
          connection.query(seedCalendar, (err, results) => {
            if (err) {
              console.error(
                "달력 초기 데이터 생성에 실패했습니다: " + err.stack
              );
              return;
            }
            console.log(
              "달력 초기 데이터 성공적으로 생성되었거나 이미 존재합니다."
            );
          });

          // 수업 데이터 생성
          connection.query(seedClasses, (err, results) => {
            if (err) {
              console.error(
                "수업 초기 데이터 생성에 실패했습니다: " + err.stack
              );
              return;
            }
            console.log(
              "수업 초기 데이터 성공적으로 생성되었거나 이미 존재합니다."
            );
          });

          // 수업 + 학생 맵핑 시드 데이터 생성
          connection.query(seedStudent_Classes, (err, results) => {
            if (err) {
              console.error(
                "수업 + 학생 맵핑 시드 데이터 생성에 실패했습니다: " + err.stack
              );
              return;
            }
            console.log(
              "수업 + 학생 맵핑 시드 데이터 성공적으로 생성되었거나 이미 존재합니다."
            );
          });

          // 출석부 맵핑 시드 데이터 생성
          connection.query(seedAttendance, (err, results) => {
            if (err) {
              console.error(
                "출석부 맵핑 시드 데이터 생성에 실패했습니다: " + err.stack
              );
              return;
            }
            console.log(
              "출석부 맵핑 시드 데이터 성공적으로 생성되었거나 이미 존재합니다."
            );
          });
        });
      }
    );
  });
};

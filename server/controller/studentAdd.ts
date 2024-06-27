import { connection } from "../sql";
import {
  attendanceAdd_Query,
  studentAdd_Query,
  student_ClassesAdd_Query,
} from "../query/insert_query";

export const studendAdd = async (req: any, res: any) => {
  // 클라이언트 측의 추가할 학생 정보를 저장
  const { student_name, student_number, phone_number, student_address } =
    req.body.studentData;

  // 전달받은 학생 정보가 없다면
  if (!student_name || !student_number || !phone_number || !student_address) {
    res
      .status(400)
      .json({ error: "student_name과 student_number는 필수 항목입니다." });
    return;
  }
  // 학생 추가
  connection.query(
    studentAdd_Query,
    [student_name, student_number, phone_number, student_address],
    (err: URIError | null, results: any) => {
      if (err) {
        console.error("학생 추가에 실패했습니다.", err.stack);
        res.status(500).send("학생 추가에 실패했습니다.");
        return;
      }

      // 추가된 학생 + 수업 맵핑 데이터 추가
      connection.query(
        student_ClassesAdd_Query,
        (err: URIError | null, results: any) => {
          if (err) {
            console.error(
              "학생 + 수업 맵핑 데이터 추가에 실패했습니다.",
              err.stack
            );
            res.status(500).send("학생 + 수업 맵핑 데이터 실패했습니다.");
            return;
          }
          console.log("학생 + 수업 맵핑 데이터 추가에 성공했습니다.");
        }
      );

      // 추가된 학생의 출석부 맵핑 데이터 추가
      connection.query(
        attendanceAdd_Query,
        (err: URIError | null, results: any) => {
          if (err) {
            console.error("출석부 맵핑 데이터 추가에 실패했습니다.", err.stack);
            res.status(500).send("출석부 맵핑 데이터 추가에 실패했습니다.");
            return;
          }
          console.log("출석부 맵핑 데이터 추가에 성공했습니다.");
        }
      );

      res.status(200).json({
        id: results.insertId,
        student_name,
        student_number,
        phone_number,
        student_address,
      });
    }
  );
};

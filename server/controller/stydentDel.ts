import {
  studentDel_Query,
  student_classesDel_Query,
} from "../query/delete_query";
import { connection } from "../sql";

export const deleteStudent = (req: any, res: any) => {
  // 클라이언트 측에서 보낸 삭제할 학생의 학번
  const studentNumber = req.body.delStudent;

  if (!studentNumber) {
    // 학번이 전달되지 않았다면
    return res
      .status(400)
      .json({ message: "삭제할 학생의 학번이 요청 본문에 포함되어야 합니다." });
  }

  // 데이터 베이스 연결
  connection.connect((err: URIError | null) => {
    // 연결 중 에러가 발생하였다면
    if (err) {
      console.log(
        "삭제 요청- 데이터베이스 연결에 실패하였습니다. : " + err.stack
      );
      // 연결 되었다면
    } else {
      console.log(
        "삭제 요청- 데이터베이스 연결에 성공하였습니다. : " +
          connection.threadId
      );

      // 외래키 연결로 학생데이터를 삭제하려면 학생과 연결된 맵핑 데이터를 먼저 삭제해야함
      connection.query(
        student_classesDel_Query,
        [studentNumber],
        (error: URIError | null, results: any) => {
          if (error) {
            console.error(
              "맵핑 삭제 요청 - 쿼리 실행에 실패하였습니다. : " + error.stack
            );
            return res.status(500).json({
              message: "학생 + 수업 맵핑 데이터 삭제에 실패하였습니다.",
            });
          }
          console.log("학생 + 수업 맵핑 데이터 삭제에 성공하였습니다.");
        }
      );

      // 쿼리문을 실행
      connection.query(
        studentDel_Query, // 쿼리
        [studentNumber], // 삭제할 학생의 학번 (쿼리에 ? 자리에 적용됨)
        (error: URIError | null, results: any) => {
          // 에러가 발생하였다면
          if (error) {
            console.error(
              "삭제 요청 - 쿼리 실행에 실패하였습니다. : " + error.stack
            );
            return res
              .status(500)
              .json({ message: "학생 삭제에 실패하였습니다." });
          }
          // 해당 학생이 존재하지 않는다면
          if (results.affectedRows === 0) {
            return res
              .status(404)
              .json({ message: "해당 학번을 가진 학생을 찾을 수 없습니다." });
          }
          console.log("학생이 성공적으로 삭제되었습니다.");

          // 삭제 성공 하였다면
          res.status(200).json({
            message: `학번 ${studentNumber} 학생이 성공적으로 삭제되었습니다.`,
          });
        }
      );
    }
  });
};

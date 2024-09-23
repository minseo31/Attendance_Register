import { studentGet_Query } from "../query/select_query";
import { connection } from "../sql";

export const studentGet = (req: any, res: any) => {
  // 클라이언트 측에서 보낸 삭제할 학생의 학번
  const studentNumber = req.query.getStudent;

  if (!studentNumber) {
    // 학번이 전달되지 않았다면
    return res
      .status(400)
      .json({ message: "가져올 학생의 학번이 요청 본문에 포함되어야 합니다." });
  }

  connection.connect((err: URIError | null) => {
    if (err) {
      console.log(
        "읽기 요청 - 데이터베이스 연결에 실패하였습니다. : " + err.stack
      );
    } else {
      console.log(
        "읽기 요청- 데이터베이스 연결에 성공하였습니다. : " +
          connection.threadId
      );

      // 쿼리문을 실행
      connection.query(
        studentGet_Query, // 쿼리
        [studentNumber], // 삭제할 학생의 학번 (쿼리에 ? 자리에 적용됨)
        (error: URIError | null, results: any) => {
          // 에러가 발생하였다면
          if (error) {
            console.error(
              "읽기 요청 - 쿼리 실행에 실패하였습니다. : " + error.stack
            );
            return res
              .status(500)
              .json({ message: "읽어오기를 실패하였습니다." });
          }
          // 해당 학생이 존재하지 않는다면
          if (results.affectedRows === 0) {
            return res
              .status(404)
              .json({ message: "해당 학번을 가진 학생을 찾을 수 없습니다." });
          }
          console.log("해당 학생을 성공적으로 읽어왔습니다.");

          // 읽기 성공 하였다면
          const student = results;
          return res.status(200).json({ student });
        }
      );
    }
  });
};

import { studentAllGet_Query } from "../query/select_query";
import { connection } from "../sql";


type Student = {
  id: number;
  name: string;
  student_number: string;
  phone_number: string;
  student_addr: string;
}

export const studentAll_Get = (req: any, res: any) => {
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
        studentAllGet_Query, // 쿼리
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
          console.log("해당 학생을 성공적으로 읽어왔습니다.");

          // 읽기 성공 하였다면
          const values : Student[] = results;
          return res.status(200).json(values);
        }
      );
    }
  });
};

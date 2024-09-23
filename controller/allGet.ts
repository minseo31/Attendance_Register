import { connection } from "../sql";
import { allGetQuery } from "../query/select_query";

export const allGet = (req: any, res: any) => {
  connection.connect((err: URIError | null) => {
    if (err) {
      console.error("데이터베이스 연결 실패:", err);
      res.status(500).send("데이터베이스 연결에 실패했습니다.");
      return;
    }
    console.log("데이터베이스에 연결되었습니다.");

    // 전체 데이터 읽어오기
    connection.query(allGetQuery, (err: URIError, results: any) => {
      if (err) {
        console.error("출석부 조회 실패:", err);
        res.status(500).send("출석부 조회에 실패했습니다.");
        return;
      }
      console.log("데이터 가져오기 성공하였습니다.");
      res.status(200).json({ attendanceList: results });
    });
  });
};

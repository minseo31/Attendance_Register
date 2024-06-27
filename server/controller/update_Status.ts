import { connection } from "../sql";
import { updateStatus_Query } from "../query/update_query";

export const update_Status = (req: any, res: any) => {
  const reqData = req.body.reqData;

  if (!reqData) {
    console.log("요청 본문에 변경될 출석상태 값이 있어야 합니다.");
    return res
      .status(400)
      .json({ message: "요청 본문에 변경될 출석상태 값이 있어야 합니다." });
  }

  connection.query(
    updateStatus_Query(
      reqData.set_student_number,
      reqData.set_status,
      reqData.set_date,
      reqData.set_class
    ),
    (err: URIError | null, results: any) => {
      if (err) {
        console.error("업데이트 쿼리 실행에 실패하였습니다. : " + err.stack);
      }
      console.log("업데이트 쿼리 실행에 성공하였습니다. ");

      return res.status(200).json({
        message: `${results} 성공적으로 업데이트되었습니다.`,
      });
    }
  );
};

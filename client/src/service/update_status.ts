import axios from "axios";

const update_Data = {
  reqData: {
    set_student_number: "S00001",
    set_status: "결석",
    set_date: "2023-07-03",
    set_class: "오전",
  },
};

export const update_status = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/status",
      update_Data
    );

    console.log("POST 요청에 성공하였습니다.", response.data, update_Data);
  } catch (error: any) {
    if (error.response) {
      // 서버가 요청을 수신하고 오류 상태 코드를 반환한 경우
      console.error("서버 응답 오류:", error.response.data);
    } else if (error.request) {
      // 요청이 서버에 전송되었지만 응답을 받지 못한 경우
      console.error("서버 응답 없음:", error.request);
    } else {
      // 요청을 설정하는 과정에서 발생한 오류
      console.error("요청 설정 오류:", error.message);
    }
  }
};

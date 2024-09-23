import axios from "axios";

// 인수로 전달 받을 추가할 학생 데이터의 타입
export type PropsDataType = {
  studentData: {
    student_name: string;
    student_number: string;
    phone_number: string;
    student_address: string;
  };
};

export const studentAdd = async (studentData: PropsDataType) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/students",
      studentData
    );

    console.log("POST 요청에 성공하였습니다.", response.data);
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

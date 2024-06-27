import { useEffect, useState } from "react";
import { allGet } from "../service/allGet";

// 데이터 타입
type Student = {
  id: number;
  student_name: string;
  student_number: string;
  phone_number: string;
  student_addr: string;
  attendance_status: string;
  class_name: string;
  date: string;
};

const Attendance: React.FC = () => {
  const [data, setDate] = useState<Student[]>(); // 데이터 관리
  const [className, setClassName] = useState<"오전" | "오후" | "저녁">("오전"); // 사용자가 선택한 수업명의 키워드
  const [studentNames, setStudentNames] = useState<JSX.Element[]>(); // 학생 이름들
  const [studentNumber, setStudentNumber] = useState<JSX.Element[]>(); // 학생 학번들
  const [studentAtten, setStudentAtten] = useState<JSX.Element[]>(); // 학생 출석률들
  const [studentNots, setStudentNots] = useState<JSX.Element[]>(); // 학생 비고들

  // 데이터 요청
  useEffect(() => {
    const fetching = async () => {
      const data = await allGet();
      // console.log(data.attendanceList); // 데이터 확인
      setDate(data.attendanceList);
    };
    fetching();
  }, [className]);

  // console.log(data);

  // 수업 필터링 - 해당 수업 데이터만 추출
  const class_filtering = (class_name: "오전" | "오후" | "저녁") => {
    const data_Classfiltering = data?.filter((data: Student) => {
      return data.class_name === class_name;
    });

    return data_Classfiltering;
  };

  // 수업 필터링한 데이터
  const class_filterResult = class_filtering(className);

  // 출석인 데이터만 필터링
  const attendance_list = class_filterResult?.filter((data: Student) => {
    return data.attendance_status === "-"; // 출석 , 조퇴 , 결석 , -
  });

  // 출석인 데이터에서 이름별로 출석 수를 반환하는 함수
  const countNameOccurrences = (
    students: Student[]
  ): Record<string, number> => {
    return students.reduce((acc, student) => {
      const name = student.student_name;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };
  // 이름 별 출석 수 반환
  const nameCounts = countNameOccurrences(
    attendance_list ? attendance_list : []
  );
  // 출석 수 값을 배열로 변환
  const nameCountsArray = Object.entries(nameCounts).map(([name, count]) => ({
    name,
    count,
  }));

  // 인수로 전달받은 수업명별 학생 리스트 JSX를 생성
  const student_list = (class_name: "오전" | "오후" | "저녁") => {
    const class_list = class_filtering(class_name); // 수업 데이터만 추출

    // Map 객체는 중복되는 키값은 마지막에 할당된 데이터만 가지기에 중복된 데이터를 필터링 할 수 있다 - 이름을 기준으로 중복되는 데이터 필터링
    const setData_filtering = Array.from(
      new Map(class_list?.map((data) => [data.student_name, data])).values()
    ).reverse(); // Map 객체에서 배열로 변환하는 과정에서 순서가 거꾸로 반환되기에 다시 정렬
    return setData_filtering;
  };

  useEffect(() => {
    const studentData_list = student_list(className); // 중복 이름 제거, 수업별 필터링한 데이터

    /* 필터링 된 데이터로 JSX 리스트를 생성 */

    // 이름 리스트
    const studentName_list = studentData_list.map(
      (data: Student): JSX.Element => {
        return (
          <div
            key={data.id}
            className="text-xl p-2 text-green3 border-solid border-b-2 border-green2"
          >
            {data.student_name} 학생
          </div>
        );
      }
    );
    setStudentNames(studentName_list);

    // 학번 리스트
    const studentNum_list = studentData_list.map(
      (data: Student): JSX.Element => {
        return (
          <div
            key={data.id}
            className="text-xl p-2 text-green3 border-solid border-b-2 border-green2"
          >
            {data.student_number}
          </div>
        );
      }
    );
    setStudentNumber(studentNum_list);

    // 출석률 리스트
    const studentAtten_list = nameCountsArray?.map((data): JSX.Element => {
      return (
        <div
          key={data.name}
          className="text-xl p-2 text-green3 border-solid border-b-2 border-green2"
        >
          {(data.count / 31) * 100}%
        </div>
      );
    });
    setStudentAtten(studentAtten_list);

    // 비고 리스트
    const studentNote_list = studentData_list.map(
      (data: Student): JSX.Element => {
        return (
          <div
            key={data.id}
            className="text-xl p-2 text-green3 border-solid border-b-2 border-green2"
          >
            {data.class_name}
          </div>
        );
      }
    );
    setStudentNots(studentNote_list);
  }, [data]);

  // 수업 선택 핸들러
  const handleClassToggle = (class_name: "오전" | "오후" | "저녁") => {
    setClassName(class_name); // 수업 상태 값 변경
  };

  return (
    <section className="w-full h-full flex flex-col gap-4">
      <div className="w-full h-1/4 bg-green3 rounded-2xl flex justify-between items-end px-[5%] py-4 box-border">
        {/* 로고 */}
        <div className="w-fit h-fit px-2 py-4 text-center text-white">
          <span className="text-6xl font-bold font-logoFont">Attendance_</span>
          <span className="text-xs">@Manager</span>
        </div>

        <div className="w-fit h-full text-sm text-white flex flex-col justify-between items-center font-bold">
          <span
            onClick={() => handleClassToggle("오전")}
            className="w-fit h-fit p-2 hover:bg-white hover:text-green3 transition-all duration-300 rounded-2xl cursor-pointer"
            style={
              className === "오전"
                ? {
                    backgroundColor: "white",
                    color: "#55AD9B",
                  }
                : {}
            }
          >
            오전 수업
          </span>
          <span
            onClick={() => handleClassToggle("오후")}
            className="w-fit h-fit p-2 hover:bg-white hover:text-green3 transition-all duration-300 rounded-2xl cursor-pointer"
            style={
              className === "오후"
                ? {
                    backgroundColor: "white",
                    color: "#55AD9B",
                  }
                : {}
            }
          >
            오후 수업
          </span>
          <span
            onClick={() => handleClassToggle("저녁")}
            className="w-fit h-fit p-2 hover:bg-white hover:text-green3 transition-all duration-300 rounded-2xl cursor-pointer"
            style={
              className === "저녁"
                ? {
                    backgroundColor: "white",
                    color: "#55AD9B",
                  }
                : {}
            }
          >
            저녁 수업
          </span>
        </div>
      </div>
      <div
        className="w-full h-3/4 border-2 border-solid border-green1 rounded-2xl flex py-2 px-4 box-border overflow-y-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#55AD9B white" }}
      >
        <div className="h-full w-full flex flex-col">
          <span className="text-xl font-bold text-green3 border-b-2 border-solid border-green3 p-2">
            학번
          </span>
          {studentNumber}
        </div>
        <div className="h-full w-full flex flex-col">
          <span className="text-xl font-bold text-green3 border-b-2 border-solid border-green3 p-2">
            이름
          </span>
          {studentNames}
        </div>
        <div className="h-full w-full flex flex-col">
          <span className="text-xl font-bold text-green3 border-b-2 border-solid border-green3 p-2">
            출석률
          </span>
          {studentAtten}
        </div>
        <div className="h-full w-full flex flex-col">
          <span className="text-xl font-bold text-green3 border-b-2 border-solid border-green3 p-2">
            수업명
          </span>
          {studentNots}
        </div>
      </div>
    </section>
  );
};

export default Attendance;

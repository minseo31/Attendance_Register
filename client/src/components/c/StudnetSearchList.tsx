import { useEffect, useState } from "react";
import { studdentAll_Get } from "../../service/studentAll_Get";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";

// 데이터 타입
type Student = {
  id: number;
  student_name: string;
  student_number: string;
  phone_number: string;
  student_addr: string;
};

// props 타입
type PropsType = {
  input: string | undefined;
  setIsOnModal: React.Dispatch<React.SetStateAction<boolean>>;
  setStudentNum: React.Dispatch<React.SetStateAction<string>>;
};

//
const StudentSearchList: React.FC<PropsType> = ({
  input,
  setIsOnModal,
  setStudentNum,
}: PropsType) => {
  const [students, setStudents] = useState<Student[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await studdentAll_Get(); // studdentAll_Get 함수 호출
        console.log(data);
        setStudents(data);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchData();
  }, []);

  // 학생 목록을 필터링하고, JSX로 렌더링하는 부분
  const student_list = students
    ?.filter((data: Student) => {
      return data.student_name.includes(input || "");
    })
    .map((data: Student): JSX.Element => {
      return (
        <Link
          to="/student"
          // 경로 이동 시 모달 창 나가기 및 해당 학생의 학번 저장
          onClick={() => {
            setStudentNum(data.student_number);
            setIsOnModal((prev) => !prev);
          }}
          key={data.id}
          className="w-full h-fit p-2 box-border text-sm flex gap-2 text-green3 border-2 border-solid border-green2 rounded-xl"
        >
          <span>학번 - {data.student_number}</span>
          <span>/</span>
          <span>{data.student_name} 학생</span>
        </Link>
      );
    });

  return (
    <ul
      className="w-full h-full rounded-2xl bg-white flex flex-col gap-1 overflow-y-auto"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#55AD9B white" }}
    >
      {student_list}
    </ul>
  );
};

export default StudentSearchList;

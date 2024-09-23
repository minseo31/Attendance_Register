import { useEffect, useState } from "react";
import { studdentAll_Get } from "../../service/studentAll_Get";
import { studentDel, studentDelDataType } from "../../service/studentDel";
import { AxiosResponse } from "axios";

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
};

const StudnetDelList: React.FC<PropsType> = ({ input }: PropsType) => {
  const [students, setStudents] = useState<Student[]>(); // 읽어온 데이터 저장
  const [delStudentNum, setDelStudentNum] = useState<studentDelDataType>({
    delStudent: "",
  }); // 삭제할 학생의 학번
  const [fetching, setFetching] = useState<boolean>(false); // 삭제 후 읽기 요청을 실행할 의존성 상태

  //   등록 취소 - 학생 삭제 이벤트
  const handleDel = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    student_num: string,
    student_name: string
  ) => {
    const result = window.confirm(
      `${student_num} - ${student_name} 학생을 삭제하겠습니까?`
    );

    if (result) {
      setDelStudentNum({ delStudent: student_num }); // 삭제할 학생의 학번을 설정
      setFetching(true); // 데이터 요청 상태를 true로 설정
    }
  };

  useEffect(() => {
    if (delStudentNum.delStudent !== "") {
      // delStudentNum이 ""이 아닌 경우에만 실행
      studentDel(delStudentNum)
        .then(() => {
          // 학생 삭제 요청이 완료된 후에 실행될 코드
          setFetching(false); // 데이터 요청 상태를 false로 설정
        })
        .catch((error) => {
          console.error("학생 삭제 실패:", error);
          setFetching(false); // 실패 시에도 데이터 요청 상태를 false로 설정
        });
    }
  }, [delStudentNum]);

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
  }, [fetching]);

  // 학생 목록을 필터링하고, JSX로 렌더링하는 부분
  const student_list = students
    ?.filter((data: Student) => {
      return data.student_name.includes(input || "");
    })
    .map((data: Student): JSX.Element => {
      return (
        <div
          key={data.id}
          className="w-full h-fit p-2 box-border text-sm flex justify-between items-center text-green3 border-2 border-solid border-green2 rounded-xl"
        >
          <div className="w-fit h-fit flex gap-2 items-center">
            <span>학번 - {data.student_number}</span>
            <span>/</span>
            <span>{data.student_name} 학생</span>
          </div>

          {/* 등록 취소 버튼 */}
          <button
            onClick={(e) =>
              handleDel(e, data.student_number, data.student_name)
            }
            className="w-fit h-fit text-sm font-bold bg-green3 text-white py-1 px-2 box-border rounded-lg"
          >
            등록 취소
          </button>
        </div>
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

export default StudnetDelList;

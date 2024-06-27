import { useEffect, useState } from "react";
import { studdentAll_Get } from "../../service/studentAll_Get";
import { AxiosResponse } from "axios";

// 데이터 타입
type Student = {
  id: number;
  student_name: string;
  student_number: string;
  phone_number: string;
  student_addr: string;
};

//
const StudentSearchList: React.FC = () => {
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

  const student_list = students?.map((data: Student): JSX.Element => {
    return (
      <div
        key={data.id}
        className="w-full h-fit p-2 box-border text-sm flex gap-2 text-green3"
      >
        <span>{data.student_number}</span>
        <span>{data.student_name}</span>
      </div>
    );
  });

  return (
    <ul className="w-full h-full rounded-2xl bg-whiteGreen flex flex-col gap-1 overflow-y-auto">
      {student_list}
    </ul>
  );
};

export default StudentSearchList;

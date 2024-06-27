import { useEffect, useState } from "react";
import Modal from "../components/l/Modal";
import { allGet } from "../service/allGet";

type Student = {
  id: number;
  student_name: string;
  student_number: string;
  phone_number: string;
  student_addr: string;
};

const Attendance: React.FC = () => {
  const [data, setDate] = useState<Student[]>();

  useEffect(() => {
    const fetching = async () => {
      const data = await allGet();
      // console.log(data.attendanceList); // 데이터 확인
      setDate(data.attendanceList);
    };
    fetching();
  }, []);

  console.log(data);

  // 
  const list = data?.map((data: Student): JSX.Element => {
    return <div className="text-xl">{data.student_name}</div>;
  });

  return (
    <section className="w-full h-full ml-[100px] flex box-border relative rounded-3xl bg-white">
      {list}
    </section>
  );
};

export default Attendance;

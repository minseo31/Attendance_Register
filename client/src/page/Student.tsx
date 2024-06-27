import { useEffect, useRef, useState } from "react";
import { studentGet } from "../service/studentGet";
import { update_status, Update_DataType } from "../service/update_status";

type classType = "오전" | "오후" | "저녁";

type PropsType = {
  studentNum: string;
};

type DataType = {
  student_name: string;
  student_number: string;
  phone_number: string;
  student_addr: string;
  date: string;
  class_name: string;
  status: string;
};

const Student: React.FC<PropsType> = ({ studentNum }: PropsType) => {
  const [data, setData] = useState<DataType[]>();
  const [update, setUpdate] = useState<Update_DataType>();
  const [isRes, serIsRes] = useState<boolean>(false);
  const iupRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await studentGet(studentNum);
        setData(responseData.student);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    console.log(studentNum);

    fetchData();
  }, [update, isRes, studentNum]);

  //   console.log(data);

  const handleUpdata = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
    date: string,
    num: string
  ) => {
    if (iupRef.current) {
      setUpdate({
        reqData: {
          set_student_number: num,
          set_status: e.target.value,
          set_date: date,
          set_class: name,
        },
      });
      if (update) await update_status(update);
      serIsRes((prev) => !prev);
    }
  };

  // 수업 별 필터링
  const class_filtering = (class_name: classType) => {
    const result = data?.filter((data: DataType) => {
      return data.class_name === class_name;
    });
    return result;
  };

  const m_data = class_filtering("오전"); // 오전 데이터
  const a_data = class_filtering("오후"); // 오후 데이터
  const e_data = class_filtering("저녁"); // 저녁 데이터

  const m_list = m_data?.map((data: DataType, i): JSX.Element => {
    return (
      <div
        className="w-full h-full flex flex-col border-2 border-solid border-green2 rounded-xl p-1 box-border"
        key={i}
      >
        <span className="w-full h-1/2 text-center">
          {data.date.substring(8, 10)}
        </span>
        <input
          type="text"
          ref={iupRef}
          className="w-full h-1/2 text-center"
          defaultValue={data.status}
          onFocus={(e) => e.target.removeAttribute("readonly")}
          onChange={(e) =>
            handleUpdata(e, data.class_name, data.date, data.student_number)
          }
        />
      </div>
    );
  });

  const a_list = m_data?.map((data: DataType, i): JSX.Element => {
    return (
      <div
        className="w-full h-full flex flex-col border-2 border-solid border-green2 rounded-xl p-1 box-border"
        key={i}
      >
        <span className="w-full h-1/2 text-center">
          {data.date.substring(8, 10)}
        </span>
        <input
          type="text"
          ref={iupRef}
          className="w-full h-1/2 text-center"
          defaultValue={data.status}
          onFocus={(e) => e.target.removeAttribute("readonly")}
          onChange={(e) =>
            handleUpdata(e, data.class_name, data.date, data.student_number)
          }
        />
      </div>
    );
  });

  const e_list = m_data?.map((data: DataType, i): JSX.Element => {
    return (
      <div
        className="w-full h-full flex flex-col border-2 border-solid border-green2 rounded-xl p-1 box-border"
        key={i}
      >
        <span className="w-full h-1/2 text-center">
          {data.date.substring(8, 10)}
        </span>
        <input
          type="text"
          ref={iupRef}
          className="w-full h-1/2 text-center"
          defaultValue={data.status}
          onFocus={(e) => e.target.removeAttribute("readonly")}
          onChange={(e) =>
            handleUpdata(e, data.class_name, data.date, data.student_number)
          }
        />
      </div>
    );
  });

  return (
    <section className="w-full h-full flex flex-col gap-4">
      <div className="w-full h-1/4 bg-green3 rounded-2xl flex justify-between items-end px-[5%] py-4 box-border text-white">
        <div className="w-fit h-full flex flex-col justify-between">
          <span className="font-bold ">
            학번 - {data ? data[0].student_number : ""}
          </span>
          <div className="w-fit h-fit flex items-end gap-4">
            <span className="text-4xl font-bold">
              {data ? data[0].student_name : ""}
            </span>
            <span>학생</span>
          </div>
        </div>
      </div>
      <div
        className="w-full h-3/4 border-2 border-solid border-green1 rounded-2xl flex flex-col gap-4 py-2 px-4 box-border overflow-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#55AD9B white" }}
      >
        <span>오전</span>
        <div className="w-full h-1/3 flex gap-2 text-xs">{m_list}</div>
        <span>오후</span>
        <div className="w-full h-1/3 flex gap-2 text-xs">{a_list}</div>
        <span>저녁</span>
        <div className="w-full h-1/3 flex gap-2 text-xs">{e_list}</div>
      </div>
    </section>
  );
};

export default Student;

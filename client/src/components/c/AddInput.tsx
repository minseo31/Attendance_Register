import { useRef } from "react";
import { AddModalDataType } from "../../data/addModalData";
import { PropsDataType } from "../../service/studentAdd";

// props 타입
type PropsType = {
  data: AddModalDataType;
  setAddData: React.Dispatch<React.SetStateAction<PropsDataType>>;
};

const AddInput: React.FC<PropsType> = ({ data, setAddData }: PropsType) => {
  const inpRef = useRef<HTMLInputElement>(null); // 입력값을 추적할 요소

  // id 조건이 4개라서 반복문으로 돌려야함
  // 입력란에 값 변경 될 때 값을 저장
  const handleChange = (id: number) => {
    // 이름
    if (id === 0) {
      setAddData((prev) =>
        inpRef.current
          ? {
              studentData: {
                ...prev.studentData,
                student_name: inpRef.current.value,
              },
            }
          : prev
      );
      // 학번
    } else if (id === 1) {
      setAddData((prev) =>
        inpRef.current
          ? {
              studentData: {
                ...prev.studentData,
                student_number: inpRef.current.value,
              },
            }
          : prev
      );
      // 연락처
    } else if (id === 2) {
      setAddData((prev) =>
        inpRef.current
          ? {
              studentData: {
                ...prev.studentData,
                phone_number: inpRef.current.value,
              },
            }
          : prev
      );
      //  주소
    } else if (id === 3) {
      setAddData((prev) =>
        inpRef.current
          ? {
              studentData: {
                ...prev.studentData,
                student_address: inpRef.current.value,
              },
            }
          : prev
      );
    }
  };

  return (
    <div className="w-full h-[100px] flex flex-col gap-1">
      <label className="text-green3 text-xl font-bold">{data.label}</label>
      <input
        className="w-full h-2/3 text-2xl text-green3 border-2 border-solid border-green2 outline-green3 rounded-2xl p-2"
        type="text"
        placeholder={data.ple}
        ref={inpRef}
        onChange={() => handleChange(data.id)}
      />
    </div>
  );
};

export default AddInput;

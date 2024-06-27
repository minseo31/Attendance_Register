import { useEffect, useState } from "react";
import BackBtn from "./BackBtn";
import { studentAdd, PropsDataType } from "../../service/studentAdd";
import { AddModalData, AddModalDataType } from "../../data/addModalData";
import AddInput from "../c/AddInput";

type PropsType = {
  setIsOnAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddModal: React.FC<PropsType> = ({ setIsOnAdd }: PropsType) => {
  // 서버에 보낼 추가할 학생 데이터
  const [addData, setAddData] = useState<PropsDataType>({
    studentData: {
      student_name: "",
      student_number: "",
      phone_number: "",
      student_address: "",
    },
  });
  // 입력란 값 확인
  //   console.log(addData.studentData);

  // 입력란 생성
  const inputBoxs = AddModalData.map((data: AddModalDataType): JSX.Element => {
    return (
      <div key={data.id}>
        <AddInput data={data} setAddData={setAddData} />
      </div>
    );
  });

  // 학생 등록하기 버튼 클릭 시
  const handleAddBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // 하나라도 입력하지 않았을 때 제한
    if (
      addData.studentData.phone_number !== "" ||
      addData.studentData.student_address !== "" ||
      addData.studentData.student_name !== "" ||
      addData.studentData.student_number !== ""
    ) {
      studentAdd(addData); // 등록 서버 요청
      window.alert(`${addData.studentData.student_name}학생이 등록되었습니다.`); // 등록 메세지
      setIsOnAdd((prev) => !prev); // 모달창 나가기
    } else {
      window.alert("입력되지 않은 입력란이 존재합니다.");
    }
  };

  return (
    <article className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0 z-50 bg-black/30 flex justify-center items-center">
      <div className="w-1/3 h-2/3 bg-white rounded-2xl flex flex-col gap-2 p-4 box-border">
        <span className="w-full h-fit p-4 text-green3 font-bold text-3xl text-center">
          학생 등록하기
        </span>
        {inputBoxs}
        <button
          className="w-full h-[70px] bg-green3 rounded-2xl text-2xl font-bold"
          onClick={(e) => handleAddBtn(e)}
        >
          등록하기
        </button>
      </div>
      <div
        onClick={() => {
          setIsOnAdd((prev) => !prev);
        }}
      >
        <BackBtn />
      </div>
    </article>
  );
};

export default AddModal;

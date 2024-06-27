import { useRef, useState } from "react";
import BackBtn from "./BackBtn";
import { RiUserSearchLine } from "react-icons/ri";
import StudnetDelList from "../c/StudentDelList";

type PropsType = {
  setIsOnDel: React.Dispatch<React.SetStateAction<boolean>>;
};

const DelModal: React.FC<PropsType> = ({ setIsOnDel }: PropsType) => {
  const [input, setInput] = useState<string>(); // 입력값을 저장
  const inpRef = useRef<HTMLInputElement>(null); // 입력값을 추적할 요소

  // 입력값이 변경될 때마다 추적
  const handleChange = () => {
    setInput(inpRef.current?.value);
  };

  return (
    <article className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0 z-50 bg-black/30 flex justify-center items-center">
      <div className="w-1/3 h-2/3 bg-white rounded-2xl flex flex-col gap-2 p-2 box-border">
        <div className="w-full h-[50px] relative">
          <input
            ref={inpRef}
            className="w-full h-full bg-white rounded-xl outline-green3 flex text-sm px-2 text-green3 border-2 border-solid border-green2 "
            type="text"
            placeholder="검색할 학생의 이름을 입력하세요."
            onChange={handleChange}
          />
          <div className="absolute top-2 right-4 text-green3 text-3xl">
            <RiUserSearchLine />
          </div>
        </div>
        <StudnetDelList input={input} />
      </div>
      <div
        onClick={() => {
          setIsOnDel((prev) => !prev);
        }}
      >
        <BackBtn />
      </div>
    </article>
  );
};

export default DelModal;

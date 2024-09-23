import { useRef } from "react";
import { InputLaber_DataType } from "../../data/loginData";
import { InputManagerType } from "../../page/Login";

type PropsType = {
  inputLaber: InputLaber_DataType;
  setManager: React.Dispatch<React.SetStateAction<InputManagerType>>;
};

const Input: React.FC<PropsType> = ({ inputLaber, setManager }: PropsType) => {
  const inpRef = useRef<HTMLInputElement>(null); // 입력란 엘리먼트
  let isIut = inputLaber.id === 0 ? true : false; // 입력란을 구분할 값

  // 입력란에 값이 바뀔 떄 마다
  const handelChange = (isIut: boolean) => {
    // 아이디 입력이라면
    if (isIut) {
      setManager((prev) =>
        inpRef.current
          ? {
              username: inpRef.current.value,
              password: prev.password,
            }
          : { username: "", password: "" }
      );
      // 비밀번호 입력이라면
    } else {
      setManager((prev) =>
        inpRef.current
          ? {
              username: prev.username,
              password: inpRef.current.value,
            }
          : { username: "", password: "" }
      );
    }
  };

  return (
    <div className="w-full h-[100px] flex flex-col gap-4" key={inputLaber.id}>
      <label className="text-green3 font-bold">{inputLaber.content}</label>
      <input
        className="w-full h-2/3 outline-green3 border-solid border-2 border-green2 rounded-2xl p-2 text-lg"
        type={inputLaber.id === 1 ? "password" : "text"}
        placeholder={`${inputLaber.content}를 입력하세요.`}
        onChange={() => handelChange(isIut)}
        ref={inpRef}
      />
    </div>
  );
};

export default Input;

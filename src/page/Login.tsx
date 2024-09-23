import { useState } from "react";
import LoginForm from "../components/p/LoginForm";
import { Seed_Manager } from "../data/loginData";

// 사용자 입력값 상태 타입
export type InputManagerType = {
  username: string;
  password: string;
};

// props 타입
type PropsType = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login: React.FC<PropsType> = ({ setLogin }: PropsType) => {
  const [manager, setManager] = useState<InputManagerType>({
    username: "",
    password: "",
  }); // 사용자의 로그인 입력값

  // 사용자의 입력값 확인
//   console.log(manager.username, manager.password);

  // 로컬 스토리지에 샘플 관리자 계정을 생성
  localStorage.setItem("Manager", JSON.stringify(Seed_Manager));

  return (
    <section className="w-full h-full flex justify-center items-center ">
      <LoginForm
        setManager={setManager}
        manager={manager}
        setLogin={setLogin}
      />
    </section>
  );
};

export default Login;

import Input from "../c/Input";
import { InputLaber_Data, InputLaber_DataType } from "../../data/loginData";
import { InputManagerType } from "../../page/Login";

// props 타입
type PropsType = {
  setManager: React.Dispatch<React.SetStateAction<InputManagerType>>;
  manager: InputManagerType;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginForm: React.FC<PropsType> = ({
  setManager,
  manager,
  setLogin,
}: PropsType) => {
  // 사용자가 로그인 버튼을 클릭할 때
  const handelLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // 로컬 스토리지의 관리자 계정을 읽어옴
    const manager_get = localStorage.getItem("Manager");

    if (manager_get) {
      // JSON 문자열을 객체로 파싱
      const storedManager = JSON.parse(manager_get);
      console.log(storedManager);

      // 입력한 값과 관리자 계정이 일치하면
      if (
        manager.username === storedManager.username &&
        manager.password === storedManager.password
      ) {
        window.alert("관리자 계정으로 로그인 하였습니다!");
        setLogin((prev) => !prev); // 로그인 상태로 변경
        // 일치하지 않으면 경고 메시지
      } else {
        window.alert("계정정보가 일치하지 않습니다!");
      }
    }
  };

  // 입력란 컴포넌트
  const inputBox = InputLaber_Data.map(
    (data: InputLaber_DataType): JSX.Element => {
      return (
        <div key={data.id}>
          <Input inputLaber={data} setManager={setManager} />
        </div>
      );
    }
  );

  return (
    <form
      action="/"
      className="w-1/3 h-[80%] shadow-xl shadow-green2 rounded-2xl flex flex-col p-4 box-border items-center justify-around"
    >
      <div className="w-full h-fit px-2 py-4 text-center text-green3">
        <span className="text-5xl font-bold font-logoFont">Attendance_</span>
        <span className="text-xs">@Manager</span>
      </div>
      <div className="w-full h-fit flex flex-col gap-4">{inputBox}</div>
      <button
        onClick={(e) => handelLogin(e)}
        className="w-full h-[70px] bg-green3 rounded-2xl text-white font-bold"
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;

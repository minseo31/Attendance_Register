import { IoCalendarOutline } from "react-icons/io5"; // 출석부 아이콘
import { PiStudentLight } from "react-icons/pi"; // 학생 아이콘
import { CiLogout } from "react-icons/ci"; // 로그아웃 아이콘
import { GoPersonAdd } from "react-icons/go"; // 학생 추가 아이콘
import { AiOutlineUserDelete } from "react-icons/ai"; // 학생 삭제 아이콘
import { Link } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SearchModal from "./components/p/SearchModal";
import Login from "./page/Login";
import AddModal from "./components/p/AddModal";
import DelModal from "./components/p/DelModal";

// props 타입
type PropsType = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  login: boolean;
  setStudentNum: React.Dispatch<React.SetStateAction<string>>;
};

const Layout: React.FC<PropsType> = ({
  setLogin,
  login,
  setStudentNum,
}: PropsType) => {
  const [isOnModal, setIsOnModal] = useState<boolean>(false); // 학생 검색 모달 상태
  const [isOnAdd, setIsOnAdd] = useState<boolean>(false); // 학생 추가 모달 상태
  const [isOnDel, setIsOnDel] = useState<boolean>(false); // 학생 삭제 모달 상태

  // 모달 등장 핸들러
  const handleClick = (
    set: React.Dispatch<React.SetStateAction<boolean>>,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    login && set((prev) => !prev);
  };

  // 로그아웃
  const handelLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // 로그인 상태 일때만 로그아웃 할 수 있음
    if (login) {
      const result = window.confirm("로그아웃 하시겠습니까?");

      // 메시지에서 예를 선택하여 상태를 변경하여 로그아웃
      result && setLogin((prev) => !prev);
    }
  };

  return (
    <section className="w-screen h-screen box-border bg-white overflow-hidden gap-4 flex p-8">
      <aside className="w-fit h-full px-4 flex flex-col justify-between p-8 items-center box-border text-4xl text-white bg-green2 rounded-xl">
        <div className="flex flex-col w-fit h-fit gap-4">
          <Link to={login ? "/" : ""} className="flex flex-col gap-8">
            <IoCalendarOutline />
          </Link>
          <button onClick={(e) => handleClick(setIsOnModal, e)}>
            <PiStudentLight />
          </button>
          <button onClick={(e) => handleClick(setIsOnAdd, e)}>
            <GoPersonAdd />
          </button>
          <button onClick={(e) => handleClick(setIsOnDel, e)}>
            <AiOutlineUserDelete />
          </button>
          {isOnModal ? <SearchModal setIsOnModal={setIsOnModal} setStudentNum={setStudentNum} /> : <></>}
          {isOnAdd ? <AddModal setIsOnAdd={setIsOnAdd} /> : <></>}
          {isOnDel ? <DelModal setIsOnDel={setIsOnDel} /> : <></>}
        </div>

        <button onClick={(e) => handelLogout(e)}>
          <CiLogout />
        </button>
      </aside>
      <Outlet />
    </section>
  );
};

export default Layout;

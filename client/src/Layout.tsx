import { IoCalendarOutline } from "react-icons/io5"; // 출석부 아이콘
import { PiStudentLight } from "react-icons/pi"; // 학생 아이콘
import { CiLogout } from "react-icons/ci"; // 로그아웃 아이콘
import { Link } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Modal from "./components/l/Modal";
import Login from "./page/Login";

const Layout: React.FC = () => {
  const [isOnModal, setIsOnModal] = useState<boolean>(false);

  // 검색 모달 등장 핸들러
  const handleClick = () => {
    setIsOnModal((prev) => !prev);
  };

  return (
    <section className="w-screen h-screen box-border bg-green2 overflow-hidden flex p-8">
      <aside className="w-[100px] h-screen absolute left-0 top-0 bottom-0 flex flex-col justify-between py-24 items-center box-border text-5xl text-white">
        <Link to="/attendance" className="flex flex-col gap-8">
          <IoCalendarOutline />
        </Link>

        <div>
          <button onClick={handleClick}>
            <PiStudentLight />
          </button>
          {isOnModal ? <Modal /> : <Login />}
        </div>

        <Link to="/">
          <CiLogout />
        </Link>
      </aside>
      <Outlet />
    </section>
  );
};

export default Layout;

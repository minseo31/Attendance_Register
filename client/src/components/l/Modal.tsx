import { RiUserSearchLine } from "react-icons/ri";
import StudentSearchList from "../s/StudnetSearchList";
const Modal: React.FC = () => {
  return (
    <article className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0 z-50 bg-black/30 flex justify-center items-center">
      <div className="w-1/3 h-2/3 bg-white rounded-2xl flex flex-col gap-2 p-2 box-border">
        <div className="w-full h-[50px] relative">
          <input
            className="w-full h-full bg-green1 rounded-lg border-none outline-none flex text-sm px-2 text-green3"
            type="text"
            placeholder="검색할 학생의 이름을 입력하세요."
          />
          <div className="absolute top-3 right-4 text-green3 text-3xl">
            <RiUserSearchLine />
          </div>
        </div>
        <StudentSearchList />
      </div>
    </article>
  );
};

export default Modal;

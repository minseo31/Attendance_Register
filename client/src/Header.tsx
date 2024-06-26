// import { IoIosArrowDown } from "react-icons/io";

const Header: React.FC = () => {
  return (
    <header className="fixed top-2 left-[2.5vw] right-[2.5vw] w-[95vw] h-[70px] bg-[#95D2B3] rounded-2xl p-4 box-border flex justify-between">
      <div className="w-fit h-full text-[#F1F8E8] text-4xl content-center">
        {/* <IoIosArrowDown /> */}
      </div>

      <div className="w-[100px] h-full bg-[#F1F8E8] text-center text-lg font-bold content-center text-[#55AD9B] rounded-lg">
        <span>출석부</span>
      </div>
    </header>
  );
};

export default Header;

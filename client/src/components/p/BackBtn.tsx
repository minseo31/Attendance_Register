import { PiArrowUDownLeftDuotone } from "react-icons/pi";

const BackBtn: React.FC = () => {
  return (
    <div className="absolute bottom-8 right-8 w-[50px] h-[50px] rounded-full bg-white text-green3 flex justify-center items-center text-2xl cursor-pointer">
      <PiArrowUDownLeftDuotone />
    </div>
  );
};

export default BackBtn;

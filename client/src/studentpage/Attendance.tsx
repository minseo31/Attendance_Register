import { seedData } from "../seed";

const Attendance: React.FC = () => {
  return (
    <section className="w-full h-[70%] rounded-2xl shadow-2xl shadow-[#80B9AD] p-[2%] hover:scale-105 duration-300">
      <div className="w-full h-full grid grid-cols-col33 grid-rows-row12 gap-1 gap-y-8">
        {/* 출석부 아이템 */}
        {seedData.map((datas, i) =>
          datas.map((data: number | string) => (
            <div
              className="w-full h-full text-center content-center p-1 text-xs rounded-lg bg-black text-white hover:scale-110"
              style={
                i === 0
                  ? { backgroundColor: "#95D2B3" }
                  : { backgroundColor: "#D8EFD3" , color : "#55AD9B" }
              }
            >
              {data}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Attendance;

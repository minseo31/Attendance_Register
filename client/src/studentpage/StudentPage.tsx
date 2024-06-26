import Attendance from "./Attendance";
import Profile from "./Profile";

const StudentPage : React.FC = () => {
    return (
        <div className="w-screen h-screen flex flex-col gap-4 p-[5%] box-border">
            <Profile />
            <Attendance />
        </div>
    )
};  

export default StudentPage;
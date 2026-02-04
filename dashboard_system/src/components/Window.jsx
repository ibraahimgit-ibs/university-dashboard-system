import { useRecoilState } from "recoil";
import StudentWindow from "./items/window_items/StudentWindow";
import { roleMethodState } from "../atom/atom";
import SboAdminWindow from "./items/window_items/SboAdminWindow";
import { useStudent } from "../hooks/useStudent";

const Window = () => {
  const [roleMethod] = useRecoilState( roleMethodState );
  const { UserData } = useStudent();  

  return (
    <div className="h-full w-full border-r border-r-gray-300 hidden md:block">
      <div>
        {roleMethod.student && UserData?.role === "student" && <StudentWindow />}
        {roleMethod.sbo_admin && <SboAdminWindow />}
      </div>
      <hr className="text-gray-300" />
    </div>
  );
};

export default Window;
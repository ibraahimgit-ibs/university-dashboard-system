import { useRecoilState } from "recoil";
import { roleMethodState, showMenu } from "../atom/atom";
import StudentWindow from "./items/window_items/StudentWindow";
import { RxCrossCircled } from "react-icons/rx";

const SideBar = () => {
    const [shoWmenu, setSHoWmenu] = useRecoilState(showMenu);
    const [roleMethod, _] = useRecoilState(roleMethodState);

    return (
        <>
            <div
                onClick={() => setSHoWmenu(!shoWmenu)}
                className={`isdarkSidebar fixed top-0 left-0 bg-[#00000053] w-full h-full flex items-center justify-center transition-opacity duration-500 
                           ${shoWmenu ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            >
                <div
                    className={`bg-white absolute left-0 h-full w-70 p-4 transform transition-transform duration-500 ${shoWmenu ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex items-center justify-between mb-4 font-semibold">
                        <h2>Menu</h2>
                        <RxCrossCircled
                            onClick={() => setSHoWmenu(false)}
                            className="text-gray-400 w-5 h-5 cursor-pointer"
                        />
                    </div>
                    {roleMethod.student && <StudentWindow />}
                </div>
            </div>
        </>
    );
};

export default SideBar;

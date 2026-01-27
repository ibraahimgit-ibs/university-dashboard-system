import { FaRegBell, FaRegMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import SwitchRole from "./items/SwitchRole";
import ProfileCard from "./items/ProfileCard";
import { useState, useEffect } from "react";
import { TiThMenu } from "react-icons/ti";
import { roleMethodState, showMenu } from './../atom/atom';
import { useRecoilState } from "recoil";


const Header = () => {
    const [dark, setDark] = useState(false);
    const [shoWmenu, setSHoWmenu] = useRecoilState(showMenu);
    const [roleMethod, _] = useRecoilState(roleMethodState);

    let text = "";
    let roleNameColor = "";

    if (roleMethod.student) {
        text = "Student";
        roleNameColor = "st_H bg-blue-100 text-blue-700";
    } else if (roleMethod.sbo_admin) {
        text = "SBO Admin";
        roleNameColor = "sbo_H bg-green-100 text-green-700";
    } else if (roleMethod.registrar_admin) {
        text = "Registrar Admin";
        roleNameColor = "reg_H bg-purple-100 text-purple-700";
    } else if (roleMethod.super_admin) {
        text = "Super Admin";
        roleNameColor = "sup_H bg-red-100 text-red-700";
    } else {
        text =  "Guest";
        roleNameColor = "st_H bg-gray-300 text-orange-600";
    }

    useEffect(() => {
        if (dark === true) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [dark])


    return (
        <div>
            <header className="max-w-full min-w-full flex items-center justify-between border-b border-gray-300 text-black px-4 py-4">
                <div className="flex lg:space-x-3 sm:space-x-0 items-center justify-center">
                    <TiThMenu className="w-5 h-5 mx-3 ml-0 lg:hidden md:hidden sm:block" onClick={() => setSHoWmenu(!shoWmenu)} />
                    <h1 className="font-semibold md:text-2xl sm:text-sm lg:text-2xl">Student Info System</h1>
                    <div className={`${roleNameColor} border border-gray-300 p-2 py-0 rounded-2xl font-semibold hidden lg:block md:block`}>{text}</div>
                </div>
                <div className="flex items-center justify-center md:gap-4 lg:gap-4 sm:gap-2">

                    <div className="p-3 rounded-lg hover:bg-gray-200 transition">
                        {<>
                            {dark ?
                                <IoSunnyOutline onClick={() => setDark(!dark)} />
                                : <FaRegMoon onClick={() => setDark(!dark)} />}
                        </>}
                    </div>
                    <div>
                        <SwitchRole />
                    </div>
                    <div className="flex relative rounded-lg p-3 hover:bg-gray-200 transition">
                        <FaRegBell />
                        <span className="absolute top-0 right-0 text-white text-sm bg-red-600 rounded-full h-4 w-4 flex items-center justify-center">3</span>
                    </div>
                    <ProfileCard />
                </div>
            </header>
        </div>
    )
}

export default Header;
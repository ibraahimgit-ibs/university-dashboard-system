import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import { LuBookOpen } from "react-icons/lu";
import { TbReport } from "react-icons/tb";
import { Link, useLocation } from "react-router";

const SboAdminWindow = () => {
    const INPAGE = {
        indashboard: false,
        ingrades: false,
        inpayment: false,
        inprofile: false,
    }

    const [inPage, setInPage] = useState(INPAGE);
    const location = useLocation();

    useEffect(() => {
        const newPage = { ...INPAGE };

        if (location.pathname === "/sbo-admin/dashboard") {
            newPage.indashboard = true;
        } else if (location.pathname === "/sbo-admin/GradeEntry") {
            newPage.ingrades = true;
        } else if (location.pathname === "/sbo-admin/Students") {
            newPage.inpayment = true;
        } else if (location.pathname === "/sbo-admin/Reports") {
            newPage.inprofile = true;
        }

        setInPage(newPage);
    }, [location]);


    return (
        <div className="w-full lg:p-5 md:p-5 sm:p-0">
            <div className="space-y-5 font-semibold text-[17px] pb-10">
                <Link to={"/sbo-admin/dashboard"}>
                    <div
                        className={`flex gap-4 items-center justify-start w-full p-2 px-3 rounded-lg cursor-pointer ${inPage.indashboard ? "sl bg-black text-white" : "hover:bg-[#8080804c] transition"}`}
                    >
                        <AiOutlineHome />
                        Dashboard
                    </div>
                </Link>
                <Link to={"/sbo-admin/GradeEntry"} >
                    <h1
                        className={`flex items-center gap-4 w-full p-2 px-3 rounded-lg cursor-pointer ${inPage.ingrades ? "sl bg-black text-white" : "hover:bg-[#8080804c] transition"}`}
                    >
                        <LuBookOpen className="grades_icon" />
                        Grade Entry
                    </h1>
                </Link>
                <Link to={"/sbo-admin/Students"}>
                    <h1
                        className={`flex items-center gap-4 p-2 px-3 rounded-lg cursor-pointer ${inPage.inpayment ? " sl bg-black text-white" : "hover:bg-[#8080804c] transition"}`}
                    >
                        <GoPeople className="grades_icon" />
                        Students
                    </h1>
                </Link>
                <Link to={"/sbo-admin/Reports"}>
                    <h1
                        className={`flex items-center gap-4 p-2 px-3 rounded-lg cursor-pointer ${inPage.inprofile ? "sl bg-black text-white" : "hover:bg-[#8080804c] transition"}`}
                    >
                        <TbReport className="grades_icon" />
                        Reports
                    </h1>
                </Link>
            </div>
        </div >
    )
}

export default SboAdminWindow;
import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { Link, useLocation } from "react-router";


const StudentWindow = () => {
  const INPAGE = {
    indashboard: false,
    ingrades: false,
    inpayment: false,
    inprofile: false,
  }

  const [inPage, setInPage] = useState(INPAGE);
  const location = useLocation();
  // const [shoWmenu] = useRecoilState(showMenu);


  useEffect(() => {
    const newPage = { ...INPAGE };

    if (location.pathname === "/student/dashboard") {
      newPage.indashboard = true;
    } else if (location.pathname === "/student/grades") {
      newPage.ingrades = true;
    } else if (location.pathname === "/student/payments") {
      newPage.inpayment = true;
    } else if (location.pathname === "/student/profile") {
      newPage.inprofile = true;
    }

    setInPage(newPage);
  }, [location]);



  return (
    <div className="w-full lg:p-5 md:p-5 sm:p-0">
      <div className="space-y-5 font-semibold text-[17px] pb-10">
        <Link to={"/student/dashboard"}>
          <div
            className={`flex gap-4 items-center justify-start w-full p-2 px-3 rounded-lg cursor-pointer ${inPage.indashboard ? "sl bg-black text-white" : "hover:bg-[#8080804c] transition"}`}
          >
            <AiOutlineHome />
            Dashboard
          </div>
        </Link>
        <Link to={"/student/grades"} >
          <h1
            className={`flex items-center gap-4 w-full p-2 px-3 rounded-lg cursor-pointer ${inPage.ingrades ? "sl bg-black text-white" : "hover:bg-[#8080804c] transition"}`}
          >
            <FaGraduationCap className="grades_icon" />
            Grades
          </h1>
        </Link>
        <Link to={"/student/payments"}>
          <h1
            className={`flex items-center gap-4 p-2 px-3 rounded-lg cursor-pointer ${inPage.inpayment ? " sl bg-black text-white" : "hover:bg-[#8080804c] transition"}`}
          >
            <MdPayment className="grades_icon" />
            Payment
          </h1>
        </Link>
        <Link to={"/student/profile"}>
          <h1
            className={`flex items-center gap-4 p-2 px-3 rounded-lg cursor-pointer ${inPage.inprofile ? "sl bg-black text-white" : "hover:bg-[#8080804c] transition"}`}
          >
            <AiOutlineSetting className="grades_icon" />
            Profile
          </h1>
        </Link>
      </div>
    </div >
  )
}

export default StudentWindow;
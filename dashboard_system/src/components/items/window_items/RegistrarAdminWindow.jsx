import { CreditCard, FileText, House, Users } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RegistrarAdminWindow = () => {
    const location = useLocation();

    const inPage = {
        indashboard: location.pathname === "/registrar-admin/dashboard",
        ingrades: location.pathname === "/registrar-admin/studentDirectory",
        inpayment: location.pathname === "/registrar-admin/paymentManagement",
        inprofile: location.pathname === "/registrar-admin/reports",
    };

    return (
        <div className='w-full lg:p-5 md:p-5 sm:p-0'>
            <div className="space-y-5 font-semibold text-[17px] pb-10">
                <Link to={"/registrar-admin/dashboard"}>
                    <div
                        className={`flex gap-4 items-center justify-start w-full p-2 px-3 text-[14px] rounded-lg cursor-pointer ${ inPage.indashboard ? "sl bg-black text-white" : "hover:bg-[#8080804c] transition" }`}
                    >
                        <House className="grades_icon" />
                        Dashboard
                    </div>
                </Link>
                <Link to={"/registrar-admin/studentDirectory"} >
                    <h1
                        className={`flex items-center gap-4 w-full p-2 px-3 text-[14px] rounded-lg cursor-pointer ${ inPage.ingrades ? "sl bg-black text-white" : "hover:bg-[#8080804c] transition" }`}
                    >
                        <Users className="grades_icon" />
                        Student Directory
                    </h1>
                </Link>
                <Link to={"/registrar-admin/paymentManagement"}>
                    <h1
                        className={`flex items-center gap-4 p-2 px-3 text-[14px] rounded-lg cursor-pointer ${ inPage.inpayment ? " sl bg-black text-white" : "hover:bg-[#8080804c] transition" }`}
                    >
                        <CreditCard className="grades_icon" />
                        Payment Management
                    </h1>
                </Link>
                <Link to={"/registrar-admin/reports"}>
                    <h1
                        className={`flex items-center gap-4 p-2 px-3 text-[14px] rounded-lg cursor-pointer ${ inPage.inprofile ? "sl bg-black text-white" : "hover:bg-[#8080804c] transition" }`}
                    >
                        <FileText className="grades_icon" />
                        Reports
                    </h1>
                </Link>
            </div>
        </div>
    );
};

export default RegistrarAdminWindow;

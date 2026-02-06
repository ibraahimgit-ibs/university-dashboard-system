import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { roleMethodState } from "./atom/atom";
import { useStudent } from "./hooks/useStudent";
import Login from "./pages/Login";
import SboAdmin from "./pages/SboAdmin";
import Student from './pages/Student';
import RegistrarAdmin from './pages/RegistrarAdmin';

const PagesMain = () => {
    const [roleMethod] = useRecoilState( roleMethodState );

    const { UserData } = useStudent();

    return (
        <main className='flex-1 p-4 md:p-6 max-w-full min-w-full scrollbar-hide'>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
            {roleMethod.student && UserData?.role === "student" && <Student />}
            {roleMethod.sbo_admin && UserData?.role === "teacher" && <SboAdmin />}
            {roleMethod.registrar_admin && UserData?.role === "admin" && <RegistrarAdmin />}
        </main>
    )
}

export default PagesMain;
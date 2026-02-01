import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { roleMethodState } from "./atom/atom";
import { useStudent } from "./hooks/useStudent";
import Login from "./pages/Login";
import SboAdmin from "./pages/SboAdmin";
import Student from './pages/Student';
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";

const PagesMain = () => {
    const [roleMethod, setRoleMethod] = useRecoilState( roleMethodState );

    const { student } = useStudent();
    const {logged} = useAuth();

    useEffect(() => {
        setRoleMethod( prev => ( { ...prev, student: true } ) )
    }, [logged, setRoleMethod])

    return (
        <main className='flex-1 p-4 md:p-6 max-w-full min-w-full scrollbar-hide'>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
            {roleMethod.student && student && <Student />}
            {roleMethod.sbo_admin && student && <SboAdmin />}
        </main>
    )
}

export default PagesMain;
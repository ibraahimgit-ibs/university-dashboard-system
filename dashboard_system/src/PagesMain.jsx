import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { roleMethodState } from "./atom/atom";
import useAuth from "./hooks/useAuth";
import { useStudent } from "./hooks/useStudent";
import Login from "./pages/Login";
import SboAdmin from "./pages/SboAdmin";
import Student from './pages/Student';

const PagesMain = () => {
    const [roleMethod, setRoleMethod] = useRecoilState( roleMethodState );

    const { UserData } = useStudent();
    const { logged } = useAuth();


    useEffect( () => {
        if ( logged ) {
            setRoleMethod( prev => ( { ...prev, student: true } ) );
        }
    }, [logged, setRoleMethod] )

    return (
        <main className='flex-1 p-4 md:p-6 max-w-full min-w-full scrollbar-hide'>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
            {roleMethod.student && UserData?.role === "student" && <Student />}
            {roleMethod.sbo_admin && <SboAdmin />}
        </main>
    )
}

export default PagesMain;
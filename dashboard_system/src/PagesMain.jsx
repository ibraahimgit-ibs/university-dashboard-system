import { useRecoilState } from "recoil";
import Login from "./pages/Login";
import SboAdmin from "./pages/SboAdmin";
import Student from './pages/Student';
import { roleMethodState } from "./atom/atom";
import { useStudent } from "./hooks/useStudent";

const PagesMain = () => {
    const [roleMethod, _] = useRecoilState( roleMethodState );

    const { student } = useStudent();

    return (
        <main className='flex-1 p-4 md:p-6 max-w-full min-w-full scrollbar-hide'>
            {!student && <Login />}
            {roleMethod.student && student && <Student />}
            {roleMethod.sbo_admin && student && <SboAdmin />}
        </main>
    )
}

export default PagesMain;
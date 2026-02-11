import { CreditCard, DollarSign, UserRoundCheck, Users } from "lucide-react";
import Card from './../../items/Card';
import { useRecoilState } from 'recoil';
import { userDataState } from './../../../atom/atom';
import StudentInfo from "../compo/StudentInfo";
import PaymentInfo from "../compo/PaymentInfo";
import EnrolmentInfo from "../compo/EnrolmentInfo";
import { useState } from "react";


const Dashboard = () => {
    const [userData, __] = useRecoilState( userDataState );
    const btn_selected = {
        a: true,
        b: false,
        c: false,
    }

    const [selected, setSelected] = useState( btn_selected );

    const { users } = userData || {};

    const students = users?.filter( user => user.role === "student" );

    const activeStudents = students?.filter( s => s.status === true ) || [];


    return (
        <div className="min-w-full max-w-full">
            <div className="space-y-3">
                <h1 className="text-2xl font-semibold">Registrar Admin Dashboard</h1>
                <p className="text-gray-500">Manage student information, enrollment, and payment records.</p>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 pt-10 w-full">
                <Card
                    title="Total Students"
                    numbers={students?.length || 0}
                    paragraph={activeStudents?.length ? `${ activeStudents?.length || 0 } students active` : "No students active"}
                    icon={<Users className="w-6 h-6" />}
                />

                <Card
                    title="Revenue Collected"
                    icon={<DollarSign className="w-6 h-6" />}
                    numbers={"$5,000"}
                    paragraph={"This semester"}
                />
                <Card
                    title="Pending Payments"
                    icon={<CreditCard className="w-6 h-6" />}
                    numbers={"2"}
                    paragraph={"Require attention"}
                />
                <Card
                    title="Enrollment Rate"
                    icon={<UserRoundCheck className="w-6 h-6" />}
                    numbers={"85%"}
                    paragraph={"Based on total students enrolled"}
                />
            </div>

            <div className="sbo_dashboard_option bg-gray-200 p-0 my-6 w-full flex items-center justify-between rounded-full">
                <button
                    className={`sbo_btn ${ selected.a && "selected_sbo_btn bg-white" }`}
                    onClick={() => setSelected( { ...selected, a: true, b: false, c: false } )}
                >Student Directory</button>
                <button
                    className={`sbo_btn ${ selected.b && "selected_sbo_btn bg-white" }`}
                    onClick={() => setSelected( { ...selected, a: false, b: true, c: false } )}
                >Payment Management</button>
                <button
                    className={`sbo_btn ${ selected.c && "selected_sbo_btn bg-white" }`}
                    onClick={() => setSelected( { ...selected, a: false, b: false, c: true } )}
                >Enrolment</button>
            </div>

            <div>
               {selected.a && <StudentInfo />}
                {selected.b && <PaymentInfo />}
                {selected.c && <EnrolmentInfo />}
            </div>
        </div>
    );
};

export default Dashboard;

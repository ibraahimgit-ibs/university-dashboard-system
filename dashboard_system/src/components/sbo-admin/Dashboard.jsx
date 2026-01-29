import { GoPeople } from "react-icons/go";
import Card from "../items/Card";
import { BsGraphUpArrow } from "react-icons/bs";
import { LuBookOpen } from "react-icons/lu";
import { useState } from "react";
import GradeEntry_a from './comp/GradeEntry_a';
import Students_b from './comp/Students_b';
import Reports_c from './comp/Reports_c';
import { userDataState } from './../../atom/atom';
import { useRecoilState } from "recoil";

const Dashboard = () => {
  const btn_selected = {
    a: true,
    b: false,
    c: false,
  }

  const [selected, setSelected] = useState( btn_selected );
  const [students, __] = useRecoilState( userDataState );

  console.log( students );



  return (
    <div className="min-w-full max-w-full">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">SBO Admin Dashboard</h1>
        <p className="text-gray-500">Manage grades, view student performance, and generate academic reports.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 pt-10 w-full">
        <Card title="Total Students" icon={<GoPeople />} numbers={students.students !== undefined && students.students.length} paragraph={"2 with grades"} />
        <Card title="Average GPA" icon={<BsGraphUpArrow />} numbers={"3.62"} paragraph={"Current semester"} />
        <Card title="Grades Entered" icon={<LuBookOpen />} numbers={students.grades !== undefined && students.grades.length} paragraph={"This semester"} />
      </div>
      <div className="sbo_dashboard_option bg-gray-200 p-0 my-6 w-full flex items-center justify-between rounded-full">
        <button
          className={`sbo_btn ${ selected.a && "selected_sbo_btn bg-white" }`}
          onClick={() => setSelected( { ...selected, a: true, b: false, c: false } )}
        >Grade Entry</button>
        <button
          className={`sbo_btn ${ selected.b && "selected_sbo_btn bg-white" }`}
          onClick={() => setSelected( { ...selected, a: false, b: true, c: false } )}
        >Students</button>
        <button
          className={`sbo_btn ${ selected.c && "selected_sbo_btn bg-white" }`}
          onClick={() => setSelected( { ...selected, a: false, b: false, c: true } )}
        >Reports</button>
      </div>
      <div>
        {selected.a && <GradeEntry_a students={students.students !== undefined && students.students} />}
        {selected.b && <Students_b students={students.students !== undefined && students.students} grade={students.students !== undefined && students.grades} />}
        {selected.c && <Reports_c />}
      </div>
    </div>
  )
}

export default Dashboard;
import { Route, Routes } from "react-router";
import Dashboard from "../components/sbo-admin/Dashboard";
import GradeEntry from './../components/sbo-admin/GradeEntry';
import Students from './../components/sbo-admin/Students';
import Reports from './../components/sbo-admin/Reports';

const SboAdmin = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Routes>
        <Route path="/sbo-admin/dashboard" element={<Dashboard />} />
        <Route path="/sbo-admin/GradeEntry" element={<GradeEntry />} />
        <Route path="/sbo-admin/Students" element={<Students />} />
        <Route path="/sbo-admin/Reports" element={<Reports />} />
      </Routes>
    </div>
  )
}

export default SboAdmin;
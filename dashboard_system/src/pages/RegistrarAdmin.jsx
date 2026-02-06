import { Route, Routes } from "react-router";
import Dashboard from "../components/registrar-admin/Dashboard";

const RegistrarAdmin = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Routes>
        <Route path="/registrar-admin/dashboard" element={<Dashboard />} />
        {/* <Route path="/sbo-admin/GradeEntry" element={<GradeEntry />} />
        <Route path="/sbo-admin/Students" element={<Students />} />
        <Route path="/sbo-admin/Reports" element={<Reports />} /> */}
      </Routes>
    </div>
  )
}

export default RegistrarAdmin;
import { Route, Routes } from "react-router";
import Reports from '../components/registrar-admin/pages/Reports';
import StudentDirectory from './../components/registrar-admin/pages/StudentDirectory';
import PaymentManagement from './../components/registrar-admin/pages/PaymentManagement';
import Dashboard from "../components/registrar-admin/pages/Dashboard";

const RegistrarAdmin = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Routes>
        <Route path="/registrar-admin/dashboard" element={<Dashboard />} />
        <Route path="/registrar-admin/studentDirectory" element={<StudentDirectory />} />
        <Route path="/registrar-admin/paymentManagement" element={<PaymentManagement />} />
        <Route path="/registrar-admin/reports" element={<Reports />} />
      </Routes>
    </div>
  )
}

export default RegistrarAdmin;
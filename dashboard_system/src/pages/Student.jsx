import { Route, Routes } from 'react-router';
import Dashboard from '../components/student/dashboard/Dashboard';
import Grades from './../components/student/grades/Grades';
import Payments from "../components/student/payments/Payments"
import Profile from './../components/student/profile/Profile';

const Student = () => {

  return (
    <div className='mx-auto max-w-7xl'>
      <Routes>
        <Route path='/student/dashboard' element={<Dashboard />} />
        <Route path='/student/grades' element={<Grades />} />
        <Route path='/student/payments' element={<Payments />} />
        <Route path='/student/profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default Student;

import { useEffect, useState } from "react"
import Header from "./components/Header"
import Window from "./components/Window"
import SideBar from "./components/SideBar"
import PagesMain from "./PagesMain"
import axios from "axios"
import { roleMethodState, userDataState } from "./atom/atom"
import { useRecoilState } from "recoil"
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router"
import Login from "./pages/Login";
import { useStudent } from "./hooks/useStudent"


function App() {
  const [SD, setStudentData] = useRecoilState( userDataState );
  const [roleMethod, __] = useRecoilState( roleMethodState );
  const [show, setShow] = useState( false );

  const { student } = useStudent();
  

  useEffect( () => {
    async function fetchData() {
      try {
        const respons = await axios.get( 'https://university-dashboard-system.onrender.com/api/student/student-data' );
        setStudentData( respons.data );
      } catch ( err ) {
        console.error( err );
      }
    }

    fetchData();
  }, [setStudentData] );

  useEffect( () => {
    if ( roleMethod.student || roleMethod.sbo_admin || roleMethod.registrar_admin || roleMethod.super_admin ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow( true );
      return
    }
    return setShow( false );
  }, [roleMethod.registrar_admin, roleMethod.sbo_admin, roleMethod.student, roleMethod.super_admin] );

  return (
    <div className="relative w-full h-full">
      <Header />
      <main className="grid md:grid-cols-[1fr_5fr] lg:grid-cols-[1fr_5fr] w-full h-full">
        {show && student && <Window />}
        <PagesMain />
        <SideBar />
      </main>
      <Toaster />

      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App

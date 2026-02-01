import axios from "axios"
import { useEffect, useState } from "react"
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from "react-router"
import { useRecoilState } from "recoil"
import { roleMethodState, userDataState } from "./atom/atom"
import Header from "./components/Header"
import SideBar from "./components/SideBar"
import Window from "./components/Window"
import { useStudent } from "./hooks/useStudent"
import Login from "./pages/Login"
import PagesMain from "./PagesMain"
import useAuth from "./hooks/useAuth"
// import axiosUrl from './hooks/axiosUrl';


function App() {
  const [SD, setStudentData] = useRecoilState( userDataState );
  const [roleMethod, __] = useRecoilState( roleMethodState );
  const [show, setShow] = useState( false );

  const { student } = useStudent();
  // const { axiosDeffaultUrl } = axiosUrl();

  // console.log(SD);


  useEffect( () => {
    async function fetchData() {
      try {
        const respons = await axios.get( `https://university-dashboard-system.onrender.com/api/student/student-data`, {withCredentials: true} );
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


  const { loading } = useAuth();


  if ( loading ) {
    return <div className='bg-white flex items-center justify-center min-w-screen min-h-screen'>Checking Auth...</div>
  }

  return (
    <div className="relative w-full h-full">
      <Header />
      <main className="grid md:grid-cols-[1fr_5fr] lg:grid-cols-[1fr_5fr] w-full h-full">
        {show && student && <Window />}
        <PagesMain />
        <SideBar />
      </main>
      <Toaster />
    </div>
  );
};

export default App;

import axios from "axios"
import { useEffect, useState } from "react"
import { Toaster } from 'react-hot-toast'
import { useRecoilState } from "recoil"
import { LoadingState, roleMethodState, userDataState } from "./atom/atom"
import Header from "./components/Header"
import SideBar from "./components/SideBar"
import Window from "./components/Window"
import useAuth from "./hooks/useAuth"
import PagesMain from "./PagesMain"
import { useNavigate } from "react-router-dom"
import CircularUnderLoad from "./components/items/CircularProgress"
import axiosUrl from './hooks/axiosUrl';


function App() {
  const [SD, setStudentData] = useRecoilState( userDataState );
  const [loadingCircle, setLoading] = useRecoilState( LoadingState )
  const [roleMethod, __] = useRecoilState( roleMethodState )
  const [show, setShow] = useState( false );

  const { axiosDeffaultUrl } = axiosUrl();
  const navigate = useNavigate();

  // console.log(SD);


  useEffect( () => {
    async function fetchData() {
      setLoading( true );

      try {
        const respons = await axios.get( `${ axiosDeffaultUrl }/user/user-data`, { withCredentials: true, headers: { "Cache-Control": "no-cache" } } );
        setStudentData( respons.data );
      } catch ( err ) {
        console.error( err );
      } finally {
        setLoading( false )
      }
    }

    fetchData();
  }, [setStudentData] );


  const { loading, logged } = useAuth();

  useEffect( () => {
    if ( roleMethod.student || roleMethod.sbo_admin || roleMethod.registrar_admin || roleMethod.super_admin ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow( true );
      return
    }
    return setShow( false );
  }, [logged, navigate, roleMethod] );





  if ( loading ) {
    return <div className='bg-white flex items-center justify-center min-w-screen min-h-screen'>Checking Auth...</div>
  }

  return (
    <div className="relative w-full h-full">
      <Header />
      <main className="grid md:grid-cols-[1fr_5fr] lg:grid-cols-[1fr_5fr] w-full h-full">
        {show && <Window />}
        <PagesMain />
        {show && <SideBar />}
      </main>
      <Toaster />
      {loadingCircle && <CircularUnderLoad />}
    </div>
  );
};

export default App;

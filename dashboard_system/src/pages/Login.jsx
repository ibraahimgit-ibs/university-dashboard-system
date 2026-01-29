import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  formDataState,
  roleMethodState
} from '../atom/atom';
import { useStudent } from "../hooks/useStudent";


const Login = () => {
  const [formData, setFormData] = useRecoilState( formDataState );
  const [roleMethod, setRoleMethod] = useRecoilState( roleMethodState );
  const [loading, setLoading] = useState( false );
  const navigate = useNavigate();

  const { login, student } = useStudent();
  const location = useLocation();

  useEffect( () => {

    if ( student ) {
      navigate( "/student/dashboard" );
      setRoleMethod( { ...roleMethod, student: true } );
    } else {
      navigate( "/" )
    }

    if ( location.pathname === "/student/dashboard" ) {
      setRoleMethod( { ...roleMethod, student: true } )
    }

  }, [navigate] );


  const handleSubmit = async ( e ) => {
    e.preventDefault();
    setLoading( true );

    try {
      const { data } = await axios.post( "https://university-dashboard-system.onrender.com/api/student/login-student", formData );
      toast.success( "successfully login" )
      setLoading( false )
      login( data, data.expiresIn )
      navigate( "/student/dashboard" );
      setRoleMethod( { ...roleMethod, student: true } )

    } catch ( err ) {
      setLoading( false );
      toast.error( err.response.data );
    }
  };

  const handleInputChange = ( event ) => {
    setFormData( {
      ...formData,
      [event.target.id]: event.target.value,
    } )
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen absolute left-0 top-0 -z-10">
      <form onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-5 bg-[#e6e6e6] p-5 rounded-md">
        <h1 className="form_H">Login</h1>
        <input
          type="number"
          placeholder="Your ID"
          id='id'
          className="form_control"
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form_control"
          id='password'
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="form_btn">{loading ? "Login..." : "Login"}</button>
      </form>
    </div>
  )
}

export default Login;

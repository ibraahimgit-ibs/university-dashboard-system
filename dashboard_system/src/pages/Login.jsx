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
import axiosUrl from '../hooks/axiosUrl';


const Login = () => {
  const [formData, setFormData] = useRecoilState( formDataState );
  const [roleMethod, setRoleMethod] = useRecoilState( roleMethodState );
  const [loading, setLoading] = useState( false );
  const navigate = useNavigate();

  const { login, student } = useStudent();
  const { axiosDeffaultUrl } = axiosUrl();
  const location = useLocation();

  useEffect( () => {
    // Only navigate when the target path differs to avoid repeated navigations
    if ( student ) {
      if ( location.pathname !== "/student/dashboard" ) {
        navigate( "/student/dashboard" );
      }
      // Only update role state when it actually needs to change (avoid re-renders)
      setRoleMethod( prev => ( prev.student ? prev : { ...prev, student: true } ) );
    } else {
      if ( location.pathname !== "/" ) {
        navigate( "/" );
      }
    }

    // Ensure role is set when we are on the student dashboard (no-op if already set)
    if ( location.pathname === "/student/dashboard" ) {
      setRoleMethod( prev => ( prev.student ? prev : { ...prev, student: true } ) );
    }

  }, [navigate, location.pathname, student, setRoleMethod] );


  const handleSubmit = async ( e ) => {
    e.preventDefault();
    setLoading( true );

    try {
      // https://university-dashboard-system.onrender.com
      const { data } = await axios.post( `${ axiosDeffaultUrl }/api/student/login-student`, formData, { withCredentials: true } );
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

      <div className="w-full max-w-md rounded-2xl bg-white p-8 mt-10 md:shadow-md sm:shadow-none">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-slate-500">Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Selection */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Login As</label>
            <select className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
              <option value="user">Standard Student</option>
              <option value="admin">System Administrator</option>
            </select>
          </div>

          {/* Email Field */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Your ID</label>
            <input
              type="number"
              placeholder="Enter Your ID"
              onChange={handleInputChange}
              id='id'
              className="w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              id='password'
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              Remember me
            </label>
            <a href="#" className="font-medium text-indigo-600 hover:underline">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98]"
          >
            {loading ? "Log In..." : "Log In"}
          </button>
        </form>
      </div>

    </div>
  )
}

export default Login;




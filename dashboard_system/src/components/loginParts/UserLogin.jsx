import axios from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
    LoadingState,
    roleMethodState,
    userDataState
} from '../../atom/atom';
import { useStudent } from "../../hooks/useStudent";
import axiosUrl from './../../hooks/axiosUrl';


const UserLogin = () => {
    const [roleMethod, setRoleMethod] = useRecoilState( roleMethodState );
    // const [selected, setSelected] = useRecoilState( AdminSelectedState );
    const [__, setStudentData] = useRecoilState( userDataState );
    const [_, setLoadingCircle] = useRecoilState( LoadingState )
    const [loading, setLoading] = useState( false );
    // const [open, setOpen] = useState( false );

    // ***useform*****
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    // --------------

    const navigate = useNavigate();

    const { login, UserData } = useStudent();
    const { axiosDeffaultUrl } = axiosUrl();
    // const location = useLocation();

    // useEffect( () => {
    //     if ( !UserData?.role ) return;

    //     if ( UserData.role === "student" ) {
    //         if ( location.pathname === "/" ) {
    //             navigate( "/student/dashboard" );
    //         }
    //         setRoleMethod( prev => ( { ...prev, student: true, sbo_admin: false, registrar_admin: false, super_admin: false } ) );
    //         return;
    //     }

    //     if ( UserData.role === "teacher" ) {
    //         if ( location.pathname === "/" ) {
    //             navigate( "/sbo-admin/dashboard" );
    //         }
    //         setRoleMethod( prev => ( { ...prev, student: false, sbo_admin: true, registrar_admin: false, super_admin: false } ) );
    //     }

    //     if ( UserData.role === "admin" ) {
    //         if ( location.pathname === "/" ) {
    //             navigate( "/registrar-admin/dashboard" );
    //         }
    //         setRoleMethod( prev => ( { ...prev, student: false, sbo_admin: false, registrar_admin: true, super_admin: false } ) );
    //     }
    // }, [navigate, UserData, setRoleMethod, location.pathname] );



    const Onsubmit = async ( dt ) => {
        // e.preventDefault();
        setLoading( true );
        setLoadingCircle( true );

        try {
            // ${ axiosDeffaultUrl }
            const { data } = await axios.post( `${ axiosDeffaultUrl }/user/login-user`, dt, { withCredentials: true } );
            toast.success( "successfully login" );
            setLoading( false );
            login( data, data.expiresIn );

            // Ensure dashboard has fresh data immediately after login
            const refreshed = await axios.get( `${ axiosDeffaultUrl }/user/user-data`, { withCredentials: true, headers: { "Cache-Control": "no-cache" } } );
            setStudentData( refreshed.data );
            // ****************checking role to navigate*****************
            if ( data.role === "student" ) {
                navigate( "/student/dashboard" );
                setRoleMethod( { ...roleMethod, student: true, sbo_admin: false, registrar_admin: false, super_admin: false } );
            } else if ( data.role === "teacher" ) {
                navigate( "/sbo-admin/dashboard" );
                setRoleMethod( { ...roleMethod, student: false, sbo_admin: true, registrar_admin: false, super_admin: false } );
            } else {
                navigate( "/registrar-admin/dashboard" )
                setRoleMethod( { ...roleMethod, student: false, sbo_admin: false, registrar_admin: true, super_admin: false } );
            }
            // ****************--------------------------*****************
        } catch ( err ) {
            setLoading( false );
            const message = err?.response?.data?.message ?? ( typeof err?.response?.data === 'string' ? err.response.data : err.message || 'Something went wrong' );
            toast.error( message );
        } finally {
            setLoadingCircle( false );
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl bg-white p-8 mt-10 md:shadow-md sm:shadow-none">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
                <p className="text-slate-500">Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit( Onsubmit )} className="relative space-y-5">
                {/* Role Selection */}
                {/* <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Choose Role</label>
                    <div
                        className="bg-white border border-slate-400 flex items-center justify-between rounded-md p-2 mb-0.5 min-w-15 max-w-md"
                        onClick={() => setOpen( !open )}
                    >
                        <input
                            placeholder="Choose a student"
                            readOnly
                            className="outline-0 cursor-default"
                            value={selected.student ? "Standard Student" : "Administrator"}
                            onChange={( e ) => setSelected( e.target.value )}
                        />
                        <div>
                            {open ? <MdKeyboardArrowDown />
                                : <MdKeyboardArrowUp />}
                        </div>
                    </div>

                    {open && <div className="absolute border flex flex-col w-full rounded-md border-slate-400 bg-slate-50 p-0.5 text-slate-700 transition">
                        <button
                            type='button'
                            className={`loginbtn mb-1 ${ selected.student ? "bg-indigo-400 text-white" : "hover:bg-indigo-200" }`}
                            onClick={() => setSelected( prev => ( { ...prev, admin: false, student: true } ) )}
                        >Standard Student</button>
                        <button
                            type='button'
                            className={`loginbtn ${ selected.admin ? "bg-indigo-400 text-white" : "hover:bg-indigo-200" }`}
                            onClick={() => setSelected( prev => ( { ...prev, admin: true, student: false } ) )}
                        >Teacher Administrator</button>
                    </div>}
                </div> */}

                {/* ID Field */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Username</label>
                    <input
                        type="text"
                        placeholder="Enter Your username"
                        className={`w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${ errors.username && "border-red-500 ring-2 ring-red-300" }`}
                        {...register( 'username', { required: true } )}
                    />
                    {errors.username && ( <p className="p-1 text-[13px] font-semibold text-orange-500">
                        Please enter username.
                    </p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                    <input
                        type="password"
                        placeholder="Your Password"
                        className={`w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${ errors.password && "border-red-500 ring-2 ring-red-300" }`}
                        {...register( 'password', { required: true } )}
                    />
                    {errors.password && ( <p className="p-1 font-semibold text-[13px] text-orange-500">
                        Please enter password.
                    </p>
                    )}
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
    )
}

export default UserLogin;




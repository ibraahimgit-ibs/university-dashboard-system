import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosUrl from "./axiosUrl";
import { useStudent } from './useStudent';
import { roleMethodState } from "../atom/atom";
import { useRecoilState } from "recoil";

const useAuth = () => {
    const [user, setUser] = useState( null );
    const [logged, setLogged] = useState( false );
    const [loading, setLoading] = useState( true );
    const [_, setRoleMethod] = useRecoilState( roleMethodState );

    const { axiosDeffaultUrl } = axiosUrl();

    const navigate = useNavigate();
    const location = useLocation();
    const { UserData } = useStudent();


    useEffect( () => {
        const checkAuth = async () => {

            try {
                // ${ axiosDeffaultUrl }
                const res = await axios.get( `${ axiosDeffaultUrl }/api/check-auth`, { withCredentials: true } );
                if ( res.data.loggedIn ) {
                    setUser( res.data );
                    setLogged( true );
                    const role = res.data?.user?.role ?? res.data?.role ?? UserData?.role;

                    if ( role === "student" ) {
                        if ( location.pathname === "/" ) {
                            navigate( "/student/dashboard" );
                        }
                        setRoleMethod( prev => ( { ...prev, student: true, sbo_admin: false, registrar_admin: false, super_admin: false } ) );
                        return;
                    }

                    if ( role === "teacher" ) {
                        if ( location.pathname === "/" ) {
                            navigate( "/sbo-admin/dashboard" );
                        }
                        setRoleMethod( prev => ( { ...prev, student: false, sbo_admin: true, registrar_admin: false, super_admin: false } ) );
                        return;
                    }
                } else {
                    setUser( null );
                    navigate( '/' );
                }
            } catch ( err ) {
                console.log( err );
                setUser( null );
                navigate( '/' );
            }
            finally {
                setLoading( false );
            }

        }
        checkAuth();
    }, [navigate, location.pathname, UserData, setRoleMethod] )

    return { user, logged, loading }
};

export default useAuth;

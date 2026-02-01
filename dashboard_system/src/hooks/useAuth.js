import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosUrl from "./axiosUrl";

const useAuth = () => {
    const [user, setUser] = useState( null );
    const [logged, setLogged] = useState( false );
    const [loading, setLoading] = useState( true );

    const { axiosDeffaultUrl } = axiosUrl();

    const navigate = useNavigate();

    useEffect( () => {
        const checkAuth = async () => {
            try {

                const res = await axios.get( `${ axiosDeffaultUrl }/api/check-auth`, { withCredentials: true } );
                if ( res.data.loggedIn ) {
                    setUser( res.data );
                    setLogged( true );
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
    }, [navigate] )

    return { user, logged, loading }
};

export default useAuth;

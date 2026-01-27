import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { roleMethodState } from "../atom/atom";

const StudentContext = createContext( null );

export const StudentProvidor = ( { children } ) => {

    const [student, setStudent] = useState( null )
    const [__, setRoleMethod] = useRecoilState( roleMethodState );
    const navigate = useNavigate();


    const logout = () => {
        localStorage.removeItem( "student" );
        localStorage.removeItem( "expirationTime" );
        setStudent( null );
        navigate( "/" );
        setRoleMethod( prev => ( { ...prev, student: false } ) );
    }

    useEffect( () => {
        const storedStudent = localStorage.getItem( "student" );
        const expirationTime = localStorage.getItem( "expirationTime" );

        if ( storedStudent && expirationTime ) {
            if ( Date.now() < Number( expirationTime ) ) {
                setStudent( JSON.parse( storedStudent ) );
            } else {
                logout();
            }
        }
    }, [] );




    const login = ( studentData, expiresIn ) => {
        const expirationTime = Date.now() + expiresIn * 1000;
        localStorage.setItem( "student", JSON.stringify( studentData ) );
        localStorage.setItem( "expirationTime", expirationTime.toString() );
        setStudent( studentData );
    };

    return (
        <StudentContext.Provider value={{ student, setStudent, login, logout }}>
            {children}
        </StudentContext.Provider>
    );


};

export const useStudent = () => useContext( StudentContext );


export default StudentContext;
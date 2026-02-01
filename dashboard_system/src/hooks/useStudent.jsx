import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { roleMethodState, userDataState } from "../atom/atom";
import StudentContext from "./studentContext";

export const StudentProvidor = ( { children } ) => {

    const [student, setStudent] = useState( null )
    const [isOpened, setIsOpened] = useState( false );
    const [__, setRoleMethod] = useRecoilState( roleMethodState );
    const [____, setStudentData] = useRecoilState( userDataState );
    const navigate = useNavigate();


    const logout = () => {

        try {
            axios.post( "/api/logout", { Credential: true } )
            localStorage.removeItem( "student" );
            localStorage.removeItem( "expirationTime" );
            setStudent( null );
            navigate( "/" );
            setRoleMethod( prev => ( { ...prev, student: false } ) );
        } catch ( err ) {
            console.log( "error for logout", err )
        }

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


    // edit grade
    const handleUpdateGrade = async ( student_id, subject_id, term_id, newGrade ) => {
        try {

            const res = await axios.put( "https://university-dashboard-system.onrender.com/api/student/update-grade", {
                student_id: student_id,
                subject_id: subject_id,
                term_id: term_id,
                grade: newGrade
            }, { withCredentials: true, } )

            const updated = res.data.updated;

            // Update recoil state
            setStudentData( prev => ( {
                ...prev,
                grades: prev.grades.map( g =>
                    g.id === updated.id   // id si loo hubiyo row sax ah
                        ? { ...g, ...updated } //  overwrite all fields from backend
                        : g
                )
            } ) );




        } catch ( error ) {
            console.error( "Error updating grade:", error );
        }
    }
    // _________

    return (
        <StudentContext.Provider value={{ student, setStudent, login, logout, handleUpdateGrade, isOpened, setIsOpened }}>
            {children}
        </StudentContext.Provider>
    );


};

export default StudentProvidor;
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LoadingState, roleMethodState, userDataState } from "../atom/atom";
import StudentContext from "./studentContext";
import axiosUrl from './axiosUrl';

export const StudentProvidor = ( { children } ) => {

    const [UserData, setUserData] = useState( null )
    const [isOpened, setIsOpened] = useState( false );
    const [__, setRoleMethod] = useRecoilState( roleMethodState );
    const [studentData, setStudentData] = useRecoilState( userDataState );
    const [_____, setLoading] = useRecoilState( LoadingState );
    const navigate = useNavigate();


        const { axiosDeffaultUrl } = axiosUrl();

    const logout = () => {
        setLoading( true )
        try {
            axios.post( `${axiosDeffaultUrl}/api/user/logout`, { Credential: true } )
            localStorage.removeItem( "user" );
            localStorage.removeItem( "expirationTime" );
            setUserData( null );
            navigate( "/" );
            setRoleMethod( prev => ( { ...prev, student: false, sbo_admin: false, registrar_admin: false, super_admin: false } ) );
        } catch ( err ) {
            console.log( "error for logout", err )
        } finally {
            setLoading( false )
        }

    }

    useEffect( () => {
        const storedStudent = localStorage.getItem( "user" );
        const expirationTime = localStorage.getItem( "expirationTime" );

        if ( storedStudent && expirationTime ) {
            if ( Date.now() < Number( expirationTime ) ) {
                setUserData( JSON.parse( storedStudent ) );
            } else {
                logout();
            }
        }
    }, [] );


    const login = ( studentData, expiresIn ) => {
        const expirationTime = Date.now() + expiresIn * 1000;
        localStorage.setItem( "user", JSON.stringify( studentData ) );
        localStorage.setItem( "expirationTime", expirationTime.toString() );
        setUserData( studentData );
    };


    // edit grade
    const handleUpdateGrade = async ( student_id, subject_id, term_id, newGrade ) => {
        setLoading( true )

        try {
            const res = await axios.put( `${axiosDeffaultUrl}/api/user/update-grade`, {
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
        } finally {
            setLoading( false )
        }
    }

    // ***********student logged data*****************
    const { grades, students } = studentData;
    const student = UserData?.id ? students?.find( st => st.user_id === UserData.id ) : null;
    const studentGrades = student?.id ? grades?.filter( grade => grade.student_id === student.id ) : [];
    // ***********___________________*****************
    // _________

    return (
        <StudentContext.Provider value={{ UserData, login, logout, handleUpdateGrade, isOpened, setIsOpened, studentGrades, student }}>
            {children}
        </StudentContext.Provider>
    );


};

export default StudentProvidor;
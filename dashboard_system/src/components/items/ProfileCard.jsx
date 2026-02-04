import { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { Link } from 'react-router';
import { useRecoilState } from "recoil";
import { roleMethodState } from "../../atom/atom";
import { useStudent } from "../../hooks/useStudent";

const ProfileCard = () => {
    function getFirstTwoLetters( text ) {
        return text.substring( 0, 2 ).toUpperCase();
    }

    const [show, setShow] = useState( false );
    const [roleMethod, __] = useRecoilState( roleMethodState );

    const { UserData, student, logout } = useStudent();


    const text = student?.f_name ? getFirstTwoLetters( student.f_name ) : '';

    const handleShow = () => {
        setShow( !show )
    };

    let nickName = "";
    let to = "";

    if ( roleMethod.student ) {
        nickName = text;
        to = "/student/profile";
    } else if ( roleMethod.sbo_admin || roleMethod.registrar_admin || roleMethod.super_admin ) {
        nickName = "AU";
    } else {
        nickName = "GU";
    };


    return (
        <div className="">
            <button
                className="font-semibold h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center"
                onClick={handleShow}
            >{nickName}</button>

            {show && UserData?.role === "student" &&
                <div className="absolute right-5 text-sm rounded-xl w-60 p-0 py-1 m-2 shadow-lg bg-white shadow-gray-300 border border-gray-200 transition">
                    <div className="w-full pb-3 px-3">
                        <h1 className="font-semibold text-md">ID: {student?.id}</h1>
                        <p className="text-gray-500 text-sm">{student?.f_name} {student?.s_name} {student?.l_name}</p>
                    </div>
                    <div className="flex flex-col px-3 mb-3 py-2 border-0 border-b border-t border-gray-300">
                        {<Link to={to || "/student/Dashboard"}>
                            <div
                                className="flex items-center p-2 gap-3 rounded-lg hover:bg-gray-200 transition"
                                onClick={handleShow}
                            >
                                <BsPerson color="gray" className="person_icon" />
                                <p>Profile</p>
                            </div>
                        </Link>}
                        <div
                            className="p-2 rounded-lg hover:bg-gray-200 transition"
                            onClick={handleShow}
                        >
                            <p>Settings</p>
                        </div>
                    </div>
                    <div className="p-3 pt-0">
                        <button
                            className="text-left p-2 w-full rounded-lg hover:bg-gray-200 hover:underline transition"
                            onClick={logout}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            }

            {show && UserData?.role !== "student" && 
            <div className="absolute right-5 text-sm rounded-xl w-60 py-3 px-2 mt-2 shadow-lg bg-white shadow-gray-300 border border-gray-200 transition">
                <button
                    className="text-left p-2 w-full rounded-lg hover:bg-gray-200 hover:underline transition"
                    onClick={logout}
                >LogOut</button>
            </div>}
        </div>
    )
}

export default ProfileCard;
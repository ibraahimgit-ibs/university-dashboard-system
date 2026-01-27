import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { roleMethodState } from "../../atom/atom";
import { useStudent } from "../../hooks/useStudent";

const SwitchRole = () => {

    const [show, setShow] = useState( false );
    const [roleMethod, setRoleMethod] = useRecoilState( roleMethodState );

    const navigate = useNavigate();
    const { student } = useStudent();

    const handleShow = () => {
        setShow( !show )
    };

    return (
        <div>
            <div
                className="bg-white z-100 flex items-center justify-center space-x-2 border border-gray-300 w-full p-1 px-2 rounded-[10px] hover:bg-gray-200 cursor-default transition"
                onClick={handleShow}
            >
                <h1 className="font-semibold md:text-md sm:text-sm lg:text-md">Switch Role</h1>
                <AiOutlineDown />
            </div>

            {show &&
                <div className="absolute right-34 rounded-xl w-50 p-0 py-1 m-2 shadow-lg bg-white shadow-gray-300 border border-gray-200 transition">
                    <h1 className="font-semibold px-4 py-3 w-full border-b border-b-gray-300">Switch Role</h1>
                    <div className="grid space-y-1 px-1 py-3 text-sm">
                        <div className={`w-full p-2 pl-4 rounded-lg hover:bg-gray-200 transition ${ roleMethod.student && "selected" }`}
                            onClick={() => {
                                setRoleMethod( { ...roleMethod, sbo_admin: false, registrar_admin: false, super_admin: false, student: true } )
                                navigate( "/student/dashboard" )
                                handleShow();
                            }}
                        >
                            <button className="role_btn st_H">Student</button>
                        </div>
                        <div className={`w-full p-2 pl-4 rounded-lg hover:bg-gray-200 transition ${ roleMethod.sbo_admin && "selected" }`}
                            onClick={() => {
                                setRoleMethod( { ...roleMethod, sbo_admin: true, registrar_admin: false, super_admin: false, student: false } )
                                navigate( "/sbo-admin/dashboard" )
                                handleShow();
                            }}
                        >
                            <button className="role_btn sbo_H bg-green-100 text-green-700">SBO Admin</button>
                        </div>
                        <div className={`w-full p-2 pl-4 rounded-lg hover:bg-gray-200 transition ${ roleMethod.registrar_admin && "selected" }`}
                            onClick={() => {
                                setRoleMethod( { ...roleMethod, sbo_admin: false, registrar_admin: true, super_admin: false, student: false } );
                                handleShow();
                            }
                            }
                        >
                            <button className="role_btn reg_H bg-purple-100 text-purple-700">Registrar Admin</button>
                        </div>
                        <div className={`w-full p-2 pl-4 rounded-lg hover:bg-gray-200 transition ${ roleMethod.super_admin && "selected" }`}
                            onClick={() => {
                                setRoleMethod( { ...roleMethod, sbo_admin: false, registrar_admin: false, super_admin: true, student: false } )
                                handleShow();
                            }
                            }
                        >
                            <button className="role_btn sup_H bg-red-100 text-red-700">Super Admin</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default SwitchRole;
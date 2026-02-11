import { IoAdd } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import Students_b from "../../sbo-admin/comp/Students_b";
import { useState } from "react";
import AddStudentModal from "./Modal/AddStudentModal";

const StudentInfo = () => {
    const [open, setOpen] = useState( false );

    return (
        <div className="relative border border-gray-300 rounded-xl h-full w-full p-3 md:px-6 sm:px-3 flex flex-col gap-5">
            <div className="flex justify-between space-x-3">
                <div className="up_ex_divs darkBTN hover:bg-gray-100"><MdOutlineFileDownload /> Export</div>
                <div
                    onClick={() => setOpen( !open )}
                    className="up_ex_divs darkBTN bg-black text-white hover:bg-gray-700"
                ><IoAdd /> Add Student</div>
            </div>

            <Students_b />
            <AddStudentModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default StudentInfo;

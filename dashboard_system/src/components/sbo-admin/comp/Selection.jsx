import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoCheckmarkOutline } from "react-icons/io5";
import { LuPen } from "react-icons/lu";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRecoilState } from 'recoil';
import { useStudent } from "../../../hooks/useStudent";
import {
    gradeEntryClickedDataState,
    gradeEntryWindowState,
    userDataState
} from './../../../atom/atom';
import AddGradeModal from "./AddGradeModal";
import DeleteModal from "./DeleteModal";
import EditGradeWindow from "./EditGradeWindow";


const Selection = ( { students } ) => {
    const [selected, setSelected] = useState( null );
    const [open, setOpen] = useState( false );
    const [isOpen, setIsOpen] = useRecoilState( gradeEntryWindowState );
    const [clickedData, setClickedData] = useRecoilState( gradeEntryClickedDataState );
    const [studentData, setStudentData] = useRecoilState( userDataState );
    const [delOpen, setDelOpen] = useState( false );


    const { grades } = studentData;
    const { isOpened, setIsOpened } = useStudent();

    const handleClick = () => {
        setIsOpen( !isOpen )
    }


    const studentGrades = grades?.filter( grade => grade.student_id === selected?.id );

    function getLetterGrade( percentage ) {
        if ( percentage >= 90 ) return "A";
        else if ( percentage >= 80 ) return "B";
        else if ( percentage >= 70 ) return "C";
        else if ( percentage >= 60 ) return "D";
        else if ( percentage >= 50 ) return "E";
        else return "F";
    }

    function getRowColor( percentage ) {
        if ( percentage >= 90 ) return "bg-green-600 text-white";   // A → Green
        else if ( percentage >= 80 ) return "bg-blue-600 text-white"; // B → Blue
        else if ( percentage >= 70 ) return "bg-gray-400 text-white"; // C → Yellow
        else if ( percentage >= 60 ) return "bg-black text-white"; // D → Orange
        else if ( percentage >= 50 ) return "bg-red-600 text-white"; // E → Purple
        else return "bg-purple-600 text-white"; // F → Red
    }



    // console.log(studentData);


    return (
        <div>
            <h1 className="font-semibold">Select Student</h1>
            <div
                className="bg-gray-200 flex items-center justify-between rounded-md p-1 px-2 mb-3 min-w-15 max-w-md"
                onClick={() => setOpen( !open )}
            >
                <input
                    placeholder="Choose a student"
                    readOnly className="outline-0 cursor-default"
                    value={selected?.f_name}
                    onChange={( e ) => setSelected( e.target.value )}
                />
                <div>
                    {open ? <MdKeyboardArrowDown />
                        : <MdKeyboardArrowUp />}
                </div>
            </div>

            {open && <div className="bg-white z-10 rounded-md my-2 p-1 px-2 min-w-60 max-w-md shadow shadow-gray-300">
                {Array.isArray( students ) && students.map( ( st, i ) => (
                    <p
                        key={i}
                        onClick={() => {
                            setSelected( st );
                            setOpen( false );
                        }}
                        className={`flex items-center justify-between cursor-pointer rounded-md px-2 py-1 
                         ${ selected?.f_name === st.f_name ? "bg-gray-200" : "hover:bg-gray-200" }`}
                    >
                        {st.f_name}
                        {selected?.f_name === st.f_name && <IoCheckmarkOutline />}
                    </p>
                ) )}
            </div>}

            {selected !== null && <div className="bg-gray-100 border border-gray-300 rounded-xl h-full w-full p-3 md:px-6 sm:px-3 flex flex-col gap-5">
                <h1 className="font-semibold">Student Information</h1>
                <div className="grid grid-cols-3 mb-3">
                    <div>
                        <span className="text-gray-500">Name:</span>
                        <h2 className="font-semibold">{selected?.f_name}</h2>
                    </div>
                    <div>
                        <span className="text-gray-500">Student ID:</span>
                        <h2 className="font-semibold">{selected?.id}</h2>
                    </div>
                    <div>
                        <span className="text-gray-500">Current GPA:</span>
                        <h2 className="font-semibold">3.5</h2>
                    </div>
                </div>
            </div>}

            {selected !== null && <div className="my-5">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Current Grades</h1>
                    <button
                        onClick={() => setIsOpened( !isOpened )}
                        className="bg-black text-white flex items-center gap-2 p-1 px-2 rounded-md font-semibold">
                        <FiPlus /> Add grade
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full mt-6 text-sm" >
                        <thead>
                            <tr>
                                <th>Subjects</th>
                                <th>Grade</th>
                                <th>Letter Grade</th>
                                <th>Term</th>
                                <th>Enrolment_Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray( studentGrades ) && studentGrades?.map( ( grade, i ) => {
                                const letter = getLetterGrade( grade?.grade );
                                // console.log(clickedData !== null && clickedData[5]);

                                return (
                                    <tr key={i}>
                                        <td>{grade?.subject}</td>
                                        <td>{grade?.grade}%</td>
                                        <td ><span className={`a ${ getRowColor( grade.grade ) }`}>{letter}</span></td>
                                        <td>{grade?.term}</td>
                                        <td>{grade?.enrolment_date}</td>
                                        <td className="flex items-center">
                                            <div
                                                onClick={() => {
                                                    handleClick();
                                                    setClickedData( 0 );
                                                    setClickedData( [grade?.student_id, grade?.subject_id, grade?.term_id, grade?.grade, grade?.subject, grade?.id] );
                                                }}
                                                className="p-2 w-9 flex items-center justify-center rounded-lg hover:bg-gray-200 transition">
                                                <LuPen className="h-5 w-4" />
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setClickedData( 0 );
                                                    setClickedData( [grade?.student_id, grade?.subject_id, grade?.term_id, grade?.grade, grade?.subject, grade?.id] );
                                                    setDelOpen( !delOpen );
                                                }}
                                                className="p-2 w-9 flex items-center justify-center rounded-lg hover:bg-gray-200 transition">
                                                <RiDeleteBin5Line className="h-5 w-4" />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            } )}
                        </tbody>
                    </table>
                </div>
            </div>}

            <EditGradeWindow />
            <AddGradeModal />
            <DeleteModal delOpen={delOpen} setDelOpen={setDelOpen} setStudentData={setStudentData} clickedData={clickedData} />
        </div>
    );
}

export default Selection;

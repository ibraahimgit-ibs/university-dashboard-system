import { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useRecoilState } from "recoil";
import {
    gradeEntryClickedDataState,
    gradeEntryLettersState,
    gradeEntryWindowState
} from "../../../atom/atom";
import { useStudent } from "../../../hooks/useStudent";
import { toast } from 'react-hot-toast';


const EditGradeWindow = () => {
    const [isOpen, setIsOpen] = useRecoilState( gradeEntryWindowState );
    const [clickedData, __] = useRecoilState( gradeEntryClickedDataState );
    const [Letters, setLetters] = useRecoilState( gradeEntryLettersState );
    const [newgrade, setNewgrade] = useState( "" );

    const { handleUpdateGrade } = useStudent();

    const handleClick = () => {
        setIsOpen( !isOpen );
        // setNewTerm( "" );
        setNewgrade( "" );
    };

    useEffect( () => {
        if ( clickedData >= 90 ) setLetters( "A" );
        else if ( clickedData >= 80 ) setLetters( "B" );
        else if ( clickedData >= 70 ) setLetters( "C" );
        else if ( clickedData >= 60 ) setLetters( "D" );
        else if ( clickedData >= 50 ) setLetters( "E" );
        else setLetters( "F" );
    }, [clickedData, setLetters] );



    const handleSave = () => {
        if (newgrade.trim() === "") return toast.error("please enter new grade");
        if ( newgrade.trim() > 100 || newgrade.trim() < 0) {return toast.error("you can't enter grade above 100 or smaller 0");}
        handleUpdateGrade( clickedData[0], clickedData[1], clickedData[2], newgrade );
        toast.success( "Success updated grade" );
        // setNewTerm( "" );
        setNewgrade( "" );
        setIsOpen( !isOpen );
    }


    return (
        <div>
            {isOpen && <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#0000003e]">
                <div className="paymodaldiv bg-white relative p-6 sm:max-w-lg rounded-lg z-50 w-lg">
                    <div>
                        <div>
                            <h1 className="font-semibold text-[20px]">Edit Grade</h1>
                            <p className="text-gray-400 text-sm">Update the grade for Mathematics</p>
                        </div>
                        <button
                            onClick={handleClick}
                            className="text-gray-500 hover:text-gray-600 absolute right-4 top-3 transition">
                            <RxCrossCircled className="crosIcon h-5 w-5" />
                        </button>
                    </div>
                    <p className="font-semibold mt-3 text-sm text-gray-600">Grade (%)</p>
                    <input
                        type="number"
                        className="edit_grade_window_inputs"
                        placeholder="Enter New Grade"
                        autoFocus
                        value={newgrade}
                        onChange={( e ) => setNewgrade( e.target.value )}
                    />

                    {/* <p className="font-semibold mt-3 text-sm text-gray-600">Term (type 1 or 2)</p>
                    <input
                        type="text"
                        className="edit_grade_window_inputs"
                        placeholder="Enter Term (type 1 or 2)"
                        value={newTerm}
                        onChange={( e ) => setNewTerm( e.target.value )}
                    /> */}

                    <p className="font-semibold mt-3 text-sm text-gray-600">Updating Subject</p>
                    <input
                        type="text"
                        value={clickedData[4]}
                        readOnly
                        className="edit_grade_window_inputs"
                    />
                    <div className="flex items-center justify-end mt-5 space-x-3">
                        <button
                            className="btn1 w-18.5 h-9 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                            onClick={handleClick}
                        >Cancel
                        </button>
                        <button
                            className="btn2 w-36 h-9 px-2 border bg-black text-white border-gray-300 rounded-md hover:bg-[#000000de] transition"
                            onClick={() => {
                                handleSave();
                            }}
                        >Save Changes</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default EditGradeWindow;
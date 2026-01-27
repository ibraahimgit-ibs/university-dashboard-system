import { RxCrossCircled } from "react-icons/rx";
import { useRecoilState } from "recoil";
import {
    gradeEntryClickedDataState,
    gradeEntryClickedNowState,
    gradeEntryDataState,
    gradeEntryLettersState,
    gradeEntryWindowState
} from "../../../atom/atom";
import { useEffect } from "react";


const EditGradeWindow = () => {
    const [____, setData] = useRecoilState(gradeEntryDataState);
    const [isOpen, setIsOpen] = useRecoilState(gradeEntryWindowState);
    const [clickedData, setClickedData] = useRecoilState(gradeEntryClickedDataState);
    const [clickedNow, _] = useRecoilState(gradeEntryClickedNowState);
    const [Letters, setLetters] = useRecoilState(gradeEntryLettersState);


    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (clickedData >= 90) setLetters("A");
        else if (clickedData >= 80) setLetters("B");
        else if (clickedData >= 70) setLetters("C");
        else if (clickedData >= 60) setLetters("D");
        else if (clickedData >= 50) setLetters("E");
        else setLetters("F");
    }, [clickedData, setLetters]);



const handleSave = () => {
    if (clickedNow === "a") {
        setData(sub => ({
            ...sub, Mathematics: clickedData
        }))
    } else if (clickedNow === "b") {
        setData(sub => ({
            ...sub, English_Literature: clickedData
        }))
    } else if (clickedNow === "c") {
        setData(sub => ({
            ...sub, Chemistry: clickedData
        }))
    } else if (clickedNow === "d") {
        setData(sub => ({
            ...sub, History: clickedData
        }))
    } else if (clickedNow === "e") {
        setData(sub => ({
            ...sub, physics: clickedData
        }))
    }
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
                <p className="font-semibold mt-3">Grade (%)</p>
                <input
                    type="number"
                    className="edit_grade_window_inputs"
                    value={clickedData}
                    onChange={(e) => setClickedData(e.target.value)}
                />

                <p className="font-semibold mt-2">Letter Grade</p>
                <input
                    type="text"
                    value={Letters}
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
                            setIsOpen(!isOpen);
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
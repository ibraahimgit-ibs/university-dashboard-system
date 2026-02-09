import { useState } from "react";
import { BsGraphDownArrow } from "react-icons/bs";
import { FaArrowDownWideShort, FaArrowUpRightDots } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoSchool } from "react-icons/io5";
import { LuChartNoAxesCombined, LuPen } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRecoilState } from "recoil";
import { gradeEntryClickedDataState, gradeEntryWindowState, userDataState } from "../../atom/atom";
import useStudent from "../../hooks/useStudent";
import Card from './../items/Card';
import AddGradeModal from "./comp/AddGradeModal";
import DeleteModal from "./comp/DeleteModal";
import EditGradeWindow from "./comp/EditGradeWindow";



const GradeEntry = () => {
  const [isclass, setIsClass] = useState( "3" );
  const [isOpen, setIsOpen] = useRecoilState( gradeEntryWindowState );
  const [clickedData, setClickedData] = useRecoilState( gradeEntryClickedDataState );
  const [studentData, setStudentData] = useRecoilState( userDataState );
  const [delOpen, setDelOpen] = useState( false );

  const grades = Array.isArray( studentData?.grades ) ? studentData.grades : [];
  const { isOpened, setIsOpened, UserData } = useStudent();

  const handleClick = () => {
    setIsOpen( !isOpen )
  }

  const { students } = studentData || {};
  const classMatched = students?.filter( student => student?.class === isclass );
  const studentGrades = grades.filter( grade => {
    return classMatched?.some( student => student?.id === grade?.student_id );
  } );

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


  const totalGrades = grades.reduce( ( acc, g ) => acc + ( Number( g?.grade ) || 0 ), 0 );
  const averageGrade = grades.length > 0 ? Math.round( totalGrades / grades.length ) : 0;
  const passCount = grades.filter( g => Number( g?.grade ) >= 50 ).length;
  const passRate = grades.length > 0 ? Math.round( ( passCount / grades.length ) * 100 ) : 0;
  const failRate = grades.length > 0 ? Math.round( 100 - passRate ) : 0;



  return (
    <div>
      <div>
        <h1 className="font-semibold text-[20px]">Student Grade Entry Management</h1>
        <p className="text-gray-500">Manage and see Grades from last Year</p>
      </div>

      <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-5 my-5'>
        <Card title="Average Pass" icon={<LuChartNoAxesCombined />} numbers={`${ passRate }%`} paragraph={"from last year"}
          div={
            <div className="percent_cardg bg-gray-300 w-full mt-2 h-2 rounded-3xl">
              <div className="percent_card bg-black h-full rounded-3xl" style={{ width: `${ passRate }%` }}></div>
            </div>
          } />
        <Card title="Average Fail" icon={< BsGraphDownArrow />} numbers={`${ failRate }%`} paragraph={"from last year"}
          div={
            <div className="percent_cardg bg-gray-300 w-full mt-2 h-2 rounded-3xl">
              <div className="percent_card bg-black h-full rounded-3xl" style={{ width: `${ failRate }%` }}></div>
            </div>
          } />
        <Card
          title="Average Grade"
          icon={averageGrade > 50 ? < FaArrowUpRightDots /> : <FaArrowDownWideShort />}
          icon2={<IoSchool />}
          numbers={`${ averageGrade }%`}
          paragraph={"from last year"}
        />
      </div>

      <div className="bg-white z-10 border border-gray-300 rounded-md my-2 py-3 px-2 min-w-full max-w-full shadow shadow-gray-300">

        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Full Current Grades</h1>
          <button
            onClick={() => setIsOpened( !isOpened )}
            className="bg-black text-white flex items-center gap-2 p-1 px-2 rounded-md font-semibold">
            <FiPlus /> Add grade
          </button>
        </div>

        <div>
          <select
            className="border border-gray-400 rounded-xl outline-0 mt-3 font-semibold p-1 px-2"
            onChange={( e ) => setIsClass( e.target.value )}
          >
            <optgroup label="Select Class">
              <option >{isclass !== null ? `Class ${ isclass }` : "Select Class"}</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
            </optgroup>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full mt-6 text-sm" >
            <thead>
              <tr>
                <th>ST_Name</th>
                <th>Subjects</th>
                <th>Grade</th>
                <th>G_Letter</th>
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
                    <td>{grade?.f_name}</td>
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

        <EditGradeWindow />
        <AddGradeModal />
        <DeleteModal delOpen={delOpen} setDelOpen={setDelOpen} setStudentData={setStudentData} clickedData={clickedData} />
      </div>

    </div>
  )
}

export default GradeEntry;

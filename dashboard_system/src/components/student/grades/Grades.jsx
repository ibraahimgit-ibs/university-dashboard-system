import { BsGraphUpArrow } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";
import useStudent from "../../../hooks/useStudent";
import Card from "../../items/Card";

const Grades = () => {
    const { studentGrades } = useStudent();

    // **********functions of letters**********//
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

    // ----------------------------------------

    return (
        <div className="max-w-full min-w-full">
            <div className="space-y-3">
                <h1 className="text-2xl font-semibold">Academic Grades</h1>
                <p className="text-gray-500">View your complete academic history and current semester grades.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 pt-10 w-full">
                <Card title={"Overall GPA"} paragraph={"+0.12 from last semester"} numbers={"3.85"} icon={<FaGraduationCap />} icon2={<BsGraphUpArrow />} />
                <Card title={"Credits Completed"} paragraph={"102 credits remaining"} numbers={"18"} icon={<FaGraduationCap />} />
                <Card title={"Progress to Graduation"} numbers={"20%"} icon={<BsGraphUpArrow />}
                    div={
                        <div className="percent_cardg bg-gray-300 w-full mt-2 h-2 rounded-3xl">
                            <div className="percent_card bg-black w-15 h-full rounded-l-3xl"></div>
                        </div>
                    } />
            </div>

            <div className="border border-gray-300 rounded-xl p-5 my-6">
                <div>
                    <h2 className="font-semibold">Current Semester Grades</h2>
                    <p className="text-gray-500">All courses and grades from your academic record</p>
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
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray( studentGrades ) && studentGrades?.map( ( grade, i ) => {
                                const letter = getLetterGrade( grade?.grade );

                                return (
                                    <tr key={i}>
                                        <td>{grade?.subject}</td>
                                        <td>{grade?.grade}%</td>
                                        <td ><span className={`a ${ getRowColor( grade.grade ) }`}>{letter}</span></td>
                                        <td>{grade?.term}</td>
                                        <td>{grade?.enrolment_date}</td>
                                    </tr>
                                )
                            } )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Grades;
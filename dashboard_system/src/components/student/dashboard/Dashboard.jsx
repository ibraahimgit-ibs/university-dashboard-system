import { BsGraphUpArrow } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { useRecoilState } from "recoil";
import { modalData, Open } from "../../../atom/atom";
import useStudent from "../../../hooks/useStudent";
import Card from './../../items/Card';
import PayModal from "./PayModal";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useRecoilState( Open )
    const [data, setData] = useRecoilState( modalData );


    const { studentGrades, student } = useStudent();


    const handleSend = () => {
        setData( [...data, "$150.00", "9/1/2024"] );
        setIsOpen( !isOpen );
    }

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


    return (
        <div className="max-w-full min-w-full">
            <div className="space-y-3">
                <h1 className="text-2xl font-semibold">Welcome back, {student?.f_name}!</h1>
                <p className="text-gray-500">Here's your academic overview for the current semester.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 pt-10 w-full">
                <Card title={"Overall GPA"} paragraph={"+0.12 from last semester"} numbers={"3.85"} icon={<FaGraduationCap />} icon2={<BsGraphUpArrow />} />
                <Card title={"Credits Completed"} paragraph={"102 credits remaining"} numbers={"18"} icon={<FaGraduationCap />} />
                <Card title={"Progress to Graduation"} numbers={"15%"} icon={<BsGraphUpArrow />}
                    div={
                        <div className="percent_cardg bg-gray-300 w-full mt-2 h-2 rounded-3xl">
                            <div className="percent_card bg-black w-10 h-full rounded-l-3xl"></div>
                        </div>
                    } />
                <Card title={"Outstanding Balance"} paragraph={"2 pending payment(s)"} numbers={"$175.00"} icon={<MdPayment />} />
            </div>

            <div className="border border-gray-300 rounded-xl p-5 my-6">
                <div>
                    <h2 className="font-semibold">Current Semester Grades</h2>
                    <p className="text-gray-500">Fall 2025 semester grades and performance</p>
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

            <div className="border border-gray-300 rounded-xl p-5 my-6">
                <div>
                    <h2 className="font-semibold">Payment Summary</h2>
                    <p className="text-gray-500">Recent payments and outstanding balances</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full mt-6 text-sm">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-semibold">Tuition Fee - Fall 2025</td>
                                <td>$2500.00</td>
                                <td >8/15/2025</td>
                                <td><span className="paid rounded-2xl">paid</span></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Lab Fee - Chemistry</td>
                                <td>$150.00</td>
                                <td >9/1/2025</td>
                                <td><span className="overdue bg-red-600 rounded-2xl">overdue</span></td>
                                <td>
                                    <button
                                        className="paybtn"
                                        onClick={handleSend}
                                    >
                                        Pay Now</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Library Fee</td>
                                <td>$25.00</td>
                                <td >12/15/2025</td>
                                <td ><span className="pending bg-gray-200 text-black rounded-2xl">pending</span></td>
                                <td>
                                    <button
                                        className="paybtn"
                                        onClick={() => {
                                            setIsOpen( !isOpen );
                                            setData( [...data, "$25.00", "12/15/2025"] )
                                        }
                                        }
                                    >
                                        Pay Now</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <PayModal />
        </div>
    )
}

export default Dashboard;

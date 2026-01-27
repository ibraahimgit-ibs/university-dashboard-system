import { BsGraphUpArrow } from "react-icons/bs";
import Card from "../../items/Card";
import { FaGraduationCap } from "react-icons/fa6";

const Grades = () => {
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
                    <table className="w-full mt-6 text-sm">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Grade</th>
                                <th>Letter Grade</th>
                                <th>Credits</th>
                                <th>Semester</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-semibold">Mathematics</td>
                                <td>92%</td>
                                <td ><span className="a">A-</span></td>
                                <td>4</td>
                                <td>Fall 2025</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">English Literature</td>
                                <td>88%</td>
                                <td ><span className="ab bg-gray-200 text-black">B+</span></td>
                                <td>3</td>
                                <td>Fall 2025</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Chemistry</td>
                                <td>85%</td>
                                <td ><span className="ab bg-gray-200 text-black">B</span></td>
                                <td>4</td>
                                <td>Fall 2025</td>
                            </tr>   
                            <tr>
                                <td className="font-semibold">History</td>
                                <td>91%</td>
                                <td ><span className="a">A+</span></td>
                                <td>3</td>
                                <td>Fall 2025</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">physics</td>
                                <td>89%</td>
                                <td ><span className="ab bg-gray-200 text-black">B</span></td>
                                <td>4</td>
                                <td>Fall 2025</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Grades;
import Card from "../../../components/items/Card";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdPayment } from 'react-icons/md';
import { useRecoilState } from "recoil";
import { modalData, Open } from "../../../atom/atom";
import PayModal from "../../../components/student/dashboard/PayModal";


const Payments = () => {
    const [isOpen, setIsOpen] = useRecoilState(Open)
    const [data, setData] = useRecoilState(modalData);


    const handleSend = () => {
        setData([...data, "$150.00", "9/1/2024"]);
        setIsOpen(!isOpen);
    }


    return (
        <div className="max-w-full min-w-full">
            <div className="space-y-3">
                <h1 className="text-2xl font-semibold">Payment Management</h1>
                <p className="text-gray-500">Manage your tuition payments, view payment history, and make new payments.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 pt-10 w-full">
                <Card title={"Outstanding Balance"} paragraph={"2 pending payment(s)"} numbers={"$175.00"} icon={<MdPayment />} />
                <Card title={"Total Paid This Year"} paragraph={"1 completed payment(s)"} numbers={"$2500.00"} icon={<MdPayment />} />
                <Card title={"Next Payment Due"} paragraph={"150.00"} numbers={"9/1/2024"} icon={<BsGraphUpArrow />} />
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
                                            setIsOpen(!isOpen);
                                            setData([...data, "$25.00", "12/15/2025"])
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

export default Payments;
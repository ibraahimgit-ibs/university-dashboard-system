import { useRecoilState } from "recoil";
import { modalData, Open } from "../../../atom/atom";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from 'react-hot-toast';


const PayModal = () => {
    const [isOpen, setIsOpen] = useRecoilState( Open )
    const [data, setData] = useRecoilState( modalData );

    const handleClick = () => {
        setIsOpen( !isOpen )
        setData( "" );
    }

    const meassage = () => {
        return toast.success( "Successfully Paid" );
    }

    return (
        <div>
            {isOpen &&
                <div
                    className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#0000003e]"
                    onClick={handleClick}
                >
                    <div className="paymodaldiv bg-white relative p-6 sm:max-w-lg rounded-lg z-50 w-lg h-77.25">
                        <button
                            className="text-gray-500 hover:text-gray-600 absolute right-4 top-3 transition"
                            onClick={handleClick}
                        >
                            <RxCrossCircled className="crosIcon h-5 w-5" />
                        </button>
                        <h1 className="font-semibold text-[20px]">Process Payment</h1>
                        <p className="text-gray-400 text-sm">Complete payment for Lab Fee - Chemistry</p>
                        <div className="amountdueDIv bg-gray-100 w-full flex items-center justify-between p-5 my-4 border border-gray-200 rounded-2xl">
                            <div className="space-y-2">
                                <h2 className="font-semibold">Amount Due:</h2>
                                <p className="text-gray-500">Due Date:</p>
                            </div>
                            <div className="space-y-2">
                                <h2 className="font-semibold">{data[0]}</h2>
                                <p className="text-gray-500">{data[1]}</p>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm" >This is a demo payment system. In a real application, you would be redirected to a secure payment gateway.</p>
                        <div className="absolute bottom-5 right-5 flex space-x-3">
                            <button
                                className="btn1 w-18.5 h-9 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                                onClick={handleClick}
                            >Cancel
                            </button>
                            <button
                                className="btn2 w-36 h-9 px-2 border bg-black text-white border-gray-300 rounded-md hover:bg-[#000000de] transition"
                                onClick={meassage}
                            >Process Payment</button>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default PayModal;
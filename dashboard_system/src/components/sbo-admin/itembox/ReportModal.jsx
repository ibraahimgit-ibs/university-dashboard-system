import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import toast from 'react-hot-toast';
import { RxCrossCircled } from 'react-icons/rx';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ReportModal( { showModal, setShowModal } ) {
    const handleClose = () => setShowModal( false );


    const handleSave = () => {
        // Implement save logic
        toast.success( "Report generated successfully!" );
        setShowModal( false );
    }


    return (
        <div>
            <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div
                    className="darkDiv bg-white relative p-6 sm:max-w-lg rounded-lg z-50 w-lg"
                    style={style}
                >
                    <form>
                        <div>
                            <div>
                                <h1 className="font-semibold text-[20px]">Generate Report</h1>
                                <p className="text-gray-400 text-sm">Configure and download academic reports</p>
                            </div>
                            <button
                                onClick={handleClose}
                                type='button'
                                className="text-gray-500 hover:text-gray-600 absolute outline-0 right-4 top-3 transition">
                                <RxCrossCircled className="crosIcon h-5 w-5" />
                            </button>
                        </div>

                        <div>
                            <p className="font-bold mt-3 text-gray-600">Report Type</p>
                            <select className="darkDiv w-full border border-gray-300 rounded-md p-2 mt-1">
                                <option value="academic">Grade Distribution</option>
                                <option value="attendance">Student Performance</option>
                                <option value="grades">Subject Analytics</option>
                                <option value="transcript">Semester Summary</option>
                            </select>
                        </div>
                        <div>
                            <p className="font-bold mt-3 text-gray-600">Format</p>
                            <select className="darkDiv w-full border border-gray-300 rounded-md p-2 mt-1">
                                <option value="PDF">PDF</option>
                                <option value="Excel">Excel</option>
                                <option value="CSV">CSV</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-end mt-5 space-x-3">
                            <button
                                className="btn1 w-18.5 h-9 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                                onClick={handleClose}
                            >Cancel
                            </button>
                            <button
                                className="darkBTN w-36 h-9 px-2 border bg-black text-white border-gray-300 rounded-md hover:bg-[#000000de] transition"
                                onClick={() => {
                                    handleSave();
                                }}
                            >Save Changes</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

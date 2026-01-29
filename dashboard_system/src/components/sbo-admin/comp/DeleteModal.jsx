import Modal from '@mui/material/Modal';
import axios from 'axios';
import toast from 'react-hot-toast';

const DeleteModal = ( { delOpen, setDelOpen, setStudentData, clickedData } ) => {
        const handleClose = () => setDelOpen( false );

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // delete grade
        const handleDeleteGrade = async ( id ) => {
            try {
                const res = await axios.delete( "https://university-dashboard-system.onrender.com/api/student/delete-grade", {
                    data: { id }
                } );
    
                // console.log( res );
    
    
                // ✅ Update UI
                setStudentData( prev => ( {
                    ...prev,
                    grades: prev.grades.filter( g => g.id !== id )
                } ) );
    
                toast.success( "Grade deleted successfully" );
            } catch ( err ) {
                console.error( "Error deleting grade:", err );
                toast.error( "Failed to delete grade" );
            }
        };
        

    return (
        <div>
            <Modal
                open={delOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={style} className='rounded-md bg-white p-2 flex flex-col'>
                    <h1 className='flex items-center justify-center text-gray-600'>Are you sure you want to delete </h1>
                    <p className='flex items-center justify-center font-bold'>({clickedData && clickedData[4]} : {clickedData && clickedData[3]}%)</p>
                    <div className="flex items-center justify-between mt-5">
                        <button
                            className="btn1 w-18.5 h-9 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                            onClick={() => setDelOpen(!delOpen)}
                        >Cancel
                        </button>
                        <button
                            className="btn2 w-36 h-9 px-2 border bg-black text-white border-gray-300 rounded-md hover:bg-[#000000de] transition"
                            onClick={() => {
                                setDelOpen( !delOpen )
                                handleDeleteGrade( clickedData !== null && clickedData[5] );
                            }}
                        >Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DeleteModal;
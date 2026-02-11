import Modal from '@mui/material/Modal';
import { useStudent } from '../../../hooks/useStudent';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { LoadingState, userDataState } from '../../../atom/atom';
import axiosUrl from '../../../hooks/axiosUrl';

const AddGradeModal = () => {
    const [___, setStudentData] = useRecoilState( userDataState );
    const [__, setLoading] = useRecoilState( LoadingState )


    const { axiosDeffaultUrl } = axiosUrl();

    const [formData, setFormData] = useState( {
        student_id: "",
        subject_id: "",
        term_id: "",
        grade: ""
    } );

    const handleChange = ( e ) => {
        setFormData( prev => ( {
            ...prev,
            [e.target.name]: e.target.value
        } ) );
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setIsOpened( !isOpened );
        setLoading( true )

        try {
            // ${ axiosDeffaultUrl }
            await axios.post( `${ axiosDeffaultUrl}/user/add-grades`, formData, { withCredentials: true, } );
            // console.log( "Grade added:", res.data );
            setFormData( { student_id: "", subject_id: "", term_id: "", grade: "" } );

            // Refresh full data so subject/term names are hydrated
            const refreshed = await axios.get( `${ axiosDeffaultUrl}/user/user-data`, { withCredentials: true, headers: { "Cache-Control": "no-cache" } } );
            setStudentData( refreshed.data );

            toast.success( "Successfully Added Grade" )

        } catch ( err ) {
            console.error( "Error adding grade:", err );
        } finally {
            setLoading( false )
        }
    };

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



    const { isOpened, setIsOpened } = useStudent();

    const handleClose = () => setIsOpened( false );


    return (
        <div>
            <Modal
                open={isOpened}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={style} className='bg-white p-4 rounded-md shadow-lg'>
                    <form onSubmit={handleSubmit} className="darkDiv max-w-md mx-auto bg-white rounded-md p-6 space-y-4" >
                        <h2 className="text-2xl font-bold text-gray-700 text-center">Add Grade</h2>

                        <input
                            type="number"
                            name="student_id"
                            value={formData.student_id}
                            onChange={handleChange}
                            placeholder="Student ID"
                            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
                        />

                        <input
                            type="number"
                            name="subject_id"
                            value={formData.subject_id}
                            onChange={handleChange}
                            placeholder="Subject ID"
                            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
                        />

                        <input
                            type="number"
                            name="term_id"
                            value={formData.term_id}
                            onChange={handleChange}
                            placeholder="Term ID"
                            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
                        />

                        <input
                            type="number"
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            placeholder="Grade"
                            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
                        />

                        <button
                            type="submit"
                            className="darkBTN w-full bg-blue-600 text-white py-2 font-bold rounded hover:bg-blue-700 transition"
                        >
                            Save Grade
                        </button>
                    </form>

                </div>
            </Modal>
        </div>
    );
}

export default AddGradeModal;

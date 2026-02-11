import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import axiosUrl from '../../../../hooks/axiosUrl';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { LoadingState, userDataState } from '../../../../atom/atom';
import { toast } from 'react-hot-toast';

const AddStudentModal = ( { open, setOpen } ) => {
    const handleClose = () => setOpen( false );
    const [_, setLoadingCircle] = useRecoilState( LoadingState )
    const [___, setUserData] = useRecoilState( userDataState )
    const [loading, setLoading] = useState( false );

    const { axiosDeffaultUrl } = axiosUrl();    

    // ***useform*****
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    // --------------

    const OnSubmit = async ( data ) => {
        setLoadingCircle( true );
        setLoading( true );
        handleClose();

        try {
            const response = await axios.post( `${ axiosDeffaultUrl }/user/regist-user`, data, { withCredentials: true } )
            toast.success( response.data.message || "Student added successfully" );
            setUserData( prev => ( {
                ...( prev && typeof prev === "object" && !Array.isArray( prev ) ? prev : {} ),
                students: response.data.students ?? []
            } ) );

        } catch ( error ) {
            console.error( error );
        } finally {
            setLoading( false );
            setLoadingCircle( false );
            console.log( data );
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='flex items-center justify-center min-w-full min-h-full'
            >
                <form
                    onSubmit={handleSubmit( OnSubmit )}
                    className="bg-white rounded-md px-10 py-3 w-100 flex flex-col items-center justify-center"
                >
                    <h1 className='font-semibold text-2xl text-shadow-2xs text-shadow-stone-200'>Registration Form</h1>
                    <input
                        type="text"
                        placeholder='first name'
                        className='add_user_form_control'
                        {...register( "f_name", { required: true } )}
                    />
                    {errors.f_name && <span className='errorMessage'>First name is required</span>}
                    <input
                        type="text"
                        placeholder='second name'
                        className='add_user_form_control'
                        {...register( "s_name", { required: true } )}
                    />
                    {errors.s_name && <span className='errorMessage'>Second name is required</span>}
                    <input
                        type="text"
                        placeholder='last name'
                        className='add_user_form_control'
                        {...register( "l_name", { required: true } )}
                    />
                    {errors.l_name && <span className='errorMessage'>Last name is required</span>}
                    <input
                        type="password"
                        placeholder='password'
                        className='add_user_form_control'
                        {...register( "password", { required: true } )}
                    />
                    {errors.password && <span className='errorMessage'>Password is required</span>}
                    <select
                        className='add_user_form_control'
                        {...register( "gender", { required: true } )}>
                        <optgroup label='select gender'>
                            <option value="" >Select Gender</option>
                            <option value="Male" >Male</option>
                            <option value="Female">Female</option>
                        </optgroup>
                    </select>
                    {errors.gender && <span className='errorMessage'>Gender is required</span>}
                    <select
                        className='add_user_form_control'
                        {...register( "studentClass", { required: true } )}>
                        <optgroup label='select class'>
                            <option value="">Select Class</option>
                            <option value="1">Class 1</option>
                            <option value="2">Class 2</option>
                            <option value="3">Class 3</option>
                            <option value="4">Class 4</option>
                        </optgroup>
                    </select>
                    {errors.studentClass && <span className='errorMessage'>Student class is required</span>}
                    <select
                        className='add_user_form_control'
                        {...register( "role", { required: true } )}>
                        <optgroup label='select role'>
                            <option value="" >Select Role</option>
                            <option value="student" >Student</option>
                            <option value="teacher" >Teacher</option>
                            <option value="admin">Admin</option>
                        </optgroup>
                    </select>
                    {errors.role && <span className='errorMessage'>Role is required</span>}

                    <button
                        type="submit"
                        className='darkBTN w-full mt-5 rounded-lg bg-indigo-600 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98]'
                    >
                        {loading ? "Adding Student..." : "Add Student"}
                    </button>
                </form>
            </Modal>
        </div>

    );
};

export default AddStudentModal;

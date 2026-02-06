import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRecoilState } from 'recoil';
import { changePassMOdalState, LoadingState } from './../../../atom/atom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import axiosUrl from './../../../hooks/axiosUrl';
import useStudent from '../../../hooks/useStudent';
import { toast } from 'react-hot-toast';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
};

export default function ChangePassModal() {
    const [openPassModal, setOpenPassModal] = useRecoilState( changePassMOdalState );
    const [__, setLoading] = useRecoilState( LoadingState );

    // ***useform*****
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    // --------------

    const { axiosDeffaultUrl } = axiosUrl();
    const handleClose = () => setOpenPassModal( false );
    const { UserData } = useStudent();

    const { id } = UserData;

    const OnsubMit = async ( data ) => {
        setLoading( true );
        const { password, Confirmpassword } = data;

        if ( password.length < 6 ) return toast.error( "password must be at least 6" );
        if ( password !== Confirmpassword ) return toast.error( "password mismatch" );
        reset();
        handleClose();

        try {

            const response = await axios.put( `${ axiosDeffaultUrl }/user/changePassword`, { newPassword: password, id } )

            toast.success( response?.data?.message )
        } catch ( err ) {
            console.log( "error of changing password", err )
        } finally {
            setLoading( false );
        }
    };

    return (
        <div>
            <Modal
                className="modal"
                open={openPassModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="paymodaldiv rounded-lg border border-gray-300 bg-white">
                    <form onSubmit={handleSubmit( OnsubMit )}>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">New Password</label>
                            <input
                                type="password"
                                placeholder="Enter New Password"
                                className={`w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${ errors.username && "border-red-500 ring-2 ring-red-300" }`}
                                {...register( 'password', { required: true } )}
                            />
                            {errors.password && ( <p className="p-1 text-[13px] font-semibold text-orange-500">
                                Please enter new password.
                            </p>
                            )}
                        </div>
                        <div>
                            <label className="mb-2 mt-4 block text-sm font-semibold text-slate-700">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Enter New Confirm Password"
                                className={`w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${ errors.username && "border-red-500 ring-2 ring-red-300" }`}
                                {...register( 'Confirmpassword', { required: true } )}
                            />
                            {errors.password && ( <p className="p-1 text-[13px] font-semibold text-orange-500">
                                Please confirm password.
                            </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-3 rounded-lg bg-indigo-600 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98]"
                        >
                            Change
                        </button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

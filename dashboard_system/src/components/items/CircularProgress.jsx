import CircularProgress from '@mui/material/CircularProgress';

export default function CircularUnderLoad() {
    return (
        <div className='fixed top-0 bg-[#00000025] z-100 flex items-center justify-center min-w-full min-h-full'>
            <CircularProgress disableShrink />
        </div>
    );
}

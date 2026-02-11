import ReportCard from "../itembox/ReportCard";
import { TrendingUp, Users, BookOpen, FileText } from 'lucide-react';
import ReportModal from './../itembox/ReportModal';
import { useState } from 'react';


const Reports_c = () => {
    const [showModal, setShowModal] = useState( false );

    const handleClick = () => {
        setShowModal( !showModal );
    }

    return (
        <div className="darkDiv w-full border border-gray-300 rounded-md p-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Academic Reports</h1>
                    <p className="mb-4 text-[18px] text-gray-500">Generate performance and statistical reports</p>
                </div>
                <button
                    onClick={handleClick}
                    className="flex items-center justify-between gap-2 py-2 px-4 rounded-md border border-gray-300 font-semibold"
                >
                    <FileText />
                    Generate Report
                </button>
            </div>

            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
                <ReportCard clicked={handleClick} title="Grade Distribution Report" description="Analysis of grade patterns" icon={<TrendingUp />} />
                <ReportCard clicked={handleClick} title="Student Performance Report" description="Individual performance metrics" icon={<Users />} />
                <ReportCard clicked={handleClick} title="Subject Analytics" description="Course-wise performance data" icon={<BookOpen />} />
                <ReportCard clicked={handleClick} title="Semester Summary" description="Complete semester overview" icon={<FileText />} />
            </div>

            <ReportModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}

export default Reports_c;
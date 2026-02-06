import { useRecoilState } from "recoil";
import { useStudent } from "../../../hooks/useStudent";
import ChangePassModal from "./ChangePassModal";
import { changePassMOdalState } from "../../../atom/atom";

const Profile = () => {
    const [_, setOpenPassModal] = useRecoilState( changePassMOdalState );

    const { student } = useStudent();

    return (
        <div className="max-w-full min-w-full">
            <div className="space-y-3">
                <h1 className="text-2xl font-semibold">Student Profile</h1>
                <p className="text-gray-500">Manage your personal information and account settings.</p>
            </div>

            <div className="mt-6 w-full grid md:grid-cols-1 sm:grid-cols-1 gap-7 lg:grid-cols-[1fr_1fr]">
                <div className="w-full h-108.75  border border-gray-300 rounded-lg p-5">
                    <div>
                        <h1 className="font-semibold">Personal Information</h1>
                        <p className="text-gray-500">Your basic academic and contact details</p>
                    </div>
                    <div className="text-sm grid gap-2 my-5">
                        <h1 className="font-semibold">Full Name</h1>
                        <p className="text-gray-500">{student?.f_name} {student?.s_name} {student?.l_name}</p>
                    </div>
                    <div className="text-sm grid gap-2 mb-5">
                        <h1 className="font-semibold">Student ID</h1>
                        <p className="text-gray-500">{student?.id}</p>
                    </div>
                    <div className="text-sm grid gap-2 mb-5">
                        <h1 className="font-semibold">Gender</h1>
                        <p className="text-gray-500">{student?.gender}</p>
                    </div>
                    <div className="grid gap-5">
                        <label className="font-semibold text-sm">Major</label>
                        <p className="font-semibold text-sm">Academic Year</p>
                    </div>

                    <button className="bg-black my-4 inline-flex items-center justify-center whi py-1 px-2 text-white rounded-md font-bold">Edit Profile</button>
                </div>

                <div className="w-full h-108.75 border border-gray-300 rounded-lg p-5">
                    <div>
                        <h1>Academic Summary</h1>
                        <p className="text-gray-500">Your current academic standing</p>
                    </div>
                    <div className="text-sm grid gap-2 my-5">
                        <h1 className="font-semibold">Overall GPA</h1>
                        <p className="text-gray-500">3.85</p>
                    </div>
                    <div className="text-sm grid gap-2 mb-5">
                        <h1 className="font-semibold">Credits Completed</h1>
                        <p className="text-gray-500">18 / 120</p>
                    </div>
                    <div className="text-sm grid gap-2 mb-5">
                        <h1 className="font-semibold">Expected Graduation</h1>
                        <p className="text-gray-500">May 2025</p>
                    </div>
                    <label className="font-semibold text-sm mb-5">Academic Status</label>
                    <p className="mt-5 font-semibold text-sm">Academic Year</p>

                    <button className="bg-black py-1 px-2 my-2 text-[12px] text-white rounded-xl font-semibold">Good Standing</button>
                </div>
            </div>

            <div className="p-5 w-full border border-gray-300 rounded-lg mt-7">
                <div>
                    <h1 className="font-semibold">Quick Actions</h1>
                    <p className="text-gray-500">Common profile-related tasks</p>
                </div>
                <div className="w-full mt-5 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
                    <div className="Q_actions">
                        <button className="w-full h-full" onClick={() => setOpenPassModal( true )}>Change Password</button>
                    </div>
                    <div className="Q_actions">
                        <button>Emergence Contacts</button>
                    </div>
                    <div className="Q_actions">
                        <button>Request Transcript</button>
                    </div>
                    <div className="Q_actions">
                        <button>Contact Advisor</button>
                    </div>
                </div>
            </div>


            <ChangePassModal />
        </div >
    )
}

export default Profile;
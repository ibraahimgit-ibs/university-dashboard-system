import { MdOutlineFileDownload, MdOutlineFileUpload } from "react-icons/md";
import Selection from "./Selection";
import { userDataState } from "../../../atom/atom";
import { useRecoilState } from "recoil";

const GradeEntry_a = () => {
  const [userData, __] = useRecoilState( userDataState );  
  

  return (
    <div className="border border-gray-300 rounded-xl h-full w-full p-3 md:px-6 sm:px-3 flex flex-col gap-5">
      <div className="flex items-center justify-between md:text-[16px] text-[10px]">
        <div className="md:text-[16px] text-[13px]">
          <h1 className="font-semibold">Grade Entry System</h1>
          <p className="text-gray-500">Enter and manage student grades</p>
        </div>
        <div className="flex space-x-3">
          <div className="up_ex_divs darkBTN"><MdOutlineFileUpload /> Bulk Upload</div>
          <div className="up_ex_divs darkBTN"><MdOutlineFileDownload /> Export</div>
        </div>
      </div>
      <div>
        <Selection students={userData.students} />
      </div>
    </div>
  )
}

export default GradeEntry_a;
import { useRecoilState } from "recoil";
import { userDataState } from "../../../atom/atom";
import { useCallback, useEffect, useState } from "react";


const Students_b = () => {
  const [userData, setUserData] = useRecoilState( userDataState );
  const [search, setSearch] = useState( "" );

  const { students } = userData;

  const handleSearch = useCallback( () => {
    const trimmed = search.trim();
    if ( trimmed.length === 0 ) {
      setUserData( prev => ( { ...prev, selectedStudent: null } ) );
      return;
    }

    const lowered = trimmed.toLowerCase();
    const searchedStudent = students?.find( st => {
      const idMatch = String( st?.id ?? "" ).includes( trimmed );
      const nameMatch = String( st?.f_name ?? "" ).toLowerCase().includes( lowered );
      return idMatch || nameMatch;
    } );

    setUserData( prev => ( { ...prev, selectedStudent: searchedStudent ?? null } ) );
  }, [students, search, setUserData] );

  useEffect( () => {
    handleSearch();
  }, [handleSearch, search] );



  const filteredStudents = Array.isArray( students )
    ? students.filter( st => {
      const trimmed = search.trim();
      if ( trimmed.length === 0 ) return true;
      const lowered = trimmed.toLowerCase();
      const idMatch = String( st?.id ?? "" ).includes( trimmed );
      const nameMatch = String( st?.f_name ?? "" ).toLowerCase().includes( lowered );
      return idMatch || nameMatch;
    } )
    : [];

  return (
    <div>
      <div>
        <div>
          <h2 className="font-semibold">Student Directory</h2>
          <p className="text-gray-500">View and manage student information</p>
        </div>

        <div className="flex items-center w-full border border-white rounded-lg bg-[#e8e6e6] px-2 py-1 my-3 mt-6 focus-within:border-[#00000069] focus-within:ring-3 focus-within:ring-[#d6d1d1] transition">
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>

          {/* Input */}
          <input
            type="text"
            value={search}
            onChange={( e ) => setSearch( e.target.value )}
            placeholder="Search students by name or ID..."
            className="ml-2 w-full bg-transparent placeholder-gray-500 outline-none"
          />
        </div>


        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Grade</th>
                <th>GPA</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {filteredStudents.map( ( st, i ) => (
                <tbody key={i}>
                  <tr>
                    <td className="font-semibold">{st?.id}</td>
                    <td className="text-[16px]">{st?.f_name + " " + st?.s_name + " " + st?.l_name}</td>
                    <td>3</td>
                    <td >3.35</td>
                    <td><span className="paid rounded-md font-semibold text-[12px]">Active</span></td>
                    <td>
                      <button className="font-semibold p-1 px-2 rounded-md hover:bg-gray-200 transition duration-300">View Profile</button>
                    </td>
                  </tr>
                </tbody>
              ) )}
            {search.trim().length > 0 && filteredStudents.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">
                    No result for searched.
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>

    </div>
  )
}

export default Students_b;

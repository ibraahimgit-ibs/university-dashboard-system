

const Students_b = ({ students }) => {


  return (
    <div>
      <div className="border border-gray-300 rounded-xl p-5 my-6">
        <div>
          <h2 className="font-semibold">Student Directory</h2>
          <p className="text-gray-500">View and manage student information</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full mt-6 text-sm">
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
            <tbody>
              {Array.isArray(students) && students.map((st, i) => (
                <>
                  <tr key={i}>
                    <td className="font-semibold">{st?.id}</td>
                    <td>{st?.f_name}</td>
                    <td>3</td>
                    <td >3.35</td>
                    <td><span className="paid rounded-md font-semibold text-[12px]">Active</span></td>
                    <td>
                      <button className="font-semibold p-1 px-2 rounded-md hover:bg-gray-200 transition duration-300">View Profile</button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Students_b;
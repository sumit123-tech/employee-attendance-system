function DepartmentTable({
  departments,
  editDepartment,
  openDeleteModal,
}) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-blue-200">

      <table className="table">

        <thead className="bg-sky-100">
          <tr className="text-black">
            <th>ID</th>
            <th>Department</th>
            <th>Created</th>

            {user?.role === "ADMIN" && (
              <th className="text-center">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>

          {departments.length > 0 ? (

            departments.map((dept) => (

              <tr key={dept.id}>

                <td className="text-black">
                  {dept.id}
                </td>

                <td>

                  <div className="flex items-center gap-3">

                    <div className="avatar placeholder">

                      <div className="bg-primary text-primary-content rounded-full w-12">

                        <span className="text-lg font-bold">
                          {dept.name.charAt(0).toUpperCase()}
                        </span>

                      </div>

                    </div>

                    <div>

                      <div className="font-bold text-black">
                        {dept.name}
                      </div>

                      <div className="text-sm text-gray-600">
                        Department
                      </div>

                    </div>

                  </div>

                </td>

                <td className="text-black">
                  {new Date(dept.createdAt).toLocaleDateString()}
                </td>

                {user?.role === "ADMIN" && (
                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => editDepartment(dept)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => openDeleteModal(dept)}
                      >
                        Delete
                      </button>

                    </div>

                  </td>
                )}

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan={user?.role === "ADMIN" ? 4 : 3}
                className="text-center py-10 text-black"
              >
                No Departments Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default DepartmentTable;
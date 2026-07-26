function EmployeeTable({
  employees,
  editEmployee,
  openDeleteModal,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
      <table className="table table-zebra">

        <thead className="bg-base-200 text-black">
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Phone</th>
            <th>Designation</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {employees.length > 0 ? (

            employees.map((emp) => (

              <tr key={emp.id}>

                <td>{emp.id}</td>

                <td>
                  <div className="flex items-center gap-3">

                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-full w-12">
                        <span className="text-lg font-bold">
                          {emp.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="font-bold text-black">
                        {emp.name}
                      </div>

                      <div className="text-sm text-gray-500">
                        {emp.email}
                      </div>
                    </div>

                  </div>
                </td>

                <td>{emp.phone || "-"}</td>

                <td>{emp.designation || "-"}</td>

                <td>
                  <span
                    className={`badge ${
                      emp.role === "ADMIN"
                        ? "badge-error"
                        : "badge-success"
                    }`}
                  >
                    {emp.role}
                  </span>
                </td>

                <td>
                  <div className="flex gap-2">

                    <button
                      onClick={() => editEmployee(emp)}
                      className="btn btn-sm btn-info"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openDeleteModal(emp)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td
                colSpan="6"
                className="text-center py-10 text-gray-500"
              >
                No Employees Found
              </td>
            </tr>

          )}

        </tbody>

      </table>
    </div>
  );
}

export default EmployeeTable;
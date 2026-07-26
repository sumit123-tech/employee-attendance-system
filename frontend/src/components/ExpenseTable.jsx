function ExpenseTable({
  expenses,
  user,
  approveExpense,
  rejectExpense,
  setPreviewImage,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border">

      <table className="table">

        <thead className="bg-sky-100">

          <tr className="text-black">

            <th>ID</th>

            {user?.role === "ADMIN" && <th>Employee</th>}

            <th>Category</th>

            <th>Amount</th>

            <th>Date</th>

            <th>Status</th>

            <th>Receipt</th>

            {user?.role === "ADMIN" && <th>Action</th>}

          </tr>

        </thead>

        <tbody>

          {expenses.length > 0 ? (

            expenses.map((expense) => (

              <tr
                key={expense.id}
                className="text-black hover"
              >

                <td>{expense.id}</td>

                {user?.role === "ADMIN" && (
                  <td>

                    <div className="flex items-center gap-3">

                      <div className="avatar placeholder">

                        <div className="bg-blue-600 text-white rounded-full w-10">

                          <span>
                            {expense.user?.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </span>

                        </div>

                      </div>

                      <div>

                        <div className="font-bold">
                          {expense.user?.name}
                        </div>

                        <div className="text-sm text-gray-500">
                          {expense.user?.email}
                        </div>

                      </div>

                    </div>

                  </td>
                )}

                <td>{expense.category}</td>

                <td className="font-bold text-green-600">
                  ₹ {expense.amount}
                </td>

                <td>
                  {new Date(
                    expense.expenseDate
                  ).toLocaleDateString()}
                </td>

                <td>

                  <span
                    className={`badge font-semibold ${
                      expense.status === "APPROVED"
                        ? "badge-success"
                        : expense.status === "REJECTED"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {expense.status}
                  </span>

                </td>

                <td>

                  {expense.receipt ? (

                    <button
                      onClick={() =>
                        setPreviewImage(expense.receipt)
                      }
                      className="btn btn-info btn-xs"
                    >
                      View
                    </button>

                  ) : (

                    <span className="text-gray-500">
                      No Receipt
                    </span>

                  )}

                </td>

                {user?.role === "ADMIN" && (
                  <td>

                    {expense.status === "PENDING" ? (

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            approveExpense(expense.id)
                          }
                          className="btn btn-success btn-sm"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            rejectExpense(expense.id)
                          }
                          className="btn btn-error btn-sm"
                        >
                          Reject
                        </button>

                      </div>

                    ) : (
                      "-"
                    )}

                  </td>
                )}

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan={user?.role === "ADMIN" ? 8 : 6}
                className="text-center py-10 text-black"
              >
                No Expense Records Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default ExpenseTable;
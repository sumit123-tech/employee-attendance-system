import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import DeleteModal from "../components/DeleteModal";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const [approveModal, setApproveModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const openApproveModal = (expense) => {
    setSelectedExpense(expense);
    setApproveModal(true);
  };

  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    expenseDate: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const url =
        user?.role === "ADMIN"
          ? "/expenses"
          : "/expenses/my";

      const res = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(res.data.expenses || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch expenses"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitExpense = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post("/expenses", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Expense Submitted Successfully!");

      setForm({
        amount: "",
        category: "",
        description: "",
        expenseDate: "",
      });

      fetchExpenses();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Submission Failed"
      );
    }
  };

  const approveExpense = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/expenses/${selectedExpense.id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Expense Approved");

      setApproveModal(false);
      setSelectedExpense(null);

      fetchExpenses();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Approval Failed"
      );
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <LoadingSpinner />
      </AdminLayout>
    );
  }

  

  return (

   
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-black">
          {user?.role === "ADMIN"
            ? "Expense Management"
            : "My Expenses"}
        </h1>

        {user?.role !== "ADMIN" && (
          <form
            onSubmit={submitExpense}
            className="bg-white p-6 rounded-xl shadow border border-gray-200 grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              required
              className="input input-bordered w-full bg-white text-black placeholder:text-gray-500"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              required
              className="input input-bordered w-full bg-white text-black placeholder:text-gray-500"
            />

            <input
              type="date"
              name="expenseDate"
              value={form.expenseDate}
              onChange={handleChange}
              required
              className="input input-bordered w-full bg-white text-black"
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-black placeholder:text-gray-500"
            />

            <div className="md:col-span-2 lg:col-span-4">
              <button
                className="btn btn-primary"
                type="submit"
              >
                Submit Expense
              </button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
          <table className="table">
            <thead className="bg-sky-100 text-black">
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                {user?.role === "ADMIN" && (
                <th>Action</th>
                )}
              </tr>
            </thead>

            <tbody>
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="text-black"
                  >
                    <td>{expense.id}</td>

                    <td>{expense.user?.name}</td>

                    <td>₹ {expense.amount}</td>

                    <td>{expense.category}</td>

                    <td>
                      {new Date(
                        expense.expenseDate
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className={`badge ${
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

                    {user?.role === "ADMIN" && (
                      <td>
                        {expense.status === "PENDING" ? (
                          <button
                            onClick={() => openApproveModal(expense)}
                            className="btn btn-success btn-sm"
                          >
                            Approve
                          </button>
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
                    colSpan={user?.role === "ADMIN" ? 7 : 6}
                    className="text-center py-8 text-black"
                  >
                    No Expenses Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        isOpen={approveModal}
        employeeName={
          selectedExpense?.user?.name || "this expense"
        }
        onClose={() => {
          setApproveModal(false);
          setSelectedExpense(null);
        }}
        onConfirm={approveExpense}
      />
      
    </AdminLayout>
  );
}

export default Expenses;
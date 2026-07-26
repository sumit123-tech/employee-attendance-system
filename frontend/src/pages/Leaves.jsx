import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import DeleteModal from "../components/DeleteModal";

function Leaves() {
  const user = JSON.parse(localStorage.getItem("user"));


  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  const [selectedLeave, setSelectedLeave] = useState(null);

  const openApproveModal = (leave) => {
    setSelectedLeave(leave);
    setApproveModal(true);
  };

  const openRejectModal = (leave) => {
  setSelectedLeave(leave);
  setRejectModal(true);
};

  const [form, setForm] = useState({
    reason: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const url =
        user?.role === "ADMIN"
          ? "/leaves"
          : "/leaves/my";

      const res = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLeaves(res.data.leaves || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch leaves"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const applyLeave = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post("/leaves", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Leave Applied Successfully!");

      setForm({
        reason: "",
        startDate: "",
        endDate: "",
      });

      fetchLeaves();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to apply leave"
      );
    }
  };

  const approveLeave = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/leaves/${selectedLeave.id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );  

      toast.success("Leave Approved Successfully!");

      setApproveModal(false);
      setSelectedLeave(null);

      fetchLeaves();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Approval Failed"
      );
    }
  };

  const rejectLeave = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/leaves/${selectedLeave.id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Leave Rejected Successfully!");

      setRejectModal(false);
      setSelectedLeave(null);

      fetchLeaves();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Reject Failed"
      );
    }
  };

  const filteredLeaves = leaves.filter((leave) => {
    const keyword = search.toLowerCase();

    return (
      leave.user?.name
        ?.toLowerCase()
        ?.includes(keyword) ||

      leave.reason
        ?.toLowerCase()
        ?.includes(keyword) ||

      leave.status
        ?.toLowerCase()
        ?.includes(keyword)
    );
  });

  if (loading) {
    return (
      <AdminLayout>
        <LoadingSpinner />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">

        <h1 className="text-3xl font-bold text-black">
          {user?.role === "ADMIN"
            ? "Leave Management"
            : "My Leave Requests"}
        </h1>

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="stat bg-white rounded-xl shadow border">

            <div className="stat-title text-black">
              Total Leaves
            </div>

            <div className="stat-value text-primary">
              {leaves.length}
            </div>

          </div>

          <div className="stat bg-white rounded-xl shadow border">

            <div className="stat-title text-black">
              Pending
            </div>

            <div className="stat-value text-warning">
              {
                leaves.filter(
                  (leave) => leave.status === "PENDING"
                ).length
              }
            </div>

          </div>

          <div className="stat bg-white rounded-xl shadow border">

            <div className="stat-title text-black">
              Approved
            </div>

            <div className="stat-value text-success">
              {
                leaves.filter(
                  (leave) => leave.status === "APPROVED"
                ).length
              }
            </div>

          </div>

        </div>

        {/* Employee Leave Form */}

        {user?.role !== "ADMIN" && (

          <div className="card bg-white shadow-xl border">

            <div className="card-body">

              <form
                onSubmit={applyLeave}
                className="grid md:grid-cols-4 gap-4"
              >

                <input
                  type="text"
                  name="reason"
                  placeholder="Reason"
                  value={form.reason}
                  onChange={handleChange}
                  required
                  className="input input-bordered bg-white text-black placeholder:text-gray-500"
                />

                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                  className="input input-bordered bg-white text-black"
                />

                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  required
                  className="input input-bordered bg-white text-black"
                />

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Apply Leave
                </button>

              </form>

            </div>

          </div>

        )}

        {/* Admin Search */}

        {user?.role === "ADMIN" && (

          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full bg-white text-black"
          />

        )}

        {/* Leave Table */}

        <div className="card bg-white shadow-xl border">

          <div className="card-body">

            <div className="overflow-x-auto">

              <table className="table">

                <thead className="bg-sky-100 text-black">

                  <tr className="text-black">

                    {user?.role === "ADMIN" && <th>Employee</th>}

                    <th>Reason</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>

                    {user?.role === "ADMIN" && <th>Action</th>}

                  </tr>

                </thead>

                <tbody>

                  {filteredLeaves.length > 0 ? (

                    filteredLeaves.map((leave) => (

                      <tr
                        key={leave.id}
                        className="text-black"
                      >

                        {user?.role === "ADMIN" && (

                          <td className="font-semibold">
                            {leave.user?.name}
                          </td>

                        )}

                        <td>{leave.reason}</td>

                        <td>
                          {new Date(
                            leave.startDate
                          ).toLocaleDateString()}
                        </td>

                        <td>
                          {new Date(
                            leave.endDate
                          ).toLocaleDateString()}
                        </td>

                        <td>

                          <span
                            className={`badge ${
                              leave.status === "APPROVED"
                                ? "badge-success"
                                : leave.status === "REJECTED"
                                ? "badge-error"
                                : "badge-warning"
                            }`}
                          >
                            {leave.status}
                          </span>

                        </td>

                        {user?.role === "ADMIN" && (
                          <td>
                            {leave.status === "PENDING" ? (
                              <div className="flex gap-2">

                                <button
                                  onClick={() => openApproveModal(leave)}
                                  className="btn btn-success btn-sm"
                                >
                                  Approve
                                </button>

                                <button
                                  onClick={() => openRejectModal(leave)}
                                  className="btn btn-error btn-sm"
                                >
                                  Reject
                                </button>

                              </div>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                        )}

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan={
                          user?.role === "ADMIN"
                            ? 6
                            : 4
                        }
                        className="text-center py-10 text-black"
                      >
                        No leave requests found.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

      <DeleteModal
        isOpen={approveModal}
        employeeName={
          selectedLeave?.user?.name || "this leave request"
        }
        onClose={() => {
          setApproveModal(false);
          setSelectedLeave(null);
        }}
        onConfirm={approveLeave}
      />

      <DeleteModal
        isOpen={rejectModal}
        employeeName={
          selectedLeave?.user?.name || "this leave request"
        }
        onClose={() => {
          setRejectModal(false);
          setSelectedLeave(null);
        }}
        onConfirm={rejectLeave}
      />
    </AdminLayout>
  );
}

export default Leaves;
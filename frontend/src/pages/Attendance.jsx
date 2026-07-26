import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";


function Attendance() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);


  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const url =
        user?.role === "ADMIN"
          ? "/attendance"
          : "/attendance/my-attendance";

      const res = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAttendance(res.data.attendance || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch attendance"
      );
    } finally {
      setLoading(false);
    }
  };

  const checkIn = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/attendance/check-in",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Checked In Successfully!");
      fetchAttendance();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Check-in Failed"
      );
    }
  };

  const checkOut = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/attendance/check-out",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Checked Out Successfully!");
      fetchAttendance();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Check-out Failed"
      );
    }
  };

  const filteredAttendance = attendance.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.user?.name
        ?.toLowerCase()
        ?.includes(keyword) ||

      item.user?.email
        ?.toLowerCase()
        ?.includes(keyword) ||

      item.status
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
            ? "Attendance Management"
            : "My Attendance"}
        </h1>

        {/* Summary */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="stat bg-white rounded-xl shadow border">

            <div className="stat-title text-black">
              Total Records
            </div>

            <div className="stat-value text-primary">
              {attendance.length}
            </div>

          </div>

          <div className="stat bg-white rounded-xl shadow border">

            <div className="stat-title text-black">
              Present
            </div>

            <div className="stat-value text-success">
              {
                attendance.filter(
                  (item) => item.status === "PRESENT"
                ).length
              }
            </div>

          </div>

          <div className="stat bg-white rounded-xl shadow border">

            <div className="stat-title text-black">
              Checked Out
            </div>

            <div className="stat-value text-warning">
              {
                attendance.filter(
                  (item) => item.checkOut
                ).length
              }
            </div>

          </div>

        </div>

        {/* Check In / Out */}

        {user?.role !== "ADMIN" && (
          <div className="flex gap-4">

            <button
              onClick={checkIn}
              className="btn btn-success"
            >
              Check In
            </button>

            <button
              onClick={checkOut}
              className="btn btn-error"
            >
              Check Out
            </button>

          </div>
        )}

        {/* Search only for Admin */}

        {user?.role === "ADMIN" && (

          <div className="card bg-white shadow border">

            <div className="card-body">

              <input
                type="text"
                placeholder="Search by employee name, email or status..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered bg-white text-black"
              />

            </div>

          </div>

        )}

        {/* Attendance Table */}

        <div className="card bg-white shadow-xl border">

          <div className="card-body">

            <div className="overflow-x-auto">

              <table className="table">

                <thead className="bg-sky-100">

                  <tr className="text-black">

                    <th>ID</th>

                    {user?.role === "ADMIN" && (
                      <>
                        <th>Employee</th>
                        <th>Email</th>
                      </>
                    )}

                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredAttendance.length > 0 ? (

                    filteredAttendance.map((item) => (

                      <tr
                        key={item.id}
                        className="text-black"
                      >

                        <td>{item.id}</td>

                        {user?.role === "ADMIN" && (
                          <>
                            <td className="font-semibold">
                              {item.user?.name}
                            </td>

                            <td>
                              {item.user?.email}
                            </td>
                          </>
                        )}

                        <td>
                          {item.checkIn
                            ? new Date(item.checkIn).toLocaleString()
                            : "-"}
                        </td>

                        <td>
                          {item.checkOut
                            ? new Date(item.checkOut).toLocaleString()
                            : "-"}
                        </td>

                        <td>

                          <span
                            className={`badge ${
                              item.status === "PRESENT"
                                ? "badge-success"
                                : item.status === "ABSENT"
                                ? "badge-error"
                                : "badge-warning"
                            }`}
                          >
                            {item.status}
                          </span>

                        </td>

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
                        No attendance records available.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

export default Attendance;
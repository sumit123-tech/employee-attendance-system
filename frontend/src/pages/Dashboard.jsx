import { useEffect, useState } from "react";
import {
  Users,
  Building2,
  CalendarCheck,
  FileText,
} from "lucide-react";

import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

import AdminLayout from "../layouts/AdminLayout";
import api from "../api/axios";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    pendingLeaves: 0,
    totalAttendance: 0,
  });

  

  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchDashboard();
  }, []);

  

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const url =
        user?.role === "ADMIN"
          ? "/dashboard"
          : "/dashboard/employee";

      const res = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboard(res.data.dashboard);
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  const cards =
    user?.role === "ADMIN"
      ? [
          {
            title: "Employees",
            value: dashboard.totalEmployees,
            icon: <Users size={36} />,
            color: "bg-blue-600",
          },
          {
            title: "Departments",
            value: dashboard.totalDepartments,
            icon: <Building2 size={36} />,
            color: "bg-green-600",
          },
          {
            title: "Attendance",
            value: dashboard.totalAttendance,
            icon: <CalendarCheck size={36} />,
            color: "bg-orange-500",
          },
          {
            title: "Pending Leaves",
            value: dashboard.pendingLeaves,
            icon: <FileText size={36} />,
            color: "bg-red-600",
          },
        ]
      : [
          {
            title: "My Attendance",
            value: dashboard.totalAttendance,
            icon: <CalendarCheck size={36} />,
            color: "bg-orange-500",
          },
          {
            title: "My Pending Leaves",
            value: dashboard.pendingLeaves,
            icon: <FileText size={36} />,
            color: "bg-red-600",
          },
        ];

  if (loading) {
  return (
    <AdminLayout>
      <LoadingSpinner />
    </AdminLayout>
  );
 }

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h1>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className="card bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="card-body flex-row items-center justify-between">

              <div>
                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold text-gray-800 mt-2">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.color} rounded-full p-4 text-white`}
              >
                {card.icon}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Welcome */}

      <div className="card bg-base-100 shadow-xl mt-10">

        <div className="card-body">

          <h2 className="card-title text-3xl text-blue-800">
            Welcome 👋
          </h2>

          <p className="text-white-600 leading-7">
            {user?.role === "ADMIN"
              ? "Manage employees, departments, attendance records and leave requests from one dashboard."
              : "Track your attendance, leave requests and expenses from your personal dashboard."}
          </p>

          <div className="divider"></div>

          {user?.role === "ADMIN" && (

            <div className="stats stats-vertical lg:stats-horizontal shadow w-full">

              <div className="stat">
                <div className="stat-title">
                  Employees
                </div>

                <div className="stat-value text-primary">
                  {dashboard.totalEmployees}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">
                  Departments
                </div>

                <div className="stat-value text-success">
                  {dashboard.totalDepartments}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">
                  Attendance
                </div>

                <div className="stat-value text-warning">
                  {dashboard.totalAttendance}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">
                  Pending Leaves
                </div>

                <div className="stat-value text-error">
                  {dashboard.pendingLeaves}
                </div>
              </div>

            </div>

          )}

        </div>

      </div>

      {/* Quick Actions */}

      {user?.role === "ADMIN" && (
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="card bg-primary text-primary-content shadow-xl hover:scale-105 transition duration-300 cursor-pointer">
            <div className="card-body">
              <h2 className="card-title">
                Employee Management
              </h2>

              <p>
                Add, update and manage employee records.
              </p>
            </div>
          </div>

          <div className="card bg-success text-white shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                Attendance
              </h2>

              <p>
                Track daily attendance and check-ins.
              </p>
            </div>
          </div>

          <div className="card bg-secondary text-white shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                Leave Requests
              </h2>

              <p>
                Review and approve employee leave requests.
              </p>
            </div>
          </div>

        </div>
      )}

    

      {user?.role !== "ADMIN" && (
        <div className="card bg-white shadow-xl mt-8">
          <div className="card-body">
            <h2 className="card-title text-2xl text-blue-700">
              My Dashboard
            </h2>

            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>✔ Check In / Check Out</li>
              <li>✔ Apply Leave</li>
              <li>✔ Submit Expense</li>
              <li>✔ View Attendance</li>
              <li>✔ Track Leave Status</li>
            </ul>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}

export default Dashboard;
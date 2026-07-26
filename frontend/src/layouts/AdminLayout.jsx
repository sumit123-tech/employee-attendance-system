import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  FileText,
  Receipt,
  User,
  Settings,
  LogOut,
  CircleUserRound,
} from "lucide-react";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Employees",
      path: "/employees",
      icon: <Users size={20} />,
    },
    {
      name: "Departments",
      path: "/departments",
      icon: <Building2 size={20} />,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: <CalendarCheck size={20} />,
    },
    {
      name: "Leaves",
      path: "/leaves",
      icon: <FileText size={20} />,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: <Receipt size={20} />,
    },
  ];

  const employeeMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: <CalendarCheck size={20} />,
    },
    {
      name: "Leaves",
      path: "/leaves",
      icon: <FileText size={20} />,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: <Receipt size={20} />,
    },
  ];

  const menu =
    user?.role === "ADMIN"
      ? adminMenu
      : employeeMenu;

  const bottomMenu = [
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={20} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">

        {/* Logo */}
        <div className="text-center py-6 border-b border-slate-700">

          <h1 className="text-3xl font-bold tracking-wide">
            EMS
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Employee Management System
          </p>

        </div>

        {/* Menu */}
        <nav className="flex-1 mt-6 px-3">

          {menu.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition ${
                location.pathname === item.path
                  ? "bg-blue-600 shadow-lg"
                  : "hover:bg-slate-800"
              }`}
            >
              {item.icon}

              <span className="font-medium">
                {item.name}
              </span>

            </Link>

          ))}

        </nav>

        {/* Bottom */}
        <div className="border-t border-slate-700 p-4">

          <div className="bg-slate-800 rounded-xl p-4 mb-5">

            <div className="flex items-center gap-3">

              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center">

                <span className="text-xl font-bold">

                  {user?.name?.charAt(0)?.toUpperCase()}

                </span>

              </div>

              <div>

                <h3 className="font-bold">
                  {user?.name}
                </h3>

                <p className="text-xs text-gray-400">
                  {user?.role}
                </p>

              </div>

            </div>

          </div>

          {bottomMenu.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition ${
                location.pathname === item.path
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              {item.icon}

              <span>{item.name}</span>

            </Link>

          ))}

          <button
            onClick={logout}
            className="mt-5 flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      {/* Main */}
      <div className="flex-1">

        <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">

          <h2 className="text-2xl font-bold text-black">
            Employee Management System
          </h2>

          <div className="flex items-center gap-3">

            <CircleUserRound
              size={38}
              className="text-blue-600"
            />

            <div>

              <p className="text-sm text-gray-500">
                Welcome Back
              </p>

              <h3 className="font-semibold text-black">
                {user?.name}
              </h3>

            </div>

          </div>

        </header>

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;
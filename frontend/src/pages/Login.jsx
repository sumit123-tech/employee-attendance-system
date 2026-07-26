import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import api from "../api/axios";
import loginImage from "../assets/login.svg";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-100">

      {/* Left Side */}

      <div className="flex items-center justify-center px-8 py-10 bg-white text-black">

        <div className="w-full max-w-md">

          <h1 className="text-4xl font-bold text-black mb-2">
            Welcome Back 👋
          </h1>

          <p className="text-gray-700 mb-10">
            Sign in to Employee Attendance System
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >

            {/* Email */}

            <div>

              <label className="block mb-2 font-semibold text-black">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={20}
                  className="absolute left-3 top-3.5 text-gray-600"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-black placeholder:text-gray-500 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="block mb-2 font-semibold text-black">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={20}
                  className="absolute left-3 top-3.5 text-gray-600"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-12 text-black placeholder:text-gray-500 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-600 hover:text-black"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

        </div>

      </div>

      {/* Right Side */}

      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">

        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-4/5 max-w-xl"
        />

      </div>

    </div>
  );
}

export default Login;
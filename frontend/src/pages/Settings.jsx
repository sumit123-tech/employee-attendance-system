import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { Lock, Save } from "lucide-react";
import toast from "react-hot-toast";

function Settings() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success(
      "Backend API not connected yet. We'll implement it next."
    );

    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <AdminLayout>

      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-black mb-8">
          Settings
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lock
              size={30}
              className="text-blue-600"
            />

            <h2 className="text-2xl font-bold text-black">
              Change Password
            </h2>

          </div>

          <form
            onSubmit={changePassword}
            className="space-y-6"
          >

            <div>

              <label className="block mb-2 font-semibold text-black">
                Current Password
              </label>

              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                required
                className="input input-bordered w-full text-White"
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold text-black">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                required
                className="input input-bordered w-full text-White"
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold text-black">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="input input-bordered w-full text-White"
              />

            </div>

            <button
              className="btn btn-primary gap-2"
            >

              <Save size={18} />

              Save Changes

            </button>

          </form>

        </div>

      </div>

    </AdminLayout>
  );
}

export default Settings;
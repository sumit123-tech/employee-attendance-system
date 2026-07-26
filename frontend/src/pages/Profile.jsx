import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

import AdminLayout from "../layouts/AdminLayout";
import {
  UserCircle,
  Mail,
  Phone,
  Briefcase,
  Shield,
  CalendarDays,
} from "lucide-react";

function Profile() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [name, setName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [loading, setLoading] = useState(false);

  const updateProfile = async () => {
    if (!name.trim()) {
      return toast.error("Name is required");
    }
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.put(
        "/users/profile",
        { name,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setName(res.data.user.name);
      setPhone(res.data.user.phone || "");
      setCurrentUser(res.data.user);

      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Update Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-black mb-8">
          My Profile
        </h1>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Header */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-36 relative">

            <div className="absolute -bottom-12 left-8">

              <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center">

                <UserCircle
                  size={80}
                  className="text-blue-600"
                />

              </div>

            </div>

          </div>

          <div className="pt-16 px-8 pb-8">

            <div className="mt-6 space-y-5">

              {/* Name */}

              <div className="flex items-center gap-6">

                <label className="w-40 font-semibold text-black">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered bg-white text-black flex-1 max-w-md"
                />

              </div>

              {/* Phone */}

              <div className="flex items-center gap-6">

                <label className="w-40 font-semibold text-black">
                  Phone Number
                </label>

                <input
                  type="text"
                  value={phone}
                  maxLength={10}
                  inputMode="numeric"
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter phone number"
                  className="input input-bordered bg-white text-black flex-1 max-w-md"
                />

                <button
                  onClick={updateProfile}
                  disabled={
                    loading ||
                    name.trim() === "" ||
                    (phone && phone.length !== 10)
                  }
                  className="btn btn-primary"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>

              </div>

            </div>

            <h2 className="text-2xl font-bold text-black mt-6">
              {currentUser?.name}
            </h2>

            <p className="text-gray-500">
              {currentUser?.role}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-10">

              <div className="bg-gray-50 rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <Mail className="text-blue-600" />

                  <div>

                    <p className="text-gray-500 text-sm">
                      Email
                    </p>

                    <p className="font-semibold text-black">
                      {currentUser?.email}
                    </p>

                  </div>

                </div>

              </div>

              <div className="bg-gray-50 rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <Phone className="text-green-600" />

                  <div>

                    <p className="text-gray-500 text-sm">
                      Phone
                    </p>

                    <p className="font-semibold text-black">
                      {phone || "Not Available"}
                    </p>

                  </div>

                </div>

              </div>

              <div className="bg-gray-50 rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <Briefcase className="text-orange-600" />

                  <div>

                    <p className="text-gray-500 text-sm">
                      Designation
                    </p>

                    <p className="font-semibold text-black">
                      {currentUser?.designation || "Not Assigned"}
                    </p>

                  </div>

                </div>

              </div>

              <div className="bg-gray-50 rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <Shield className="text-red-600" />

                  <div>

                    <p className="text-gray-500 text-sm">
                      Role
                    </p>

                    <p className="font-semibold text-black">
                      {currentUser?.role}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            <div className="mt-8 bg-blue-50 rounded-xl p-5 flex items-center gap-3">

              <CalendarDays className="text-blue-600" />

              <div>

                <p className="text-gray-500 text-sm">
                  Account Created
                </p>

                <p className="font-semibold text-black">
                  {currentUser?.createdAt
                    ? new Date(currentUser.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

export default Profile;
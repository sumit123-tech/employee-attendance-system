import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/axios";

import toast from "react-hot-toast";
import DepartmentSearch from "../components/DepartmentSearch";
import DepartmentForm from "../components/DepartmentForm";
import DepartmentTable from "../components/DepartmentTable";
import DeleteModal from "../components/DeleteModal";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/departments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDepartments(res.data.departments || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch departments"
      );
    }
  };

  const saveDepartment = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (editingId) {
        await api.put(
          `/departments/${editingId}`,
          { name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Department Updated Successfully!");
      } else {
        await api.post(
          "/departments",
          { name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Department Created Successfully!");
      }

      setName("");
      setEditingId(null);

      fetchDepartments();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Operation Failed"
      );
    }
  };

  const editDepartment = (department) => {
    setEditingId(department.id);
    setName(department.name);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openDeleteModal = (department) => {
    setSelectedDepartment(department);
    setDeleteModal(true);
  };

  const deleteDepartment = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(
        `/departments/${selectedDepartment.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Department Deleted Successfully!");

      setDeleteModal(false);
      setSelectedDepartment(null);

      fetchDepartments();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">

        <h1 className="text-3xl font-bold text-black mb-6">
          {user?.role === "ADMIN"
            ? "Department Management"
            : "Departments"}
        </h1>

        <DepartmentSearch
          search={search}
          setSearch={setSearch}
        />

        {user?.role === "ADMIN" && (
          <DepartmentForm
            name={name}
            setName={setName}
            saveDepartment={saveDepartment}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        )}

        <DepartmentTable
          departments={filteredDepartments}
          editDepartment={editDepartment}
          openDeleteModal={openDeleteModal}
        />

        {user?.role === "ADMIN" && (
          <DeleteModal
            isOpen={deleteModal}
            employeeName={selectedDepartment?.name}
            onClose={() => {
              setDeleteModal(false);
              setSelectedDepartment(null);
            }}
            onConfirm={deleteDepartment}
          />
        )}

      </div>
    </AdminLayout>
  );
}

export default Departments;
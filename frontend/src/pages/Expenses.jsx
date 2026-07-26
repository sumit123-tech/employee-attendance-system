/* -------- Imports -------- */

import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";
import api from "../api/axios";

import ExpenseStats from "../components/ExpenseStats";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import ReceiptPreviewModal from "../components/ReceiptPreviewModal";

import { uploadReceipt } from "../utils/uploadReceipt";

function Expenses() {

  /* -------- State -------- */

    const user = JSON.parse(localStorage.getItem("user"));

    const [expenses, setExpenses] = useState([]);
    

    const [previewImage, setPreviewImage] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    expenseDate: "",
    receipt: "",
    });

    /* -------- useEffect -------- */

    useEffect(() => {
    fetchExpenses();
    }, []);

    /* -------- fetchExpenses -------- */

    const fetchExpenses = async () => {
    try {
        

        const token = localStorage.getItem("token");

        const url =
            user?.role === "ADMIN"
                ? "/expenses"
                : "/expenses/my-expenses";

        const res = await api.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        setExpenses(res.data.expenses || []);
    } catch (error) {
        alert(error.response?.data?.message || "Failed");
    } 
    };


    /* -------- handleChange -------- */

    const handleChange = (e) => {
    setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
    }));
    };

    /* -------- Receipt Upload -------- */

    const handleReceiptUpload = async (file) => {
    try {
        const url = await uploadReceipt(file);

        setForm((prev) => ({
        ...prev,
        receipt: url,
        }));

        alert("Receipt Uploaded Successfully");
    } catch {
        alert("Upload Failed");
    }
    };

    /* -------- Submit Expense -------- */

    const submitExpense = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem("token");

        await api.post("/expenses", form, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        alert("Expense Submitted");

        setForm({
        amount: "",
        category: "",
        description: "",
        expenseDate: "",
        receipt: "",
        });

        await fetchExpenses();
    } catch (error) {
        alert(error.response?.data?.message);
    }
    };

    /* -------- Approve -------- */

    const approveExpense = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await api.put(
            `/expenses/${id}/approve`,
            {},
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );

            alert("Expense Approved");

            fetchExpenses();
        } catch (error) {
            alert(error.response?.data?.message || "Approval Failed");
        }
      };


    /* -------- Reject -------- */

   const rejectExpense = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await api.put(
            `/expenses/${id}/reject`,
            {},
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );

            alert("Expense Rejected");

            fetchExpenses();
        } catch (error) {
            alert(error.response?.data?.message || "Reject Failed");
        }
      };

    /* -------- Search + Filter -------- */

    const filteredExpenses = expenses.filter((expense) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
        expense.user?.name?.toLowerCase()?.includes(keyword) ||
        expense.user?.email?.toLowerCase()?.includes(keyword) ||
        expense.category?.toLowerCase()?.includes(keyword);

    const matchesStatus =
        statusFilter === "ALL"
        ? true
        : expense.status === statusFilter;

    return matchesSearch && matchesStatus;
    });

    /* --------  Return -------- */

    return (
    <AdminLayout>

        <div className="space-y-6">

        <h1 className="text-3xl font-bold text-black">
            {user?.role === "ADMIN"
                ? "Expense Management"
                : "My Expenses"}
        </h1>

        {user?.role === "ADMIN" && (
            <div className="flex gap-4">

                <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered flex-1 text-white"
                />

                <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="select select-bordered text-white"
                >
                <option value="ALL">All</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
                </select>

            </div>
        )}

        <ExpenseStats
            expenses={filteredExpenses}
        />

        {user?.role !== "ADMIN" && (
            <ExpenseForm
                form={form}
                handleChange={handleChange}
                handleReceiptUpload={handleReceiptUpload}
                submitExpense={submitExpense}
            />
        )}

        <ExpenseTable
            expenses={filteredExpenses}
            user={user}
            approveExpense={approveExpense}
            rejectExpense={rejectExpense}
            setPreviewImage={setPreviewImage}
        />

        <ReceiptPreviewModal
            image={previewImage}
            onClose={() => setPreviewImage("")}
        />

        </div>

    </AdminLayout>
    );

}

export default Expenses;


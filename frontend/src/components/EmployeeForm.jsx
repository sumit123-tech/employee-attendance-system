function EmployeeForm({
  form,
  handleChange,
  saveEmployee,
  editingId,
  setEditingId,
  setForm,
}) {
  return (
    <div className="card bg-white shadow-lg border border-gray-200 mb-8">
      <div className="card-body">

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {editingId ? "Update Employee" : "Add New Employee"}
        </h2>

        <form
          onSubmit={saveEmployee}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          <input
            className="input input-bordered w-full"
            type="text"
            name="name"
            placeholder="Employee Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="input input-bordered w-full"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="input input-bordered w-full"
            type="password"
            name="password"
            placeholder={
              editingId
                ? "Leave blank to keep password"
                : "Password"
            }
            value={form.password}
            onChange={handleChange}
          />

          <input
            className="input input-bordered w-full"
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            className="input input-bordered w-full"
            type="text"
            name="designation"
            placeholder="Designation"
            value={form.designation}
            onChange={handleChange}
          />

          <div className="flex gap-3">

            <button
              className="btn btn-primary"
              type="submit"
            >
              {editingId ? "Update" : "Add Employee"}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setEditingId(null);

                  setForm({
                    name: "",
                    email: "",
                    password: "",
                    phone: "",
                    designation: "",
                  });
                }}
              >
                Cancel
              </button>
            )}

          </div>

        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
function DepartmentForm({
  name,
  setName,
  saveDepartment,
  editingId,
  setEditingId,
}) {
  return (
    <form
      onSubmit={saveDepartment}
      className="flex flex-wrap gap-4 mb-8"
    >
      <input
        type="text"
        placeholder="Department Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="input input-bordered w-80 bg-white text-black placeholder:text-gray-500"
      />

      <button
        type="submit"
        className="btn btn-primary"
      >
        {editingId
          ? "Update Department"
          : "Add Department"}
      </button>

      {editingId && (
        <button
          type="button"
          className="btn btn-neutral"
          onClick={() => {
            setEditingId(null);
            setName("");
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default DepartmentForm;
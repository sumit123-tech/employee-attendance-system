function DepartmentSearch({ search, setSearch }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search Department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full md:w-96 bg-white text-black placeholder:text-gray-500"
      />
    </div>
  );
}

export default DepartmentSearch;
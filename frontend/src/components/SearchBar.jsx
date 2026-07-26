import { Search } from "lucide-react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="card bg-white shadow-lg border border-gray-200">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-black mb-4">
          Search Employee
        </h2>

        <label className="input input-bordered flex items-center gap-2 bg-white border-gray-300">
          <Search size={18} className="text-gray-600" />

          <input
            type="text"
            className="grow text-black placeholder:text-gray-500 bg-transparent"
            placeholder="Search by name, email, phone, designation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default SearchBar;
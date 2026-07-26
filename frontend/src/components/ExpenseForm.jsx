import ReceiptUploader from "./ReceiptUploader";

function ExpenseForm({
  form,
  handleChange,
  handleReceiptUpload,
  submitExpense,
}) {
  return (
    <form
      onSubmit={submitExpense}
      className="bg-white rounded-2xl shadow-lg border p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-black">
        Submit Expense
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="block mb-2 font-medium text-black">
            Amount (₹)
          </label>

          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter Amount"
            required
            min="1"
            className="input input-bordered w-full text-White"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-black">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="select select-bordered w-full text-white"
          >
            <option value="">Select Category</option>
            <option value="Travel">Travel</option>
            <option value="Hotel">Hotel</option>
            <option value="Food">Food</option>
            <option value="Fuel">Fuel</option>
            <option value="Medical">Medical</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Training">Training</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-black">
            Expense Date
          </label>

          <input
            type="date"
            name="expenseDate"
            value={form.expenseDate}
            onChange={handleChange}
            required
            className="input input-bordered w-full text-White"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-black">
            Description
          </label>

          <textarea
            rows={4}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Expense Description"
            className="textarea textarea-bordered w-full text-White"
          />
        </div>

      </div>

      <ReceiptUploader
        receipt={form.receipt}
        onUpload={handleReceiptUpload}
      />

      <button
        type="submit"
        className="btn btn-primary w-full text-white"
      >
        Submit Expense
      </button>

    </form>
  );
}

export default ExpenseForm;
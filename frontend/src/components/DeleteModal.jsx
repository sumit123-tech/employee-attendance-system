function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  employeeName,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">

      <div className="modal-box">

        <h3 className="font-bold text-2xl text-red-600">
          Delete Employee
        </h3>

        <p className="py-4 text-gray-600">
          Are you sure you want to delete
          <span className="font-bold text-black">
            {" "}
            {employeeName}
          </span>
          ?
        </p>

        <p className="text-sm text-red-500">
          This action cannot be undone.
        </p>

        <div className="modal-action">

          <button
            className="btn btn-outline"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-error"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;
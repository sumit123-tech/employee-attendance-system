import { X } from "lucide-react";

function ReceiptPreviewModal({
  image,
  onClose,
}) {
  if (!image) return null;

  const isPDF = image.toLowerCase().includes(".pdf");

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-2xl w-[95%] md:w-[80%] lg:w-[70%] max-h-[90vh] overflow-hidden">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-4">

          <h2 className="text-xl font-bold text-black">
            Receipt Preview
          </h2>

          <button
            onClick={onClose}
            className="btn btn-circle btn-sm btn-error"
          >
            <X size={18} />
          </button>

        </div>

        {/* Body */}

        <div className="p-5 flex justify-center bg-gray-100 overflow-auto max-h-[75vh]">

          {isPDF ? (

            <iframe
              src={image}
              title="Receipt PDF"
              className="w-full h-[70vh] rounded-lg border"
            />

          ) : (

            <img
              src={image}
              alt="Receipt"
              className="max-h-[70vh] rounded-xl shadow-lg"
            />

          )}

        </div>

        {/* Footer */}

        <div className="border-t p-4 flex justify-end gap-3">

          <a
            href={image}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Open in New Tab
          </a>

          <button
            onClick={onClose}
            className="btn btn-outline"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default ReceiptPreviewModal;
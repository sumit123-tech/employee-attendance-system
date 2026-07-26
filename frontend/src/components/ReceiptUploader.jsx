import { UploadCloud, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function ReceiptUploader({
  receipt,
  onUpload,
}) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles.length) return;

      try {
        setUploading(true);

        await onUpload(acceptedFiles[0]);

      } finally {
        setUploading(false);
      }
    },
    [onUpload]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
  });

  return (
    <div className="space-y-4">

      <label className="font-semibold text-black">
        Upload Receipt
      </label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 transition cursor-pointer ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center text-center">

          <UploadCloud
            size={46}
            className="text-blue-600 mb-3"
          />

          <h3 className="text-lg font-semibold text-black">
            Drag & Drop your receipt
          </h3>

          <p className="text-gray-500 mt-2">
            Drag & drop your receipt here, or click to browse files
          </p>

          <div className="mt-4">

            <span className="btn btn-primary btn-sm">
              Choose File
            </span>

          </div>

        </div>

      </div>

      {uploading && (

        <div className="alert alert-info">

          <span>
            Uploading receipt...
          </span>

        </div>

      )}

      {receipt && (

        <div className="rounded-xl border bg-green-50 p-4">

          <div className="flex items-center gap-2 mb-3">

            <CheckCircle2
              size={20}
              className="text-green-600"
            />

            <span className="font-semibold text-green-700">
              Receipt Uploaded Successfully
            </span>

          </div>

          {receipt.endsWith(".pdf") ? (

            <a
              href={receipt}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Open Uploaded PDF
            </a>

          ) : (

            <>

              <img
                src={receipt}
                alt="Receipt"
                className="rounded-xl border max-h-72 mb-3"
              />

              <a
                href={receipt}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:underline"
              >
                <ImageIcon size={18} />
                View Full Image
              </a>

            </>

          )}

        </div>

      )}

    </div>
  );
}

export default ReceiptUploader;
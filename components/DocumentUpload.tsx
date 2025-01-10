"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface DocumentUploadProps {
  onDocumentUploaded: () => void;
}

export default function DocumentUpload({
  onDocumentUploaded,
}: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const { fileUrl } = await res.json();
      const docRes = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileUrl }),
      });

      if (docRes.ok) {
        toast.success("Document uploaded successfully");
        setFile(null);
        onDocumentUploaded();
      } else {
        toast.error("Failed to save document");
      }
    } else {
      toast.error("Failed to upload document");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="document" className="block mb-1">
          Upload Document
        </label>
        <input
          type="file"
          id="document"
          accept=".pdf,.jpg,.png"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !file}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Upload Document"}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Document {
  _id: string;
  fileUrl: string;
  status: string;
  uploadedAt: string;
}

interface DocumentListProps {
  documents: Document[];
  isAdmin: boolean;
}

export default function DocumentList({
  documents,
  isAdmin,
}: DocumentListProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateDocumentStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    const res = await fetch(`/api/documents/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      toast.success("Document status updated");
    } else {
      toast.error("Failed to update document status");
    }
    setUpdatingId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              File
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Uploaded At
            </th>
            {isAdmin && (
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <a
                  href={document.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View File
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{document.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(document.uploadedAt).toLocaleString()}
              </td>
              {isAdmin && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() =>
                      updateDocumentStatus(document._id, "approved")
                    }
                    disabled={
                      updatingId === document._id ||
                      document.status === "approved"
                    }
                    className="mr-2 bg-green-500 text-white px-2 py-1 rounded disabled:bg-gray-400"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      updateDocumentStatus(document._id, "rejected")
                    }
                    disabled={
                      updatingId === document._id ||
                      document.status === "rejected"
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded disabled:bg-gray-400"
                  >
                    Reject
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

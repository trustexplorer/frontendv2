"use client";

import React, { useState } from "react";
import useAuthStore from "@/store";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteReport = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const url = useAuthStore((state) => state.url);
  const storeToken = useAuthStore((state) => state.token);
  const { id } = useParams();
  const router = useRouter();

  // Prefer store token, fall back to localStorage
  const token = storeToken || (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  const deleteReport = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`${url}/user/delete-report/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Report deleted successfully");
        setTimeout(() => router.push("/dashboard/my-reports"), 1500);
      } else {
        throw new Error(data.error || "Failed to delete report");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <ToastContainer />
      <div className="p-6 rounded-lg shadow-md border border-border">
        <h2 className="text-xl font-bold mb-4 text-red-600">Delete Report</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <p className="mb-6 text-foreground">
          Are you sure you want to delete this report? This action <strong>cannot be undone</strong>.
        </p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border border-border rounded hover:bg-muted transition"
          >
            Cancel
          </button>
          <button
            onClick={deleteReport}
            disabled={isDeleting}
            className={`px-4 py-2 rounded text-white transition ${
              isDeleting ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isDeleting ? "Deleting..." : "Delete Report"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReport;

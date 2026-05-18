"use client";

import useAuthStore from "@/store";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

const UpdateReport = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = useAuthStore((state) => state.url);
  const storeToken = useAuthStore((state) => state.token);
  const [filePreviews, setFilePreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const { id } = useParams();
  const router = useRouter();

  // Prefer store token, fall back to localStorage
  const token = storeToken || (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  const [formData, setFormData] = useState({
    startDate: "", endDate: "", description: "", name: "",
    scamType: "", accountNumber: "", email: "", phone: "", bank: "", socialHandle: "",
  });
  const [scamTypes, setScamTypes] = useState([]);

  // Fetch scam types from API
  useEffect(() => {
    fetch(`${url}/user/scam-types`)
      .then((r) => r.json())
      .then((data) => setScamTypes(data.scamTypes || []))
      .catch(() => setScamTypes([]));
  }, [url]);

  // Load existing report
  useEffect(() => {
    if (!id) return;
    const fetchReport = async () => {
      try {
        const response = await fetch(`${url}/user/single-report/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || "Failed to fetch report");
        }
        const data = await response.json();
        setFormData({
          startDate: data.startDate || "",
          endDate: data.endDate || "",
          description: data.description || "",
          name: data.name || "",
          scamType: data.scamType || "",
          email: data.email || "",
          phone: data.phone || "",
          accountNumber: data.accountNumber || "",
          bank: data.bank || "",
          socialHandle: data.socialHandle || "",
        });
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to load report data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReport();
  }, [id, token, url]);

  useEffect(() => {
    return () => filePreviews.forEach((p) => p && URL.revokeObjectURL(p));
  }, [filePreviews]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    e.target.value = "";

    if (files.length + selected.length > MAX_FILES) {
      toast.error(`Maximum ${MAX_FILES} files allowed.`);
      return;
    }

    const valid = [];
    const previews = [];
    for (const file of selected) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`${file.name}: only image files are allowed.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name}: must be under 5MB.`);
        continue;
      }
      const isDupe = files.some((f) => f.name === file.name && f.size === file.size);
      if (!isDupe) {
        valid.push(file);
        previews.push(URL.createObjectURL(file));
      }
    }
    setFiles((prev) => [...prev, ...valid]);
    setFilePreviews((prev) => [...prev, ...previews]);
  };

  const removeFileAtIndex = (index) => {
    if (filePreviews[index]) URL.revokeObjectURL(filePreviews[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const dataForm = new FormData();
      Object.entries(formData).forEach(([key, val]) => dataForm.append(key, val));
      files.forEach((file) => dataForm.append("files", file, file.name));

      const response = await fetch(`${url}/user/update-report/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: dataForm,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        // ✅ setTimeout not setInterval — interval leaks
        setTimeout(() => router.push("/dashboard/my-reports"), 2000);
        setFiles([]);
        setFilePreviews([]);
      } else {
        throw new Error(data.error || "Failed to update report");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Report</h1>
      <p>Loading report data...</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Report</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <ToastContainer />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange}
              className="w-full border p-2 rounded bg-background text-foreground border-border" />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange}
              className="w-full border p-2 rounded bg-background text-foreground border-border" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Transaction Narrative</label>
          <textarea name="description" value={formData.description} onChange={handleChange}
            className="w-full border p-2 rounded bg-background text-foreground border-border" rows={4} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Scammer Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}
            className="w-full border p-2 rounded bg-background text-foreground border-border" />
        </div>

        <div className="border p-4 rounded space-y-4">
          <h3 className="font-semibold">Contact Info</h3>

          <div>
            <label className="block text-sm font-medium mb-1">Scam Type</label>
            <select name="scamType" value={formData.scamType} onChange={handleChange}
              className="w-full border p-2 rounded bg-background text-foreground border-border">
              <option value="">Select Scam Type</option>
              {scamTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              className="w-full border p-2 rounded bg-background text-foreground border-border" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            {/* Fixed: was type="number" which strips leading zeros */}
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
              className="w-full border p-2 rounded bg-background text-foreground border-border" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Account Number</label>
            <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange}
              className="w-full border p-2 rounded bg-background text-foreground border-border" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bank</label>
            <input type="text" name="bank" value={formData.bank} onChange={handleChange}
              className="w-full border p-2 rounded bg-background text-foreground border-border" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Social Handle</label>
            <input type="text" name="socialHandle" value={formData.socialHandle} onChange={handleChange}
              className="w-full border p-2 rounded bg-background text-foreground border-border" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Replace Evidence Images
              <span className="text-xs text-muted-foreground ml-2">(leave empty to keep existing)</span>
            </label>
            <input type="file" multiple onChange={handleFileChange} accept="image/*"
              className="w-full border p-2 rounded" />

            {files.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {files.map((file, index) => (
                  <div key={index} className="relative border rounded overflow-hidden">
                    {filePreviews[index] ? (
                      <Image src={filePreviews[index]} alt={`Preview ${index + 1}`}
                        width={300} height={200} className="w-full h-40 object-cover" />
                    ) : (
                      <div className="p-4 h-40 bg-muted flex items-center justify-center text-sm">{file.name}</div>
                    )}
                    <button type="button" onClick={() => removeFileAtIndex(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs font-bold"
                      aria-label="Remove">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button type="submit" disabled={isSubmitting}
            className="bg-primary text-primary-foreground py-2 px-6 rounded hover:bg-primary/90 transition disabled:opacity-50">
            {isSubmitting ? "Updating..." : "Update Report"}
          </button>
          <button type="button" onClick={() => router.back()}
            className="px-6 py-2 bg-muted text-muted-foreground border border-border rounded hover:bg-accent transition">
            ← Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReport;

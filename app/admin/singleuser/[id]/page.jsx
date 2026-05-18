"use client";

import React, { useEffect, useState } from "react";
import useAuthStore from "@/store";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [singleuser, setSingleUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  const { id } = useParams();
  const url = useAuthStore((state) => state.url);
  // Use store token — never raw localStorage at component scope
  const storeToken = useAuthStore((state) => state.token);
  const token = storeToken || (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  useEffect(() => {
    if (!id) return;
    const fetchSingle = async () => {
      try {
        const response = await fetch(`${url}/admin/single-user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || "Failed to load user.");
        }
        const data = await response.json();
        setSingleUser(data);
        setRole(data.role);
        setIsBlocked(data.isBlocked);
      } catch (err) {
        setError(err.message || "Failed to load user.");
      } finally {
        setLoading(false);
      }
    };
    fetchSingle();
  }, [id, url, token]);

  const handleChangeRole = async (e) => {
    const selectedRole = e.target.value;
    if (!selectedRole) return;
    setRole(selectedRole);
    try {
      const response = await fetch(`${url}/admin/change-role/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role: selectedRole }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        setSingleUser((prev) => ({ ...prev, role: selectedRole }));
      } else {
        toast.error(result.error || "Failed to change role");
        // Revert optimistic update
        setRole(singleuser?.role || "");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleToggleBlock = async () => {
    const endpoint = isBlocked ? "unblock-user" : "block-user";
    try {
      const response = await fetch(`${url}/admin/${endpoint}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setIsBlocked(!isBlocked);
        toast.success(data.message);
      } else {
        toast.error(data.error || "Failed to update block status");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (loading) return <div className="p-4 text-muted-foreground">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!singleuser) return <div className="p-4 text-muted-foreground">No user found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
      <Card className="bg-background text-foreground">
        <CardHeader>
          <CardTitle className="text-center text-lg">User Details</CardTitle>
          <CardDescription className="text-center text-sm">User ID: {id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
            {[
              { label: "Username", value: singleuser.userName },
              { label: "Full Name", value: `${singleuser.firstName} ${singleuser.lastName}` },
              { label: "Email", value: singleuser.email },
              { label: "Phone", value: singleuser.phone },
              { label: "Role", value: singleuser.role },
              { label: "Status", value: singleuser.isBlocked ? "Blocked" : singleuser.isVerified ? "Verified" : "Unverified" },
              { label: "Reports Count", value: singleuser.reports?.length || 0 },
              { label: "Joined", value: new Date(singleuser.createdAt).toLocaleString() },
              { label: "Last Updated", value: new Date(singleuser.updatedAt).toLocaleString() },
            ].map(({ label, value }, idx) => (
              <div key={idx}>
                <p className="font-medium text-muted-foreground">{label}</p>
                <p className="text-base font-semibold text-foreground break-all">{value ?? "N/A"}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="role" className="font-medium">Change User Role</label>
              <select id="role" value={role} onChange={handleChangeRole}
                className="bg-background text-foreground border border-border rounded-md px-3 py-2 w-full sm:w-auto">
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <button onClick={handleToggleBlock}
              className={`px-4 py-2 rounded-md font-medium text-white w-full sm:w-auto ${
                isBlocked ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
              }`}>
              {isBlocked ? "Unblock User" : "Block User"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

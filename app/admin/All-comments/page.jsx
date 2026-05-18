"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useAuthStore from "@/store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const url = useAuthStore((state) => state.url);
  // Use store token — not localStorage directly
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchAllComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${url}/admin/all-comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        // Backend now returns { comments, pagination } — handle both shapes
        setComments(data.comments ?? data);
      } else {
        setError(data.error || "Failed to fetch comments.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchAllComments();
  }, [token]); // Re-fetch when token hydrates from localStorage

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${url}/admin/delete-comment/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) { toast.success(data.message); fetchAllComments(); }
      else toast.error(data.error || "Something went wrong.");
    } catch { toast.error("Network error."); }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${url}/admin/approve-comment/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) { toast.success(data.message); fetchAllComments(); }
      else toast.error(data.error || "Failed to approve comment.");
    } catch { toast.error("Network error."); }
  };

  return (
    <div className="px-4 md:px-8 py-6">
      <Card>
        <ToastContainer />
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">All User Comments</CardTitle>
          <CardDescription>View, approve, or delete submitted comments.</CardDescription>
        </CardHeader>
        <CardContent className="w-full px-2 sm:px-4">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading comments...</p>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No comments available.</p>
          ) : (
            <div className="w-full overflow-x-auto rounded-md border border-border">
              <table className="min-w-[650px] w-full text-sm text-left border-collapse">
                <thead className="bg-muted">
                  <tr className="text-left border-b border-border">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Comment</th>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((com, i) => (
                    // Fixed: was key={com. i} (syntax error with space) → key={com._id || i}
                    <tr key={com._id || i} className="border-b border-border hover:bg-accent/20">
                      <td className="py-2 px-4 font-medium">{i + 1}</td>
                      <td className="py-2 px-4 max-w-[200px] truncate">{com?.comment || "—"}</td>
                      <td className="py-2 px-4">{com?.user?.userName || "Unknown"}</td>
                      <td className="py-2 px-4 whitespace-nowrap">
                        {new Date(com?.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">
                        <Badge variant={
                          com.status === "approved" ? "default" :
                          com.status === "rejected" ? "destructive" : "secondary"
                        }>
                          {com.status}
                        </Badge>
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex gap-2">
                          {com.status !== "approved" && (
                            <Button onClick={() => handleApprove(com._id)}
                              variant="outline" size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-100">
                              Approve
                            </Button>
                          )}
                          <Button onClick={() => handleDelete(com._id)}
                            variant="outline" size="sm"
                            className="text-red-600 border-red-600 hover:bg-red-100">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

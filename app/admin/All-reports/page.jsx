"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useAuthStore from "@/store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Page = () => {
  const url = useAuthStore((state) => state.url);
  const token = useAuthStore((state) => state.token);
  const reports = useAuthStore((state) => state.reports);
  const fetchReports = useAuthStore((state) => state.fetchReports);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!reports || reports.length === 0) fetchReports();
  }, [fetchReports]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${url}/admin/delete-report/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) { toast.success(data.message); fetchReports(); }
      else toast.error(data.error || "Something went wrong.");
    } catch { toast.error("Network error."); }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`${url}/admin/reject-report/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // Fixed: was referencing `data` in else branch using wrong variable `err`
      if (res.ok) { toast.success(data.message); fetchReports(); }
      else toast.error(data.error || "Failed to reject report.");
    } catch { toast.error("Network error."); }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${url}/admin/approve-report/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) { toast.success(data.message); fetchReports(); }
      else toast.error(data.error || "Failed to approve report.");
    } catch { toast.error("Network error."); }
  };

  const safeReports = Array.isArray(reports) ? reports : [];

  return (
    <div className="px-4 md:px-8 py-6">
      <Card>
        <ToastContainer />
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <CardTitle className="text-lg font-semibold">All Scam Reports</CardTitle>
          </div>
          <CardDescription>View, approve, or reject submitted scam reports.</CardDescription>
        </CardHeader>
        <CardContent className="w-full px-2 sm:px-4">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading reports...</p>
          ) : safeReports.length === 0 ? (
            <p className="text-sm text-muted-foreground">No reports available.</p>
          ) : (
            <div className="w-full overflow-x-auto rounded-md border border-border">
              <table className="min-w-[700px] w-full text-sm text-left border-collapse">
                <thead className="bg-muted">
                  <tr className="text-left border-b border-border">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Reporter</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {safeReports.map((report, idx) => (
                    <tr key={report._id} className="border-b border-border hover:bg-accent/20">
                      <td className="py-2 px-4 font-medium">{idx + 1}</td>
                      <td className="py-2 px-4 whitespace-nowrap max-w-[150px] truncate">
                        {report?.reporter || "Unknown"}
                      </td>
                      <td className="py-2 px-4">
                        <Badge variant={
                          report.status === "approved" ? "default" :
                          report.status === "rejected" ? "destructive" : "secondary"
                        }>
                          {report.status}
                        </Badge>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex flex-wrap gap-2">
                          <Link href={`/report/${report._id}`}>
                            <Button variant="outline" size="sm">View</Button>
                          </Link>
                          {report.status !== "approved" && (
                            <Button onClick={() => handleApprove(report._id)}
                              variant="outline" size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-100 dark:hover:bg-green-900">
                              Approve
                            </Button>
                          )}
                          {report.status !== "rejected" && (
                            <Button onClick={() => handleReject(report._id)}
                              variant="outline" size="sm"
                              className="text-yellow-600 border-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900">
                              Reject
                            </Button>
                          )}
                          <Button onClick={() => handleDelete(report._id)}
                            variant="outline" size="sm"
                            className="text-red-600 border-red-600 hover:bg-red-100 dark:hover:bg-red-900">
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

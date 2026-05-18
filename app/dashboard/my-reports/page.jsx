"use client";

import React, { useEffect } from "react";
import { CheckCircle, Clock, XCircle, Eye, Pencil, Trash2, Flag, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const STATUS_CONFIG = {
  approved: { icon: CheckCircle, label: "Approved", className: "risk-safe" },
  pending:  { icon: Clock,        label: "Pending",  className: "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900" },
  rejected: { icon: XCircle,      label: "Rejected", className: "risk-high" },
};

const MyReport = () => {
  const fetchUserReports = useAuthStore((s) => s.fetchUserReports);
  const reports = useAuthStore((s) => s.myReports);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    if (!reports || reports.length === 0) fetchUserReports();
  }, []);

  const safeReports = Array.isArray(reports) ? reports : [];

  return (
    <div className="p-4 md:p-6">
      <ToastContainer />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">My Reports</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Scams you&apos;ve submitted to TrustPadi
          </p>
        </div>
        <Link href="/dashboard/report">
          <Button size="sm" className="gap-1.5">
            <Flag className="h-3.5 w-3.5" />
            New Report
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <div className="h-4 shimmer rounded w-1/3" />
                <div className="h-5 shimmer rounded w-20" />
              </div>
              <div className="h-3 shimmer rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : safeReports.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto">
            <Flag className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">No reports yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Help protect others by reporting a scammer
            </p>
          </div>
          <Link href="/dashboard/report">
            <Button size="sm" className="gap-1.5 mt-2">
              <Flag className="h-3.5 w-3.5" />
              Report a Scam
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Mobile: card list */}
          <div className="md:hidden space-y-3">
            {safeReports.map((report) => {
              const status = STATUS_CONFIG[report.status] || STATUS_CONFIG.pending;
              const StatusIcon = status.icon;
              return (
                <div key={report._id} className="bg-card border border-border rounded-xl p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{report.name}</p>
                      <p className="text-xs text-muted-foreground">{report.bank}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${status.className}`}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{report.scamType}</p>
                  <div className="flex items-center gap-2 pt-1 border-t border-border">
                    <Link href={`/report/${report._id}`}>
                      <Button variant="ghost" size="sm" className="h-7 px-2.5 text-xs gap-1">
                        <Eye className="h-3 w-3" /> View
                      </Button>
                    </Link>
                    <Link href={`/update/${report._id}`}>
                      <Button variant="ghost" size="sm" className="h-7 px-2.5 text-xs gap-1">
                        <Pencil className="h-3 w-3" /> Edit
                      </Button>
                    </Link>
                    <Link href={`/delete/${report._id}`}>
                      <Button variant="ghost" size="sm" className="h-7 px-2.5 text-xs gap-1 text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3" /> Delete
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th className="text-left">Scammer</th>
                  <th className="text-left">Bank</th>
                  <th className="text-left">Type</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {safeReports.map((report) => {
                  const status = STATUS_CONFIG[report.status] || STATUS_CONFIG.pending;
                  const StatusIcon = status.icon;
                  return (
                    <tr key={report._id}>
                      <td>
                        <div>
                          <p className="font-medium text-sm">{report.name}</p>
                          {report.accountNumber && (
                            <p className="text-xs text-muted-foreground font-mono">{report.accountNumber}</p>
                          )}
                        </div>
                      </td>
                      <td className="text-muted-foreground">{report.bank}</td>
                      <td>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                          {report.scamType?.split(" ").slice(0, 2).join(" ")}
                        </span>
                      </td>
                      <td>
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${status.className}`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="text-muted-foreground text-xs">
                        {new Date(report.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td>
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/report/${report._id}`}>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="View">
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                          <Link href={`/update/${report._id}`}>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Edit">
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                          <Link href={`/delete/${report._id}`}>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive hover:text-destructive" title="Delete">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MyReport;

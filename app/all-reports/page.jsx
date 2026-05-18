"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, TrendingUp, ThumbsUp, ThumbsDown, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import Link from "next/link";

const AllReport = () => {
  const url = useAuthStore((s) => s.url);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const reports = useAuthStore((s) => s.reports);
  const fetchAllReports = useAuthStore((s) => s.fetchAllReports);
  const storeToken = useAuthStore((s) => s.token);
  const setToken = useAuthStore((s) => s.setToken);

  useEffect(() => {
    if (!storeToken && typeof window !== "undefined" && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      try { await fetchAllReports(); }
      catch { setError("Failed to fetch reports."); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const handleVote = async (type, id, e) => {
    e.stopPropagation();
    const token = storeToken || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
    if (!token) { toast.error("Please log in to vote."); return; }
    try {
      const res = await fetch(`${url}/user/${type}-report/${id}`, {
        method: "POST", headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) { toast.success(data.message); fetchAllReports(); }
      else toast.error(data.error || "Failed to vote.");
    } catch { toast.error("Network error."); }
  };

  const safeReports = Array.isArray(reports) ? reports : [];
  const filtered = safeReports.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name?.toLowerCase().includes(q) || r.scamType?.toLowerCase().includes(q) || r.bank?.toLowerCase().includes(q) || r.accountNumber?.includes(q);
    const matchType = filterType === "all" || r.scamType === filterType;
    return matchSearch && matchType;
  });

  const scamTypes = ["all", ...Array.from(new Set(safeReports.map((r) => r.scamType).filter(Boolean)))].slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ToastContainer />

      {/* Page header */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Scam Reports</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {safeReports.length.toLocaleString()} approved reports in the database
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, bank, type..." className="pl-9 h-10 bg-background"
                value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          {/* Type filters */}
          <div className="flex flex-wrap gap-2 mt-5">
            {scamTypes.map((type) => (
              <button key={type} onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filterType === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                }`}>
                {type === "all" ? "All Types" : type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 shimmer rounded w-1/2" />
                  <div className="h-5 shimmer rounded w-20" />
                </div>
                <div className="h-3 shimmer rounded w-full" />
                <div className="h-3 shimmer rounded w-3/4" />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="h-10 shimmer rounded-lg" />
                  <div className="h-10 shimmer rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium">No reports match your search</p>
            <p className="text-sm text-muted-foreground">Try a different term or clear filters</p>
            <Button variant="outline" onClick={() => { setSearch(""); setFilterType("all"); }}>Clear filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((report, index) => (
              <div key={report._id || index}
                onClick={() => router.push(`/report/${report._id}`)}
                className="group bg-card border border-border rounded-xl p-5 cursor-pointer report-card hover:border-primary/30">

                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold truncate">{report.name || "Unknown"}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(report.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full risk-high shrink-0 whitespace-nowrap">
                    {report.scamType?.split(" ").slice(0,2).join(" ")}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                  {report.description || "No description provided."}
                </p>

                {/* Info chips */}
                <div className="grid grid-cols-2 gap-1.5 mb-4">
                  {report.accountNumber && (
                    <div className="bg-muted/50 rounded-lg px-2.5 py-1.5 col-span-1">
                      <p className="text-[10px] text-muted-foreground">Account</p>
                      <p className="text-xs font-mono font-medium truncate">{report.accountNumber}</p>
                    </div>
                  )}
                  {report.bank && (
                    <div className="bg-muted/50 rounded-lg px-2.5 py-1.5 col-span-1">
                      <p className="text-[10px] text-muted-foreground">Bank</p>
                      <p className="text-xs font-medium truncate">{report.bank}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => handleVote("upvote", report._id, e)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 hover:opacity-80 transition-opacity">
                      <ThumbsUp className="h-3 w-3" />
                      {report.upvotes?.length || 0}
                    </button>
                    <button onClick={(e) => handleVote("downvote", report._id, e)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-red-700 bg-red-50 dark:bg-red-950/30 dark:text-red-400 hover:opacity-80 transition-opacity">
                      <ThumbsDown className="h-3 w-3" />
                      {report.downvotes?.length || 0}
                    </button>
                  </div>
                  <span className="text-xs text-primary font-medium flex items-center gap-0.5 group-hover:underline">
                    View <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReport;

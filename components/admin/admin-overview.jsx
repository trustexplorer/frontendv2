"use client";

import { useState, useEffect } from "react";
import { Users, AlertTriangle, FileText, Clock, Shield, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import useAuthStore from "@/store";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { bootstrapAuth } from "@/lib/auth";

export function AdminOverview() {
  const url        = useAuthStore((s) => s.url);
  const token      = useAuthStore((s) => s.token);
  const setToken   = useAuthStore((s) => s.setToken);
  const reports    = useAuthStore((s) => s.reports);
  const fetchReports = useAuthStore((s) => s.fetchReports);
  const user       = useAuthStore((s) => s.user);
  const fetchUsers = useAuthStore((s) => s.fetchUsers);
  const [admin, setAdmin]   = useState(null);
  const [stories, setStories] = useState([]);
  const router = useRouter();

  useEffect(() => { bootstrapAuth(token, setToken, router, "/adminauth"); }, [token, setToken, router]);
  useEffect(() => { if (!reports || reports.length === 0) fetchReports(); }, []);
  useEffect(() => { if (!user || user.length === 0) fetchUsers(); }, []);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch(`${url}/api/stories`);
        if (res.ok) { const d = await res.json(); setStories(d.stories ?? d); }
      } catch { toast.error("Failed to load stories"); }
    };
    fetchStories();
  }, [url]);

  useEffect(() => {
    const fetchAdmin = async () => {
      const t = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
      if (!t) return;
      try {
        const res = await fetch(`${url}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${t}` },
        });
        if (res.ok) { const d = await res.json(); setAdmin(d.admin); }
      } catch {}
    };
    fetchAdmin();
  }, [url, token]);

  const safeReports = Array.isArray(reports) ? reports : [];
  const safeUsers   = Array.isArray(user) ? user : [];

  const approved = safeReports.filter((r) => r.status === "approved").length;
  const pending  = safeReports.filter((r) => r.status === "pending").length;
  const rejected = safeReports.filter((r) => r.status === "rejected").length;

  const chartData = [
    { name: "Approved", count: approved, color: "#22c55e" },
    { name: "Pending",  count: pending,  color: "#f59e0b" },
    { name: "Rejected", count: rejected, color: "#ef4444" },
  ];

  const stats = [
    { label: "Total Reports",  value: safeReports.length, icon: FileText,      color: "text-blue-500",    bg: "bg-blue-50 dark:bg-blue-950/30" },
    { label: "Pending Review", value: pending,             icon: Clock,         color: "text-amber-500",   bg: "bg-amber-50 dark:bg-amber-950/30" },
    { label: "Total Users",    value: safeUsers.length,   icon: Users,         color: "text-violet-500",  bg: "bg-violet-50 dark:bg-violet-950/30" },
    { label: "Total Stories",  value: stories.length,     icon: FileText,      color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <ToastContainer />

      {/* Welcome banner */}
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-2xl p-6 text-white overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-4 w-4 text-white/60" />
            <span className="text-xs text-white/60 font-medium uppercase tracking-widest">Admin Panel</span>
          </div>
          <h1 className="text-xl font-bold">
            Welcome back{admin?.userName ? `, ${admin.userName}` : ""}
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Here&apos;s what&apos;s happening on TrustPadi today.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="border-border shadow-none">
            <CardContent className="p-4">
              <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${bg} mb-3`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <div className="text-2xl font-bold tabular-nums">{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart + Quick stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar chart */}
        <Card className="lg:col-span-2 border-border shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Reports by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: 12 }}
                  cursor={{ fill: "hsl(var(--muted))" }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Approval breakdown */}
        <Card className="border-border shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Approval Rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Approved", count: approved, total: safeReports.length, color: "bg-emerald-500", icon: CheckCircle, iconColor: "text-emerald-500" },
              { label: "Pending",  count: pending,  total: safeReports.length, color: "bg-amber-500",  icon: Clock,        iconColor: "text-amber-500" },
              { label: "Rejected", count: rejected, total: safeReports.length, color: "bg-red-500",    icon: XCircle,      iconColor: "text-red-500" },
            ].map(({ label, count, total, color, icon: Icon, iconColor }) => {
              const pct = total ? Math.round((count / total) * 100) : 0;
              return (
                <div key={label} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
                      <span className="text-xs font-medium">{label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground tabular-nums">{count} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

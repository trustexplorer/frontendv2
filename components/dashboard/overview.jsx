"use client";

import { useEffect } from "react";
import { Flag, Clock, CheckCircle, XCircle, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuthStore from "@/store";
import MyReport from "@/app/dashboard/my-reports/page";
import { useRouter } from "next/navigation";
import { bootstrapAuth } from "@/lib/auth";
import Link from "next/link";

export function DashboardOverview() {
  const token = useAuthStore((s) => s.token);
  const setToken = useAuthStore((s) => s.setToken);
  const user = useAuthStore((s) => s.dashboard);
  const getDashboard = useAuthStore((s) => s.getDashboard);
  const fetchUserReports = useAuthStore((s) => s.fetchUserReports);
  const reports = useAuthStore((s) => s.myReports);
  const router = useRouter();

  useEffect(() => { bootstrapAuth(token, setToken, router, "/login"); }, [token, setToken, router]);
  useEffect(() => { if (!user) getDashboard(); }, []);
  useEffect(() => { if (!reports || reports.length === 0) fetchUserReports(); }, []);

  const safeReports = Array.isArray(reports) ? reports : [];
  const approved = safeReports.filter((r) => r.status === "approved").length;
  const pending  = safeReports.filter((r) => r.status === "pending").length;
  const rejected = safeReports.filter((r) => r.status === "rejected").length;

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Welcome banner */}
      <div className="relative bg-gradient-to-br from-primary/90 via-primary to-blue-700 rounded-2xl p-6 text-white overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-white/70 font-medium">Welcome back,</p>
            <h1 className="text-xl font-bold mt-0.5">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-xs text-white/60 mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Member since {joinDate}
            </p>
          </div>
          <Link href="/dashboard/report"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-sm font-semibold backdrop-blur-sm transition-colors self-start sm:self-auto">
            <Flag className="h-4 w-4" />
            Report a Scam
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Reports", value: safeReports.length, icon: Flag,         color: "text-blue-500",    bg: "bg-blue-50 dark:bg-blue-950/30" },
          { label: "Approved",      value: approved,           icon: CheckCircle,  color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
          { label: "Pending",       value: pending,            icon: Clock,        color: "text-amber-500",   bg: "bg-amber-50 dark:bg-amber-950/30" },
          { label: "Rejected",      value: rejected,           icon: XCircle,      color: "text-red-500",     bg: "bg-red-50 dark:bg-red-950/30" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
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

      {/* Reports list */}
      <Card className="border-border shadow-none">
        <MyReport />
      </Card>
    </div>
  );
}

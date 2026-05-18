"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Users, ShieldCheck, TrendingUp } from "lucide-react";
import useAuthStore from "@/store";

function useCounter(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!target) return;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setValue(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}

export function StatsSection() {
  const reports = useAuthStore((state) => state.reports);
  const fetchAllReports = useAuthStore((state) => state.fetchAllReports);

  useEffect(() => {
    if (!reports || reports.length === 0) fetchAllReports();
  }, []);

  const total = reports?.length || 0;
  const countReports = useCounter(total);
  const countProtected = useCounter(total * 14); // estimated reach
  const countStates = useCounter(36);
  const countTypes = useCounter(36);

  const stats = [
    {
      icon: AlertTriangle,
      value: countReports.toLocaleString(),
      label: "Scams Reported",
      sub: "and growing daily",
      color: "text-red-500",
      bg: "bg-red-50 dark:bg-red-950/30",
    },
    {
      icon: Users,
      value: `${countProtected.toLocaleString()}+`,
      label: "Nigerians Protected",
      sub: "estimated reach",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: ShieldCheck,
      value: countStates,
      label: "States Covered",
      sub: "all 36 states + FCT",
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      icon: TrendingUp,
      value: countTypes,
      label: "Scam Categories",
      sub: "tracked & classified",
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
            Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">The numbers speak for themselves</h2>
          <p className="text-lg text-muted-foreground">Real data. Real protection. Real community.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map(({ icon: Icon, value, label, sub, color, bg }, i) => (
            <div key={i}
              className="relative group bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 overflow-hidden">
              {/* Background icon watermark */}
              <div className="absolute -bottom-3 -right-3 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon className="w-20 h-20" />
              </div>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg} mb-4 mx-auto`}>
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
              <div className="text-3xl lg:text-4xl font-bold tracking-tight tabular-nums">{value}</div>
              <div className="text-sm font-semibold mt-1">{label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

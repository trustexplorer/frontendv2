"use client";

import { ArrowRight, AlertTriangle, Shield, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  const reports = useAuthStore((state) => state.reports);
  const fetchAllReports = useAuthStore((state) => state.fetchAllReports);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!reports || reports.length === 0) fetchAllReports();
  }, []);

  useEffect(() => {
    if (!reports?.length) return;
    const target = reports.length;
    const duration = 1800;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [reports]);

  const recentReports = reports?.slice(0, 3) || [];

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid opacity-[0.35] dark:opacity-[0.15]" />
      {/* Gradient blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left ──────────────────────────────────────────────────── */}
          <div className="space-y-8 text-center lg:text-left fade-up">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Protecting Nigerians from fraud since 2025
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Don&apos;t get scammed.
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] gradient-text">
                Check first.
              </h1>
            </div>

            {/* Body */}
            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              TrustPadi is Nigeria&apos;s community-driven scam database. Verify account numbers, phone numbers, and social handles before you send money or engage.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/check">
                <Button size="lg" className="w-full sm:w-auto gap-2 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 transition-all">
                  Check a Number
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/all-reports">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 hover:bg-muted transition-all">
                  Browse Reports
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {["bg-blue-500","bg-emerald-500","bg-amber-500","bg-violet-500"].map((c, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-background flex items-center justify-center text-[10px] font-bold text-white`}>
                    {["A","B","C","D"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{count.toLocaleString()}+</span> scams already in our database
              </p>
            </div>
          </div>

          {/* ── Right — recent alerts card ─────────────────────────── */}
          <div className="relative fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="gradient-border rounded-2xl">
              <div className="bg-card rounded-2xl p-6 shadow-xl space-y-5">

                {/* Card header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-destructive live-dot" />
                    <span className="text-sm font-semibold">Live Scam Alerts</span>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full risk-high">High Risk</span>
                </div>

                {/* Report list */}
                <div className="space-y-3">
                  {recentReports.length > 0 ? recentReports.map((scam, i) => (
                    <Link key={i} href={`/report/${scam._id}`}>
                      <div className="group flex items-start gap-3 p-3 rounded-xl hover:bg-muted/60 transition-colors cursor-pointer report-card">
                        <div className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold truncate">{scam.name}</p>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {new Date(scam.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{scam.scamType}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{scam.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0 group-hover:text-primary transition-colors mt-1" />
                      </div>
                    </Link>
                  )) : (
                    <div className="space-y-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="flex gap-3 p-3 rounded-xl">
                          <div className="w-8 h-8 rounded-lg shimmer shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="h-3 shimmer rounded w-3/4" />
                            <div className="h-2 shimmer rounded w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/all-reports"
                  className="flex items-center justify-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 pt-1 transition-colors">
                  View all reports
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Floating accent dots */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>

        {/* ── Trust strip ──────────────────────────────────────────── */}
        <div className="mt-16 pt-10 border-t border-border">
          <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">Trusted by Nigerians across all 36 states</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground/60">
            {["Bank Fraud", "Investment Scams", "Romance Scams", "Fake Jobs", "Ponzi Schemes", "OTP Theft"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-sm">
                <Shield className="h-3.5 w-3.5 text-primary/60" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

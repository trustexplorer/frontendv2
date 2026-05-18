"use client";

import Link from "next/link";
import { ArrowRight, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store";

const BENEFITS = [
  "Report scammers anonymously",
  "Protect your community",
  "Access our full database",
  "Get real-time alerts",
];

export function CTASection() {
  const token = useAuthStore((state) => state.token);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-blue-700 p-10 md:p-16 text-white shadow-xl shadow-primary/20">

          {/* Background texture */}
          <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">

            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 mx-auto">
              <Shield className="h-8 w-8 text-white" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Join the fight against fraud
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                Every report matters. Sign up free and help protect thousands of Nigerians from scammers and fraudsters.
              </p>
            </div>

            {/* Benefits checklist */}
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-1.5 text-sm text-white/90">
                  <CheckCircle className="h-4 w-4 text-white/70 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {!token && (
                <Link href="/signup">
                  <Button size="lg"
                    className="w-full sm:w-auto gap-2 bg-white text-primary hover:bg-white/90 font-semibold shadow-lg">
                    Create Free Account
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              <Link href="/education">
                <Button size="lg" variant="outline"
                  className="w-full sm:w-auto gap-2 border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                  Learn to spot scams
                </Button>
              </Link>
            </div>

            <p className="text-xs text-white/50">Free forever. No credit card required.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

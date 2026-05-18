import { Suspense } from "react";
import { ScamCheckForm } from "@/components/scam-check/scam-check-form";
import { Header } from "@/components/header";
import { Search, Shield, Database, Zap } from "lucide-react";

const HOW_IT_WORKS = [
  { icon: Search, step: "1", title: "Enter details", desc: "Input the account number, phone, or social handle you want to verify." },
  { icon: Database, step: "2", title: "We search our database", desc: "Our system checks against thousands of community-verified scam reports." },
  { icon: Zap, step: "3", title: "Instant results", desc: "Get a clear result in seconds — flagged reports or a clean record." },
];

export default function ScamCheckPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mx-auto">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Check for Scams</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Verify account numbers, phone numbers, or social handles against our community-reported scam database before you send money.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Suspense fallback={
          <div className="py-16 space-y-4">
            <div className="h-10 shimmer rounded-xl" />
            <div className="h-11 shimmer rounded-lg" />
          </div>
        }>
          <ScamCheckForm />
        </Suspense>
      </div>

      {/* How it works */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {HOW_IT_WORKS.map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="bg-card border border-border rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {step}
                </div>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-sm">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

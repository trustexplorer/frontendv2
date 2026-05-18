"use client";

import { useState } from "react";
import { Search, AlertTriangle, CheckCircle, Copy, Check, ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useAuthStore from "@/store";
import Link from "next/link";

export function ScamCheckForm() {
  const url = useAuthStore((s) => s.url);
  const [activeTab, setActiveTab] = useState("bank");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const placeholders = {
    bank: "e.g. 0123456789",
    phone: "e.g. 08012345678",
    social: "e.g. @username",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() || query.trim().length < 3) return;
    setIsLoading(true);
    setResults([]);
    setError(null);
    setSearched(false);
    try {
      const response = await fetch(`${url}/user/search?query=${encodeURIComponent(query.trim())}`);
      const data = await response.json();
      if (response.ok) {
        setResults(Array.isArray(data) ? data : [data]);
      } else {
        setError(data.error || "No results found.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
      setSearched(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8 space-y-8">

      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setQuery(""); setResults([]); setError(null); setSearched(false); }}>
        <TabsList className="w-full grid grid-cols-3 h-10 bg-muted p-1 rounded-xl">
          <TabsTrigger value="bank" className="rounded-lg text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Bank Account
          </TabsTrigger>
          <TabsTrigger value="phone" className="rounded-lg text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Phone Number
          </TabsTrigger>
          <TabsTrigger value="social" className="rounded-lg text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Social Handle
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit} className="mt-4">
          {["bank","phone","social"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={tab === "social" ? "text" : "text"}
                    placeholder={placeholders[tab]}
                    value={activeTab === tab ? query : ""}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9 h-11 bg-background border-border"
                    autoComplete="off"
                  />
                </div>
                {query && (
                  <button type="button" onClick={copyToClipboard}
                    className="px-3 h-11 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-sm flex items-center gap-1.5">
                    {copied ? <><Check className="h-3.5 w-3.5 text-emerald-500" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
                  </button>
                )}
                <Button type="submit" className="h-11 px-5 font-semibold shrink-0" disabled={isLoading || !query.trim() || query.trim().length < 3}>
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : "Check"}
                </Button>
              </div>
            </TabsContent>
          ))}
        </form>
      </Tabs>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-3">
          {[1,2].map(i => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 space-y-3">
              <div className="flex justify-between">
                <div className="h-4 shimmer rounded w-1/3" />
                <div className="h-5 shimmer rounded w-20" />
              </div>
              <div className="h-3 shimmer rounded w-full" />
              <div className="h-3 shimmer rounded w-2/3" />
            </div>
          ))}
        </div>
      )}

      {/* No results */}
      {!isLoading && searched && results.length === 0 && !error && (
        <div className="text-center py-10 space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/30 mx-auto">
            <CheckCircle className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="font-semibold text-lg">No scam reports found</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            This doesn&apos;t guarantee safety. Always exercise caution with unknown parties.
          </p>
        </div>
      )}

      {/* Error / not found */}
      {!isLoading && error && (
        <div className="text-center py-10 space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 dark:bg-red-950/30 mx-auto">
            <AlertTriangle className="h-7 w-7 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="font-semibold text-lg text-destructive">{error}</h3>
        </div>
      )}

      {/* Results */}
      {!isLoading && results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-destructive live-dot shrink-0" />
            <p className="text-sm font-semibold text-destructive">
              {results.length} scam report{results.length > 1 ? "s" : ""} found
            </p>
          </div>

          {results.map((report, i) => (
            <Link key={report._id || i} href={`/report/${report._id}`}>
              <div className="group bg-card border border-border rounded-xl p-5 hover:border-destructive/40 hover:shadow-md transition-all duration-200 cursor-pointer report-card">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-base">{report.name || "Unknown"}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Reported {new Date(report.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <Badge className="risk-high shrink-0 text-xs">{report.scamType}</Badge>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{report.description}</p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {report.accountNumber && (
                    <div className="bg-muted/50 rounded-lg px-3 py-2">
                      <span className="text-muted-foreground block">Account</span>
                      <span className="font-mono font-medium">{report.accountNumber}</span>
                    </div>
                  )}
                  {report.bank && (
                    <div className="bg-muted/50 rounded-lg px-3 py-2">
                      <span className="text-muted-foreground block">Bank</span>
                      <span className="font-medium">{report.bank}</span>
                    </div>
                  )}
                  {report.phone && (
                    <div className="bg-muted/50 rounded-lg px-3 py-2">
                      <span className="text-muted-foreground block">Phone</span>
                      <span className="font-mono font-medium">{report.phone}</span>
                    </div>
                  )}
                  {report.socialHandle && (
                    <div className="bg-muted/50 rounded-lg px-3 py-2">
                      <span className="text-muted-foreground block">Social</span>
                      <span className="font-medium">{report.socialHandle}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-end gap-1 text-xs text-primary font-medium group-hover:underline">
                  View full report <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

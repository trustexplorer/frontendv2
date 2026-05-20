"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "@/store";
import Image from "next/image";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = pathname.includes("admin");
  const url = useAuthStore((s) => s.url);
  const setToken = useAuthStore((s) => s.setToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields"); return; }
    try {
      setIsLoading(true);
      const endpoint = isAdmin ? `${url}/admin/login` : `${url}/user/login`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        document.cookie = `token=${data.token}; path=/; max-age=3600; SameSite=Strict`;
        setToken(data.token);
        toast.success(data.message);
        router.push(isAdmin ? "/admin" : "/dashboard");
        return;
      }
      const msg = data.error || "An error occurred during login";
      setError(msg); toast.error(msg);
    } catch {
      const msg = "Network error. Please try again.";
      setError(msg); toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <ToastContainer />
      <div className="w-full max-w-md">

        <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-blue-400 to-primary/60" />

          <div className="p-8 space-y-6">
            {/* Logo + heading */}
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="relative w-12 h-12">
                  <Image src="/new-logo.png" alt="TrustPadi" fill className="object-contain" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                <p className="text-sm text-muted-foreground mt-1">Sign in to your TrustPadi account</p>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="py-2.5">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com"
                    className="pl-9 h-10 bg-background"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    required autoComplete="email" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Link href="/forgotpassword" className="text-xs text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? "text" : "password"}
                    placeholder="••••••••" className="pl-9 pr-9 h-10 bg-background"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    required autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-10 font-semibold mt-1" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : "Sign in"}
              </Button>
            </form>

            {/* User footer links */}
            <div className="space-y-3 pt-2 border-t border-border">
              <div className="text-center space-y-1.5">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-primary font-medium hover:text-primary/80 transition-colors">
                    Create one
                  </Link>
                </p>
                <p className="text-sm text-muted-foreground">
                  Need to verify your email?{" "}
                  <Link href="/requestnew" className="text-primary font-medium hover:text-primary/80 transition-colors">
                    Resend link
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
          <Shield className="h-3 w-3" />
          Your data is encrypted and secure
        </p>
      </div>
    </div>
  );
}

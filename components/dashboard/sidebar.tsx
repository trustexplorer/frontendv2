"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, FileText, AlertTriangle, LogOut,
  Shield, ChevronRight, User, X, Menu, Flag,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import Image from "next/image";
import useAuthStore from "@/store";
import { cn } from "@/lib/utils";

interface SidebarProps { isAdmin?: boolean; }

type NavItem =
  | { href: string; label: string; icon: React.ElementType }
  | { label: string; icon: React.ElementType; children: { href: string; label: string }[] };

const userNav: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { label: "Reports", icon: Flag, children: [
    { href: "/dashboard/report", label: "Report a Scam" },
    { href: "/dashboard/my-reports", label: "My Reports" },
  ]},
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

const adminNav: NavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { label: "Users", icon: User, children: [
    { href: "/admin/All-user", label: "All Users" },
  ]},
  { label: "Reports", icon: Shield, children: [
    { href: "/admin/All-reports", label: "All Reports" },
    { href: "/admin/All-comments", label: "All Comments" },
  ]},
  { href: "/admin/scams", label: "Scam Database", icon: AlertTriangle },
  { label: "Stories", icon: FileText, children: [
    { href: "/admin/create-story", label: "Create Story" },
    { href: "/admin/all-stories", label: "All Stories" },
  ]},
];

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const getDashboard = useAuthStore((s) => s.getDashboard);
  const user = useAuthStore((s) => s.dashboard);
  const clearToken = useAuthStore((s) => s.clearToken);

  const nav = isAdmin ? adminNav : userNav;
  const isActive = (href: string) => pathname === href;
  const isGroupActive = (children: { href: string }[]) => children.some(c => pathname === c.href);

  useEffect(() => { if (!user) getDashboard(); }, []);

  // Auto-open dropdown if a child is active
  useEffect(() => {
    nav.forEach(item => {
      if ("children" in item && isGroupActive(item.children)) {
        setOpenDropdown(item.label);
      }
    });
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    clearToken();
    router.replace("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-border flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-7 h-7">
            <Image src="/new-logo.png" alt="TrustPadi" fill className="object-contain" />
          </div>
          <span className="font-bold text-sm tracking-tight">TrustPadi</span>
          {isAdmin && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary">
              Admin
            </span>
          )}
        </Link>
        <button className="md:hidden p-1.5 rounded-lg hover:bg-muted" onClick={() => setMobileOpen(false)}>
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* User chip */}
      {user && (
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm uppercase shrink-0">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate">{user.firstName} {user.lastName}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-3">
        <nav className="space-y-0.5">
          {nav.map((item) => {
            if ("children" in item) {
              const isOpen = openDropdown === item.label;
              const groupActive = isGroupActive(item.children);
              const Icon = item.icon;
              return (
                <div key={item.label}>
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      groupActive ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronRight className={cn("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-90")} />
                  </button>
                  {isOpen && (
                    <div className="ml-6 mt-0.5 space-y-0.5 border-l border-border pl-3">
                      {item.children.map(child => (
                        <Link key={child.href} href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block px-3 py-1.5 rounded-md text-sm transition-colors",
                            isActive(child.href)
                              ? "text-primary font-medium bg-primary/8"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}>
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Logout */}
      <div className="px-3 py-3 border-t border-border">
        <button onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-colors">
          <LogOut className="h-4 w-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-xl bg-card border border-border shadow-md"
        aria-label="Open sidebar">
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 h-full bg-card border-r border-border shadow-xl">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex w-60 flex-col bg-card border-r border-border h-screen sticky top-0 shrink-0">
        <SidebarContent />
      </div>
    </>
  );
}

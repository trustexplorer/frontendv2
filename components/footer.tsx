import Link from "next/link";
import { Twitter, Instagram, Linkedin, Mail, Shield } from "lucide-react";
import Image from "next/image";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8.019V6.487c1.117.767 2.497 1.224 4 1.224v3.002a6.994 6.994 0 01-4-1.194v5.98a6 6 0 11-6-6c.34 0 .672.034.993.098v3.095A3.002 3.002 0 009 15a3 3 0 106-0.001V2h3a5.977 5.977 0 01-2 6.019z"/>
  </svg>
);

const socials = [
  { href: "https://x.com/trustpadi?s=21", icon: Twitter, label: "X / Twitter" },
  { href: "https://www.instagram.com/trustpadi?igsh=NXpsYTVlOTF0dW4x", icon: Instagram, label: "Instagram" },
  { href: "https://www.linkedin.com/company/trust-padi/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.tiktok.com/@trustpadi", icon: TikTokIcon, label: "TikTok" },
];

const links = {
  Resources: [
    { href: "/education", label: "Scam Education" },
    { href: "/statistics", label: "Statistics" },
    { href: "/check", label: "Check a Scam" },
    { href: "/all-reports", label: "Browse Reports" },
  ],
  Company: [
    { href: "/learn", label: "About Us" },
    { href: "/team", label: "Our Team" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/disclaimer", label: "Disclaimer" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8">
                <Image src="/logo black.png" alt="TrustPadi" fill className="object-contain" />
              </div>
              <span className="font-bold text-lg tracking-tight">TrustPadi</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
              Nigeria&apos;s community-driven platform to fight fraud, one report at a time.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold mb-4">{section}</h3>
              <ul className="space-y-2.5">
                {items.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TrustPadi. All rights reserved.
          </p>
          <a href="mailto:support@trustpadi.com"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="h-3.5 w-3.5" />
            support@trustpadi.com
          </a>
        </div>
      </div>
    </footer>
  );
}

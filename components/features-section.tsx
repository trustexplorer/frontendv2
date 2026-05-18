import { Shield, Search, AlertTriangle, TrendingUp, FileText, Users, BarChart2, BookOpen } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Instant Scam Check",
    description: "Verify bank accounts, phone numbers, and social handles against our community-reported database in seconds.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    icon: AlertTriangle,
    title: "Report a Scammer",
    description: "Submit evidence-backed reports to protect others. Your report could save someone's savings today.",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/40",
  },
  {
    icon: Shield,
    title: "Community Protection",
    description: "Every report strengthens the network. Thousands of Nigerians rely on this shared database daily.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    icon: TrendingUp,
    title: "Emerging Trends",
    description: "Stay ahead of new fraud tactics with community-sourced intelligence on the latest scam patterns.",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description: "Access comprehensive scam profiles — descriptions, evidence, dates, and verified account information.",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/40",
  },
  {
    icon: Users,
    title: "Expert Moderation",
    description: "Our team reviews every submission to ensure accuracy and prevent false reports.",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
  },
  {
    icon: BarChart2,
    title: "Scam Statistics",
    description: "Explore trends by scam type, region, and time period to understand the fraud landscape.",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-950/40",
  },
  {
    icon: BookOpen,
    title: "Scam Education",
    description: "Learn to identify red flags before you fall victim. Knowledge is your best protection.",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/40",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
            Why TrustPadi
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to stay safe
          </h2>
          <p className="text-lg text-muted-foreground">
            A complete platform built specifically for Nigeria&apos;s digital fraud landscape.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, description, color, bg }, i) => (
            <div key={i}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-default">
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${bg} mb-4 transition-transform group-hover:scale-110 duration-200`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <h3 className="text-base font-semibold mb-2 tracking-tight">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

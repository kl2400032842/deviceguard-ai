import { cn } from "@/lib/utils";
import type { Severity } from "@/types";

const colors: Record<Severity | "healthy" | "warning" | "maintenance" | "connected" | "available" | "degraded", string> = {
  critical: "border-red-400/30 bg-red-500/15 text-red-100",
  high: "border-orange-400/30 bg-orange-500/15 text-orange-100",
  medium: "border-amber-400/30 bg-amber-500/15 text-amber-100",
  low: "border-sky-400/30 bg-sky-500/15 text-sky-100",
  healthy: "border-emerald-400/30 bg-emerald-500/15 text-emerald-100",
  warning: "border-amber-400/30 bg-amber-500/15 text-amber-100",
  maintenance: "border-violet-400/30 bg-violet-500/15 text-violet-100",
  connected: "border-emerald-400/30 bg-emerald-500/15 text-emerald-100",
  available: "border-sky-400/30 bg-sky-500/15 text-sky-100",
  degraded: "border-orange-400/30 bg-orange-500/15 text-orange-100"
};

export function Badge({ label, tone, className }: { label: string; tone: keyof typeof colors; className?: string }) {
  return <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize", colors[tone], className)}>{label}</span>;
}

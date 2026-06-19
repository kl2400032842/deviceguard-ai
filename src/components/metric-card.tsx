"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MetricCard({ title, value, delta, icon: Icon, tone = "teal" }: { title: string; value: string; delta: string; icon: LucideIcon; tone?: "teal" | "red" | "amber" | "blue" }) {
  const tones = {
    teal: "text-teal-200 bg-teal-400/15",
    red: "text-red-200 bg-red-400/15",
    amber: "text-amber-200 bg-amber-400/15",
    blue: "text-sky-200 bg-sky-400/15"
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{title}</p>
          <span className={cn("flex size-9 items-center justify-center rounded-md", tones[tone])}><Icon className="size-4" /></span>
        </div>
        <p className="mt-4 text-2xl font-semibold text-white">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{delta}</p>
      </Card>
    </motion.div>
  );
}

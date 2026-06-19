"use client";

import { Banknote, Clock3, Gauge, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/metric-card";
import { RoiChart } from "@/components/charts";
import { PageIntro } from "@/components/sections/common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExecutivePage() {
  return (
    <>
      <PageIntro eyebrow="Executive dashboard" title="Business impact of predictive reliability" description="Track uptime, MTTR, cost savings, downtime avoided, and ROI across the device estate." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Uptime" value="99.982%" delta="+0.42% quarter over quarter" icon={Gauge} tone="teal" />
        <MetricCard title="MTTR" value="38 min" delta="Down 21%" icon={Clock3} tone="blue" />
        <MetricCard title="Cost Savings" value="$1.29M" delta="Avoided replacement and labor" icon={Banknote} tone="teal" />
        <MetricCard title="Downtime Avoided" value="311 hrs" delta="Modeled from incident baselines" icon={TrendingUp} tone="amber" />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <RoiChart />
        <Card>
          <CardHeader><CardTitle>ROI Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Prevented incidents", "47"],
              ["Maintenance deferrals avoided", "$420K"],
              ["SLA credit exposure reduced", "$310K"],
              ["Fleet risk reduction", "18%"]
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.035] p-3">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="font-semibold text-white">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

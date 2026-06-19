"use client";

import { CalendarClock, LineChart, Radar, Target } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { AccuracyChart, HeatmapChart, RiskChart } from "@/components/charts";
import { MetricCard } from "@/components/metric-card";
import { PageIntro } from "@/components/sections/common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/services/api";
import { ErrorState, LoadingState } from "@/components/state-panels";

export default function AnalyticsPage() {
  const { isLoading, isError } = useQuery({ queryKey: ["analytics"], queryFn: api.getAnalytics });
  if (isLoading) return <LoadingState label="Loading predictive analytics..." />;
  if (isError) return <ErrorState />;

  return (
    <>
      <PageIntro eyebrow="Prediction lab" title="Predictive analytics" description="Track failure timelines, heatmaps, trends, and model accuracy across the fleet." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Failure Timeline" value="14 days" delta="Critical prediction window" icon={CalendarClock} tone="amber" />
        <MetricCard title="Prediction Trends" value="+11%" delta="Risk concentration week over week" icon={LineChart} tone="blue" />
        <MetricCard title="Accuracy Charts" value="93.4%" delta="Rolling model precision" icon={Target} tone="teal" />
        <MetricCard title="Risk Heatmap" value="5 groups" delta="By platform domain" icon={Radar} tone="red" />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <RiskChart title="Prediction Trends" />
        <HeatmapChart />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <AccuracyChart />
        <Card>
          <CardHeader><CardTitle>Failure Timeline</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {["NYC gateway PSU risk peaks Jun 27", "BER sensor vibration risk crosses threshold Jul 02", "LON HVAC memory pressure stabilizes after Jul 14", "SFO storage remains low risk through Q4"].map((item, index) => (
              <div key={item} className="flex gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/15 text-xs text-primary">{index + 1}</span>
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

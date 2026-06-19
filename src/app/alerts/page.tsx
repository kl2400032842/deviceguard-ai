"use client";

import { AlertOctagon, BellRing, CheckCheck, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { AlertList, PageIntro } from "@/components/sections/common";
import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/services/api";
import { ErrorState, LoadingState } from "@/components/state-panels";

export default function AlertsPage() {
  const { data = [], isLoading, isError } = useQuery({ queryKey: ["alerts"], queryFn: api.getAlerts });
  if (isLoading) return <LoadingState label="Loading alerts..." />;
  if (isError) return <ErrorState />;
  const count = (severity: string) => data.filter((alert) => alert.severity === severity).length;

  return (
    <>
      <PageIntro eyebrow="Response" title="Alert operations" description="Review critical, high, medium, and low alerts with acknowledge and resolve actions ready for API binding." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Critical Alerts" value={String(count("critical"))} delta="Immediate response" icon={AlertOctagon} tone="red" />
        <MetricCard title="High Alerts" value={String(count("high"))} delta="Next shift" icon={BellRing} tone="amber" />
        <MetricCard title="Medium Alerts" value={String(count("medium"))} delta="Watch queue" icon={Clock} tone="blue" />
        <MetricCard title="Low Alerts" value={String(count("low"))} delta="Informational" icon={CheckCheck} tone="teal" />
      </div>
      <Card className="mt-4">
        <CardHeader><CardTitle>Alert Timeline</CardTitle></CardHeader>
        <CardContent><AlertList rows={data} actions /></CardContent>
      </Card>
    </>
  );
}

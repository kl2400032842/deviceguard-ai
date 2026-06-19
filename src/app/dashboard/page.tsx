"use client";

import { Activity, AlertTriangle, Cpu, HeartPulse, ShieldCheck, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { MetricCard } from "@/components/metric-card";
import { RiskChart } from "@/components/charts";
import { AlertList, DeviceTable, InsightList, LiveActivityFeed, PageIntro } from "@/components/sections/common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorState, LoadingState } from "@/components/state-panels";

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["dashboard"], queryFn: api.getDashboard });
  if (isLoading) return <LoadingState />;
  if (isError || !data) return <ErrorState />;

  const total = data.devices.length;
  const healthy = data.devices.filter((device) => device.status === "healthy").length;
  const critical = data.devices.filter((device) => device.status === "critical").length;
  const activeAlerts = data.alerts.filter((alert) => alert.status !== "resolved").length;
  const predictedFailures = data.devices.filter((device) => device.riskScore > 60).length;

  return (
    <>
      <PageIntro
        eyebrow="Command center"
        title="Predictive device operations in real time"
        description="Monitor device health, detect failure patterns, and prioritize maintenance before outages touch customers."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard title="Total Devices" value={String(total)} delta="+18 onboarded this month" icon={Cpu} tone="blue" />
        <MetricCard title="Healthy Devices" value={String(healthy)} delta="Fleet stability 92.4%" icon={ShieldCheck} tone="teal" />
        <MetricCard title="Critical Devices" value={String(critical)} delta="Needs action today" icon={AlertTriangle} tone="red" />
        <MetricCard title="Active Alerts" value={String(activeAlerts)} delta="Across 4 severity levels" icon={Activity} tone="amber" />
        <MetricCard title="Predicted Failures" value={String(predictedFailures)} delta="Next 14 days" icon={TrendingUp} tone="red" />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <RiskChart />
        <LiveActivityFeed />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader><CardTitle>Device Inventory Snapshot</CardTitle></CardHeader>
          <CardContent><DeviceTable rows={data.devices.slice(0, 4)} compact /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Active Alerts</CardTitle></CardHeader>
          <CardContent><AlertList rows={data.alerts.slice(0, 3)} /></CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <InsightList rows={data.insights} />
      </div>
    </>
  );
}

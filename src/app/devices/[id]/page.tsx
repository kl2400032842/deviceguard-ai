"use client";

import { useParams } from "next/navigation";
import { BrainCircuit, CalendarDays, Gauge, HeartPulse } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { MetricCard } from "@/components/metric-card";
import { TelemetryChart } from "@/components/charts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InsightList, PageIntro } from "@/components/sections/common";
import { ErrorState, LoadingState } from "@/components/state-panels";
import { insights } from "@/data/mock-data";

export default function DeviceDetailsPage() {
  const params = useParams<{ id: string }>();
  const { data: device, isLoading, isError } = useQuery({ queryKey: ["device", params.id], queryFn: () => api.getDevice(params.id) });
  if (isLoading) return <LoadingState label="Loading device details..." />;
  if (isError || !device) return <ErrorState />;

  return (
    <>
      <PageIntro eyebrow="Device details" title={device.name} description={`${device.type} in ${device.location}. Owner: ${device.owner}. Last signal ${device.lastSeen}.`} action={<Badge label={device.status} tone={device.status} />} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Health Score" value={`${device.healthScore}%`} delta="Composite telemetry index" icon={HeartPulse} tone={device.healthScore > 80 ? "teal" : "amber"} />
        <MetricCard title="Risk Score" value={`${device.riskScore}%`} delta="AI failure model output" icon={Gauge} tone={device.riskScore > 70 ? "red" : "blue"} />
        <MetricCard title="Failure Prediction" value={device.riskScore > 70 ? "Likely" : "Watch"} delta="Next maintenance horizon" icon={BrainCircuit} tone="amber" />
        <MetricCard title="Predicted Failure Date" value={device.predictedFailureDate} delta="Uses current model confidence" icon={CalendarDays} tone="blue" />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <TelemetryChart data={device.telemetry} />
        <Card>
          <CardHeader><CardTitle>Root Cause Analysis</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p><span className="text-white">Primary signal:</span> temperature and vibration drift exceeded peer baseline.</p>
            <p><span className="text-white">Correlated dependency:</span> power delivery instability increased retry events.</p>
            <p><span className="text-white">Recommended action:</span> validate cooling path, inspect PSU, and shift workload before repair.</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <InsightList rows={insights.slice(0, 2)} />
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2, CircleAlert, Clock3, ServerCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { alerts, devices, insights } from "@/data/mock-data";
import type { Alert, Device, Insight, Severity } from "@/types";
import { cn } from "@/lib/utils";

export function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function LiveActivityFeed() {
  const events = [
    { icon: CircleAlert, label: "Critical model alert", meta: "NYC gateway predicted PSU failure", tone: "text-red-200" },
    { icon: ServerCog, label: "Telemetry refresh", meta: "6,284 device samples processed", tone: "text-sky-200" },
    { icon: CheckCircle2, label: "Maintenance completed", meta: "SIN router optical check closed", tone: "text-emerald-200" },
    { icon: Clock3, label: "Schedule updated", meta: "BER sensor inspection moved earlier", tone: "text-amber-200" }
  ];

  return (
    <Card id="activity">
      <CardHeader><CardTitle>Live Activity Feed</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {events.map((event) => {
          const Icon = event.icon;
          return (
            <div key={event.label} className="flex items-start gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3">
              <Icon className={cn("mt-0.5 size-4", event.tone)} />
              <div>
                <p className="text-sm font-medium text-white">{event.label}</p>
                <p className="text-xs text-muted-foreground">{event.meta}</p>
              </div>
              <span className="ml-auto text-xs text-muted-foreground">now</span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function DeviceTable({ rows = devices, compact = false }: { rows?: Device[]; compact?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[780px] text-left text-sm">
        <thead className="text-xs uppercase tracking-wide text-muted-foreground">
          <tr className="border-b border-white/10">
            <th className="px-3 py-3">Device</th>
            <th className="px-3 py-3">Type</th>
            <th className="px-3 py-3">Location</th>
            <th className="px-3 py-3">Health</th>
            <th className="px-3 py-3">Risk</th>
            <th className="px-3 py-3">Status</th>
            <th className="px-3 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((device) => (
            <tr key={device.id} className="border-b border-white/5 hover:bg-white/[0.035]">
              <td className="px-3 py-3">
                <p className="font-medium text-white">{device.name}</p>
                <p className="text-xs text-muted-foreground">{device.id} - {device.lastSeen}</p>
              </td>
              <td className="px-3 py-3 text-muted-foreground">{device.type}</td>
              <td className="px-3 py-3 text-muted-foreground">{device.location}</td>
              <td className="px-3 py-3 text-white">{device.healthScore}%</td>
              <td className="px-3 py-3 text-white">{device.riskScore}%</td>
              <td className="px-3 py-3"><Badge label={device.status} tone={device.status} /></td>
              <td className="px-3 py-3">
                <Link
                  href={`/devices/${device.id}`}
                  className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm font-medium text-foreground transition hover:bg-white/[0.1]"
                >
                  Details <ArrowRight className="size-3" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!compact && <p className="mt-3 text-xs text-muted-foreground">Showing {rows.length} of {devices.length} devices. Pagination is wired for backend cursors.</p>}
    </div>
  );
}

export function AlertList({ rows = alerts, actions = false }: { rows?: Alert[]; actions?: boolean }) {
  return (
    <div className="space-y-3">
      {rows.map((alert) => (
        <div key={alert.id} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-white">{alert.title}</p>
                <Badge label={alert.severity} tone={alert.severity} />
                <Badge label={alert.status} tone={alert.status === "resolved" ? "healthy" : alert.status === "acknowledged" ? "warning" : alert.severity} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{alert.device} - {alert.timestamp}</p>
              <p className="mt-3 text-sm text-muted-foreground">{alert.description}</p>
            </div>
            {actions && (
              <div className="flex shrink-0 gap-2">
                <Button size="sm" variant="secondary">Acknowledge</Button>
                <Button size="sm" variant="primary">Resolve</Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function InsightList({ rows = insights }: { rows?: Insight[] }) {
  const tone: Record<Severity, string> = { critical: "text-red-200", high: "text-orange-200", medium: "text-amber-200", low: "text-sky-200" };
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {rows.map((insight) => (
        <Card key={insight.id}>
          <CardHeader>
            <CardTitle>{insight.title}</CardTitle>
            <Badge label={insight.impact} tone={insight.impact} />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{insight.summary}</p>
            <p className="mt-4 text-sm text-white">{insight.recommendation}</p>
            <div className="mt-5 h-2 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-primary" style={{ width: `${insight.confidence}%` }} />
            </div>
            <p className={cn("mt-2 text-xs font-medium", tone[insight.impact])}>{insight.confidence}% confidence</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

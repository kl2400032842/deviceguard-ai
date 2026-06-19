"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { heatmap, riskTrend } from "@/data/mock-data";
import type { TelemetryPoint } from "@/types";

const tooltip = {
  contentStyle: {
    background: "rgba(10, 12, 18, 0.95)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    color: "#fff"
  }
};

export function RiskChart({ title = "Risk Charts" }: { title?: string }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={riskTrend}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip {...tooltip} />
            <Bar dataKey="actual" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="predicted" stroke="#14b8a6" strokeWidth={3} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function TelemetryChart({ data }: { data: TelemetryPoint[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>Telemetry Charts</CardTitle></CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="cpu" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} /><stop offset="95%" stopColor="#14b8a6" stopOpacity={0} /></linearGradient>
              <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f97316" stopOpacity={0.4} /><stop offset="95%" stopColor="#f97316" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip {...tooltip} />
            <Area type="monotone" dataKey="cpu" stroke="#14b8a6" fill="url(#cpu)" />
            <Area type="monotone" dataKey="temperature" stroke="#f97316" fill="url(#temp)" />
            <Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function AccuracyChart() {
  return (
    <Card>
      <CardHeader><CardTitle>Accuracy Charts</CardTitle></CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={riskTrend}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip {...tooltip} />
            <Area type="monotone" dataKey="accuracy" stroke="#22c55e" fill="#22c55e33" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function HeatmapChart() {
  const cells = heatmap.flat();
  return (
    <Card>
      <CardHeader><CardTitle>Risk Heatmap</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {cells.map((cell) => (
            <div key={`${cell.group}-${cell.day}`} className="aspect-square rounded-md border border-white/10 p-2 text-xs" style={{ backgroundColor: `rgba(239, 68, 68, ${cell.value / 110})` }}>
              <span className="block text-white">{cell.value}</span>
              <span className="text-muted-foreground">{cell.group}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function RoiChart() {
  const data = [
    { name: "Q1", savings: 180, downtime: 42 },
    { name: "Q2", savings: 260, downtime: 61 },
    { name: "Q3", savings: 340, downtime: 80 },
    { name: "Q4", savings: 510, downtime: 118 }
  ];
  return (
    <Card>
      <CardHeader><CardTitle>ROI Charts</CardTitle></CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip {...tooltip} />
            <Bar dataKey="savings" fill="#14b8a6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="downtime" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            {data.map((_, index) => <Cell key={index} />)}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

import type { Alert, Device, Insight, Integration, MaintenanceTask } from "@/types";

const telemetry = Array.from({ length: 12 }, (_, index) => ({
  time: `${index + 1}:00`,
  cpu: 34 + ((index * 7) % 48),
  memory: 42 + ((index * 5) % 44),
  temperature: 58 + ((index * 4) % 31),
  vibration: 12 + ((index * 3) % 26),
  risk: 18 + ((index * 9) % 63)
}));

export const devices: Device[] = [
  {
    id: "dg-1001",
    name: "Edge Gateway NYC-01",
    type: "Industrial Gateway",
    location: "New York DC",
    owner: "Platform Ops",
    status: "critical",
    healthScore: 42,
    riskScore: 88,
    predictedFailureDate: "2026-06-27",
    lastSeen: "18 sec ago",
    telemetry
  },
  {
    id: "dg-1002",
    name: "HVAC Controller LON-12",
    type: "Facility Controller",
    location: "London HQ",
    owner: "Facilities",
    status: "warning",
    healthScore: 71,
    riskScore: 56,
    predictedFailureDate: "2026-07-14",
    lastSeen: "43 sec ago",
    telemetry: telemetry.map((p) => ({ ...p, risk: Math.max(12, p.risk - 18), temperature: p.temperature - 5 }))
  },
  {
    id: "dg-1003",
    name: "Storage Array SFO-7A",
    type: "Storage",
    location: "San Francisco DC",
    owner: "Infrastructure",
    status: "healthy",
    healthScore: 94,
    riskScore: 18,
    predictedFailureDate: "2026-11-03",
    lastSeen: "1 min ago",
    telemetry: telemetry.map((p) => ({ ...p, risk: Math.max(8, p.risk - 38), cpu: p.cpu - 12 }))
  },
  {
    id: "dg-1004",
    name: "Factory Sensor BER-22",
    type: "IoT Sensor",
    location: "Berlin Plant",
    owner: "Manufacturing",
    status: "maintenance",
    healthScore: 63,
    riskScore: 67,
    predictedFailureDate: "2026-07-02",
    lastSeen: "3 min ago",
    telemetry: telemetry.map((p) => ({ ...p, vibration: p.vibration + 18, risk: p.risk + 7 }))
  },
  {
    id: "dg-1005",
    name: "Core Router SIN-02",
    type: "Network",
    location: "Singapore DC",
    owner: "Network Ops",
    status: "healthy",
    healthScore: 89,
    riskScore: 24,
    predictedFailureDate: "2026-10-18",
    lastSeen: "26 sec ago",
    telemetry: telemetry.map((p) => ({ ...p, memory: p.memory - 10, risk: Math.max(11, p.risk - 30) }))
  },
  {
    id: "dg-1006",
    name: "Payment Terminal ATL-88",
    type: "Retail Endpoint",
    location: "Atlanta Store",
    owner: "Retail IT",
    status: "warning",
    healthScore: 76,
    riskScore: 49,
    predictedFailureDate: "2026-08-09",
    lastSeen: "2 min ago",
    telemetry: telemetry.map((p) => ({ ...p, cpu: p.cpu + 9, risk: p.risk - 8 }))
  }
];

export const alerts: Alert[] = [
  {
    id: "al-01",
    deviceId: "dg-1001",
    device: "Edge Gateway NYC-01",
    title: "Thermal runaway predicted",
    severity: "critical",
    status: "open",
    timestamp: "2 min ago",
    description: "Fan RPM drift and chassis temperature are correlated with previous PSU failures."
  },
  {
    id: "al-02",
    deviceId: "dg-1004",
    device: "Factory Sensor BER-22",
    title: "Vibration anomaly",
    severity: "high",
    status: "acknowledged",
    timestamp: "18 min ago",
    description: "Bearing vibration exceeds learned baseline by 31 percent for three consecutive windows."
  },
  {
    id: "al-03",
    deviceId: "dg-1002",
    device: "HVAC Controller LON-12",
    title: "Memory pressure rising",
    severity: "medium",
    status: "open",
    timestamp: "41 min ago",
    description: "Controller memory saturation is trending toward service restart threshold."
  },
  {
    id: "al-04",
    deviceId: "dg-1006",
    device: "Payment Terminal ATL-88",
    title: "Patch compliance warning",
    severity: "low",
    status: "resolved",
    timestamp: "2 hr ago",
    description: "Terminal agent missed one update cycle and recovered on the following sync."
  }
];

export const insights: Insight[] = [
  {
    id: "in-01",
    title: "Replace NYC gateway PSU within 8 days",
    confidence: 94,
    impact: "critical",
    summary: "Temperature rise, power draw instability, and fan compensation match failure cluster FG-17.",
    recommendation: "Pre-stage a PSU, shift workload to standby gateway, and perform replacement during the next low traffic window."
  },
  {
    id: "in-02",
    title: "Tune BER-22 sensor mount",
    confidence: 87,
    impact: "high",
    summary: "Sustained vibration is likely mechanical looseness, not sensor drift.",
    recommendation: "Inspect the mount assembly, tighten fasteners, and recalibrate the sensor after maintenance."
  },
  {
    id: "in-03",
    title: "Increase HVAC memory threshold",
    confidence: 76,
    impact: "medium",
    summary: "Workload seasonality creates predictable peaks on weekdays between 09:00 and 11:00.",
    recommendation: "Schedule service restart weekly and tune alert threshold to reduce noise without hiding risk."
  }
];

export const maintenanceTasks: MaintenanceTask[] = [
  { id: "mt-01", title: "Replace PSU", device: "Edge Gateway NYC-01", owner: "A. Patel", window: "Jun 24, 01:00", stage: "scheduled", priority: "critical" },
  { id: "mt-02", title: "Inspect sensor mount", device: "Factory Sensor BER-22", owner: "M. Clark", window: "Jun 22, 09:00", stage: "recommended", priority: "high" },
  { id: "mt-03", title: "Firmware validation", device: "HVAC Controller LON-12", owner: "S. Ito", window: "Jun 28, 14:00", stage: "in_progress", priority: "medium" },
  { id: "mt-04", title: "Router optical check", device: "Core Router SIN-02", owner: "N. Lim", window: "Jul 02, 02:30", stage: "complete", priority: "low" }
];

export const integrations: Integration[] = [
  { name: "Nagios", status: "connected", events: 12840, latency: "112 ms" },
  { name: "Zabbix", status: "connected", events: 18200, latency: "96 ms" },
  { name: "Prometheus", status: "connected", events: 45800, latency: "41 ms" },
  { name: "Grafana", status: "available", events: 0, latency: "n/a" },
  { name: "SCOM", status: "degraded", events: 2410, latency: "488 ms" }
];

export const riskTrend = [
  { name: "Mon", predicted: 31, actual: 28, accuracy: 91 },
  { name: "Tue", predicted: 38, actual: 34, accuracy: 89 },
  { name: "Wed", predicted: 46, actual: 43, accuracy: 93 },
  { name: "Thu", predicted: 54, actual: 51, accuracy: 94 },
  { name: "Fri", predicted: 63, actual: 59, accuracy: 92 },
  { name: "Sat", predicted: 57, actual: 54, accuracy: 95 },
  { name: "Sun", predicted: 49, actual: 47, accuracy: 96 }
];

export const heatmap = ["Core", "Edge", "IoT", "Storage", "Retail"].map((group, y) =>
  Array.from({ length: 7 }, (_, x) => ({ group, day: `D${x + 1}`, value: 18 + ((x * 13 + y * 17) % 80) }))
);

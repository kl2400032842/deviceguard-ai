export type Severity = "critical" | "high" | "medium" | "low";
export type DeviceStatus = "healthy" | "warning" | "critical" | "maintenance";

export interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  owner: string;
  status: DeviceStatus;
  healthScore: number;
  riskScore: number;
  predictedFailureDate: string;
  lastSeen: string;
  telemetry: TelemetryPoint[];
}

export interface TelemetryPoint {
  time: string;
  cpu: number;
  memory: number;
  temperature: number;
  vibration: number;
  risk: number;
}

export interface Alert {
  id: string;
  deviceId: string;
  device: string;
  title: string;
  severity: Severity;
  status: "open" | "acknowledged" | "resolved";
  timestamp: string;
  description: string;
}

export interface Insight {
  id: string;
  title: string;
  confidence: number;
  impact: Severity;
  summary: string;
  recommendation: string;
}

export interface MaintenanceTask {
  id: string;
  title: string;
  device: string;
  owner: string;
  window: string;
  stage: "recommended" | "scheduled" | "in_progress" | "complete";
  priority: Severity;
}

export interface Integration {
  name: string;
  status: "connected" | "available" | "degraded";
  events: number;
  latency: string;
}

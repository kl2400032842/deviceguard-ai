import {
  Activity,
  Bell,
  Bot,
  BrainCircuit,
  CalendarClock,
  Gauge,
  GitBranch,
  LayoutDashboard,
  Network,
  Settings,
  ShieldAlert,
  TabletSmartphone,
  TrendingUp
} from "lucide-react";

export const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/devices", label: "Devices", icon: TabletSmartphone },
  { href: "/analytics", label: "Predictive Analytics", icon: TrendingUp },
  { href: "/alerts", label: "Alerts", icon: ShieldAlert },
  { href: "/maintenance", label: "Maintenance", icon: CalendarClock },
  { href: "/ai-insights", label: "AI Insights", icon: BrainCircuit },
  { href: "/root-cause", label: "Root Cause", icon: GitBranch },
  { href: "/integrations", label: "Integrations", icon: Network },
  { href: "/executive", label: "Executive", icon: Gauge },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/dashboard#activity", label: "Live Activity", icon: Activity },
  { href: "/ai-insights#copilot", label: "Copilot", icon: Bot }
];

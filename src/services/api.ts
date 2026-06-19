import { alerts, devices, heatmap, insights, integrations, maintenanceTasks, riskTrend } from "@/data/mock-data";

const wait = (ms = 260) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async getDashboard() {
    await wait();
    return { devices, alerts, insights, riskTrend };
  },
  async getDevices() {
    await wait();
    return devices;
  },
  async getDevice(id: string) {
    await wait();
    return devices.find((device) => device.id === id) ?? devices[0];
  },
  async getAlerts() {
    await wait();
    return alerts;
  },
  async getAnalytics() {
    await wait();
    return { riskTrend, heatmap };
  },
  async getMaintenance() {
    await wait();
    return maintenanceTasks;
  },
  async getInsights() {
    await wait();
    return insights;
  },
  async getIntegrations() {
    await wait();
    return integrations;
  }
};

"use client";

import { Bell, CheckCircle2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { alerts } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/use-app-store";

export function NotificationDrawer() {
  const { notificationsOpen, setNotificationsOpen, pushToast } = useAppStore();

  return (
    <AnimatePresence>
      {notificationsOpen && (
        <motion.aside initial={{ x: 420 }} animate={{ x: 0 }} exit={{ x: 420 }} className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 bg-neutral-950/95 shadow-panel backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <div className="flex items-center gap-3">
              <Bell className="size-5 text-primary" />
              <div>
                <p className="font-semibold text-white">Notification Center</p>
                <p className="text-xs text-muted-foreground">Realtime alerts and browser push readiness</p>
              </div>
            </div>
            <Button size="icon" variant="ghost" onClick={() => setNotificationsOpen(false)} aria-label="Close notifications"><X className="size-5" /></Button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            <Button
              className="w-full"
              variant="primary"
              onClick={() => {
                if ("Notification" in window) Notification.requestPermission();
                pushToast({ title: "Push permission requested", description: "Browser notification flow is wired for production service workers." });
              }}
            >
              <CheckCircle2 className="size-4" /> Enable Browser Push
            </Button>
            {alerts.map((alert) => (
              <div key={alert.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-white">{alert.title}</p>
                  <Badge label={alert.severity} tone={alert.severity} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{alert.device} - {alert.timestamp}</p>
                <p className="mt-3 text-sm text-muted-foreground">{alert.description}</p>
              </div>
            ))}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

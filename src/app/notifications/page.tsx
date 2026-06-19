"use client";

import { Bell, BellPlus, RadioTower } from "lucide-react";
import { AlertList, PageIntro } from "@/components/sections/common";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { alerts } from "@/data/mock-data";
import { useAppStore } from "@/store/use-app-store";

export default function NotificationsPage() {
  const { setNotificationsOpen, pushToast } = useAppStore();

  return (
    <>
      <PageIntro
        eyebrow="Notifications"
        title="Real-time notification center"
        description="Use the notification bell, browser push permission flow, and Socket.IO event stream for alert delivery."
        action={<Button variant="primary" onClick={() => setNotificationsOpen(true)}><Bell className="size-4" /> Open Bell</Button>}
      />
      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader><CardTitle>Browser Push Notification Support</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" onClick={() => { if ("Notification" in window) Notification.requestPermission(); pushToast({ title: "Push flow ready", description: "Permission request launched for browser notifications." }); }}>
              <BellPlus className="size-4" /> Enable Push
            </Button>
            <Button className="w-full" variant="primary" onClick={() => pushToast({ title: "Realtime alert", description: "A simulated Socket.IO notification was received." })}>
              <RadioTower className="size-4" /> Simulate Real-Time Alert
            </Button>
            <p className="text-sm text-muted-foreground">Production wiring can attach this flow to service workers, user subscriptions, and incident routing policies.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Notification Center</CardTitle></CardHeader>
          <CardContent><AlertList rows={alerts} /></CardContent>
        </Card>
      </div>
    </>
  );
}

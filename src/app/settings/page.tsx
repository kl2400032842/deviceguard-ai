"use client";

import { Shield, SlidersHorizontal, SunMoon, Users } from "lucide-react";
import { PageIntro } from "@/components/sections/common";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <>
      <PageIntro eyebrow="Settings" title="Control workspace behavior" description="Configure theme defaults, alert thresholds, user management, and role-based access." />
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle><SunMoon className="mr-2 inline size-4" /> Theme</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="primary">Dark Mode</Button>
            <Button>High Contrast</Button>
            <Button>System</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle><SlidersHorizontal className="mr-2 inline size-4" /> Alert Thresholds</CardTitle></CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            <label className="text-sm text-muted-foreground">Critical<Input defaultValue="80" className="mt-2" /></label>
            <label className="text-sm text-muted-foreground">High<Input defaultValue="65" className="mt-2" /></label>
            <label className="text-sm text-muted-foreground">Medium<Input defaultValue="45" className="mt-2" /></label>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle><Users className="mr-2 inline size-4" /> User Management</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {["Operations Admin", "Reliability Engineer", "Executive Viewer"].map((role) => (
              <div key={role} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.035] p-3">
                <span className="text-sm text-white">{role}</span>
                <Button size="sm">Manage</Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle><Shield className="mr-2 inline size-4" /> Role-Based Access</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <label className="flex items-center gap-3"><input type="checkbox" defaultChecked /> Require approval for alert resolution</label>
            <label className="flex items-center gap-3"><input type="checkbox" defaultChecked /> Restrict executive exports</label>
            <label className="flex items-center gap-3"><input type="checkbox" /> Allow integration self-service</label>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

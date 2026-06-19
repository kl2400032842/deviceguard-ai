"use client";

import { Cable, RefreshCcw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageIntro } from "@/components/sections/common";
import { api } from "@/services/api";
import { ErrorState, LoadingState } from "@/components/state-panels";

export default function IntegrationsPage() {
  const { data = [], isLoading, isError } = useQuery({ queryKey: ["integrations"], queryFn: api.getIntegrations });
  if (isLoading) return <LoadingState label="Loading integrations..." />;
  if (isError) return <ErrorState />;

  return (
    <>
      <PageIntro eyebrow="Integrations" title="Connect monitoring ecosystems" description="Normalize events from Nagios, Zabbix, Prometheus, Grafana, and SCOM into the DeviceGuard AI model layer." action={<Button variant="primary"><Cable className="size-4" /> Add Integration</Button>} />
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {data.map((integration) => (
          <Card key={integration.name}>
            <CardHeader>
              <CardTitle>{integration.name}</CardTitle>
              <Badge label={integration.status} tone={integration.status} />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md bg-white/[0.04] p-3">
                  <p className="text-muted-foreground">Events</p>
                  <p className="mt-1 text-lg font-semibold text-white">{integration.events.toLocaleString()}</p>
                </div>
                <div className="rounded-md bg-white/[0.04] p-3">
                  <p className="text-muted-foreground">Latency</p>
                  <p className="mt-1 text-lg font-semibold text-white">{integration.latency}</p>
                </div>
              </div>
              <Button className="mt-4 w-full"><RefreshCcw className="size-4" /> Sync Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

"use client";

import { CalendarDays, KanbanSquare, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageIntro } from "@/components/sections/common";
import { api } from "@/services/api";
import { ErrorState, LoadingState } from "@/components/state-panels";
import type { MaintenanceTask } from "@/types";

export default function MaintenancePage() {
  const { data = [], isLoading, isError } = useQuery({ queryKey: ["maintenance"], queryFn: api.getMaintenance });
  if (isLoading) return <LoadingState label="Loading maintenance center..." />;
  if (isError) return <ErrorState />;
  const stages: MaintenanceTask["stage"][] = ["recommended", "scheduled", "in_progress", "complete"];

  return (
    <>
      <PageIntro eyebrow="Maintenance center" title="Plan preventive work before failure" description="Coordinate scheduled maintenance, calendar windows, kanban workflow, and AI recommended actions." action={<Button variant="primary"><Sparkles className="size-4" /> Generate Plan</Button>} />
      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardHeader><CardTitle><CalendarDays className="mr-2 inline size-4" /> Calendar View</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {data.map((task) => (
              <div key={task.id} className="rounded-md border border-white/10 bg-white/[0.035] p-3">
                <p className="text-sm font-medium text-white">{task.window}</p>
                <p className="mt-2 text-xs text-muted-foreground">{task.title}</p>
                <Badge className="mt-3" label={task.priority} tone={task.priority} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle><KanbanSquare className="mr-2 inline size-4" /> Kanban Board</CardTitle></CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-4">
            {stages.map((stage) => (
              <div key={stage} className="min-h-52 rounded-md border border-white/10 bg-black/15 p-3">
                <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">{stage.replace("_", " ")}</p>
                {data.filter((task) => task.stage === stage).map((task) => (
                  <div key={task.id} className="mb-3 rounded-md border border-white/10 bg-white/[0.045] p-3">
                    <p className="text-sm font-medium text-white">{task.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{task.device}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{task.owner}</p>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

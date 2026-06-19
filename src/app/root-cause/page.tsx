"use client";

import { GitBranch, Network } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageIntro } from "@/components/sections/common";

const nodes = ["Failure", "Thermal Drift", "PSU Instability", "Fan Compensation", "Workload Spike", "Firmware"];
const deps = ["Gateway", "Power Rail", "Cooling", "Agent", "Network", "Storage"];

export default function RootCausePage() {
  return (
    <>
      <PageIntro eyebrow="Root cause analysis" title="Trace failure paths and dependencies" description="Explore an interactive failure tree and dependency graph ready to connect to topology and RCA services." />
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle><GitBranch className="mr-2 inline size-4" /> Interactive Failure Tree</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nodes.map((node, index) => (
                <div key={node} className="flex items-center gap-3" style={{ paddingLeft: index ? `${Math.min(index, 3) * 22}px` : 0 }}>
                  <span className="size-3 rounded-full bg-primary shadow-glow" />
                  <button className="rounded-md border border-white/10 bg-white/[0.045] px-3 py-2 text-left text-sm text-white hover:bg-white/[0.08]">{node}</button>
                  {index > 0 && <span className="text-xs text-muted-foreground">{92 - index * 7}% contribution</span>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle><Network className="mr-2 inline size-4" /> Dependency Graph</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {deps.map((dep, index) => (
                <div key={dep} className="relative rounded-lg border border-white/10 bg-white/[0.035] p-4 text-center">
                  <span className="mx-auto mb-3 flex size-10 items-center justify-center rounded-md bg-primary/15 text-primary">{index + 1}</span>
                  <p className="text-sm font-medium text-white">{dep}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{index % 2 ? "Dependent" : "Primary"}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

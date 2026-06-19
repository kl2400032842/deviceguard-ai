"use client";

import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DeviceTable, PageIntro } from "@/components/sections/common";
import { EmptyState, ErrorState, LoadingState } from "@/components/state-panels";

export default function DevicesPage() {
  const { data = [], isLoading, isError } = useQuery({ queryKey: ["devices"], queryFn: api.getDevices });
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const filtered = useMemo(
    () => data.filter((device) => (status === "all" || device.status === status) && `${device.name} ${device.type} ${device.location}`.toLowerCase().includes(query.toLowerCase())),
    [data, query, status]
  );

  if (isLoading) return <LoadingState label="Loading device inventory..." />;
  if (isError) return <ErrorState />;

  return (
    <>
      <PageIntro eyebrow="Inventory" title="Device fleet inventory" description="Search, filter, page through assets, and open device-level prediction details." />
      <Card>
        <CardHeader>
          <CardTitle>Device Inventory Table</CardTitle>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search devices" className="pl-9" />
            </div>
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-10 rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm text-white">
              {["all", "healthy", "warning", "critical", "maintenance"].map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <Button><Filter className="size-4" /> Filters</Button>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length ? <DeviceTable rows={filtered} /> : <EmptyState label="No devices match the current search and filters." />}
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
            <p className="text-xs text-muted-foreground">Page 1 of 1</p>
            <div className="flex gap-2">
              <Button size="sm"><ChevronLeft className="size-4" /> Previous</Button>
              <Button size="sm">Next <ChevronRight className="size-4" /></Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

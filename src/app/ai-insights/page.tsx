"use client";

import { Bot, BrainCircuit, MessageSquareText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InsightList, PageIntro } from "@/components/sections/common";
import { api } from "@/services/api";
import { useAppStore } from "@/store/use-app-store";
import { ErrorState, LoadingState } from "@/components/state-panels";

export default function AiInsightsPage() {
  const { data = [], isLoading, isError } = useQuery({ queryKey: ["insights"], queryFn: api.getInsights });
  const setCopilotOpen = useAppStore((state) => state.setCopilotOpen);
  if (isLoading) return <LoadingState label="Loading AI insights..." />;
  if (isError) return <ErrorState />;

  return (
    <>
      <PageIntro eyebrow="AI insights" title="Recommendations with explanations and confidence" description="Surface generated maintenance recommendations, failure explanations, and model confidence scores for operations teams." action={<Button id="copilot" variant="primary" onClick={() => setCopilotOpen(true)}><Bot className="size-4" /> Open Copilot</Button>} />
      <InsightList rows={data} />
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle><BrainCircuit className="mr-2 inline size-4" /> Failure Explanations</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Thermal drift is weighted heavily when paired with fan compensation and unstable power draw.</p>
            <p>Vibration anomalies are separated from sensor drift by checking peer equipment and recent maintenance records.</p>
            <p>Memory pressure predictions use weekly seasonality and firmware version cohorts to reduce false positives.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle><MessageSquareText className="mr-2 inline size-4" /> Backend-Ready AI Contract</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Insights are modeled as title, summary, impact, recommendation, and confidence fields.</p>
            <p>The Copilot drawer is ready to connect to hosted AI models, retrieval pipelines, or incident knowledge bases.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

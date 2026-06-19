import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function LoadingState({ label = "Loading intelligence..." }: { label?: string }) {
  return <Card className="flex min-h-40 items-center justify-center gap-3 p-6 text-muted-foreground"><Loader2 className="size-5 animate-spin" />{label}</Card>;
}

export function EmptyState({ label = "No data available yet." }: { label?: string }) {
  return <Card className="flex min-h-40 flex-col items-center justify-center gap-2 p-6 text-center text-muted-foreground"><Inbox className="size-6" />{label}</Card>;
}

export function ErrorState({ label = "Something went wrong while loading this view." }: { label?: string }) {
  return <Card className="flex min-h-40 flex-col items-center justify-center gap-2 p-6 text-center text-red-200"><AlertTriangle className="size-6" />{label}</Card>;
}

"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";
import { Button } from "@/components/ui/button";

export function Toasts() {
  const { toasts, dismissToast } = useAppStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            className="rounded-lg border border-white/10 bg-neutral-950/90 p-4 shadow-panel backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{toast.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{toast.description}</p>
              </div>
              <Button size="icon" variant="ghost" onClick={() => dismissToast(toast.id)} aria-label="Dismiss toast">
                <X className="size-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

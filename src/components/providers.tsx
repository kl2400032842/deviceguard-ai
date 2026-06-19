"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useAppStore } from "@/store/use-app-store";
import { getSocket } from "@/services/socket";
import { Toasts } from "@/components/toasts";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);
  const pushToast = useAppStore((state) => state.pushToast);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const socket = getSocket();
    socket?.on("deviceguard:alert", (payload) => pushToast(payload));

    const interval = window.setInterval(() => {
      pushToast({
        title: "Live signal received",
        description: "Risk model refreshed device health projections."
      });
    }, 18000);

    return () => {
      window.clearInterval(interval);
      socket?.off("deviceguard:alert");
    };
  }, [pushToast]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toasts />
    </QueryClientProvider>
  );
}

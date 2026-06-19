"use client";

import { create } from "zustand";

type Toast = { id: string; title: string; description: string };

interface AppState {
  commandOpen: boolean;
  copilotOpen: boolean;
  notificationsOpen: boolean;
  toasts: Toast[];
  setCommandOpen: (open: boolean) => void;
  setCopilotOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
  pushToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  commandOpen: false,
  copilotOpen: false,
  notificationsOpen: false,
  toasts: [],
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  setCopilotOpen: (copilotOpen) => set({ copilotOpen }),
  setNotificationsOpen: (notificationsOpen) => set({ notificationsOpen }),
  pushToast: (toast) =>
    set((state) => ({
      toasts: [{ ...toast, id: crypto.randomUUID() }, ...state.toasts].slice(0, 4)
    })),
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }))
}));

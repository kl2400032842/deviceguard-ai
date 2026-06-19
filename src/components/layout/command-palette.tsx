"use client";

import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { navItems } from "@/components/layout/nav";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/use-app-store";

export function CommandPalette({ onSelect }: { onSelect: (href: string) => void }) {
  const { commandOpen, setCommandOpen } = useAppStore();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => navItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <AnimatePresence>
      {commandOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 p-4 backdrop-blur-sm" onMouseDown={() => setCommandOpen(false)}>
          <motion.div
            initial={{ y: -20, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -20, scale: 0.98 }}
            className="mx-auto mt-20 max-w-2xl rounded-lg border border-white/10 bg-neutral-950/95 shadow-panel"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-white/10 p-3">
              <Search className="size-5 text-muted-foreground" />
              <Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pages, devices, alerts..." className="border-0 bg-transparent focus:ring-0" />
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => {
                      onSelect(item.href.split("#")[0]);
                      setCommandOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm text-muted-foreground hover:bg-white/[0.07] hover:text-white"
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </button>
                );
              })}
              {!filtered.length && <p className="p-8 text-center text-sm text-muted-foreground">No matching commands.</p>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

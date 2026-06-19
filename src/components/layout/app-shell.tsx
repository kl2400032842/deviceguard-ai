"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Bot, Command, Menu, Search, ShieldCheck, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { navItems } from "@/components/layout/nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";
import { CommandPalette } from "@/components/layout/command-palette";
import { Copilot } from "@/components/layout/copilot";
import { NotificationDrawer } from "@/components/layout/notification-drawer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setCommandOpen, setCopilotOpen, setNotificationsOpen } = useAppStore();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setCommandOpen]);

  const activeTitle = useMemo(() => navItems.find((item) => pathname.startsWith(item.href.split("#")[0]))?.label ?? "Dashboard", [pathname]);

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-neutral-950/70 backdrop-blur-xl lg:block">
        <Sidebar pathname={pathname} />
      </aside>

      <div className={cn("fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden", mobileOpen ? "block" : "hidden")}>
        <motion.aside initial={{ x: -320 }} animate={{ x: 0 }} className="h-full w-80 max-w-[86vw] border-r border-white/10 bg-neutral-950 p-3">
          <div className="mb-2 flex justify-end">
            <Button size="icon" variant="ghost" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="size-5" />
            </Button>
          </div>
          <Sidebar pathname={pathname} onNavigate={() => setMobileOpen(false)} />
        </motion.aside>
      </div>

      <main className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-background/70 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <Button size="icon" variant="ghost" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-muted-foreground">DeviceGuard AI / Predict. Prevent. Protect.</p>
              <h1 className="truncate text-lg font-semibold text-white">{activeTitle}</h1>
            </div>
            <div className="hidden w-full max-w-md md:block">
              <button
                onClick={() => setCommandOpen(true)}
                className="flex h-10 w-full items-center gap-2 rounded-md border border-white/10 bg-white/[0.05] px-3 text-left text-sm text-muted-foreground transition hover:bg-white/[0.08]"
              >
                <Search className="size-4" />
                Global search
                <span className="ml-auto rounded border border-white/10 px-2 py-0.5 text-xs">Ctrl K</span>
              </button>
            </div>
            <Button size="icon" variant="ghost" onClick={() => setCommandOpen(true)} aria-label="Open command palette">
              <Command className="size-5" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => setNotificationsOpen(true)} aria-label="Open notifications">
              <Bell className="size-5" />
            </Button>
            <Button size="icon" variant="primary" onClick={() => setCopilotOpen(true)} aria-label="Open copilot">
              <Bot className="size-5" />
            </Button>
          </div>
        </header>
        <div className="p-4 sm:p-6">{children}</div>
      </main>
      <CommandPalette onSelect={(href) => router.push(href)} />
      <Copilot />
      <NotificationDrawer />
    </div>
  );
}

function Sidebar({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col p-3">
      <Link href="/dashboard" className="mb-5 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3" onClick={onNavigate}>
        <span className="flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <ShieldCheck className="size-6" />
        </span>
        <span>
          <span className="block text-base font-bold text-white">DeviceGuard AI</span>
          <span className="text-xs text-muted-foreground">Predict. Prevent. Protect.</span>
        </span>
      </Link>
      <nav className="space-y-1 overflow-y-auto pr-1">
        {navItems.slice(0, 11).map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-white/[0.07] hover:text-white",
                active && "bg-primary/15 text-white ring-1 ring-primary/25"
              )}
            >
              <Icon className="size-4" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-lg border border-white/10 bg-white/[0.04] p-3">
        <p className="text-xs font-medium text-white">Realtime fabric</p>
        <p className="mt-1 text-xs text-muted-foreground">Socket.IO channel ready for backend event streams.</p>
      </div>
    </div>
  );
}

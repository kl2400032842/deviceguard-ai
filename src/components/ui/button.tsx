import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "icon";
};

export function Button({ className, variant = "secondary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "border-primary bg-primary text-primary-foreground shadow-glow hover:bg-primary/90",
        variant === "secondary" && "border-white/10 bg-white/[0.06] text-foreground hover:bg-white/[0.1]",
        variant === "ghost" && "border-transparent bg-transparent text-muted-foreground hover:bg-white/[0.07] hover:text-foreground",
        variant === "danger" && "border-danger/40 bg-danger/15 text-red-100 hover:bg-danger/25",
        size === "sm" && "h-8 px-3",
        size === "md" && "h-10 px-4",
        size === "icon" && "size-9 p-0",
        className
      )}
      {...props}
    />
  );
}

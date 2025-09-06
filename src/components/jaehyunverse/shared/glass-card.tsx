import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-card/50 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-primary/20 hover:border-white/20",
        className
      )}
    >
      {children}
    </div>
  );
}

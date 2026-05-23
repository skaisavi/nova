import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  padded?: boolean;
  intensity?: "default" | "soft" | "strong";
};

export function GlassCard({ className, padded = true, intensity = "default", ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-surface rounded-[1.75rem] transition duration-300",
        intensity === "soft" && "bg-white/[0.055] shadow-inset",
        intensity === "strong" && "shadow-[0_30px_100px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.12)]",
        padded && "p-5 sm:p-6",
        className
      )}
      {...props}
    />
  );
}

import { Radio } from "lucide-react";
import type { RealtimeStatus } from "@/lib/realtime";
import { cn } from "@/lib/utils";

const statusStyles: Record<RealtimeStatus, string> = {
  connecting: "border-amber-200/20 bg-amber-200/10 text-amber-100",
  live: "border-emerald-200/20 bg-emerald-200/10 text-emerald-100",
  offline: "border-white/10 bg-white/[0.08] text-muted-foreground"
};

const dotStyles: Record<RealtimeStatus, string> = {
  connecting: "bg-amber-200",
  live: "bg-emerald-200",
  offline: "bg-white/50"
};

export function LiveIndicator({
  className,
  label = "Live-ready",
  status = "live"
}: {
  className?: string;
  label?: string;
  status?: RealtimeStatus;
}) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-inset backdrop-blur-xl", statusStyles[status], className)}>
      <span className="relative flex size-2">
        {status !== "offline" ? <span className={cn("absolute inline-flex size-full animate-ping rounded-full opacity-60", dotStyles[status])} /> : null}
        <span className={cn("relative inline-flex size-2 rounded-full", dotStyles[status])} />
      </span>
      <Radio className="size-3" aria-hidden="true" />
      {label}
    </div>
  );
}

export function RealtimeIndicator(props: { className?: string; label?: string; status?: RealtimeStatus }) {
  return <LiveIndicator {...props} />;
}

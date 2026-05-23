import type { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

type StatCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
};

export function StatCard({ label, value, detail, icon: Icon }: StatCardProps) {
  return (
    <GlassCard intensity="soft" className="group">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-3 text-3xl font-semibold">{value}</p>
        </div>
        <span className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] shadow-inset transition group-hover:border-white/20">
          <Icon className="size-5 text-primary" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-5 text-sm text-muted-foreground">{detail}</p>
    </GlassCard>
  );
}

import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <GlassCard intensity="soft" className="flex min-h-64 flex-col items-center justify-center text-center">
      <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] shadow-inset">
        <PlusCircle className="size-6 text-primary" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      {actionLabel && actionHref ? (
        <Button className="mt-6" size="sm" asChild>
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </GlassCard>
  );
}

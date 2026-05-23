"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return (
    <GlassCard className="mx-auto mt-10 max-w-2xl text-center">
      <h1 className="text-3xl font-semibold">NOVA lost the workspace signal.</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        The dashboard could not load this view. Retry the request, or check the database connection if PostgreSQL is enabled.
      </p>
      <Button onClick={reset} className="mt-6">
        <RotateCcw className="size-4" aria-hidden="true" />
        Retry
      </Button>
    </GlassCard>
  );
}

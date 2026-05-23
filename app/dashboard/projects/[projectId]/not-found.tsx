import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export default function ProjectNotFound() {
  return (
    <GlassCard className="mx-auto mt-10 max-w-2xl text-center">
      <h1 className="text-3xl font-semibold">Project not found</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        This project either does not exist or is outside your current workspace access.
      </p>
      <Button asChild className="mt-6">
        <Link href="/dashboard/projects">Back to projects</Link>
      </Button>
    </GlassCard>
  );
}

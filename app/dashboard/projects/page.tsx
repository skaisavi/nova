import { Plus } from "lucide-react";
import { ProjectListFilter } from "@/components/dashboard/project-list-filter";
import { ProjectForm } from "@/components/forms/project-form";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { getWorkspaceProjects } from "@/lib/queries/projects";

export default async function ProjectsPage() {
  const projects = await getWorkspaceProjects();

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Project portfolio</p>
          <h1 className="mt-2 text-3xl font-medium sm:text-5xl">Every project has a clear signal.</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Search, filter, and review active client work from one place.</p>
        </div>
        <Button asChild>
          <a href="#create-project">
            <Plus className="size-4" aria-hidden="true" />
            Create project
          </a>
        </Button>
      </section>

      <ProjectListFilter projects={projects} />

      <GlassCard id="create-project">
        <div className="mb-5">
          <p className="text-sm font-medium text-primary">New project</p>
          <h2 className="mt-2 text-2xl font-medium">Add a project</h2>
        </div>
        <ProjectForm />
      </GlassCard>
    </div>
  );
}

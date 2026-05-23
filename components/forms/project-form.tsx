"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectAction, updateProjectAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { projectSchema, type ProjectFormInput } from "@/lib/validations";
import type { Project } from "@/lib/types";

type ProjectFormProps = {
  mode?: "create" | "edit";
  project?: Project;
  onSaved?: () => void;
};

export function ProjectForm({ mode = "create", project, onSaved }: ProjectFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const isEdit = mode === "edit";
  const form = useForm<ProjectFormInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name ?? "",
      client: project?.client ?? "",
      description: project?.description ?? "",
      status: project?.status ?? "PLANNING",
      priority: project?.priority ?? "MEDIUM",
      dueDate: project?.dueDate ?? ""
    }
  });

  function onSubmit(values: ProjectFormInput) {
    startTransition(async () => {
      const result = isEdit && project
        ? await updateProjectAction({ ...values, id: project.id })
        : await createProjectAction(values);

      if (result.ok && result.id && !isEdit) {
        router.push(`/dashboard/projects/${result.id}`);
      } else if (result.ok) {
        setMessage(result.message);
        onSaved?.();
        router.refresh();
      } else {
        setMessage(result.message);
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <label className="grid gap-2 text-sm">
        <span className="text-muted-foreground">Project name</span>
        <input disabled={isPending} className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:ring-2 focus:ring-ring" placeholder="Aurora Brand System" {...form.register("name")} />
        {form.formState.errors.name ? <span className="text-xs text-rose-200">{form.formState.errors.name.message}</span> : null}
      </label>
      <label className="grid gap-2 text-sm">
        <span className="text-muted-foreground">Client</span>
        <input disabled={isPending} className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:ring-2 focus:ring-ring" placeholder="Northstar Studio" {...form.register("client")} />
        {form.formState.errors.client ? <span className="text-xs text-rose-200">{form.formState.errors.client.message}</span> : null}
      </label>
      <label className="grid gap-2 text-sm">
        <span className="text-muted-foreground">Description</span>
        <textarea disabled={isPending} className="min-h-28 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:ring-2 focus:ring-ring" placeholder="Describe the project outcome and scope" {...form.register("description")} />
        {form.formState.errors.description ? <span className="text-xs text-rose-200">{form.formState.errors.description.message}</span> : null}
      </label>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="grid gap-2 text-sm">
          <span className="text-muted-foreground">Status</span>
          <select disabled={isPending} className="rounded-2xl border border-white/10 bg-nova-panel px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:ring-2 focus:ring-ring" {...form.register("status")}>
            <option value="PLANNING">Planning</option>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-muted-foreground">Priority</span>
          <select disabled={isPending} className="rounded-2xl border border-white/10 bg-nova-panel px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:ring-2 focus:ring-ring" {...form.register("priority")}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-muted-foreground">Due date</span>
          <input disabled={isPending} type="date" className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:ring-2 focus:ring-ring" {...form.register("dueDate")} />
          {form.formState.errors.dueDate ? <span className="text-xs text-rose-200">{form.formState.errors.dueDate.message}</span> : null}
        </label>
      </div>
      {message ? <p className="text-sm text-muted-foreground" role="status">{message}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? (isEdit ? "Saving..." : "Creating...") : isEdit ? "Save project" : "Create project"}
      </Button>
    </form>
  );
}

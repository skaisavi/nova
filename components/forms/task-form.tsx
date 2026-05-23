"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { taskSchema, type TaskFormInput } from "@/lib/validations";

type TaskFormProps = {
  projectOptions: {
    id: string;
    name: string;
  }[];
};

export function TaskForm({ projectOptions }: TaskFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<TaskFormInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      projectId: projectOptions[0]?.id ?? "",
      status: "TODO",
      priority: "MEDIUM",
      dueDate: ""
    }
  });

  function onSubmit(values: TaskFormInput) {
    startTransition(async () => {
      const result = await createTaskAction(values);
      setMessage(result.message);
      if (result.ok) {
        form.reset({
          title: "",
          projectId: projectOptions[0]?.id ?? "",
          status: "TODO",
          priority: "MEDIUM",
          dueDate: ""
        });
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <label className="grid gap-2 text-sm">
        <span className="text-muted-foreground">Task title</span>
        <input disabled={isPending} className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:ring-2 focus:ring-ring" placeholder="Write onboarding microcopy" {...form.register("title")} />
        {form.formState.errors.title ? <span className="text-xs text-rose-200">{form.formState.errors.title.message}</span> : null}
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="text-muted-foreground">Project</span>
          <select disabled={isPending || projectOptions.length === 0} className="rounded-2xl border border-white/10 bg-nova-panel px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:ring-2 focus:ring-ring" {...form.register("projectId")}>
            {projectOptions.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
          {form.formState.errors.projectId ? <span className="text-xs text-rose-200">{form.formState.errors.projectId.message}</span> : null}
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-muted-foreground">Due date</span>
          <input disabled={isPending} type="date" className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:ring-2 focus:ring-ring" {...form.register("dueDate")} />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="text-muted-foreground">Status</span>
          <select disabled={isPending} className="rounded-2xl border border-white/10 bg-nova-panel px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:ring-2 focus:ring-ring" {...form.register("status")}>
            <option value="BACKLOG">Backlog</option>
            <option value="TODO">To do</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="REVIEW">Review</option>
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
      </div>
      {message ? <p className="text-sm text-muted-foreground" role="status">{message}</p> : null}
      <Button type="submit" disabled={isPending || projectOptions.length === 0}>{projectOptions.length === 0 ? "Create a project first" : isPending ? "Creating..." : "Create task"}</Button>
    </form>
  );
}

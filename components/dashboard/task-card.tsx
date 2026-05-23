"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Circle, Loader2, MessageCircle, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PriorityBadge } from "@/components/ui/badges";
import { deleteTaskAction, updateTaskAction } from "@/lib/actions";
import { cn, formatRelativeDue } from "@/lib/utils";
import type { Priority, Task, TaskStatus } from "@/lib/types";

const STATUS_NEXT: Record<TaskStatus, TaskStatus> = {
  BACKLOG: "TODO",
  TODO: "IN_PROGRESS",
  IN_PROGRESS: "REVIEW",
  REVIEW: "DONE",
  DONE: "TODO"
};

const STATUS_LABELS: Record<TaskStatus, string> = {
  BACKLOG: "Backlog",
  TODO: "To do",
  IN_PROGRESS: "In progress",
  REVIEW: "In review",
  DONE: "Done"
};

const STATUS_COLORS: Record<TaskStatus, string> = {
  BACKLOG: "text-muted-foreground",
  TODO: "text-muted-foreground",
  IN_PROGRESS: "text-primary",
  REVIEW: "text-yellow-400",
  DONE: "text-emerald-400"
};

export function TaskCard({ task }: { task: Task }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editPending, startEditTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [priority, setPriority] = useState<Priority>(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const isDone = task.status === "DONE";

  useEffect(() => {
    setTitle(task.title);
    setStatus(task.status);
    setPriority(task.priority);
    setDueDate(task.dueDate);
  }, [task.dueDate, task.priority, task.status, task.title]);

  function advance() {
    startTransition(async () => {
      await updateTaskAction({ id: task.id, status: STATUS_NEXT[task.status] });
      router.refresh();
    });
  }

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    startDeleteTransition(async () => {
      const result = await deleteTaskAction(task.id);
      if (result.ok) {
        toast.success("Task deleted");
        router.refresh();
      } else {
        toast.error(result.message);
        setConfirmDelete(false);
      }
    });
  }

  function saveEdit() {
    startEditTransition(async () => {
      const result = await updateTaskAction({
        id: task.id,
        title,
        status,
        priority,
        dueDate,
        projectId: task.projectId
      });

      if (result.ok) {
        toast.success("Task saved");
        setEditing(false);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <article
      className={cn(
        "group rounded-3xl border border-white/10 bg-white/[0.08] p-4 transition",
        !isPending && "hover:bg-white/[0.12]",
        (isPending || deletePending || editPending) && "opacity-60"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className={cn("text-sm font-medium leading-6", isDone && "line-through text-muted-foreground")}>
          {task.title}
        </h3>
        <div className="flex items-center gap-1.5 shrink-0">
          <PriorityBadge priority={task.priority} />
          <button
            onClick={handleDelete}
            type="button"
            onBlur={() => setConfirmDelete(false)}
            disabled={deletePending}
            className={cn(
              "rounded-lg p-1 transition",
              confirmDelete
                ? "text-rose-400"
                : "text-muted-foreground/0 group-hover:text-muted-foreground/50 hover:!text-rose-400"
            )}
            aria-label={confirmDelete ? "Confirm delete task" : "Delete task"}
          >
            <Trash2 className="size-3" aria-hidden="true" />
          </button>
          <button
            onClick={() => setEditing((current) => !current)}
            type="button"
            disabled={editPending || deletePending}
            className="rounded-lg p-1 text-muted-foreground/60 transition hover:text-primary sm:text-muted-foreground/0 sm:group-hover:text-muted-foreground/50"
            aria-label={editing ? "Close task editor" : "Edit task"}
          >
            <Pencil className="size-3" aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{task.project}</p>
      <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>{task.assignee}</span>
        <span>{formatRelativeDue(task.dueDate)}</span>
        <span className="inline-flex items-center gap-1">
          <MessageCircle className="size-3" aria-hidden="true" />
          {task.comments}
        </span>
      </div>
      <button
        onClick={advance}
        type="button"
        disabled={isPending || deletePending || editPending}
        className={cn(
          "mt-4 flex w-full items-center gap-2 rounded-2xl border border-white/10 px-3 py-2 text-xs transition hover:bg-white/[0.08] active:scale-[0.98]",
          STATUS_COLORS[task.status]
        )}
      >
        {isPending ? (
          <Loader2 className="size-3.5 shrink-0 animate-spin" aria-hidden="true" />
        ) : isDone ? (
          <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
        ) : (
          <Circle className="size-3.5 shrink-0" aria-hidden="true" />
        )}
        <span className="flex-1 text-left">{STATUS_LABELS[task.status]}</span>
        {!isPending && !isDone && <ArrowRight className="size-3 shrink-0 opacity-40" aria-hidden="true" />}
        {!isPending && isDone && <span className="text-[10px] opacity-40">reopen</span>}
      </button>
      {editing ? (
        <div className="mt-4 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <label className="grid gap-1 text-xs text-muted-foreground">
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <div className="grid gap-2 sm:grid-cols-3">
            <label className="grid gap-1 text-xs text-muted-foreground">
              Status
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as TaskStatus)}
                className="rounded-xl border border-white/10 bg-nova-panel px-3 py-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="BACKLOG">Backlog</option>
                <option value="TODO">To do</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="REVIEW">Review</option>
                <option value="DONE">Done</option>
              </select>
            </label>
            <label className="grid gap-1 text-xs text-muted-foreground">
              Priority
              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value as Priority)}
                className="rounded-xl border border-white/10 bg-nova-panel px-3 py-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </label>
            <label className="grid gap-1 text-xs text-muted-foreground">
              Due
              <input
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                className="rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-full border border-white/10 px-3 py-2 text-xs text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveEdit}
              disabled={editPending || title.trim().length < 2}
              className="rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition disabled:opacity-50"
            >
              {editPending ? "Saving..." : "Save task"}
            </button>
          </div>
        </div>
      ) : null}
    </article>
  );
}

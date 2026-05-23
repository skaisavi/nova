"use client";

import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
  type DragEndEvent,
  type DragStartEvent
} from "@dnd-kit/core";
import { TaskCard } from "@/components/dashboard/task-card";
import { updateTaskAction } from "@/lib/actions";
import { dashboardTaskColumns } from "@/lib/queries/shared";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/lib/types";

function KanbanColumn({
  status,
  label,
  tasks,
  activeId
}: {
  status: TaskStatus;
  label: string;
  tasks: Task[];
  activeId: string | null;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "glass-surface w-72 shrink-0 rounded-[1.75rem] p-5 sm:p-6 transition-all duration-150 xl:w-auto",
        isOver ? "bg-white/[0.14] ring-1 ring-primary/40" : "bg-white/[0.07]"
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold">{label}</h2>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-muted-foreground">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) =>
          task.id === activeId ? (
            // Placeholder where the dragged card was
            <div
              key={task.id}
              className="h-[124px] rounded-3xl border border-dashed border-white/20 bg-white/[0.03]"
            />
          ) : (
            <DraggableCard key={task.id} task={task} />
          )
        )}

        {/* Empty drop target so empty columns still accept drops */}
        {tasks.filter((t) => t.id !== activeId).length === 0 && (
          <div className="h-16 rounded-3xl border border-dashed border-white/10" />
        )}
      </div>
    </div>
  );
}

function DraggableCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative",
        isDragging && "opacity-0 pointer-events-none"
      )}
      style={{
        transform: CSS.Translate.toString(transform)
      }}
    >
      <button
        type="button"
        className="absolute right-3 top-3 z-10 flex size-7 cursor-grab items-center justify-center rounded-full border border-white/10 bg-black/20 text-muted-foreground/70 backdrop-blur transition hover:text-foreground active:cursor-grabbing"
        aria-label={`Drag ${task.title}`}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-3.5" aria-hidden="true" />
      </button>
      <TaskCard task={task} />
    </div>
  );
}

export function KanbanBoard({ initialTasks }: { initialTasks: Task[] }) {
  const router = useRouter();
  const [tasks, setTasks] = useState(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;
    const task = tasks.find((t) => t.id === taskId);

    if (!task || task.status === newStatus) return;

    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));

    startTransition(async () => {
      await updateTaskAction({ id: taskId, status: newStatus });
      router.refresh();
    });
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="-mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6 xl:mx-0 xl:overflow-visible xl:px-0">
      <div className="flex min-w-max gap-4 pb-2 xl:grid xl:min-w-0 xl:grid-cols-4">
        {dashboardTaskColumns.map((column) => (
          <KanbanColumn
            key={column.status}
            status={column.status}
            label={column.label}
            tasks={tasks.filter((t) => t.status === column.status)}
            activeId={activeId}
          />
        ))}
      </div>
      </div>

      <DragOverlay dropAnimation={{ duration: 150, easing: "ease" }}>
        {activeTask && (
          <div className="w-72 cursor-grabbing opacity-95 shadow-2xl drop-shadow-2xl">
            <TaskCard task={activeTask} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, FolderKanban, Plus, Search, Settings, SquareCheckBig, X } from "lucide-react";
import { cn } from "@/lib/utils";

const commandItems = [
  {
    label: "Projects",
    description: "Search, filter, create, and open project work.",
    href: "/dashboard/projects",
    keywords: "projects clients portfolio",
    icon: FolderKanban
  },
  {
    label: "Create project",
    description: "Jump straight to the new project form.",
    href: "/dashboard/projects#create-project",
    keywords: "new create project",
    icon: Plus
  },
  {
    label: "Tasks",
    description: "Review tasks by delivery status.",
    href: "/dashboard/tasks",
    keywords: "tasks board todo review done",
    icon: SquareCheckBig
  },
  {
    label: "Create task",
    description: "Open the task creation form.",
    href: "/dashboard/tasks#create-task",
    keywords: "new create task",
    icon: Plus
  },
  {
    label: "Activity",
    description: "See workspace events and live-ready updates.",
    href: "/dashboard/activity",
    keywords: "activity comments realtime feed",
    icon: Activity
  },
  {
    label: "Settings",
    description: "Manage profile, workspace, theme, and safety settings.",
    href: "/dashboard/settings",
    keywords: "settings workspace profile theme",
    icon: Settings
  }
];

export function TopbarSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", onPointerDown);
    }

    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return commandItems;
    }

    return commandItems.filter((item) => {
      const haystack = `${item.label} ${item.description} ${item.keywords}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden min-h-11 flex-1 items-center gap-3 rounded-full border border-white/10 bg-white/[0.08] px-4 text-left shadow-inset transition hover:border-white/15 hover:bg-white/[0.1] md:flex"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Search className="size-4 text-muted-foreground" aria-hidden="true" />
        <span className="flex-1 text-sm text-muted-foreground">Search projects, tasks, clients...</span>
        <kbd className="rounded-full border border-white/10 bg-white/[0.08] px-2 py-1 text-[11px] text-muted-foreground">Ctrl K</kbd>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/55 px-4 py-20 backdrop-blur-sm" role="presentation">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search NOVA"
            className="mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#080a10]/95 shadow-[0_32px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
              <Search className="size-5 text-primary" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search commands, pages, and create actions..."
                className="min-h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={close}
                className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-muted-foreground transition hover:bg-white/[0.1] hover:text-foreground"
                aria-label="Close search"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[26rem] overflow-y-auto p-3">
              {filteredItems.length ? (
                filteredItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={close}
                      className={cn(
                        "flex items-start gap-3 rounded-3xl px-4 py-3 transition",
                        "hover:bg-white/[0.08] focus:bg-white/[0.08] focus:outline-none"
                      )}
                    >
                      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-primary">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-foreground">{item.label}</span>
                        <span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.description}</span>
                      </span>
                    </Link>
                  );
                })
              ) : (
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-6 text-center">
                  <p className="text-sm font-medium">No matching command</p>
                  <p className="mt-1 text-xs text-muted-foreground">Try projects, tasks, activity, or settings.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

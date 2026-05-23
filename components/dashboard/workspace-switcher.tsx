"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronsUpDown, Settings, Sparkles } from "lucide-react";

export function WorkspaceSwitcher({ workspaceName }: { workspaceName: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.08] p-3 text-left transition hover:bg-white/[0.12]"
      >
        <span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Sparkles className="size-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium">{workspaceName}</span>
          <span className="block truncate text-xs text-muted-foreground">Current workspace</span>
        </span>
        <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e16] shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-xs text-muted-foreground">Active workspace</p>
            <p className="mt-0.5 truncate text-sm font-medium">{workspaceName}</p>
          </div>
          <Link
            href="/dashboard/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
          >
            <Settings className="size-4 text-primary" aria-hidden="true" />
            Workspace settings
          </Link>
        </div>
      )}
    </div>
  );
}

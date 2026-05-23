"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FolderKanban, Menu, Plus, SquareCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopbarSearch } from "@/components/dashboard/topbar-search";
import { UserMenu } from "@/components/dashboard/user-menu";
import { useDashboard } from "@/components/dashboard/dashboard-provider";

export function Topbar() {
  const { setMobileOpen } = useDashboard();
  const [createOpen, setCreateOpen] = useState(false);
  const createRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (createRef.current && !createRef.current.contains(e.target as Node)) {
        setCreateOpen(false);
      }
    }
    if (createOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [createOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-nova-ink/75 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3">
        <Button
          variant="secondary"
          size="icon"
          className="lg:hidden"
          aria-label="Open navigation"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="size-5" aria-hidden="true" />
        </Button>

        <TopbarSearch />

        <div className="flex-1 md:hidden" />

        <div ref={createRef} className="relative hidden sm:block">
          <Button size="sm" onClick={() => setCreateOpen((o) => !o)} aria-expanded={createOpen}>
            <Plus className="size-4" aria-hidden="true" />
            Create
          </Button>
          {createOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e16] shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              <Link
                href="/dashboard/projects#create-project"
                onClick={() => setCreateOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
              >
                <FolderKanban className="size-4 text-primary" aria-hidden="true" />
                New project
              </Link>
              <Link
                href="/dashboard/tasks#create-task"
                onClick={() => setCreateOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
              >
                <SquareCheckBig className="size-4 text-primary" aria-hidden="true" />
                New task
              </Link>
            </div>
          )}
        </div>

        <UserMenu />
      </div>
    </header>
  );
}

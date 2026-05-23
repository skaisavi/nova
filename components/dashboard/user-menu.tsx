"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bell, LogOut, Settings, UserRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const label = session?.user?.name ?? session?.user?.email ?? "NOVA user";

  useEffect(() => {
    function handler(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handler);
    }

    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" size="icon" aria-label="View activity feed" asChild>
        <Link href="/dashboard/activity">
          <Bell className="size-4" aria-hidden="true" />
        </Link>
      </Button>
      <div ref={ref} className="relative">
        <button
          className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.08] py-1 pl-1 pr-3 transition hover:bg-white/[0.11]"
          onClick={() => setOpen((current) => !current)}
          type="button"
          aria-label="Open user menu"
          aria-expanded={open}
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-200 to-rose-200 text-nova-ink">
            <UserRound className="size-4" aria-hidden="true" />
          </span>
          <span className="hidden max-w-32 truncate text-sm font-medium sm:inline">
            {status === "loading" ? "Loading..." : label}
          </span>
        </button>

        {open ? (
          <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e16] shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <div className="border-b border-white/10 px-4 py-3">
              <p className="truncate text-sm font-medium">{label}</p>
              <p className="mt-1 text-xs text-muted-foreground">Signed in workspace</p>
            </div>
            <Link
              href="/dashboard/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
            >
              <Settings className="size-4 text-primary" aria-hidden="true" />
              Settings
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
            >
              <LogOut className="size-4 text-primary" aria-hidden="true" />
              Sign out
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { NavLink } from "@/components/dashboard/nav-link";
import { dashboardNavigation } from "@/components/dashboard/navigation";
import { WorkspaceSwitcher } from "@/components/dashboard/workspace-switcher";
import { cn } from "@/lib/utils";

export function Sidebar({ className, workspaceName }: { className?: string; workspaceName: string }) {
  return (
    <aside className={cn("hidden min-h-screen w-72 shrink-0 border-r border-white/10 bg-black/25 p-4 backdrop-blur-xl lg:sticky lg:top-0 lg:block", className)}>
      <Link href="/" className="mb-6 flex items-center gap-3 px-2 py-3">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-nova-ink">
          <Sparkles className="size-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-lg font-semibold">NOVA</span>
          <span className="block text-xs text-muted-foreground">Command centre</span>
        </span>
      </Link>
      <WorkspaceSwitcher workspaceName={workspaceName} />
      <nav className="mt-6 space-y-2" aria-label="Dashboard navigation">
        {dashboardNavigation.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>
      <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.08] p-4 shadow-inset">
        <p className="text-sm font-semibold">Protected workspace</p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Dashboard routes are guarded by NextAuth and scoped to the signed-in user&apos;s workspace.
        </p>
      </div>
    </aside>
  );
}

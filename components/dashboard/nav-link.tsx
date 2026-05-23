"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DashboardNavItem } from "@/components/dashboard/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  item: DashboardNavItem;
  compact?: boolean;
  onClick?: () => void;
};

export function NavLink({ item, compact = false, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
  const Icon = item.icon;

  if (compact) {
    return (
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        onClick={onClick}
        className={cn(
          "flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] text-muted-foreground transition",
          "hover:bg-white/[0.08] hover:text-foreground",
          isActive && "bg-white/[0.1] text-foreground"
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
        {item.shortLabel}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition",
        "hover:bg-white/[0.08] hover:text-foreground",
        isActive && "bg-white/[0.1] text-foreground shadow-inset"
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      {item.label}
    </Link>
  );
}

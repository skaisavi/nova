"use client";

import { NavLink } from "@/components/dashboard/nav-link";
import { dashboardNavigation } from "@/components/dashboard/navigation";

export function MobileNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-[1.5rem] border border-white/10 bg-nova-ink/90 p-2 shadow-glass backdrop-blur-xl lg:hidden" aria-label="Mobile dashboard navigation">
      {dashboardNavigation.map((item) => (
        <NavLink key={item.href} item={item} compact />
      ))}
    </nav>
  );
}

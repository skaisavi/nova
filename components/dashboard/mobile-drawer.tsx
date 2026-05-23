"use client";

import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { NavLink } from "@/components/dashboard/nav-link";
import { WorkspaceSwitcher } from "@/components/dashboard/workspace-switcher";
import { dashboardNavigation } from "@/components/dashboard/navigation";

export function MobileDrawer({ workspaceName }: { workspaceName: string }) {
  const { mobileOpen, setMobileOpen } = useDashboard();
  const close = () => setMobileOpen(false);

  return (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden="true"
          />
          <motion.aside
            className="fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#05060a]/95 p-4 backdrop-blur-xl lg:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            aria-label="Mobile navigation"
          >
            <div className="mb-6 flex items-center justify-between px-2 py-3">
              <Link href="/" className="flex items-center gap-3" onClick={close}>
                <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-[#05060a]">
                  <Sparkles className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-lg font-medium">NOVA</span>
                  <span className="block text-xs text-muted-foreground">Command centre</span>
                </span>
              </Link>
              <button
                onClick={close}
                className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-muted-foreground transition hover:bg-white/[0.12]"
                aria-label="Close navigation"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <WorkspaceSwitcher workspaceName={workspaceName} />
            <nav className="mt-6 space-y-1" aria-label="Mobile navigation">
              {dashboardNavigation.map((item) => (
                <NavLink key={item.href} item={item} onClick={close} />
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

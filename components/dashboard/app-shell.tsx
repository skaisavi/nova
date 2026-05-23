import type { ReactNode } from "react";
import { AuthSessionProvider } from "@/components/auth/auth-session-provider";
import { DashboardProvider } from "@/components/dashboard/dashboard-provider";
import { MobileDrawer } from "@/components/dashboard/mobile-drawer";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { getWorkspaceContext } from "@/lib/queries/workspace";

export async function AppShell({ children }: { children: ReactNode }) {
  const workspace = await getWorkspaceContext();
  const workspaceName = workspace?.workspaceName ?? "NOVA Workspace";

  return (
    <AuthSessionProvider>
      <DashboardProvider>
        <div className="min-h-screen bg-nova-radial">
        <a href="#dashboard-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground">
          Skip to dashboard content
        </a>
        <div className="flex min-h-screen">
          <Sidebar workspaceName={workspaceName} />
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar />
            <main id="dashboard-content" className="flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-10">
              <div className="mx-auto w-full max-w-[1600px]">{children}</div>
            </main>
          </div>
        </div>
        <MobileNav />
        <MobileDrawer workspaceName={workspaceName} />
        </div>
      </DashboardProvider>
    </AuthSessionProvider>
  );
}

import { Activity, FolderKanban, LayoutDashboard, Settings, SquareCheckBig, type LucideIcon } from "lucide-react";

export type DashboardNavItem = {
  href: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
};

export const dashboardNavigation: DashboardNavItem[] = [
  { href: "/dashboard", label: "Overview", shortLabel: "Home", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", shortLabel: "Projects", icon: FolderKanban },
  { href: "/dashboard/tasks", label: "Tasks", shortLabel: "Tasks", icon: SquareCheckBig },
  { href: "/dashboard/activity", label: "Activity", shortLabel: "Activity", icon: Activity },
  { href: "/dashboard/settings", label: "Settings", shortLabel: "Settings", icon: Settings }
];

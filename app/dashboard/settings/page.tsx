import { SettingsForms } from "@/components/dashboard/settings-forms";
import { getWorkspaceContext } from "@/lib/queries/workspace";

export default async function SettingsPage() {
  const workspace = await getWorkspaceContext();

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-medium text-primary">Settings</p>
        <h1 className="mt-2 text-3xl font-medium sm:text-5xl">Control the workspace with care.</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Manage your profile, workspace name, and preferences.</p>
      </section>

      <SettingsForms
        initialName={workspace?.userName ?? ""}
        initialWorkspaceName={workspace?.workspaceName ?? "My Workspace"}
      />
    </div>
  );
}

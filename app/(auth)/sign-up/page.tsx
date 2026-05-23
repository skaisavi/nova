import { SignUpForm } from "@/components/auth/sign-up-form";
import { GlassCard } from "@/components/ui/glass-card";

export default async function SignUpPage() {
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <p className="text-sm font-semibold uppercase text-primary">Create workspace</p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight sm:text-6xl">
          Start a premium project command centre.
        </h1>
        <p className="mt-5 max-w-xl leading-8 text-muted-foreground">
          Create a NOVA account and get a default workspace ready for projects, tasks, comments, and activity.
        </p>
      </div>
      <GlassCard intensity="strong" className="mx-auto w-full max-w-md">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Create account</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Sign-up stores a hashed password and creates your first workspace.
          </p>
        </div>
        <SignUpForm />
      </GlassCard>
    </section>
  );
}

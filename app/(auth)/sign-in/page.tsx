import { SignInForm } from "@/components/auth/sign-in-form";
import { GlassCard } from "@/components/ui/glass-card";

type SignInPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams;

  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <p className="text-sm font-semibold uppercase text-primary">Welcome back</p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight sm:text-6xl">
          Sign in to your NOVA workspace.
        </h1>
        <p className="mt-5 max-w-xl leading-8 text-muted-foreground">
          Return to your project command centre, activity stream, tasks, and client-ready workspace.
        </p>
      </div>
      <GlassCard intensity="strong" className="mx-auto w-full max-w-md">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Access dashboard</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Use your account details or open the demo workspace.
          </p>
        </div>
        <SignInForm callbackUrl={callbackUrl ?? "/dashboard"} />
      </GlassCard>
    </section>
  );
}

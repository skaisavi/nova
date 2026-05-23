"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { signInSchema, type SignInInput } from "@/lib/validations/auth";

const demoCredentials = {
  email: "skaiste@nova.dev",
  password: "nova-demo"
} satisfies SignInInput;

export function SignInForm({ callbackUrl = "/dashboard" }: { callbackUrl?: string }) {
  const router = useRouter();
  const [message, setMessage] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  function submit(values: SignInInput) {
    setMessage(undefined);

    startTransition(async () => {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl
      });

      if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
        return;
      }

      setMessage("Those credentials did not match a NOVA account.");
    });
  }

  function demoLogin() {
    form.reset(demoCredentials);
    form.clearErrors();
    submit(demoCredentials);
  }

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
      <label className="grid gap-2 text-sm">
        <span className="text-muted-foreground">Email</span>
        <input className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 outline-none transition focus:ring-2 focus:ring-ring" type="email" autoComplete="email" placeholder="skaiste@nova.dev" {...form.register("email")} />
        {form.formState.errors.email ? <span className="text-xs text-rose-200">{form.formState.errors.email.message}</span> : null}
      </label>
      <label className="grid gap-2 text-sm">
        <span className="text-muted-foreground">Password</span>
        <input className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 outline-none transition focus:ring-2 focus:ring-ring" type="password" autoComplete="current-password" placeholder="nova-demo" {...form.register("password")} />
        {form.formState.errors.password ? <span className="text-xs text-rose-200">{form.formState.errors.password.message}</span> : null}
      </label>
      {message ? <p className="text-sm text-rose-100" role="status">{message}</p> : null}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}
        Sign in
      </Button>
      <Button type="button" variant="secondary" className="w-full" onClick={demoLogin} disabled={isPending}>
        <Sparkles className="size-4" aria-hidden="true" />
        Use demo workspace
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        New to NOVA?{" "}
        <Link href="/sign-up" className="font-medium text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { registerUserAction } from "@/lib/auth-actions";
import { signUpSchema, type SignUpInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";

export function SignUpForm() {
  const router = useRouter();
  const [message, setMessage] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  function submit(values: SignUpInput) {
    startTransition(async () => {
      const result = await registerUserAction(values);
      setMessage(result.message);

      if (!result.ok) {
        return;
      }

      const signInResult = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/dashboard"
      });

      if (signInResult?.ok) {
        router.push("/dashboard");
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
      <label className="grid gap-2 text-sm">
        <span className="text-muted-foreground">Name</span>
        <input className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 outline-none transition focus:ring-2 focus:ring-ring" autoComplete="name" placeholder="Skaiste" {...form.register("name")} />
        {form.formState.errors.name ? <span className="text-xs text-rose-200">{form.formState.errors.name.message}</span> : null}
      </label>
      <label className="grid gap-2 text-sm">
        <span className="text-muted-foreground">Email</span>
        <input className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 outline-none transition focus:ring-2 focus:ring-ring" type="email" autoComplete="email" placeholder="skaiste@nova.dev" {...form.register("email")} />
        {form.formState.errors.email ? <span className="text-xs text-rose-200">{form.formState.errors.email.message}</span> : null}
      </label>
      <label className="grid gap-2 text-sm">
        <span className="text-muted-foreground">Password</span>
        <input className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 outline-none transition focus:ring-2 focus:ring-ring" type="password" autoComplete="new-password" placeholder="At least 8 characters" {...form.register("password")} />
        {form.formState.errors.password ? <span className="text-xs text-rose-200">{form.formState.errors.password.message}</span> : null}
      </label>
      {message ? <p className="text-sm text-muted-foreground" role="status">{message}</p> : null}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}
        Create account
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

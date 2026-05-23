import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Command,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Radio,
  Sparkles,
  Workflow
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PriorityBadge, StatusBadge } from "@/components/ui/badges";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { RealtimeIndicator } from "@/components/ui/live-indicator";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects, tasks } from "@/lib/mock-data";

const features = [
  {
    title: "Project rooms with context",
    description: "Milestones, tasks, comments, deadlines, and decisions stay attached to the work they belong to.",
    icon: Layers3
  },
  {
    title: "Activity that can go live",
    description: "Event naming, channels, and activity logs are already shaped for realtime collaboration.",
    icon: Radio
  },
  {
    title: "A portfolio case study engine",
    description: "NOVA demonstrates UI craft, relational modeling, validation, and full-stack architecture in one product.",
    icon: Sparkles
  },
  {
    title: "Calm execution workflows",
    description: "Priorities, statuses, and upcoming deadlines remain visible without turning the interface into noise.",
    icon: Workflow
  }
];

const workflow = [
  {
    title: "Create a workspace",
    copy: "Separate clients, collaborators, portfolio experiments, and learning projects with clear ownership."
  },
  {
    title: "Turn briefs into motion",
    copy: "Convert project scope into tasks, priorities, due dates, comments, and activity history."
  },
  {
    title: "Ship with a visible pulse",
    copy: "Use the dashboard, activity feed, and live-ready events to keep every move explainable."
  }
];

const metrics = [
  ["Active projects", "03"],
  ["Completed tasks", "35"],
  ["Workspace health", "92%"]
];

export default function LandingPage() {
  const featuredProject = projects[0];
  const secondaryProject = projects[1];

  return (
    <main className="min-h-screen overflow-hidden bg-nova-radial">
      <div className="pointer-events-none fixed inset-0 premium-grid opacity-50" aria-hidden="true" />
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="NOVA home">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-nova-ink shadow-[0_0_60px_rgba(255,255,255,0.18)]">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-lg font-semibold">NOVA</span>
            <span className="hidden text-xs text-muted-foreground sm:block">Project command centre</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="#features">Features</Link>
          </Button>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/dashboard">
              Launch preview <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 md:gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-28 lg:pt-16">
        <Reveal>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <RealtimeIndicator label="Realtime-ready architecture" />
              <span className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs font-medium text-muted-foreground">
                Prisma + PostgreSQL foundation
              </span>
            </div>
            <h1 className="mt-8 max-w-4xl text-balance text-5xl font-medium leading-[1.1] sm:text-6xl lg:text-7xl">
              Command every project from one luminous workspace.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              NOVA is a premium full-stack command centre for freelancers, junior developers, portfolio builders, and creative teams who need work to feel calm, current, and client-ready.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Explore dashboard <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="#workflow">See workflow</Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {metrics.map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 shadow-inset backdrop-blur-xl">
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative">
            <div className="absolute -inset-1 rounded-[2.25rem] bg-gradient-to-br from-cyan-200/25 via-white/10 to-rose-200/20 blur-xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-nova-ink/78 p-4 shadow-glass backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Workspace pulse</p>
                  <h2 className="mt-1 text-2xl font-medium">{featuredProject.name}</h2>
                </div>
                <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08]">
                  <Command className="size-6 text-primary" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-[0.58fr_0.42fr]">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5">
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={featuredProject.status} />
                    <PriorityBadge priority={featuredProject.priority} />
                  </div>
                  <p className="mt-5 text-sm leading-6 text-muted-foreground">{featuredProject.description}</p>
                  <div className="mt-6">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{featuredProject.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className={`h-full rounded-full bg-gradient-to-r ${featuredProject.accent}`} style={{ width: `${featuredProject.progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5">
                    <CalendarDays className="size-5 text-primary" aria-hidden="true" />
                    <p className="mt-4 text-3xl font-semibold">14 days</p>
                    <p className="mt-1 text-xs text-muted-foreground">until next major delivery</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5">
                    <MessageSquareText className="size-5 text-primary" aria-hidden="true" />
                    <p className="mt-4 text-3xl font-semibold">18</p>
                    <p className="mt-1 text-xs text-muted-foreground">comments and decisions captured</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {tasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.07] p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{task.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{task.project}</p>
                    </div>
                    <CheckCircle2 className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="features" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Built for momentum"
            title="A full-stack product system with a portfolio-worthy finish."
            description="The visual language stays dark, glassy, precise, and useful: designed for repeated work, not a decorative one-off."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.06}>
              <GlassCard className="min-h-60 overflow-hidden" intensity={index === 0 ? "strong" : "soft"}>
                <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08]">
                  <feature.icon className="size-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-2xl font-medium">{feature.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{feature.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="workflow" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div className="flex flex-col justify-center">
              <SectionHeading
                eyebrow="How it works"
                title="A calmer way to explain complex work."
                description="NOVA is structured so a junior developer can explain the product story, the schema, and the realtime path in an interview."
              />
            </div>
          </Reveal>
          <div className="space-y-4">
            {workflow.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-6 shadow-inset backdrop-blur-xl">
                  <span className="text-sm font-semibold text-primary">0{index + 1}</span>
                  <h3 className="mt-4 text-2xl font-medium">{step.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{step.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.055] px-5 py-10 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:px-10 sm:py-12 lg:px-14 lg:py-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,233,255,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,167,255,0.14),transparent_36%)]" aria-hidden="true" />
              <div className="relative mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase text-primary">Ready for the case study</p>
                <h2 className="mt-5 text-balance text-4xl font-medium leading-snug sm:text-5xl lg:text-6xl">
                  Make the portfolio project feel like a real product.
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
                  NOVA gives you a polished interface, a real data model, and a clear growth path toward authenticated realtime collaboration.
                </p>
                <Button asChild className="mt-8" size="lg">
                  <Link href="/dashboard">
                    Open command centre <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>

              <div className="relative mt-12 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-6 shadow-inset backdrop-blur-xl">
                  <LockKeyhole className="size-7 text-primary" aria-hidden="true" />
                  <h3 className="mt-6 text-2xl font-medium">Auth-ready. Database-ready. Realtime-ready.</h3>
                  <p className="mt-4 leading-7 text-muted-foreground">
                    The dashboard has protected routes, a Prisma layer, server actions, activity logging, validation schemas, and realtime-ready update hooks.
                  </p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-6 shadow-inset backdrop-blur-xl">
                  <p className="text-sm text-muted-foreground">Featured workspace</p>
                  <h3 className="mt-2 text-2xl font-medium">{secondaryProject.name}</h3>
                  <p className="mt-4 leading-7 text-muted-foreground">{secondaryProject.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <StatusBadge status={secondaryProject.status} />
                    <PriorityBadge priority={secondaryProject.priority} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

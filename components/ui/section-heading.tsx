import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "mx-auto max-w-3xl text-center lg:items-center",
        className
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow ? <p className="text-sm font-semibold uppercase text-primary">{eyebrow}</p> : null}
        <h2 className="mt-3 text-balance text-4xl font-medium leading-snug sm:text-5xl">{title}</h2>
        {description ? <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

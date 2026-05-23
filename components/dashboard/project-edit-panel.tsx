"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { ProjectForm } from "@/components/forms/project-form";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/types";

export function ProjectEditPanel({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full lg:w-[28rem]">
      <Button variant="secondary" size="sm" onClick={() => setOpen((current) => !current)} aria-expanded={open}>
        <Pencil className="size-4" aria-hidden="true" />
        {open ? "Close edit" : "Edit project"}
      </Button>
      {open ? (
        <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-4">
          <ProjectForm mode="edit" project={project} onSaved={() => setOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}

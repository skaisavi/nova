# AGENTS.md — NOVA Full-Stack Project Rules

This file defines how AI coding agents should work inside the NOVA project.

NOVA is a premium full-stack portfolio application built with Next.js, TypeScript, PostgreSQL, Prisma, authentication, and real-time features.

The agent must follow these rules exactly unless the user explicitly overrides them.

---

# 1. Project Summary

## Name

NOVA

## Type

Full-stack SaaS-style portfolio project.

## Description

NOVA is a real-time project command centre for freelancers, creative teams, junior developers, and portfolio builders. It helps users manage projects, tasks, comments, deadlines, activity, and progress in one premium workspace.

## Main Goal

Build a production-quality full-stack app that looks visually impressive and demonstrates strong engineering and UI/UX ability.

This project must be good enough to show to employers.

---

# 2. Main Tech Stack

Use the following stack:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- Prisma ORM
- Authentication
- Real-time updates
- Zod validation
- React Hook Form
- Framer Motion
- Lucide React icons

Do not replace the stack unless explicitly asked.

---

# 3. Golden Rules

Always follow these rules:

1. Write production-quality code.
2. Use TypeScript properly.
3. Avoid `any`.
4. Keep components reusable.
5. Keep UI premium and polished.
6. Maintain the design system.
7. Use server components by default.
8. Use client components only when interactivity is needed.
9. Validate all user inputs.
10. Handle loading states.
11. Handle empty states.
12. Handle error states.
13. Keep accessibility in mind.
14. Keep mobile responsiveness in mind.
15. Avoid tutorial-looking UI.
16. Avoid generic dashboards.
17. Avoid overcomplicated code.
18. Do not expose secrets.
19. Use environment variables safely.
20. Prefer clean, simple, maintainable solutions.

---

# 4. Design Quality Rules

The UI must feel:

- Premium
- Modern
- Soft
- Calm
- Glassy
- Spacious
- Apple-inspired
- Slightly futuristic
- Portfolio-worthy

The UI must not feel:

- Basic
- Bootstrap-like
- Overcrowded
- Random
- Flat and boring
- Cheap
- Corporate template-like
- Tutorial-generated

Use:

- Rounded cards
- Soft borders
- Subtle glass effects
- Layered surfaces
- Gentle gradients
- Clean typography
- Smooth microinteractions
- High-quality empty states
- Consistent spacing

Avoid:

- Bright random colours
- Harsh shadows
- Too many borders
- Tiny unreadable labels
- Messy grids
- Inconsistent spacing
- Fake-looking placeholder content

---

# 5. Design Tokens

Use CSS variables for theme values.

Do not hardcode random colours throughout components.

## Dark Theme

```css
:root {
  --background: #07080d;
  --background-soft: #0c0e16;
  --surface: rgba(255, 255, 255, 0.06);
  --surface-strong: rgba(255, 255, 255, 0.1);
  --surface-muted: rgba(255, 255, 255, 0.035);
  --border: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.18);
  --text: #f7f7fb;
  --text-muted: #a5a8b8;
  --text-soft: #74788c;
  --primary: #b8a6ff;
  --primary-strong: #8f75ff;
  --secondary: #9be7ff;
  --accent: #ffb7e8;
  --success: #8df5b3;
  --warning: #ffd580;
  --danger: #ff8f8f;
}
```

## Visual Treatment

Use Tailwind classes that resemble:

```txt
rounded-[28px]
border border-white/10
bg-white/[0.06]
backdrop-blur-2xl
shadow-[0_24px_80px_rgba(0,0,0,0.35)]
```

But avoid repeating long class strings everywhere. Create reusable components where appropriate.

---

# 6. Typography Rules

Use strong visual hierarchy.

Recommended fonts:

- Sans: Geist, Inter, or Satoshi
- Mono: Geist Mono or JetBrains Mono
- Optional display: Instrument Serif

Rules:

- Hero headings should be large and editorial.
- Dashboard text should be clean and readable.
- Labels can be smaller but must remain readable.
- Use muted text for secondary information.
- Avoid too many font weights.
- Avoid cramped line heights.

Preferred Tailwind patterns:

```txt
text-balance
tracking-tight
leading-none
leading-relaxed
text-muted-foreground
```

---

# 7. Folder Structure

Use this general structure:

```txt
src/
  app/
    (auth)/
      sign-in/
        page.tsx
      sign-up/
        page.tsx
    (marketing)/
      page.tsx
    (dashboard)/
      dashboard/
        page.tsx
      projects/
        page.tsx
        [projectId]/
          page.tsx
      tasks/
        page.tsx
      activity/
        page.tsx
      settings/
        page.tsx
    api/
      projects/
      tasks/
      comments/
      activity/
  components/
    ui/
    layout/
    marketing/
    dashboard/
    projects/
    tasks/
    activity/
    forms/
    shared/
  lib/
    auth.ts
    db.ts
    utils.ts
    validations/
    actions/
    realtime.ts
  hooks/
  types/
  prisma/
```

If the project already has a structure, respect it and improve it without unnecessary disruption.

---

# 8. Naming Conventions

Use clear names.

## Components

Use PascalCase:

```txt
ProjectCard.tsx
TaskBoard.tsx
ActivityFeed.tsx
CreateProjectDialog.tsx
```

## Hooks

Use camelCase and start with `use`:

```txt
useProjects.ts
useRealtimeActivity.ts
useDebounce.ts
```

## Utilities

Use camelCase:

```txt
formatDate.ts
calculateProjectProgress.ts
getProjectHealth.ts
```

## Database Models

Use PascalCase:

```txt
User
Workspace
Project
Task
Comment
ActivityLog
```

## Constants

Use uppercase where appropriate:

```txt
PROJECT_STATUSES
TASK_PRIORITIES
```

---

# 9. TypeScript Rules

Use TypeScript carefully.

Rules:

- Do not use `any`.
- Prefer inferred types when clean.
- Create explicit types for component props.
- Use Prisma-generated types where useful.
- Use Zod schemas for form validation.
- Keep types close to the feature when feature-specific.
- Use shared `/types` only for genuinely shared types.

Good:

```tsx
type ProjectCardProps = {
  project: {
    id: string;
    name: string;
    description: string | null;
    status: ProjectStatus;
    priority: ProjectPriority;
    dueDate: Date | null;
  };
};
```

Bad:

```tsx
function ProjectCard({ project }: any) {
  ...
}
```

---

# 10. Component Rules

Components should be:

- Small
- Reusable
- Typed
- Responsive
- Accessible
- Visually consistent

Avoid giant components.

If a page becomes too large, split it into:

- Header component
- Stats component
- List component
- Card component
- Form component
- Empty state component

Example:

```txt
dashboard/
  DashboardHeader.tsx
  DashboardStats.tsx
  ActiveProjects.tsx
  UpcomingDeadlines.tsx
  RecentActivity.tsx
```

---

# 11. Server and Client Component Rules

Use Server Components by default.

Use `"use client"` only when needed for:

- State
- Effects
- Event handlers
- Forms with client interaction
- Animations
- Dialogs
- Dropdowns
- Real-time subscriptions

Do not add `"use client"` to entire pages unless necessary.

Keep data fetching on the server when possible.

---

# 12. Database Rules

Use Prisma and PostgreSQL.

Database logic must be:

- Relational
- Clean
- Properly indexed where needed
- Secure
- User-scoped
- Workspace-scoped

Never allow users to access another user’s workspace data.

Always filter data by authenticated user/workspace membership.

---

# 13. Prisma Schema Requirements

The database should support:

- Users
- Workspaces
- Workspace members
- Projects
- Tasks
- Comments
- Activity logs

Suggested models:

```prisma
model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  image     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  ownedWorkspaces Workspace[]       @relation("WorkspaceOwner")
  memberships     WorkspaceMember[]
  comments        Comment[]
  activityLogs    ActivityLog[]
}

model Workspace {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  ownerId   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  owner       User              @relation("WorkspaceOwner", fields: [ownerId], references: [id])
  members     WorkspaceMember[]
  projects    Project[]
  activityLog ActivityLog[]
}

model WorkspaceMember {
  id          String        @id @default(cuid())
  userId      String
  workspaceId String
  role        WorkspaceRole @default(MEMBER)
  createdAt   DateTime      @default(now())

  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  workspace Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  @@unique([userId, workspaceId])
}

model Project {
  id          String        @id @default(cuid())
  workspaceId String
  name        String
  slug        String
  description String?
  status      ProjectStatus @default(PLANNING)
  priority    Priority      @default(MEDIUM)
  dueDate     DateTime?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  workspace Workspace     @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  tasks     Task[]
  comments  Comment[]
  activity  ActivityLog[]

  @@unique([workspaceId, slug])
}

model Task {
  id          String     @id @default(cuid())
  projectId   String
  title       String
  description String?
  status      TaskStatus @default(TODO)
  priority    Priority   @default(MEDIUM)
  dueDate     DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  project  Project       @relation(fields: [projectId], references: [id], onDelete: Cascade)
  comments Comment[]
  activity ActivityLog[]
}

model Comment {
  id        String   @id @default(cuid())
  body      String
  userId    String
  projectId String?
  taskId    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user    User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  project Project? @relation(fields: [projectId], references: [id], onDelete: Cascade)
  task    Task?    @relation(fields: [taskId], references: [id], onDelete: Cascade)
}

model ActivityLog {
  id          String       @id @default(cuid())
  workspaceId String
  projectId   String?
  taskId      String?
  userId      String
  type        ActivityType
  message     String
  metadata    Json?
  createdAt   DateTime     @default(now())

  workspace Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  project   Project?  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  task      Task?     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum WorkspaceRole {
  OWNER
  ADMIN
  MEMBER
  VIEWER
}

enum ProjectStatus {
  PLANNING
  ACTIVE
  PAUSED
  COMPLETED
  ARCHIVED
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  REVIEW
  DONE
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum ActivityType {
  PROJECT_CREATED
  PROJECT_UPDATED
  PROJECT_COMPLETED
  TASK_CREATED
  TASK_UPDATED
  TASK_COMPLETED
  COMMENT_CREATED
  MEMBER_JOINED
}
```

Adjust only if necessary.

---

# 14. Authentication Rules

Authentication must protect private routes.

Requirements:

- Unauthenticated users cannot access dashboard pages.
- Authenticated users should be redirected away from sign-in/sign-up pages when appropriate.
- User data must be linked to database records.
- Workspace data must be scoped to the signed-in user.
- Auth UI must look premium.

Do not leave default-looking auth screens.

---

# 15. Form and Validation Rules

Use:

- React Hook Form
- Zod
- TypeScript-safe validation
- Clear error messages

Every form must include:

- Labels
- Error messages
- Loading state
- Disabled submit state while submitting
- Success feedback
- Accessible controls

Forms needed:

- Create project
- Edit project
- Create task
- Edit task
- Add comment
- Workspace settings
- Profile settings

Never trust client-side validation only. Validate again on the server.

---

# 16. Server Action / API Rules

For mutations:

- Check authentication.
- Validate input.
- Check workspace permissions.
- Perform database action.
- Create activity log if relevant.
- Revalidate paths or update client state.
- Return useful success/error response.

Example mutation flow:

```txt
User submits create project form
→ Validate with Zod
→ Check session
→ Check workspace access
→ Create project in database
→ Create activity log
→ Trigger real-time update if used
→ Return success
→ Show toast
→ Update UI
```

---

# 17. Real-Time Rules

Real-time features must feel intentional.

Use real-time for:

- Project comments
- Activity feed
- Task updates
- Online presence if added

Minimum real-time feature:

- When a comment or activity log is created, the project/activity UI updates without a manual refresh.

Real-time UI requirements:

- Show a “Live” badge or pulsing dot.
- Animate new items softly.
- Avoid noisy notifications.
- Keep the experience calm.

---

# 18. Page Rules

Every page must have:

- Proper heading
- Clear hierarchy
- Loading state
- Empty state
- Error state where relevant
- Responsive layout
- Accessible controls
- Polished design

No page should look unfinished.

---

# 19. Required Pages

Build these pages unless told otherwise:

```txt
/
```

Marketing landing page.

```txt
/sign-in
```

Sign-in page.

```txt
/sign-up
```

Sign-up page.

```txt
/dashboard
```

Main overview dashboard.

```txt
/dashboard/projects
```

Project grid/list.

```txt
/dashboard/projects/[projectId]
```

Project detail page.

```txt
/dashboard/tasks
```

Task board/list.

```txt
/dashboard/activity
```

Activity feed.

```txt
/dashboard/settings
```

User and workspace settings.

---

# 20. Landing Page Rules

The landing page should be portfolio-level.

Include:

- Hero section
- Strong headline
- Beautiful product mockup
- Bento feature grid
- Dashboard preview
- How it works
- Final CTA

Avoid:

- Generic SaaS copy
- Boring icons-only sections
- Random stock-photo feeling
- Plain white layout with no personality

Suggested headline:

```txt
Your creative work, deadlines, and progress — live in one command centre.
```

Suggested subheading:

```txt
NOVA gives freelancers and small teams a calm real-time workspace for managing projects, tasks, comments, and momentum from idea to launch.
```

---

# 21. Dashboard Rules

Dashboard should feel like the core product.

Include:

- Greeting
- Current workspace
- Stats cards
- Active projects
- Upcoming deadlines
- Recent activity
- Task progress
- Quick create button

Dashboard cards should not just show fake numbers forever. When connected to database data, calculate real values.

---

# 22. Project Rules

Projects should include:

- Name
- Description
- Status
- Priority
- Due date
- Progress
- Tasks
- Comments
- Activity

Project cards should show:

- Project name
- Description
- Status badge
- Priority badge
- Due date
- Progress bar
- Task count

Project detail page should show:

- Header
- Metadata
- Progress
- Task list/board
- Comments
- Activity feed

---

# 23. Task Rules

Tasks should include:

- Title
- Description
- Status
- Priority
- Due date
- Project relationship

Task statuses:

```txt
TODO
IN_PROGRESS
REVIEW
DONE
```

Task board columns:

```txt
To do
In progress
Review
Done
```

Use beautiful cards, not plain tables only.

---

# 24. Activity Rules

Activity logs should be created for important actions:

- Project created
- Project updated
- Project completed
- Task created
- Task updated
- Task completed
- Comment created
- Member joined

Activity messages should sound human and useful.

Good:

```txt
Skai completed “Homepage redesign” in Portfolio Launch.
```

Bad:

```txt
TASK_UPDATED happened.
```

---

# 25. Empty State Rules

Every empty state should include:

- Friendly title
- Helpful description
- CTA
- Optional small visual/icon

Examples:

```txt
No projects yet
Create your first project and start tracking progress from idea to launch.
[Create project]
```

```txt
No activity yet
Updates will appear here when projects, tasks, and comments change.
```

Empty states must look designed, not like afterthoughts.

---

# 26. Loading State Rules

Use skeletons instead of random text.

Loading states should match the layout that is loading.

For example:

- Dashboard cards should use card skeletons.
- Project grid should use project card skeletons.
- Activity feed should use activity row skeletons.

---

# 27. Error State Rules

Error states should be calm and useful.

Include:

- What went wrong
- A retry option if possible
- No scary technical messages shown to normal users

Good:

```txt
We couldn’t load your projects.
Please try again in a moment.
[Retry]
```

---

# 28. Accessibility Rules

Always consider accessibility.

Requirements:

- Semantic HTML
- Keyboard support
- Visible focus states
- Labels for inputs
- Correct button/link usage
- Good contrast
- Dialogs should manage focus
- Icons need labels if interactive
- Do not rely only on colour to communicate status

---

# 29. Animation Rules

Use Framer Motion only when it improves the experience.

Good:

- Page entrance fade
- Card hover lift
- New activity item slide-in
- Dialog entrance
- Subtle glowing live indicator

Avoid:

- Too much bouncing
- Slow transitions
- Overly dramatic effects
- Animating every single element

Keep animations around 0.2s to 0.45s.

---

# 30. Security Rules

Do not expose secrets.

Never put these in client code:

- Database URLs
- Auth secrets
- API keys
- Service role keys
- Private tokens

Always:

- Check session on protected actions
- Scope queries to the current user/workspace
- Validate inputs
- Avoid leaking database errors to users
- Use environment variables

---

# 31. Performance Rules

Keep the app fast.

Rules:

- Use server components where possible.
- Avoid unnecessary client-side state.
- Avoid huge client bundles.
- Lazy-load heavy components if needed.
- Use pagination or limits for long lists.
- Avoid fetching the same data many times.
- Use database indexes where useful.
- Optimise images.
- Keep animations lightweight.

---

# 32. SEO Rules

The marketing page should have:

- Good title
- Description
- Open Graph metadata
- Clean semantic structure
- Proper headings

Dashboard pages can be protected and do not need public SEO.

---

# 33. README Rules

Maintain a strong README.

Include:

- Project name
- Short description
- Screenshot
- Live demo link
- Tech stack
- Features
- Database schema overview
- Real-time explanation
- Installation
- Environment variables
- What was learned
- Future improvements

The README should make the project look serious and intentional.

---

# 34. Portfolio Case Study Rules

Build and document the project so it can become a case study.

Important case study points:

- Why the project exists
- What problem it solves
- Who it is for
- How the database was designed
- How auth works
- How real-time updates work
- How the UI system works
- What challenges came up
- What was improved
- What could be added next

---

# 35. Agent Behaviour Rules

When responding to the user:

1. Be direct.
2. Do not over-explain simple concepts.
3. Give copy-paste-ready code.
4. Always include file paths.
5. Explain changes briefly.
6. Make sensible decisions instead of asking too many questions.
7. Keep the project premium.
8. Keep code maintainable.
9. Do not generate generic placeholder UI.
10. Do not leave TODO comments unless absolutely necessary.
11. Do not invent hidden requirements.
12. Do not remove existing features without reason.
13. Preserve existing project structure where possible.
14. Improve messy code when touching it.
15. Mention important setup commands when needed.

---

# 36. Preferred Commands

When the user uses these commands, follow them:

## `/plan`

Create a clear build plan.

## `/build page-name`

Build the requested page.

## `/component component-name`

Create the requested component.

## `/schema`

Create or update the Prisma schema.

## `/auth`

Help implement authentication.

## `/db`

Help with PostgreSQL, Prisma, migrations, or seed data.

## `/realtime`

Help build real-time comments/activity.

## `/fix`

Debug code and provide corrected code.

## `/polish`

Improve UI, spacing, animation, responsiveness, and premium feel.

## `/case-study`

Create a portfolio case study.

## `/readme`

Create or improve the README.

---

# 37. Final Quality Checklist

Before considering work complete, check:

- Does it compile?
- Is TypeScript clean?
- Are imports correct?
- Is UI responsive?
- Is the layout premium?
- Are loading states handled?
- Are empty states handled?
- Are errors handled?
- Is auth respected?
- Is data user/workspace scoped?
- Are forms validated?
- Is accessibility considered?
- Are colours consistent?
- Are components reusable?
- Is the code easy to understand?
- Would this impress an employer?

If not, improve it before finalising.

---

# 38. Final Reminder

NOVA should feel like a real, polished product.

Do not build it like a tutorial.

Do not make it look like a generic admin dashboard.

Make it elegant, useful, full-stack, real-time, and portfolio-worthy.
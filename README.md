# NOVA

NOVA is a premium real-time-ready project command centre for freelancers, creative teams, junior developers, and portfolio builders. It is designed as a polished full-stack portfolio project that demonstrates product thinking, database modeling, validation, responsive UI craft, and a clear path toward realtime collaboration.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style primitives
- Prisma ORM
- PostgreSQL
- Zod
- React Hook Form
- Framer Motion
- Lucide React icons
- NextAuth
- Pusher / Pusher JS

## Features

- Premium Apple-inspired glassmorphism interface
- Credentials-based authentication with protected dashboard routes
- Marketing landing page with dashboard preview, bento grid, and CTA sections
- Dashboard shell with sidebar, topbar, user menu, workspace switcher, and mobile navigation
- Dashboard overview with stats, projects, deadlines, activity, and progress
- Projects grid, project detail route, task board, activity feed, and settings pages
- Loading, empty, status, priority, and live indicator components
- Zod schemas for project, task, and comment forms
- Client forms wired to server actions for project, task, and comment creation
- Typed Prisma data loaders scoped to the signed-in user's workspace
- Prisma schema for users, workspaces, members, projects, tasks, comments, and activity logs
- Seed data for a realistic development workspace
- Realtime-ready comments and activity events with safe fallback when provider keys are missing

## Real-Time Features

NOVA includes a realtime abstraction in `lib/realtime.ts`, `lib/realtime-client.ts`, and `lib/realtime-server.ts` with channel naming and typed activity event names. Pusher is the current provider, and the app safely falls back to server-rendered data when realtime environment variables are not configured.

Realtime-ready behavior:

- Live activity feed updates
- Live task status movement
- Comment thread updates
- Workspace activity publishing from server actions
- Calm live/offline indicators in the dashboard UI

## Database Overview

Core models:

- `User`
- `Workspace`
- `WorkspaceMember`
- `Project`
- `Task`
- `Comment`
- `ActivityLog`

Core enums:

- `WorkspaceRole`
- `ProjectStatus`
- `TaskStatus`
- `Priority`
- `ActivityType`

The schema includes relationship constraints, cascading deletes where appropriate, and useful indexes for workspace dashboards, project filtering, task boards, comments, and activity feeds.

## Application Architecture

- `lib/db.ts` creates a reusable Prisma client.
- `lib/auth-options.ts`, `lib/auth.ts`, and `middleware.ts` configure NextAuth credentials login and protect dashboard routes.
- `lib/queries/*` contains server-side dashboard, project, task, and activity queries scoped to workspace membership.
- `lib/actions.ts` contains server actions for creating and updating projects, tasks, comments, profile, and workspace settings. These actions validate with Zod, write through Prisma, create activity log records, publish realtime events when configured, and revalidate dashboard routes.
- `components/forms/*` uses React Hook Form and Zod resolver for client-side form validation before calling server actions.

## Setup

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
cp .env.example .env
```

Set `DATABASE_URL` to a PostgreSQL database:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nova?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Generate Prisma Client and run migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

Seed development data:

```bash
npm run prisma:seed
```

Run the app:

```bash
npm run dev
```

## Portfolio Case Study Angle

NOVA is built to be explained in interviews as a full-stack product, not a template dashboard. The strongest case study points are:

- Clear user group and product problem
- Premium visual direction with accessible responsive UI
- Relational data model with workspace membership and activity history
- Validation-first forms and clean client/server boundaries
- Realtime-ready architecture without overclaiming unfinished infrastructure

## Future Improvements

- Add authentication with NextAuth, Clerk, or Supabase Auth
- Replace mock dashboard data with Prisma queries and server actions
- Add create/edit project and task modals
- Add drag-and-drop task board behavior
- Connect realtime activity and comments
- Add automated tests for schemas, helpers, and key pages
- Add role-based permissions for workspace actions

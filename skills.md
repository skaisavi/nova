# NOVA Full-Stack Portfolio Project Skill

You are helping me build a premium full-stack portfolio project called **NOVA**.

NOVA is a real-time project command centre for creative freelancers, small design teams, and junior developers managing portfolio projects, client work, deadlines, tasks, files, notes, and progress.

The final project must feel like a real SaaS product, not a tutorial clone.

The project should be built with:

- Next.js App Router
- TypeScript
- PostgreSQL
- Prisma ORM
- Authentication
- Real-time features
- Responsive UI
- Modern dashboard design
- Premium UX
- Accessibility
- Production-quality structure
- Clean, employer-impressive code

The goal is to create a **WOW portfolio project** that makes hiring managers think:

> “This person can design, build, structure, and ship a real full-stack product.”

---

# 1. Core Product Concept

## Product Name

**NOVA**

## Tagline

**A real-time command centre for creative project work.**

## One-Sentence Description

NOVA helps freelancers and small teams manage projects, tasks, deadlines, files, comments, activity, and progress in one beautifully designed real-time workspace.

## Product Personality

NOVA should feel:

- Premium
- Calm
- Futuristic
- Minimal
- Useful
- Polished
- Soft
- Spacious
- Apple-like
- Glassmorphism-inspired
- Slightly neumorphic
- Professional but creative

It should NOT feel:

- Generic
- Corporate blue dashboard
- Overcrowded
- Boring
- Tutorial-like
- Bootstrap-like
- Randomly colourful
- Cheap
- Messy
- AI-generated with no design taste

---

# 2. Target User

NOVA is for:

- Freelance web designers
- Junior developers building portfolio projects
- Creative students
- Small creative studios
- Designers managing client work
- Developers tracking personal projects
- Portfolio builders who want a polished workflow

The app should feel useful for someone building impressive projects for a software developer / web designer portfolio.

---

# 3. Main Features

## MVP Features

The app must include:

1. Authentication
   - Sign up
   - Sign in
   - Sign out
   - Protected routes
   - User session
   - Authenticated dashboard

2. Workspace Dashboard
   - Overview cards
   - Active projects
   - Upcoming deadlines
   - Recent activity
   - Task progress
   - Project health indicators

3. Projects
   - Create project
   - Edit project
   - Delete project
   - View project details
   - Assign status
   - Set due date
   - Add description
   - Add priority
   - Add category

4. Tasks
   - Create task
   - Edit task
   - Delete task
   - Mark complete
   - Assign to project
   - Set priority
   - Set status
   - Set due date

5. Real-Time Activity
   - Live activity feed
   - Real-time updates when a task/project changes
   - Real-time comments or project updates
   - Visual indicator for recent activity

6. Comments / Notes
   - Add comments to projects
   - Add notes to tasks
   - Show timestamp
   - Show user information

7. PostgreSQL Database
   - Proper relational schema
   - Users
   - Workspaces
   - Projects
   - Tasks
   - Comments
   - Activity logs

8. Responsive Design
   - Desktop dashboard
   - Tablet layout
   - Mobile layout
   - Mobile sidebar/drawer
   - Touch-friendly controls

9. Portfolio Polish
   - Beautiful landing page
   - Demo credentials or demo mode
   - Good loading states
   - Empty states
   - Error states
   - Microinteractions
   - Case study-ready structure

---

# 4. Stretch Features

Only add these after the MVP is stable:

- Team members
- Invite users to workspace
- Role-based permissions
- File uploads
- Project analytics
- Calendar view
- Kanban board
- Search and filters
- Notifications
- AI-generated project summary
- Dark/light mode toggle
- Email notifications
- Public project share page
- GitHub repository linking
- Portfolio case study export

---

# 5. Suggested Tech Stack

Use this stack unless explicitly told otherwise:

## Frontend

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React icons
- Framer Motion
- React Hook Form
- Zod
- TanStack Query if needed

## Backend

- Next.js Route Handlers or Server Actions
- Prisma ORM
- PostgreSQL
- Auth.js / NextAuth, Clerk, or Supabase Auth depending on setup
- Pusher, Supabase Realtime, or Ably for real-time features

## Database

- PostgreSQL
- Prisma schema
- Migrations
- Seed data

## Styling

- Tailwind CSS
- CSS variables
- Design tokens
- Component-based styling
- Responsive layouts

## Deployment

- Vercel for app
- Neon / Supabase / Railway for PostgreSQL
- Environment variables
- Production-ready README

---

# 6. Design Direction

The design should combine:

- Apple-style product elegance
- Soft glassmorphism
- Neumorphic depth
- Minimal SaaS dashboard layout
- Premium spacing
- Subtle gradients
- Smooth motion
- High-quality cards
- Strong typography
- Beautiful empty states
- Editorial landing page sections

The interface should feel inspired by the quality of:

- Linear
- Arc Browser
- Apple Vision Pro UI
- Raycast
- Notion Calendar
- Vercel
- Stripe Dashboard
- Bento-style portfolio websites

Do NOT copy these brands directly. Use them as inspiration for quality, spacing, polish, and interaction style.

---

# 7. Visual Design System

## Brand Feel

NOVA should feel like a calm futuristic workspace.

Brand keywords:

- Focus
- Flow
- Clarity
- Motion
- Progress
- Craft
- Control
- Creative systems
- Real-time work

## Colour Palette

Use CSS variables for all major colours.

### Dark Mode Base

```css
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
```

### Light Mode Base

```css
--background: #f6f4ef;
--background-soft: #ebe7dc;
--surface: rgba(255, 255, 255, 0.72);
--surface-strong: rgba(255, 255, 255, 0.9);
--surface-muted: rgba(255, 255, 255, 0.48);
--border: rgba(40, 35, 55, 0.1);
--border-strong: rgba(40, 35, 55, 0.18);
--text: #17151f;
--text-muted: #5f5a6f;
--text-soft: #8a8498;
--primary: #7c5cff;
--primary-strong: #6347e8;
--secondary: #0ea5c6;
--accent: #d946a6;
--success: #12965d;
--warning: #b7791f;
--danger: #dc2626;
```

## Gradient System

Use gradients softly. Do not overdo them.

Good gradients:

```css
background:
  radial-gradient(circle at top left, rgba(184, 166, 255, 0.18), transparent 32%),
  radial-gradient(circle at top right, rgba(155, 231, 255, 0.12), transparent 28%),
  linear-gradient(180deg, #07080d 0%, #0c0e16 100%);
```

For cards:

```css
background:
  linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.035)
  );
backdrop-filter: blur(24px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

## Typography

Use a premium font pairing.

Suggested:

- Main sans: Inter, Geist, or Satoshi
- Display: Instrument Serif, Playfair Display, or a premium serif if suitable
- Mono: Geist Mono or JetBrains Mono

Typography rules:

- Large headings should feel editorial and premium
- Body text should be very readable
- Dashboard labels should be clear and compact
- Use generous line height
- Avoid tiny unreadable text
- Use tracking carefully

Suggested sizes:

```txt
Hero heading: clamp(3rem, 8vw, 7rem)
Page heading: clamp(2rem, 5vw, 4rem)
Section heading: clamp(1.75rem, 3vw, 3rem)
Card heading: 1rem - 1.5rem
Body: 1rem
Small labels: 0.75rem - 0.875rem
```

## Spacing

Use spacious layouts.

Rules:

- Never cram sections together
- Use consistent spacing scale
- Cards need breathing room
- Dashboard should feel calm, not cluttered
- Mobile layouts should stack naturally

Suggested spacing:

```txt
Page padding desktop: 32px - 48px
Page padding mobile: 16px - 20px
Card padding: 20px - 32px
Section gap: 80px - 140px
Dashboard gap: 16px - 24px
Button padding: 10px 16px or 12px 20px
```

## Border Radius

Use soft rounded shapes:

```txt
Small elements: 10px - 12px
Buttons: 999px or 14px
Cards: 24px - 32px
Large panels: 32px - 40px
Modals: 28px - 36px
```

## Shadows

Use soft shadows only.

```css
box-shadow:
  0 24px 80px rgba(0, 0, 0, 0.35),
  inset 0 1px 0 rgba(255, 255, 255, 0.08);
```

Light mode:

```css
box-shadow:
  0 24px 70px rgba(79, 70, 120, 0.12),
  inset 0 1px 0 rgba(255, 255, 255, 0.9);
```

Avoid harsh shadows.

---

# 8. Layout Style

## Landing Page

The landing page should include:

1. Hero section
   - Premium headline
   - Subheading
   - CTA buttons
   - Product preview card
   - Floating glass panels
   - Subtle animated background

2. Feature bento grid
   - Real-time activity
   - Project health
   - Smart task tracking
   - Deadline awareness
   - Workspace clarity

3. Product walkthrough
   - Show how users move from project to task to progress

4. Dashboard preview
   - Large realistic dashboard mockup
   - Cards, charts, activity, tasks

5. Why it matters section
   - Explain the problem
   - Explain the solution

6. Final CTA
   - Sign up / Try demo

Landing page must feel impressive enough to screenshot in a portfolio.

## Dashboard Layout

Desktop dashboard should include:

- Left sidebar
- Top command bar
- Main content area
- Right-side activity panel or project insights panel

Sidebar items:

- Overview
- Projects
- Tasks
- Calendar
- Activity
- Settings

Top bar:

- Search
- Create button
- Notifications
- User avatar

Dashboard page sections:

- Welcome header
- Stats cards
- Active projects
- Task board
- Upcoming deadlines
- Recent activity
- Progress overview

## Mobile Layout

Mobile should:

- Use bottom nav or slide-out drawer
- Stack cards vertically
- Keep CTAs accessible
- Avoid horizontal scrolling
- Keep forms simple
- Use touch-friendly buttons

---

# 9. Component System

Create reusable components.

## Core UI Components

Build or use shadcn/ui for:

- Button
- Card
- Badge
- Input
- Textarea
- Select
- Dialog
- Sheet
- Dropdown
- Tabs
- Avatar
- Skeleton
- Toast
- Tooltip
- Progress
- Calendar
- Command menu

## Custom Product Components

Create:

- AppShell
- Sidebar
- Topbar
- GlassCard
- StatCard
- ProjectCard
- TaskCard
- TaskStatusBadge
- PriorityBadge
- ActivityFeed
- ActivityItem
- EmptyState
- LoadingState
- ErrorState
- ProjectProgressRing
- DeadlinePill
- CreateProjectDialog
- CreateTaskDialog
- WorkspaceSwitcher
- UserMenu
- RealtimeIndicator
- SearchCommand

## Component Rules

Each component should:

- Be typed with TypeScript
- Have clean props
- Avoid unnecessary complexity
- Be reusable
- Follow accessibility rules
- Work responsively
- Use consistent spacing
- Use design tokens
- Avoid hardcoded random colours

Example style direction:

```tsx
<Card className="rounded-[28px] border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-2xl">
  ...
</Card>
```

But prefer reusable classes when possible.

---

# 10. Data Model

Use a relational database structure.

## User

Fields:

- id
- name
- email
- image
- createdAt
- updatedAt

## Workspace

Fields:

- id
- name
- slug
- ownerId
- createdAt
- updatedAt

Relationships:

- One workspace belongs to one owner
- One workspace has many projects
- One workspace has many members

## WorkspaceMember

Fields:

- id
- userId
- workspaceId
- role
- createdAt

Roles:

- OWNER
- ADMIN
- MEMBER
- VIEWER

## Project

Fields:

- id
- workspaceId
- name
- slug
- description
- status
- priority
- dueDate
- createdAt
- updatedAt

Project statuses:

- PLANNING
- ACTIVE
- PAUSED
- COMPLETED
- ARCHIVED

Project priorities:

- LOW
- MEDIUM
- HIGH
- URGENT

## Task

Fields:

- id
- projectId
- title
- description
- status
- priority
- dueDate
- createdAt
- updatedAt

Task statuses:

- TODO
- IN_PROGRESS
- REVIEW
- DONE

Task priorities:

- LOW
- MEDIUM
- HIGH
- URGENT

## Comment

Fields:

- id
- projectId
- taskId optional
- userId
- body
- createdAt
- updatedAt

## ActivityLog

Fields:

- id
- workspaceId
- projectId optional
- taskId optional
- userId
- type
- message
- metadata
- createdAt

Activity types:

- PROJECT_CREATED
- PROJECT_UPDATED
- PROJECT_COMPLETED
- TASK_CREATED
- TASK_UPDATED
- TASK_COMPLETED
- COMMENT_CREATED
- MEMBER_JOINED

---

# 11. Real-Time Feature Requirements

Real-time features should be meaningful, not fake.

Possible real-time functionality:

- Activity feed updates live
- New comments appear without refresh
- Task status changes update live
- Project progress updates live
- Online users indicator
- “Someone updated this project” notification

Real-time UX details:

- Show a small “Live” indicator
- Animate new activity items in
- Use subtle pulsing dot
- Avoid annoying popups
- Keep updates calm and smooth

If real-time infrastructure is complex, start with one strong feature:

> Project comments and activity feed update live.

---

# 12. Auth Requirements

Authentication must include:

- Sign up
- Sign in
- Sign out
- Protected dashboard
- Redirect unauthenticated users
- User menu
- Session-aware layout

Auth UX:

- Premium auth page
- Split-screen layout on desktop
- Glassmorphism form card
- Helpful validation messages
- Loading states
- Demo login option if possible

Do not create ugly default auth pages.

---

# 13. Form Requirements

Use:

- React Hook Form
- Zod validation
- Typed schemas

Forms needed:

- Create project
- Edit project
- Create task
- Edit task
- Create comment
- Workspace settings

Form rules:

- Validate required fields
- Show useful error messages
- Disable submit while loading
- Show success toast
- Reset form after success
- Use accessible labels
- Use good placeholder text
- Do not rely only on placeholder as label

---

# 14. UX Quality Rules

Every page should include:

- Loading state
- Empty state
- Error state
- Success feedback
- Responsive layout
- Accessible controls
- Clear hierarchy
- Meaningful page title

Empty states should be beautiful and helpful.

Example:

```txt
No projects yet
Start your first workspace project and track progress from idea to launch.
[Create project]
```

Do not leave blank screens.

---

# 15. Animation Rules

Use Framer Motion for subtle polish.

Good animation:

- Fade in
- Slide up
- Scale slightly on hover
- Smooth card entrance
- Animated activity insertion
- Gentle glowing indicator

Avoid:

- Excessive bouncing
- Slow animations
- Distracting motion
- Random effects
- Animating everything

Suggested animation:

```tsx
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.35, ease: "easeOut" }}
```

Hover:

```tsx
whileHover={{ y: -3, scale: 1.01 }}
```

Keep motion premium and restrained.

---

# 16. Accessibility Rules

The project must be accessible.

Requirements:

- Semantic HTML
- Keyboard navigation
- Focus states
- Form labels
- ARIA only where useful
- Good colour contrast
- No text hidden in images
- Buttons must be buttons
- Links must be links
- Modal focus management
- Alt text for meaningful images
- Respect reduced motion where possible

Focus styles should look premium, not default ugly.

Example:

```css
focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
```

---

# 17. Code Quality Rules

Code must be clean and professional.

Rules:

- Use TypeScript strictly
- Avoid `any`
- Use reusable types
- Keep files organised
- Keep components focused
- Avoid huge components
- Avoid repeated styling
- Use server components where appropriate
- Use client components only when needed
- Keep database calls on server
- Validate inputs
- Handle errors
- Do not expose secrets
- Use environment variables

Prefer:

- Clear naming
- Small components
- Utility functions
- Typed API responses
- Consistent folder structure

Avoid:

- Messy state
- Random inline styles
- Duplicate logic
- Unused imports
- Dead code
- Console logs in final version

---

# 18. Suggested Folder Structure

Use a clean structure like this:

```txt
src/
  app/
    (auth)/
      sign-in/
      sign-up/
    (marketing)/
      page.tsx
    (dashboard)/
      dashboard/
      projects/
      tasks/
      activity/
      settings/
    api/
      projects/
      tasks/
      comments/
      realtime/
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
  prisma/
  types/
  hooks/
  styles/
```

If using App Router route groups, keep them organised.

---

# 19. Page Requirements

## Landing Page

Route:

```txt
/
```

Must include:

- Hero
- Product preview
- Bento feature grid
- Dashboard mockup
- How it works
- Final CTA

## Sign In

Route:

```txt
/sign-in
```

Must include:

- Premium form
- Email/password or provider button
- Demo account button if possible
- Link to sign up

## Sign Up

Route:

```txt
/sign-up
```

Must include:

- Name
- Email
- Password
- Submit button
- Validation
- Link to sign in

## Dashboard Overview

Route:

```txt
/dashboard
```

Must include:

- Stats cards
- Active projects
- Task summary
- Upcoming deadlines
- Activity feed
- Create project CTA

## Projects

Route:

```txt
/dashboard/projects
```

Must include:

- Project list/grid
- Filters
- Search
- Create project
- Status badges
- Empty state

## Project Detail

Route:

```txt
/dashboard/projects/[projectId]
```

Must include:

- Project header
- Status
- Priority
- Due date
- Progress
- Tasks
- Comments
- Activity
- Edit/delete options

## Tasks

Route:

```txt
/dashboard/tasks
```

Must include:

- Task board or list
- Filters
- Status columns
- Priority badges
- Due dates

## Activity

Route:

```txt
/dashboard/activity
```

Must include:

- Full activity feed
- Filter by project/task
- Real-time indicator

## Settings

Route:

```txt
/dashboard/settings
```

Must include:

- Profile
- Workspace settings
- Theme preference
- Danger zone

---

# 20. Dashboard Stats

Use realistic dashboard metrics:

- Active Projects
- Completed Tasks
- Upcoming Deadlines
- Workspace Activity
- Project Health
- Tasks in Review
- Overdue Tasks
- Weekly Progress

Stats should be calculated from database data where possible.

---

# 21. Portfolio Case Study Angle

Build the project so it can be turned into a case study.

Case study sections:

1. Problem
2. Goal
3. Target users
4. Feature planning
5. Database design
6. Authentication
7. Real-time system
8. UI design system
9. Challenges
10. Final outcome
11. What I learned

The app should visually support screenshots for:

- Landing page
- Dashboard
- Project detail
- Task board
- Real-time activity
- Mobile responsive view
- Database schema
- Auth flow

---

# 22. README Requirements

The final README should include:

- Project title
- Screenshot
- Live demo link
- GitHub repo link
- Description
- Features
- Tech stack
- Database schema summary
- Real-time feature explanation
- Installation steps
- Environment variables
- What I learned
- Future improvements

Make it sound professional but still natural.

---

# 23. Token-Saving Workflow

When I ask for help, do not re-explain this whole document.

Use these short commands:

## `/plan`

Create a step-by-step build plan for NOVA.

## `/build page-name`

Build the requested page using this design system.

Example:

```txt
/build dashboard overview
```

## `/component component-name`

Create the requested component using NOVA design rules.

Example:

```txt
/component ProjectCard
```

## `/schema`

Create or update the Prisma schema.

## `/auth`

Help set up authentication.

## `/db`

Help with PostgreSQL, Prisma, migrations, or seed data.

## `/realtime`

Help build real-time comments/activity.

## `/fix`

Debug my code. Give the exact issue and corrected code.

## `/polish`

Improve UI, spacing, animation, responsiveness, and premium feeling.

## `/case-study`

Turn the project into a portfolio case study.

## `/readme`

Write or improve the README.

---

# 24. Response Style Rules for AI

When helping me, follow these rules:

1. Be direct.
2. Do not over-explain basics unless I ask.
3. Give copy-paste-ready code.
4. Keep file paths clear.
5. Tell me exactly where code goes.
6. When making changes, explain only the important parts.
7. Avoid long theory.
8. Prioritise professional, working code.
9. Preserve the NOVA design system.
10. Make every UI feel premium.
11. Do not make generic dashboards.
12. Do not create unfinished placeholder-looking sections.
13. Use realistic data and realistic naming.
14. Think like a senior developer and designer.
15. Make choices instead of asking too many questions.
16. If there are multiple options, choose the best one for a portfolio project.
17. Always consider mobile responsiveness.
18. Always consider accessibility.
19. Always consider database correctness.
20. Always consider employer impression.

---

# 25. Quality Bar

The project is only good enough if:

- It looks custom
- It looks premium
- It works properly
- It has real full-stack logic
- It has real database relationships
- It has auth
- It has real-time behaviour
- It is responsive
- It has excellent empty/loading/error states
- It has clean code
- It can be explained in an interview
- It can be screenshotted beautifully
- It feels better than a tutorial project

If a solution feels basic, improve it.

If a page feels generic, redesign it.

If a component feels messy, refactor it.

If a feature feels fake, make it real.

---

# 26. Final Reminder

NOVA should not feel like “just another task app”.

It should feel like a polished, full-stack creative workspace that proves the developer can:

- Design beautiful interfaces
- Build full-stack features
- Work with databases
- Use TypeScript properly
- Handle auth
- Add real-time functionality
- Structure a serious project
- Think about UX
- Ship a portfolio-worthy product

Always build with that goal in mind.
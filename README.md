# Planner

A full-stack task management application built with **Next.js** and **Supabase**.

Planner is a personal productivity tool inspired by Jira. After signing up, you get access to a kanban board where tasks can be dragged and dropped between statuses, a calendar view to see your tasks by date, and a profile page to manage your account. The app supports light and dark themes.

---

# Application Base Information

The front-end is built with **Next.js 16** (App Router) and **TypeScript**. The backend and database are powered by **Supabase** — providing a PostgreSQL database and real-time capabilities.

Key technologies:

- **Next.js 16** — React 19 framework with App Router, SSR, and API Routes
- **Supabase** — PostgreSQL database with a service-role client used exclusively on the server
- **TypeScript** — Static typing across the entire codebase
- **TailwindCSS v4** — Utility-first styling
- **Redux Toolkit** — Global client-side state management
- **TanStack Query** — Server state fetching, caching, and synchronization
- **React Hook Form + Zod** — Form handling and schema validation
- **dnd-kit** — Drag-and-drop for reordering todos
- **Framer Motion** — Animations and transitions
- **next-themes** — Dark / light theme support
- **Sonner** — Toast notifications
- **Lucide React** — Icon library
- **Axios** — HTTP client for API requests

---

# Getting Started

## Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) v20.9.0 or higher
- [npm](https://www.npmjs.com/)
- A [Supabase](https://supabase.com/) project (free tier works fine)

## Install Dependencies

```bash
npm install
```

## Run in Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Build for Production

```bash
npm run build
```

This will generate a production-ready build in the `.next/` folder.

## Start Production Server

```bash
npm start
```

## Run Linter

```bash
npm run lint
```

Runs **ESLint** to check code style and ensure all rules are followed.

## Run Linter with Auto-fix

```bash
npm run lint:fix
```

Runs **ESLint** and automatically fixes all fixable errors and warnings.

---

# Environment Variables

Create a `.env.local` file in the project root. You can copy `.env.example` as a starting point:

```bash
cp .env.example .env.local
```

Required variables:

```
# Supabase
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_HOST=

# Auth
JWT_SECRET=
```

You can find your Supabase URL and keys in your project dashboard under **Settings → API**.

---

# Project Folder Structure

```
app/
├── (app)/                  # Protected area (requires authentication)
│   ├── layout.tsx          # Authenticated layout (sidebar, header)
│   ├── page.tsx            # Dashboard / home page
│   ├── profile/            # User profile page
│   ├── settings/           # App settings page
│   └── todos/              # Kanban board page
│       └── [id]/           # Single task detail page
├── api/                    # API route handlers
│   ├── auth/               # Auth endpoints (login, register, logout, refresh)
│   ├── calendar/           # Calendar-related endpoints
│   ├── todos/              # Todo CRUD endpoints
│   └── users/              # User management endpoints
└── lib/                    # Server-side utilities
    ├── auth.ts             # Auth helpers (session validation, user context)
    ├── axios-client.ts     # Configured Axios instance
    ├── supabase.ts         # Supabase client initialization
    └── errors/             # Shared error classes and handlers
```

---

## Authentication

Authentication is implemented with a custom JWT-based flow using Supabase as the database, without relying on Supabase Auth.

# State Management

Global client-side state (auth, UI flags) is managed with **Redux Toolkit** (`@reduxjs/toolkit`). Slices are located in the `store/` folder.

Server state (todos, user data) is fetched and cached using **TanStack Query** (`@tanstack/react-query`). It handles caching, background refetching, optimistic updates, and error states.

Access hooks:

- `useAppSelector` — to read values from the Redux store
- `useAppDispatch` — to dispatch actions or thunks

---

# Forms and Validation

Form handling uses **React Hook Form** with **Zod** schemas via `@hookform/resolvers`.

Zod schemas are shared between the client and server — the same schema that validates a form on the frontend is reused in the API route handler via `safeParse`. This ensures consistent validation rules in both layers without duplication.

Validation errors are mapped to user-friendly messages defined in `ErrorMessages.VALIDATION`.

---

# Error Handling

All API routes use a unified error handling pattern built around two modules in [`app/lib/errors/`](app/lib/errors/):

- `ApiError` — a custom error class that carries an HTTP status code and a message
- `handleError` — a wrapper that catches errors thrown in route handlers and returns the appropriate `NextResponse`

If the thrown error is an `ApiError`, its message and status are forwarded directly to the client. Any other unhandled error returns a generic `500` response.

Error messages for all domains (auth, todos, users, validation, etc.) are centralized in `ErrorMessages`, making them easy to reuse and update in one place.

---

# Drag and Drop

The kanban board supports drag-and-drop between status columns using **dnd-kit** (`@dnd-kit/core`, `@dnd-kit/sortable`). Tasks can be moved across statuses (e.g. To Do → In Progress → Done), and the updated position and status are persisted to the database.

---

# Calendar

The calendar view displays tasks by their due date, giving a visual overview of what is scheduled across days and weeks. It is built with **react-day-picker** and reads task data from the same store as the kanban board.

---

Light and dark mode are supported via **next-themes**. The active theme is stored in a cookie and applied server-side to prevent flash on load. Theme toggling is available in the app settings.

---

# Notifications

User-facing notifications (success, error, info) are handled with [**Sonner**](https://sonner.emilkowal.ski/). Configuration is located in [`lib/helpers/notifications.ts`](src/lib/helpers/notifications.ts).

---

# Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [dnd-kit](https://dndkit.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

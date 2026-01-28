# Periskope Assignment — Agent Guidelines

This file configures how AI agents should work on this project. Follow it when implementing features, reviewing code, or making architectural decisions.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| **Framework** | Next.js 13+ with **App Router** |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | Supabase (Postgres) |
| **Data queries** | pg SQL (Postgres) — raw SQL, Supabase client, or RPC |
| **Testing** | **TDD with Vitest** |

---

## Testing (TDD)

- **Use Vitest** for all unit and integration tests.
- **Practice TDD**: write failing tests first, then implement until they pass.
- Run tests with `npm test` or `npx vitest`.
- Place test files next to source (`*.test.ts`, `*.test.tsx`) or in a `__tests__` directory, per project convention.
- When adding or changing behavior, add or update Vitest tests accordingly.

---

## Skills — When to Use

Use these skills **when relevant** to the current task. Read the skill file first, then apply its guidance.

| Skill | Path | Use when |
|-------|------|----------|
| **Supabase Postgres** | `.agents/skills/supabase-postgres-best-practices/SKILL.md` | Writing or optimizing SQL, designing schema, indexes, RLS, connection pooling, Postgres-specific features |
| **Vercel React** | `.agents/skills/vercel-react-best-practices/SKILL.md` | Writing React/Next.js components, data fetching, performance, bundle size, re-renders |
| **Vercel Composition** | `.agents/skills/vercel-composition-patterns/SKILL.md` | Compound components, render props vs children, context, boolean prop proliferation, flexible APIs |
| **Web Design** | `.agents/skills/web-design-guidelines/SKILL.md` | UI review, accessibility, design audit, UX check, “review my UI” |

**Rule:** If a task touches Postgres/Supabase, React/Next.js, composition patterns, or UI review, use the corresponding skill **before** implementing or suggesting changes.

---

## MCPs — When to Use

| MCP | Use when |
|-----|----------|
| **context7** | You need up-to-date docs or code examples for a library (e.g. Next.js, React, Supabase, Vitest). |
| **Grep** | You need to search the codebase by exact text or regex (symbols, strings, patterns). |
| **Supabase** | You need to run Supabase CLI commands, manage project config, or interact with Supabase services. |

Prefer **context7** for library/docs lookups and **Grep** for codebase search. Use **Supabase** MCP only when the task explicitly involves Supabase tooling or project config.

---

## Project Conventions

- **App Router**: Use `app/` for routes, layouts, and route handlers. No `pages/` router.
- **TypeScript**: Strict mode. Avoid `any`; use proper types for props, API responses, and DB shapes.
- **Styling**: Tailwind only. No CSS-in-JS or global CSS except for base/reset if needed.
- **Database**: All persistent data via Supabase. Use pg SQL for queries; follow Supabase Postgres best practices (see skill above).
- **Imports**: Prefer direct imports over barrel files to keep bundles small (see Vercel React best practices).

---

## Quick Reference

- **Tests**: TDD with Vitest → `*.test.ts` / `*.test.tsx`, run via `npm test` or `npx vitest`.
- **Docs/examples**: context7.
- **Codebase search**: Grep.
- **Supabase**: Supabase MCP + Supabase Postgres skill.
- **React/Next.js**: Vercel React + Vercel Composition skills.
- **UI/accessibility**: Web Design Guidelines skill.



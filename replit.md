# Structure Hub Website

Public company website for Structure Hub Private Limited, a Zimbabwean civil engineering and construction company based in Gweru.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/structure-hub-website/src/App.tsx` — single-page public website and interactions
- `artifacts/structure-hub-website/src/index.css` — site theme, responsive layout, and motion styling
- `artifacts/structure-hub-website/public/images/` — cropped source photography and brand assets from the supplied company profile
- `attached_assets/` — original Structure Hub profile and approved website direction

## Architecture decisions

- Presentation-first single-page experience; no backend is required for the first public site build.
- The quote request is intentionally handled as an email-ready client-side flow so the site can generate leads without requiring a CMS or database.
- Project and service copy is grounded in the supplied 2026 company profile; reference names are presented as text rather than implied logo endorsements.

## Product

The site introduces Structure Hub's capability across construction, civil works, steel and roofing, solar, equipment hire, hardware, and industrial maintenance. It includes a project portfolio with category filtering, company story and values, industries served, a multi-step quote request form, and direct call/email contact actions.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

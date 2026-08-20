# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Workflow is a garment production/inventory/sales management system, split into two apps in this monorepo:

- `backend/` — NestJS 11 + GraphQL (Apollo, code-first) + Prisma 7 (Postgres, via `@prisma/adapter-pg`)
- `frontend/` — Nuxt 4 (Vue 3, SPA mode / `ssr: false`) + Vuetify 4 + Villus (GraphQL client) + Pinia

Domain modules mirror real business areas: `artisan` (piece-work laborers), `product` (product/color/size catalog), `production` (work orders / progress tracking), `inventory` (stock, transfers between warehouses), `sale` (sales & sale performance reporting), `auth` (users/roles). The same module names exist on both backend (`backend/src/<module>`) and frontend (`frontend/app/pages/<module>`, `frontend/app/components/<module>`).

## Commands

### Backend (`backend/`)

```bash
npm run start:dev        # nest start --watch, NODE_ENV=development
npm run start:debug      # same, with --inspect debugger
npm run build             # nest build
npm run lint              # eslint --fix over src/apps/libs/test
npm test                  # jest (unit, *.spec.ts colocated in src/)
npm run test:watch
npm run test:cov
npm run test:e2e          # jest --config ./test/jest-e2e.json
```

Run a single backend test: `npx jest path/to/file.spec.ts` (or `npx jest -t "test name"`).

Prisma / database (all commands load `.env.development` via `dotenv-cli` unless noted):

```bash
npm run db:push            # prisma db push (dev schema sync, no migration file)
npm run db:push:reset      # db push --force-reset (drops & recreates)
npm run db:seed            # prisma db seed -> prisma/seed.ts
npm run migrate:dev        # prisma migrate dev --name ${name}   (pass name=... )
npm run migrate:diff       # regenerates down.sql from prisma/migrations
npm run migrate:deploy     # prisma migrate deploy (uses real env, no dotenv-cli)
```

The GraphQL schema (`backend/src/schema.gql`) is **auto-generated** by NestJS's code-first `GraphQLModule` (see `autoSchemaFile` in `app.module.ts`) — do not hand-edit it, it regenerates from resolver/model decorators when the backend starts.

### Frontend (`frontend/`)

```bash
npm run dev                 # nuxt dev --dotenv .env.development
npm run build:staging        # nuxt build --dotenv .env.staging
npm run build:production     # nuxt build
npm run generate
npm run preview
npm run codegen              # graphql-codegen, regenerates app/api/generated/types.ts
```

`npm run codegen` requires the backend GraphQL server running locally at `http://localhost:3001/graphql` (see `codegen.yml`, `schema:` points there) — it introspects the live schema against `.gql` documents in `app/api/queries/*.gql`. After adding/editing a query or mutation in a `.gql` file, or after changing a backend resolver's shape, run `npm run codegen` and commit the regenerated `app/api/generated/types.ts`.

There is no configured test runner on the frontend.

### Docker / deployment

`docker-compose.yml` (staging) and `docker-compose-production.yml` define `backend`, `frontend`, `nginx`, and `postgres` services. Backend image build target is selected via `target: staging`/production in the compose file; frontend build takes an `ENVIRONMENT` build arg.

## Backend architecture

- **Module layout**: each domain (`artisan`, `product`, `production`, `inventory`, `sale`, `auth`) is a self-contained Nest module under `src/<module>/` with `<module>.module.ts`, `<module>.resolver.ts`, `<module>.service.ts`, and a `dto/` folder of `class-validator`-decorated GraphQL input types. Resolvers stay thin (arg parsing + delegate to service); business logic and Prisma queries live in the service.
- **Models vs Prisma types**: `src/models/*.model.ts` are the GraphQL object types (`@ObjectType()`), separate from the Prisma-generated types (`@/generated/prisma/client`, aliased via `@/*` -> `src/*` in tsconfig). Services often reshape Prisma query results (e.g. flattening a join table) before returning them to match the GraphQL model — see the `userInventories: result.userInventories.map(member => member.inventory)` pattern in `auth.service.ts`, repeated across modules.
- **Auth**: JWT-based. `AuthService.logIn` issues a signed JWT (`sub: user.id`); `auth/auth.middleware.ts`'s `authenticateUserByRequest` decodes it per-request and attaches the user to the Apollo context (`context: async ({ req }) => ({ req, user })` in `app.module.ts`). `guards/auth.guard.ts` checks `context.user` is truthy; `guards/role.guard.ts` reads a `@Roles(n)` metadata value and requires `user.role.clearanceLevel <= n` (lower clearance number = more privileged). Neither guard is applied globally — apply them per-resolver/method as needed.
- **Prisma**: `PrismaService` (`src/prisma/prisma.service.ts`) wraps `PrismaClient` using the `@prisma/adapter-pg` driver adapter and connects/disconnects on module init/destroy. Schema is at `backend/prisma/schema.prisma`; generated client output goes to `src/generated/prisma/client` (imported as `@/generated/prisma/client`).
- **Enums**: Prisma enums (`Gender`, `InvType`, `Job`, `Progress`, `TxType`) are registered as GraphQL enum types once, centrally, in `app.module.ts` via `registerEnumType(...)` — new Prisma enums that need to be GraphQL-exposed must be added there too.
- **Environment files**: `.env` (production), `.env.staging`, `.env.development` selected by `NODE_ENV` in `app.module.ts`; Prisma CLI commands use `dotenv-cli -e .env.development` explicitly in `package.json` scripts (`prisma migrate deploy` is the exception — it relies on ambient/production env).
- Path alias `@/*` -> `backend/src/*` (tsconfig `paths`), used everywhere instead of relative imports.

## Frontend architecture

- **Nuxt 4 SPA**: `ssr: false`, `nitro: { preset: 'static' }` — this is a client-rendered app, not server-rendered. `app/` is the Nuxt 4 source directory (pages, components, composables, stores, middleware, plugins, layouts, utils, api).
- **GraphQL data layer**: Villus is the GraphQL client (configured in `app/plugins/0.villus.ts`, numeric prefixes control Nuxt plugin load order). It reads the JWT out of the `jwt` cookie and sets it as a Bearer `Authorization` header, and adds `apollo-require-preflight` for `@villus/multipart` file uploads. Components call `useQuery`/`useMutation` from `villus` directly against generated typed documents (`~/api/generated/types`), e.g. `useQuery({ query: GetSalePerformanceDocument, cachePolicy: 'network-only', tags: [CACHE_SALE_PERFORMANCE], variables: computed(() => ({...})) })`.
- **Cache invalidation via tags**: `app/utils/cache-tags.ts` defines a flat list of `CACHE_*` string constants, one (or a couple) per resource. Queries subscribe with `tags: [CACHE_X]`; mutations that affect that resource pass `refetchTags: [CACHE_X, ...]` to `useMutation`, which tells Villus to refetch any active query holding a matching tag. When adding a new query/mutation pair, add a new `CACHE_*` constant and wire both sides — this is the app's only cache-invalidation mechanism (no manual refetch plumbing).
- **Codegen contract**: `app/api/queries/*.gql` is the source of truth for every operation/fragment; `app/api/generated/types.ts` is generated output (via `npm run codegen`) — never hand-edit it. Add/edit `.gql` files, then regenerate.
- **Auth flow**: `stores/auth.ts` (Pinia) holds the current `user` (typed as `AuthUserFragment`). `middleware/auth.global.ts` runs on every route: it treats the user as authenticated if either the Pinia store has a user or an `isLoggedIn` cookie is set, and redirects unauthenticated users to `/login` (except `/login`/`/register`) and authenticated users away from `/login`. Role-based UI gating uses `authStore.user?.role.clearanceLevel` directly in components (e.g. compare against a numeric threshold), mirroring the backend's `RoleGuard` semantics (lower number = higher privilege).
- **i18n**: `@nuxtjs/i18n` with locales `en`, `id` (Indonesian), `su` (Sundanese), files in `frontend/i18n/locales/*.json`. Vuetify's own locale is set separately in `plugins/1.vuetify.ts` (`id` default, `en` fallback; `su` maps to Vuetify's `id` locale since Vuetify has no Sundanese pack). When adding user-facing strings, add keys to all three locale JSON files, and use `$t(...)` / `useI18n()`'s `t(...)`.
- **UI kit**: Vuetify 4, autoImported via a custom Vite plugin hook in `nuxt.config.ts` (not the standard `vuetify-nuxt-module`). Date handling uses `dayjs` (via `@date-io/dayjs` adapter for Vuetify's date picker) — prefer `dayjs` over native `Date` in new components, consistent with existing code.
- **Path aliases**: `~` / `@` resolve to `frontend/app/` (Nuxt 4 default); `@shared` is manually aliased in `nuxt.config.ts` to `frontend/shared/`.

## Cross-cutting conventions

- Numeric/ID GraphQL args on the backend are typed `ID` in the schema but parsed with `ParseIntPipe` (Prisma IDs are integers) — follow this pattern (`@Args('id', { type: () => ID }, ParseIntPipe)`) for any new ID-typed resolver argument.
- Sale numbers, and similarly-formatted business identifiers, are validated with `@Matches` regexes in DTOs (see `sale-create.dto.ts`) rather than generated purely on the frontend — keep format validation in the DTO layer.
- When a backend resolver/DTO changes shape, remember the frontend's generated types (`app/api/generated/types.ts`) go stale until `npm run codegen` is re-run against the running backend.

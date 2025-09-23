# AM Inventory (AceternityUI)

Next.js App Router inventory app with ADMIN/TECH roles, dynamic custom fields, logs, CSV/XLSX export, and Aceternity-style UI.

## Quickstart

```bash
npm i   # or npm i / yarn
npm run db:push
npm run db:seed
npm run dev
```

Default sign-in: `admin@example.com` / `admin123`

## Notes

- Aceternity UI is reproduced via Tailwind-styled components to avoid third-party breaking changes.
- Credentials auth via NextAuth; roles embedded into JWT/session.
- Prisma SQLite DB (`file:./dev.db`).

# portfolio

personal portfolio site! 

**live site:** [calvinpun.dev](https://calvinpun.dev)

## tech stack


| Layer     | Choice                                                                                                     |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| Framework | [Next.js](https://nextjs.org/) 16 (App Router)                                                             |
| UI        | [React](https://react.dev/) 19                                                                             |
| Language  | [TypeScript](https://www.typescriptlang.org/)                                                              |
| Styling   | [Tailwind CSS](https://tailwindcss.com/) v4 (via `@import "tailwindcss"` in `site/app/globals.css`)        |
| Linting   | [ESLint](https://eslint.org/) with `eslint-config-next`                                                    |
| Fonts     | [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (e.g. Caveat, DM Sans) |


All application code lives under `**site/`**; the repo root keeps this README and `.gitignore` only.

## prereqs

- [Node.js](https://nodejs.org/) 18.18+ (20+ recommended for Next.js 16)
- npm (bundled with Node)

## run locally

From the repository root:

```bash
cd site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If port 3000 is in use:

```bash
npm run dev -- --port 3001
```

## other commands

Run these from `**site/**`:


| Command         | Purpose                                        |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Dev server with hot reload                     |
| `npm run build` | Production build                               |
| `npm run start` | Serve the production build (run `build` first) |
| `npm run lint`  | ESLint                                         |


## project structure

- `site/app/` — App Router: `layout.tsx`, `page.tsx`, `globals.css`
- `site/components/` — UI (e.g. `scrapbook/`, `sections/`, `layout/`)
- `site/data/` — Editable copy and URLs (`siteContent.ts`)
- `site/public/` — Static assets (e.g. images referenced as `/filename.jpg`)

## content and assets

- **Copy and social URLs:** edit `site/data/siteContent.ts`
- **Images:** add files under `site/public/` and reference paths like `/me.jpg` in `siteContent` or components


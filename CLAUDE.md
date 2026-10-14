# Alex Kozik portfolio

Static personal site at https://alexkozik.com. Astro 7 + Tailwind v4, no client framework. Deployed on Netlify from `main` (`netlify.toml`).

## Run
Requires Node ≥ 22.12 (`.nvmrc` → 22; use `nvm use`). `npm run dev` (port 4321), `npm run build` (runs `astro check` first).

## Where content lives (edit these, not the templates)
- `src/data/profile.ts` — name, tagline, bio, links, résumé path, sidebar nav.
- `src/data/experience.ts` — jobs, newest first. `src/data/education.ts`, `src/data/awards.ts`, `src/data/papers.ts`.
- `src/content/projects/<slug>.md` — one file per project. Frontmatter: `group` (featured | ml | swe), `order`, `tagline` (one line, lead with the result), `description`, `tech`, `github`/`demo`/`paper`, `image`, `highlights`. An optional markdown body becomes a long-form write-up on `/projects/<slug>/`.
- Logos: `src/assets/logos/` (imported, auto-optimized). PDFs and the résumé: `public/`.

## Layout
`src/pages/index.astro` is the one-pager (sticky sidebar + sections). `src/pages/projects/[slug].astro` renders project pages. Shared head/SEO/theme in `src/layouts/BaseLayout.astro`. Components in `src/components/`.

## Conventions
- Don't add a skills list or skill bars; tech goes as chips on roles/projects.
- Keep taglines to one sentence with a number where possible.
- Don't read `public/*.pdf`, `dist/`, or `node_modules/`.
- Research and rationale for the design: `docs/portfolio-redesign-research.md`.

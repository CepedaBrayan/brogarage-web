<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Bro Garage
- Work on `dev`; propose changes to `main` through a PR. Never merge or deploy without a user request.
- Next.js App Router, React and TypeScript. Keep the page a Server Component; isolate the ticking clock in its Client Component.
- Keep the supplied photograph local in `public/bro-garage.jpg`. Do not replace it or add marketing sections without request.
- Display live date/time in Spanish using `America/Bogota`, not the visitor's time zone. Avoid hydration mismatches and clean up timers.
- Preserve readable text and intentional image cropping on narrow, tall and landscape screens. Honor safe areas.
- Run `npm run lint` and `npm run build` before a PR. Document any unverified checks honestly.
- Releases must refer to the exact successful production deployment SHA on main, never merely a push. Do not expose tokens, execute AI output, or publish invented fallback AI notes.
- See `SKILLS.md` for recurring procedures and README for service setup.

## Language policy
- Write all code comments, documentation, commit messages, PR titles and descriptions, issue labels, workflow labels, and release notes in English.
- Keep public-facing landing copy and the Colombia clock localized in Spanish unless the user requests a product language change.

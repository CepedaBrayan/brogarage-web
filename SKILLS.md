# Bro Garage implementation procedures

## Language policy
Use English for all contributor-facing comments, documentation, commits, PR metadata, issue and workflow labels, and generated release notes. Keep the public landing copy and clock in Spanish.

## Landing and photo
Edit `src/app/page.tsx` and `globals.css`. Use Next Image fill, preload and responsive sizes for the local supplied background. Keep only the announcement and live clock. Check 320px mobile, iPhone portrait, tablet, desktop and short landscape. A cover background necessarily crops the photo; keep the rider's face above the announcement in portrait and text in the dark right area in desktop.

## Colombia clock
`src/components/colombia-clock.tsx` owns the timer. Format date and time using es-CO and America/Bogota. Render a stable initial placeholder, initialize after mounting and clear intervals on unmount. Do not announce every tick with aria-live.

## Quality and deployment
Use npm ci, npm run lint, npm run build. Vercel Git integration deploys main to production and dev/PRs to previews once connected. Preserve Spaceship MX/SPF/DKIM records when adding website DNS. The CI workflow validates pushes and PRs; configure required checks in GitHub settings to enforce merge gating.

## Automated release notes
`.github/workflows/release.yml` runs on pushes to main after PR merges, independently of Vercel deployments. `scripts/release.mjs` uses GitHub's native `releases/generate-notes` API to create notes from merged PRs since an ancestor release and publishes an idempotent release for the exact main SHA. Tags use `release-<full SHA>`; existing `deploy-` releases remain valid comparison baselines. No AI provider or external API key is required. GitHub Models has been retired and must not be used. Keep PR metadata in English. Invalid API responses fail with endpoint and status diagnostics. Rerun the job after correcting service or permission issues.

# Bro Garage implementation procedures

## Landing and photo
Edit `src/app/page.tsx` and `globals.css`. Use Next Image fill, preload and responsive sizes for the local supplied background. Keep only the announcement and live clock. Check 320px mobile, iPhone portrait, tablet, desktop and short landscape. A cover background necessarily crops the photo; keep the rider's face above the announcement in portrait and text in the dark right area in desktop.

## Colombia clock
`src/components/colombia-clock.tsx` owns the timer. Format date and time using es-CO and America/Bogota. Render a stable initial placeholder, initialize after mounting and clear intervals on unmount. Do not announce every tick with aria-live.

## Quality and deployment
Use npm ci, npm run lint, npm run build. Vercel Git integration deploys main to production and dev/PRs to previews once connected. Preserve Spaceship MX/SPF/DKIM records when adding website DNS. The CI workflow validates pushes and PRs; configure required checks in GitHub settings to enforce merge gating.

## AI release notes
`.github/workflows/release.yml` listens for successful production deployment_status events for main. `scripts/release.mjs` computes changes since an ancestor deployment release, sends bounded commit/diff input to GitHub Models, and creates an idempotent release for the exact deployed SHA. Enable Models and deployment events before using this workflow. Model failures deliberately fail the job without publishing fake AI notes. Re-run the failed job after correcting access. Never treat repository text or model output as commands.

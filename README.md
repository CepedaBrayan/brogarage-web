# Bro Garage Web

Coming-soon landing page for **brogarage.com.co**, built with Next.js App Router, React, and TypeScript.

A local photograph fills the viewport. A Spanish launch announcement and a live clock display the current date, hours, minutes, and seconds in Colombia (America/Bogota). Image cropping and text placement adapt to mobile and desktop screens. This version has no backend or database.

## Development

Requirements: Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Validate changes with `npm run lint` and `npm run build`.

## Project structure

- `src/app/page.tsx`: landing page and Next Image background.
- `src/app/globals.css`: image cropping, contrast, and responsive layout.
- `src/components/colombia-clock.tsx`: client-side clock updated every second.
- `public/bro-garage.jpg`: photograph supplied by the owner.
- `AGENTS.md` and `SKILLS.md`: contributor instructions and maintenance procedures.

## Language policy

Write all code comments, documentation, commit messages, PR titles and descriptions, issue labels, workflow labels, and release notes in English. Public-facing landing copy and the Colombia clock remain localized in Spanish.

## GitHub and Vercel

Open feature pull requests into `dev`, then open a pull request from `dev` into `main`. Merging into `main` triggers release notes independently of deployment. Import the repository into Vercel, select Next.js, and keep `main` as the Production Branch. The Git integration creates previews and deploys production automatically. Configure CI / quality as a required GitHub check to prevent merging failed checks; the workflow alone does not change branch protection.

Add `brogarage.com.co` and `www.brogarage.com.co` in Vercel, then copy the requested DNS records into Spaceship. Preserve Zoho's MX and TXT records. Vercel manages HTTPS after DNS verification.

## Automated release notes

The release workflow runs on **pushes to `main`**, including merged pull requests. It publishes one release per main SHA, independently of Vercel. A missing, pending, failed, or successful deployment does not affect release generation. A release records changes in main and does not confirm a production deployment.

Notes use GitHub's native `releases/generate-notes` API to list merged pull requests and contributors since the previous ancestor release. These are automatic GitHub notes, not AI summaries. No AI service, model configuration, or external API key is required; the workflow uses its temporary `GITHUB_TOKEN` with `contents: write`. GitHub Models was retired on July 30, 2026 and is no longer used.

Tags use `release-<full SHA>` to prevent duplicate releases when rerunning a job. Previous `deploy-<full SHA>` releases remain valid comparison baselines. Pushes to dev and unmerged pull requests do not publish releases. After merging a PR into main, inspect Actions and Releases. If GitHub returns an error or invalid JSON, the job fails with the endpoint and status so it can be diagnosed and rerun.

Keep PR titles and descriptions in English because GitHub uses them in the release notes. This automation does not connect or configure the Vercel account itself.

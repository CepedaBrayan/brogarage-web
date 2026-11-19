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

Work on `dev` and open pull requests into `main`. Import the repository into Vercel, select Next.js, and keep `main` as the Production Branch. The Git integration creates previews and deploys production automatically. Configure CI / quality as a required GitHub check to prevent merging failed checks; the workflow alone does not change branch protection.

Add `brogarage.com.co` and `www.brogarage.com.co` in Vercel, then copy the requested DNS records into Spaceship. Preserve Zoho's MX and TXT records. Vercel manages HTTPS after DNS verification.

## AI-generated release notes

The release workflow listens for successful **deployment_status** events for `main` and environment names starting with `Production`. After a successful deployment, it publishes one release per deployed SHA, with an English summary based on commits and the diff since the previous ancestor release. It uses GitHub Models with the temporary workflow token (`models: read`), without an external API key. Notes identify the model and link to the code and deployment. Input limits are applied before sending the diff.

Required external configuration:

1. Connect Vercel to this repository and keep GitHub `deployment_status` events enabled. Confirm that events report ref `main` and environment `Production`, or adjust the workflow filter to the actual values.
2. Enable GitHub Models for the repository/account and allow Actions to use it under the applicable policies. Commit and diff content is sent to this service to generate notes.
3. Optionally set the repository variable `RELEASE_MODEL` (default: `openai/gpt-4o-mini`). The selected model must be available to the account.
4. After the first successful production deployment on main, inspect Actions and Releases. If Models access fails, correct it and rerun the job. The workflow never presents fallback text as AI-generated notes.

Tags use `deploy-<full SHA>` to prevent duplicate releases for repeated deployments. Rolling back to an already released SHA does not create another release. Preview and failed deployment events do not publish releases. This automation does not connect or configure the Vercel account itself.

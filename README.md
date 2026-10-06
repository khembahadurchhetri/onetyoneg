# 1T1G website

Next.js 14 App Router, Tailwind, Prisma/Postgres, and Resend. The site and its
admin API run together on Vercel; a separate Express/Render backend is not
required.

## Run locally

1. Install dependencies with `pnpm install` (or `npm install`).
2. Copy `.env.example` to `.env` and fill in local PostgreSQL and email settings.
3. Apply the local schema and seed the initial course/service catalog:

   ```sh
   npx prisma migrate dev
   ```

4. Start the site with `npm run dev`.

## Admin setup

The initial admin account is created on first successful login after the
migration, using the environment values below. Generate a password hash in an
interactive terminal; password input is hidden:

```sh
node scripts/hash-admin-password.mjs
```

Set these values in Vercel Project Settings → Environment Variables (and in
`.env` for local testing):

- `ADMIN_EMAIL`: the one admin login email.
- `ADMIN_PASSWORD_HASH`: the output of the password-hash command. The initial
  password must be at least 12 characters.
- `ADMIN_SESSION_SECRET`: a unique random value of at least 32 characters. For
  example, generate one with
  `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.

Sign in at `/admin`. The panel manages courses, services, and project cards;
tracks contact/course inquiries and career applications; and lets the admin
change their password. Project image uploads use Vercel Blob. Create a Blob
store in the Vercel project and make its `BLOB_READ_WRITE_TOKEN` available to
the deployment and local environment before uploading. Projects are saved to
Postgres and appear on the homepage and Projects page. The initial login email
comes from `ADMIN_EMAIL`; changing the password in the panel updates the
database-stored password hash.

## Email setup

Set `RESEND_API_KEY` to the API key from Resend. Set `CONTACT_TO_EMAIL` to the
inbox that should receive notifications. `RESEND_FROM_EMAIL` must use a sender
domain verified with Resend in production. The default Resend test sender is
only suitable for development/testing and may only deliver to an authorized
recipient.

Contact requests, course inquiries, and career applications are saved in
Postgres and sent to the configured inbox. If the email provider is unavailable,
the submission remains saved in the admin inbox and the submitter is told that
the email notification could not be sent.

## Deploy to Vercel

1. Add `DATABASE_URL` and `DIRECT_URL` for the production Postgres database,
   along with the Resend and admin environment variables above.
2. The included `vercel.json` runs `npm run vercel-build`, which applies
   pending Prisma migrations before building the app. Confirm the Vercel
   project's Build Command is not overridden in Project Settings. Migrations
   create the admin, career-submission, and project tables and seed the initial
   services, courses, and existing portfolio projects:

   ```sh
   npm run vercel-build
   ```

   This command requires both production database URLs and is safe to run again
   after later releases.
3. Deploy the GitHub commit to Vercel, then sign in at `/admin`.

Do not commit `.env` or paste production secrets into source control. Vercel
project settings can override the repository build command; retain
`npm run vercel-build` or configure an equivalent command that runs
`prisma migrate deploy` before `next build`.

## Submission storage

- Website quotes and course inquiries are stored in `Contact`.
- Career applications are stored in `CareerApplication`. Applicants can include
  a CV or portfolio URL; file uploads are not enabled.
- Course and service listings are editable in the admin panel and stored in
  `Course` and `Service`.
- Projects are editable in the admin panel and stored in `Project`; new images
  are kept in Vercel Blob, while the initial sample project images remain in
  `public/projects`.
- Admin sign-in accounts are stored in `AdminAccount`; passwords are scrypt
  hashes and sessions use an HTTP-only, same-site cookie.

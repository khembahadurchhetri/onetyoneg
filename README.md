# 1T1G website

Next.js 14 (app router) + Tailwind + Prisma/Postgres, built for Vercel.

## Run locally

```
npm install
cp .env.example .env
# fill DATABASE_URL in .env with a real Postgres connection string
npx prisma migrate dev --name init
npm run dev
```

## Get a free Postgres database

Easiest path since you're deploying on Vercel: in your Vercel project,
go to **Storage → Create Database → Postgres** (this uses Neon under the
hood, has a free tier). It gives you a `DATABASE_URL` automatically —
copy it into `.env` for local dev too.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project**, import the repo.
3. Add the `DATABASE_URL` environment variable (from the step above) in
   Project Settings → Environment Variables.
4. Deploy. Vercel runs `npm install` and `npm run build` (which also runs
   `prisma generate`) automatically.
5. After the first deploy, run the migration once against the production
   database:
   ```
   npx prisma migrate deploy
   ```
   (run this locally with `DATABASE_URL` pointed at production, or from
   Vercel's CLI/terminal).

## What to customize before launch

- **Photos**: no stock photos were used on purpose (copyright risk +
  looks generic). The service sections use abstract gradient panels —
  swap `components/ServiceSection.tsx`'s visual block for real photos
  of your team or work once you have them.
- **Portfolio**: `app/portfolio/page.tsx` has placeholder descriptions
  for Hamrobot and ShopCo — replace with real screenshots and copy.
- **Domain**: once you buy a domain, add it in Vercel → Project →
  Domains.
- **Contact form data**: submissions land in the `Contact` table.
  View them with `npx prisma studio` or query the database directly.

## Structure

```
app/            pages (home, services, portfolio, careers, contact)
app/api/contact route handler that saves form submissions to Postgres
components/     Nav, Footer, Hero, ServiceSection, ContactForm, icons
prisma/         database schema
```

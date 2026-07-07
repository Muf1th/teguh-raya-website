# Teguh Raya Workshop — Website

Premium website for Teguh Raya Workshop, Kampung Serambangun, Tutong, Brunei.
Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion,
React Hook Form and Lucide icons.

## 1. Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Requires Node.js 18 or newer.

## 2. Your details in one place

Everything about the business — phone number, WhatsApp link, Instagram, address,
opening hours, the stats on the homepage — lives in **`lib/site.ts`**. Edit that
one file and the whole site updates.

- Services (names, descriptions, durations): `lib/services.ts`
- Testimonials, FAQs and blog articles: `lib/content.ts`

No code knowledge needed to edit these — they are plain lists of text.

## 3. Adding your photos

Drop your own photos into `public/images/`:

```
public/images/
├── hero/          hero-1.jpg              → homepage hero (landscape, min 1920px wide)
├── gallery/       preview-1..4.jpg        → homepage gallery preview
│                  work-1..8.jpg           → gallery page grid
├── before-after/  engine-1-before.jpg / engine-1-after.jpg
│                  brakes-1-before.jpg / brakes-1-after.jpg
├── workshop/      exterior.jpg, fleet.jpg, floor-1.jpg, floor-2.jpg
├── staff/         team-1.jpg
└── customers/     handover-1.jpg
```

Until a photo is added, a clean branded placeholder appears in its spot showing
which file is missing — the site never shows a broken image. To use different
filenames, edit the lists at the top of `app/gallery/page.tsx`.

Tips: export photos as JPG around 1600–2000px on the long edge; Next.js
handles resizing, AVIF/WebP conversion and lazy loading automatically.

## 4. Google Map

In `lib/site.ts`, replace `mapEmbed` with your exact embed URL:
Google Maps → search your workshop → Share → Embed a map → copy the `src` URL.

## 5. Deploy to Vercel (free)

1. Push this folder to a GitHub repository.
2. Go to vercel.com → Add New Project → import the repository.
3. Vercel detects Next.js automatically — press Deploy.
4. Add your custom domain in Vercel → Settings → Domains, then update `url`
   in `lib/site.ts` to your real domain and redeploy.

`vercel.json` pins deployment to the Singapore region for fast loading in Brunei.

## 6. After launch — SEO checklist

- Verify the site in Google Search Console and submit `https://yourdomain/sitemap.xml`.
- Link the website from your Google Business Profile and Instagram bio.
- The site already ships: per-page meta titles/descriptions, Open Graph and
  Twitter cards, LocalBusiness (AutoRepair) schema, FAQ schema, Article schema,
  sitemap.xml and robots.txt.

## 7. Future expansion ideas (in rough priority order)

1. **Real booking backend** — add an API route (`app/api/booking/route.ts`) that
   emails or stores bookings; the form in `components/BookingForm.tsx` already
   collects a clean data object ready to POST.
2. **Customer accounts + service history** — Supabase or Firebase for auth and a
   per-vehicle service record customers can view.
3. **Fleet dashboard** — a login area for corporate clients showing their vehicles,
   upcoming services, monthly reports and invoices. Strong selling point for the
   Premium Fleet tier.
4. **Online payments** — deposit payment on booking once local payment options
   are settled.
5. **Admin panel** — manage bookings, job status and gallery photos without
   touching code.
6. **Bahasa Melayu version** — Next.js i18n routing for a dual-language site.

## Project structure

```
app/            pages (App Router) — one folder per page
components/     reusable UI (Navbar, Footer, BookingForm, GalleryGrid, …)
lib/            all editable content and business details
public/images/  your photos
```

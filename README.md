# VYUH MEDIA

The website for VYUH MEDIA, a boutique political communication and public
relations consultancy. Built with Next.js App Router, React, TypeScript and
Tailwind CSS.

## Requirements

- Node.js 20 or later
- npm

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To validate or serve a
production build:

```bash
npm run lint
npm run build
npm run start
```

## Contact form delivery

The contact form validates submissions in the browser and on the server. To
deliver enquiries, copy `.env.example` to `.env.local` and configure one of:

- `CONTACT_WEBHOOK_URL` for a JSON POST endpoint.
- `RESEND_API_KEY` to send email through Resend. Set `CONTACT_TO_EMAIL` and,
  optionally, `CONTACT_FROM_EMAIL` to configure recipients and sender.

If both delivery methods are configured, the webhook is used. Without either
method, submissions are not discarded or reported as sent: the form explains
that delivery is unavailable and provides the direct email address.

## Pages

- `/` — Home
- `/about` — About and founder
- `/services` — Services
- `/approach` — Working method
- `/contact` — Contact form
- `/privacy-policy` and `/terms` — Legal information

The sitemap and robots directives are available at `/sitemap.xml` and
`/robots.txt`.

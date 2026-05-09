# DiaCare Frontend

This is the React frontend for DiaCare. It is built with Vite and is ready to be deployed on Vercel as a static site.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

## Environment Variables

Create a local `.env` file from `.env.example`.

Required for Vercel and local development:

- `VITE_API_URL`: the full backend API base URL, for example `https://your-backend-domain.com/api/v1`

Optional placeholders are included for OAuth-related values used by the app.

## Vercel Deployment

Deploy this frontend as the Vercel project root directory:

- Root directory: `DiaCareFrontend`
- Build command: `npm run build`
- Output directory: `dist`

The included [`vercel.json`](./vercel.json) keeps React Router routes working on page refresh by rewriting all app routes to `index.html`.

Important:

- Vercel should host the frontend only.
- The Spring Boot backend in `../DiaCare` must be deployed separately and its public URL should be placed in `VITE_API_URL`.

# Running this project on Replit

This project is a React 19 + TypeScript + Vite frontend.

## Development

Dependencies are installed with npm. Start the app with:

```bash
npm run dev
```

The Vite server is configured to listen on `0.0.0.0:5000` and allow Replit's proxied preview host.

## Checks

```bash
npm run lint
npm run build
```

The `.env.example` documents an optional `GEMINI_API_KEY` for Gemini API calls. The current frontend does not reference that API, so it is not required just to start the preview.
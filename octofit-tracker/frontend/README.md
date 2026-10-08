# OctoFit Tracker presentation tier

The presentation tier is a React 19 application built with Vite. Start it from
the repository root with:

```bash
npm run dev --prefix octofit-tracker/frontend
```

## API configuration

In GitHub Codespaces, define `VITE_CODESPACE_NAME` in
`octofit-tracker/frontend/.env.local` so the frontend can reach the API on port
8000:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The value is the Codespace name only; Vite uses it to construct the public API
URL. Restart the Vite server after changing `.env.local`.

When `VITE_CODESPACE_NAME` is not set, the frontend safely uses
`http://localhost:8000`, which is suitable for local development.

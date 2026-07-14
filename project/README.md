# AI Email Reply Generator

Paste an email, pick a tone, and get a drafted reply powered by Gemini.

```
ai-email-reply-generator/
├── backend/     Express API (Gemini integration)
└── frontend/    React + Vite + Tailwind client
```

## Quick start

**1. Backend**

```
cd backend
npm install
cp .env.example .env    # then add your GEMINI_API_KEY
npm run dev
```

Runs at `http://localhost:5000`.

**2. Frontend** (in a second terminal)

```
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173` and talks to the backend automatically.

See `backend/README.md` and `frontend/README.md` for details on each side,
including the API contract and available environment variables.

## What was completed

The original scaffold had a working `/api/generate` route and a bare-bones
React form. This version adds:

- **Backend**: tone validation, input validation, a friendly error when
  `GEMINI_API_KEY` is missing (instead of a crash), optional AI-suggested
  subject lines, and a `GET /api/tones` endpoint so the frontend never
  hardcodes the tone list.
- **Frontend**: a redesigned UI (stationery/correspondence theme), tone
  picker, subject-line toggle, copy-to-clipboard with confirmation,
  download-as-`.txt`, live word counts, inline error handling, a real
  loading state, and Ctrl/Cmd+Enter to generate.

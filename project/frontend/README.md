# AI Email Reply Generator — Frontend

React + Vite + Tailwind client for the AI Email Reply Generator API.

## Install

```
npm install
```

## Configure (optional)

By default the app talks to `http://localhost:5000`. To point it elsewhere,
copy `.env.example` to `.env` and set:

```
VITE_API_URL=http://localhost:5000
```

## Run

```
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Make sure the
backend is running first — see `../backend/README.md`.

## Features

- Tone picker (Professional, Formal, Friendly, Concise, Persuasive)
- Optional AI-suggested subject line
- Copy to clipboard and download reply as `.txt`
- Live word counts, inline error messages, loading state
- Ctrl/Cmd + Enter to generate while focused on the email field

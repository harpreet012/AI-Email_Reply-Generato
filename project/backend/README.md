# AI Email Reply Generator — Backend

Express API that generates email replies using the Gemini API.

## Install

```
npm install
```

## Configure

Copy `.env.example` to `.env` and add your key:

```
GEMINI_API_KEY=your_key_here
PORT=5000
```

## Run

```
npm run dev
```

The API is now available at `http://localhost:5000`.

## Endpoints

### `POST /api/generate`

Body:

```json
{
  "email": "Your email text...",
  "tone": "Professional",
  "includeSubject": false
}
```

`tone` is one of `Professional`, `Formal`, `Friendly`, `Concise`, `Persuasive` (defaults to `Professional` if omitted or invalid).

Response:

```json
{
  "reply": "The generated reply text...",
  "subject": "Suggested subject line (empty string if includeSubject was false)"
}
```

Errors return a 4xx/5xx status with `{ "message": "..." }`.

### `GET /api/tones`

Returns the list of supported tones, so the frontend never has to hardcode them:

```json
{ "tones": ["Professional", "Formal", "Friendly", "Concise", "Persuasive"] }
```

# Threadbase Upload Server Starter

A small Express API for authenticated avatar uploads.

## Setup

1. Install Node.js 18 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env`; set a long random `JWT_SECRET` and change `AUTH_PASSWORD`.
4. Run `npm run dev`.

This starter uses a configurable demo username/password for local testing. Do not expose this login endpoint publicly without adding production-grade user storage, rate limiting, and account controls.

## Get a token

Send `POST /auth/login` with JSON:

```json
{ "username": "demo", "password": "change-this-password" }
```

Use the values you set in `.env`. A successful response contains a JWT valid for one hour. Invalid credentials return `401`.

## Upload API

`POST /api/upload` requires `Authorization: Bearer <JWT>` and a multipart form-data field named `avatar`. Only JPEG, PNG, WebP, and GIF files up to 5 MB are accepted. Successful uploads return `201` with a URL such as `/uploads/avatar-...png`.

Files are served from `/uploads/<filename>`.

## Manual verification (Thunder Client)

1. Start the server with `npm run dev`; confirm `GET http://localhost:3000/health` returns `200`.
2. Login using `POST http://localhost:3000/auth/login`, JSON body shown above, and copy the returned token.
3. Successful upload: `POST http://localhost:3000/api/upload`, Bearer token, Body → Form → key `avatar` (type File), select a PNG/JPEG/WebP/GIF no larger than 5 MB. Expect `201` and a `url`.
4. Rejected PDF: repeat with a PDF file. Expect `400`.
5. Oversized file: repeat with an allowed image larger than 5 MB. Expect `400`.
6. Missing token: repeat a valid image upload without the Authorization header. Expect `401`.

Open the returned upload URL in a browser at `http://localhost:3000<url-from-response>` and confirm the image loads. Capture screenshots of the Thunder Client responses and browser image for the PR. These are manual test instructions; screenshots and test execution must be supplied after running locally.

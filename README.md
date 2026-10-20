# Threadbase Upload Server Starter

A small Express API for authenticated avatar uploads.

## Setup

1. Install Node.js 18 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `JWT_SECRET`.
4. Run `npm run dev`.

## Upload API

`POST /api/upload` requires `Authorization: Bearer <JWT>` and a multipart form-data field named `avatar`. Only JPEG, PNG, WebP, and GIF files up to 5 MB are accepted. Successful uploads return `201` with a URL such as `/uploads/avatar-...png`.

Files are served from `/uploads/<filename>`.

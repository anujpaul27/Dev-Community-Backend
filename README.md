# ThinkShare - Server Site (Refactored)

Refactored from a single 364-line `app.js` (raw `mongodb` driver, everything
inline) into a modular TypeScript + Mongoose backend, following the folder
layout and coding conventions actually used in `BookChimp-Backend`
(flat `config / controllers / models / routers / middleware`, controllers
calling models directly — no service layer, no centralized error framework,
since BookChimp itself doesn't use either).

## What changed

- **Language:** JavaScript → TypeScript (strict mode, no `any`, ES module
  `import`/`export`, named exports).
- **Database:** raw `mongodb` driver → **Mongoose**, with typed models
  (`IIdea`, `IComment`), schemas, validation, required fields, defaults,
  and `timestamps: true`.
- **Structure:** one file → `server.ts` (entry point, mirrors BookChimp's
  `server.js`) + `src/app.ts` + `src/config`, `src/models`,
  `src/controllers`, `src/routers`.
- **Dead code removed:** the commented-out JWT/session middleware block and
  stray debug `console.log`s were dropped as cleanup — they were inactive
  and not part of the live API surface.

## What did NOT change

- **Every route, path, method, request body shape, response body shape,
  and HTTP status code is identical to the original**, including a couple
  of existing quirks preserved on purpose:
  - The comment update/delete endpoints still return the message text
    `"Idea updated successful"` / `"Idea Delete Successful."` (this is
    copied verbatim from the original `app.js`, not a new bug).
  - `GET /comments/:id` still returns an array (`find`), even though it
    looks up by a single `_id`.
  - `POST /create-idea` and `POST /comment` still return
    `{ acknowledged, insertedId }` in `data`, matching the native driver's
    original `insertOne` result shape (Mongoose's `.create()` returns the
    full document instead, so the response is reconstructed to match).
- Mongoose's automatic `__v` version key is explicitly disabled
  (`versionKey: false`) on both schemas so it doesn't show up as a new,
  unexpected field in API responses.
- Schemas use `strict: false` so any extra fields the frontend already
  sends (beyond the fields the API reads/filters on) are still saved
  instead of being silently dropped, matching the old "insert whatever
  the client sends" behavior.

## Setup

```bash
npm install
cp .env.example .env   # fill in MONGODB_URI, PORT, CLIENT_URL
npm run dev             # ts-node + nodemon, watches src/ and server.ts
```

Production build:

```bash
npm run build   # tsc -> dist/
npm start        # node dist/server.js
```

## Project structure

```
.
├── server.ts                  # entry point (connects DB, starts listener)
├── src/
│   ├── app.ts                 # express app, middleware, router mounting
│   ├── config/
│   │   ├── config.ts          # env var loading/validation
│   │   └── connect.db.ts      # mongoose connection
│   ├── models/
│   │   ├── idea.model.ts      # IIdea interface + schema + model
│   │   └── comment.model.ts   # IComment interface + schema + model
│   ├── controllers/
│   │   ├── idea.controller.ts
│   │   └── comment.controller.ts
│   ├── routers/
│   │   ├── idea.router.ts
│   │   └── comment.router.ts
│   └── middleware/            # reserved for future auth middleware
├── tsconfig.json
└── package.json
```

## Routes (unchanged)

| Method | Path                       |
|--------|-----------------------------|
| GET    | `/`                          |
| POST   | `/create-idea`                |
| GET    | `/read-idea`                  |
| GET    | `/read-idea-all`              |
| PUT    | `/idea-update/:id`            |
| GET    | `/idea/:id`                   |
| DELETE | `/idea-delete/:id`            |
| GET    | `/my-ideas/:id`                |
| GET    | `/search?q=`                  |
| POST   | `/comment`                     |
| GET    | `/comment/:id`                 |
| GET    | `/comments/:id`                |
| GET    | `/comments-userID/:id`         |
| PUT    | `/comments/:id`                |
| DELETE | `/comment-delete/:id`          |

## Not implemented (was already inactive)

The original `app.js` had a commented-out JWT session-verification
middleware (`userTokenVerify`, using `jose-cjs`) that was never actually
attached to any route. It has been removed as dead code rather than ported
into `src/middleware/`, since it wasn't part of the working API. The
`middleware/` folder is kept (mirroring BookChimp's structure) for when
auth is implemented.

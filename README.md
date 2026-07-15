# ThinkShare - Server Site 

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

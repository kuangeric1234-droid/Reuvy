# Blog CMS — Sanity Studio

The blog is backed by **Sanity**, with an embedded Studio at **`/studio`**. Until a
project is configured the site falls back to the local `POSTS` array in
[src/lib/marketing/posts.ts](../../src/lib/marketing/posts.ts), so nothing breaks
before setup.

## How it fits together

| Piece | File |
|---|---|
| Env + `sanityEnabled` flag | [src/sanity/env.ts](../../src/sanity/env.ts) |
| Schema (post + callout) | [src/sanity/schemaTypes/](../../src/sanity/schemaTypes/) |
| Studio config | [sanity.config.ts](../../sanity.config.ts) |
| Embedded Studio route | [src/app/studio/[[...tool]]/page.tsx](../../src/app/studio/%5B%5B...tool%5D%5D/page.tsx) |
| Read client + GROQ | [src/sanity/lib/](../../src/sanity/lib/) |
| Portable Text → `PostBlock[]` adapter | [src/sanity/lib/adapt.ts](../../src/sanity/lib/adapt.ts) |
| Data layer (Sanity → local fallback) | [src/lib/marketing/blog-source.ts](../../src/lib/marketing/blog-source.ts) |

The adapter converts Sanity's Portable Text into the site's existing `PostBlock[]`
shape, so the article renderer ([post-content.tsx](../../src/app/resources/blog/%5Bslug%5D/post-content.tsx))
is unchanged and Sanity/local posts render identically.

## One-time setup

1. **Create a project** at https://www.sanity.io/manage (free tier). Note the
   **Project ID**; keep the dataset named `production`.
2. **Add env vars** — copy `.env.local.example` to `.env.local` and fill in
   `NEXT_PUBLIC_SANITY_PROJECT_ID`. Restart `pnpm dev`.
3. **Allow the Studio origin (CORS):** in sanity.io/manage → API → CORS origins,
   add `http://localhost:3007` (and your production URL), with credentials.
4. Visit **`/studio`**, log in, and you're editing. New/updated posts go live on
   the site within ~60s (ISR `revalidate = 60`).

## Migrate the existing posts (optional)

A ready NDJSON seed of the current posts is at `sanity/seed/posts.ndjson`
(regenerate with `node --experimental-strip-types scripts/sanity-seed.ts`).
Import it:

```bash
npx sanity@latest dataset import sanity/seed/posts.ndjson production
# re-run with --replace to update existing docs
```

## Notes / follow-ups

- **Article pages** (`/resources/blog/[slug]`) are fully Sanity-driven with local
  fallback. The **index** ([blog-content.tsx](../../src/app/resources/blog/blog-content.tsx))
  is still a hand-curated, visually-tinted marketing grid — wire it to
  `getAllPosts()` (mapping a tint per card) when you want new posts to list
  automatically.
- Inline images and link annotations are intentionally not rendered yet (the
  `PostBlock` union is plain-text). Add an `image` block kind + renderer to support them.
- Body marks (bold/italic) are flattened to plain text on the site for now.

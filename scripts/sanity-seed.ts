// Generates an NDJSON seed of the existing local blog posts for Sanity import.
//
//   node --experimental-strip-types scripts/sanity-seed.ts
//   npx sanity@latest dataset import sanity/seed/posts.ndjson production
//
// Re-run any time POSTS changes. Existing docs are matched by _id (post.<slug>),
// so re-import with `--replace` to update.

import { writeFileSync, mkdirSync } from "node:fs";
import { POSTS, type PostBlock } from "../src/lib/marketing/posts.ts";

let counter = 0;
const key = () => `k${(counter++).toString(36)}`;

function span(text: string) {
  return { _type: "span", _key: key(), text, marks: [] as string[] };
}

function blocksToPortableText(body: PostBlock[]) {
  const out: Record<string, unknown>[] = [];
  for (const b of body) {
    if (b.kind === "callout") {
      out.push({ _type: "callout", _key: key(), tone: b.tone, text: b.text });
    } else if (b.kind === "ul" || b.kind === "ol") {
      const listItem = b.kind === "ul" ? "bullet" : "number";
      for (const item of b.items) {
        out.push({
          _type: "block",
          _key: key(),
          style: "normal",
          listItem,
          level: 1,
          markDefs: [],
          children: [span(item)],
        });
      }
    } else {
      const style =
        b.kind === "quote" ? "blockquote" : b.kind === "p" ? "normal" : b.kind;
      out.push({
        _type: "block",
        _key: key(),
        style,
        markDefs: [],
        children: [span(b.text)],
      });
      if (b.kind === "quote" && b.attribution) {
        out.push({
          _type: "block",
          _key: key(),
          style: "normal",
          markDefs: [],
          children: [span(`— ${b.attribution}`)],
        });
      }
    }
  }
  return out;
}

const docs = POSTS.map((post) => ({
  _id: `post.${post.slug}`,
  _type: "post",
  title: post.title,
  slug: { _type: "slug", current: post.slug },
  excerpt: post.excerpt,
  category: post.category,
  author: { name: post.author.name, role: post.author.role },
  publishedAt: post.publishedAt,
  readMinutes: post.readMinutes,
  body: blocksToPortableText(post.body),
}));

const ndjson = docs.map((d) => JSON.stringify(d)).join("\n") + "\n";
mkdirSync("sanity/seed", { recursive: true });
writeFileSync("sanity/seed/posts.ndjson", ndjson, "utf8");
console.log(`Wrote sanity/seed/posts.ndjson — ${docs.length} posts`);

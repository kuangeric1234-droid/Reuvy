// Converts a Sanity post row (with a Portable Text `body`) into the site's
// canonical `Post` shape (`body: PostBlock[]`), so the existing blog renderer
// in post-content.tsx works unchanged for both Sanity and local content.

import type { Post, PostBlock, PostCategory } from "@/lib/marketing/posts";

type PTSpan = { _type?: string; text?: string };
type PTNode = {
  _type?: string;
  style?: string;
  listItem?: "bullet" | "number";
  children?: PTSpan[];
  // callout fields
  tone?: "info" | "warn";
  text?: string;
};

type SanityPostRow = {
  slug?: string;
  title?: string;
  excerpt?: string;
  category?: string;
  author?: { name?: string; role?: string };
  publishedAt?: string;
  readMinutes?: number;
  body?: PTNode[];
};

const VALID_CATEGORIES: PostCategory[] = [
  "AHPRA",
  "AI",
  "Operations",
  "Marketing",
  "Migration",
  "Product",
];

function spanText(node: PTNode): string {
  return (node.children ?? []).map((c) => c.text ?? "").join("");
}

/** Portable Text → PostBlock[]. Groups consecutive list items into ul/ol. */
export function portableTextToBlocks(pt: PTNode[] | undefined): PostBlock[] {
  const out: PostBlock[] = [];
  let list: { kind: "ul" | "ol"; items: string[] } | null = null;

  const flush = () => {
    if (list) {
      out.push({ kind: list.kind, items: list.items });
      list = null;
    }
  };

  for (const node of pt ?? []) {
    if (node._type === "callout") {
      flush();
      out.push({
        kind: "callout",
        tone: node.tone === "warn" ? "warn" : "info",
        text: node.text ?? "",
      });
      continue;
    }

    if (node._type !== "block") {
      // Unsupported node (e.g. image) — skip for now.
      flush();
      continue;
    }

    const text = spanText(node);

    if (node.listItem === "bullet" || node.listItem === "number") {
      const kind = node.listItem === "bullet" ? "ul" : "ol";
      if (!list || list.kind !== kind) {
        flush();
        list = { kind, items: [] };
      }
      list.items.push(text);
      continue;
    }

    flush();
    switch (node.style) {
      case "h2":
        out.push({ kind: "h2", text });
        break;
      case "h3":
        out.push({ kind: "h3", text });
        break;
      case "blockquote":
        out.push({ kind: "quote", text });
        break;
      default:
        if (text.trim()) out.push({ kind: "p", text });
    }
  }

  flush();
  return out;
}

export function adaptPost(row: SanityPostRow): Post {
  const category = VALID_CATEGORIES.includes(row.category as PostCategory)
    ? (row.category as PostCategory)
    : "Product";

  return {
    slug: row.slug ?? "",
    title: row.title ?? "Untitled",
    excerpt: row.excerpt ?? "",
    category,
    author: {
      name: row.author?.name ?? "Ruevii",
      role: row.author?.role ?? "",
    },
    publishedAt: row.publishedAt ?? "",
    readMinutes: row.readMinutes ?? 5,
    body: portableTextToBlocks(row.body),
  };
}

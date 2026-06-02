// Unified blog data access. Prefers Sanity-authored content when a project is
// configured; otherwise (and on any fetch error) falls back to the local POSTS
// array so the site always renders. The article renderer is unchanged — both
// sources return the same `Post` shape.

import { POSTS, type Post } from "./posts";
import { sanityEnabled } from "@/sanity/env";
import { fetchSanityPosts, fetchSanityPost } from "@/sanity/lib/fetch";

export async function getAllPosts(): Promise<Post[]> {
  if (sanityEnabled) {
    try {
      const posts = await fetchSanityPosts();
      if (posts.length) return posts;
    } catch {
      // network/config error — fall through to local content
    }
  }
  return POSTS;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (sanityEnabled) {
    try {
      const post = await fetchSanityPost(slug);
      if (post) return post;
    } catch {
      // fall through to local content
    }
  }
  return POSTS.find((p) => p.slug === slug) ?? null;
}

/** Three related posts: same category first, then most recent others. */
export async function getRelatedPosts(slug: string, limit = 3): Promise<Post[]> {
  const all = await getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);

  const sameCategory = all.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = all
    .filter((p) => p.slug !== slug && p.category !== current.category)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return [...sameCategory, ...others].slice(0, limit);
}

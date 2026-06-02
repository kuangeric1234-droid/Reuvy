import type { Post } from "@/lib/marketing/posts";
import { sanityClient } from "./client";
import { ALL_POSTS_QUERY, POST_BY_SLUG_QUERY } from "./queries";
import { adaptPost } from "./adapt";

// Cache published content for a minute (ISR). Sanity edits go live within ~60s.
const FETCH_OPTS = { next: { revalidate: 60 } } as const;

export async function fetchSanityPosts(): Promise<Post[]> {
  if (!sanityClient) return [];
  const rows = await sanityClient.fetch(ALL_POSTS_QUERY, {}, FETCH_OPTS);
  return (rows ?? []).map(adaptPost);
}

export async function fetchSanityPost(slug: string): Promise<Post | null> {
  if (!sanityClient) return null;
  const row = await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug }, FETCH_OPTS);
  return row ? adaptPost(row) : null;
}

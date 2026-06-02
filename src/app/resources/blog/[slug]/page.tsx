import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { ClosingCTABand } from "@/components/ui";
import { POSTS, POST_BY_SLUG, getRelatedPosts } from "@/lib/marketing/posts";

import { PostContent } from "./post-content";

/* -------------------------------------------------------------------------- */
/*  Static params + per-post metadata                                          */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

type RouteParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POST_BY_SLUG[slug];

  if (!post) {
    return {
      title: "Post not found — Ruevii",
    };
  }

  return {
    title: `${post.title} — Ruevii`,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "en_AU",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: [post.category],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const post = POST_BY_SLUG[slug];

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(slug, 3);

  return (
    <main className="min-h-screen bg-[var(--color-paper)]">
      <ScrollProgress />
      <SiteNav />

      <PostContent post={post} related={related} />

      <ClosingCTABand
        primary="Run your clinic on a calmer system."
        secondary="Let the writing prove it."
        ctaPrimary={{ label: "Book a demo", href: "/demo" }}
        ctaSecondary={{ label: "See pricing", href: "/pricing" }}
      />

      <SiteFooter />
    </main>
  );
}

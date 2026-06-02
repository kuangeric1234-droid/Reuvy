"use client";

import { ArrowUpRight, ArrowLeft } from "lucide-react";

import { EyebrowTag, TwoToneHeadline } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, Lift } from "@/components/motion-primitives";
import type { Post, PostBlock } from "@/lib/marketing/posts";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Try to split the title into a two-tone headline on a comma or em-dash.
 * Falls back to (title, excerpt) if no natural split exists.
 */
function splitHeadline(
  title: string,
  excerpt: string,
): { primary: string; secondary: string } {
  // Prefer em-dash split, then colon, then comma.
  const dashIdx = title.indexOf("—");
  if (dashIdx > -1) {
    return {
      primary: title.slice(0, dashIdx).trim(),
      secondary: title.slice(dashIdx + 1).trim(),
    };
  }
  const colonIdx = title.indexOf(":");
  if (colonIdx > -1) {
    return {
      primary: title.slice(0, colonIdx).trim(),
      secondary: title.slice(colonIdx + 1).trim(),
    };
  }
  const commaIdx = title.lastIndexOf(",");
  if (commaIdx > -1) {
    return {
      primary: title.slice(0, commaIdx).trim(),
      secondary: title.slice(commaIdx + 1).trim(),
    };
  }
  // Use the title as the primary and a trimmed excerpt as the secondary.
  const short = excerpt.split(/(?<=\.)\s/)[0] ?? excerpt;
  return { primary: title, secondary: short };
}

function AuthorAvatar({
  name,
  size = 44,
}: {
  name: string;
  size?: number;
}) {
  const initials = name
    .replace(/^(Dr\.|RN)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const seed = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  const tints = [
    "color-mix(in srgb, var(--color-blue) 28%, white)",
    "color-mix(in srgb, var(--color-blue-ink) 22%, white)",
    "color-mix(in srgb, var(--color-blue) 40%, var(--color-paper))",
    "color-mix(in srgb, var(--color-blue-ink) 32%, var(--color-paper))",
  ];
  const bg = tints[seed % tints.length];

  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-[var(--color-greige)] text-[var(--color-blue-ink)]"
      style={{
        width: size,
        height: size,
        background: bg,
        fontFamily: "var(--font-mono)",
        fontSize: Math.round(size * 0.34),
        letterSpacing: "0.04em",
      }}
    >
      {initials}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Block renderer                                                             */
/* -------------------------------------------------------------------------- */

function Block({ block }: { block: PostBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p
          className="text-[17px] leading-[1.7] text-[var(--color-charcoal)] mb-5"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {block.text}
        </p>
      );

    case "h2":
      return (
        <h2
          className="font-serif font-normal text-[32px] leading-[1.15] tracking-[-0.01em] text-black mt-12 mb-3 text-balance"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3
          className="font-serif font-normal text-[22px] leading-[1.2] tracking-[-0.005em] text-black mt-8 mb-2 text-balance"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {block.text}
        </h3>
      );

    case "ul":
      return (
        <ul
          className="list-disc pl-6 marker:text-[var(--color-blue-ink)] my-5 space-y-2"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {block.items.map((item, i) => (
            <li
              key={i}
              className="text-[15px] leading-[1.65] text-[var(--color-charcoal)] pl-1"
            >
              {item}
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol
          className="list-decimal pl-6 marker:text-[var(--color-blue-ink)] marker:font-medium my-5 space-y-2"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {block.items.map((item, i) => (
            <li
              key={i}
              className="text-[15px] leading-[1.65] text-[var(--color-charcoal)] pl-1"
            >
              {item}
            </li>
          ))}
        </ol>
      );

    case "quote":
      return (
        <figure className="my-8">
          <blockquote
            className="font-serif italic text-[22px] leading-[1.4] text-black border-l-2 border-[var(--color-blue-ink)] pl-5"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {block.text}
          </blockquote>
          {block.attribution ? (
            <figcaption
              className="mt-3 pl-5 text-[12px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              — {block.attribution}
            </figcaption>
          ) : null}
        </figure>
      );

    case "callout": {
      const isWarn = block.tone === "warn";
      const bg = isWarn
        ? "color-mix(in srgb, #d6c2a1 22%, white)"
        : "color-mix(in srgb, var(--color-blue) 14%, white)";
      const border = isWarn
        ? "color-mix(in srgb, #b59866 55%, white)"
        : "color-mix(in srgb, var(--color-blue-ink) 38%, white)";
      const label = isWarn ? "Heads up" : "Note";
      return (
        <aside
          className="my-7 rounded-md p-5 border"
          style={{
            background: bg,
            borderColor: border,
          }}
        >
          <div
            className="mb-2 text-[10.5px] uppercase tracking-[0.16em]"
            style={{
              fontFamily: "var(--font-mono)",
              color: isWarn ? "#7a5a26" : "var(--color-blue-ink)",
            }}
          >
            {label}
          </div>
          <p
            className="text-[15px] leading-[1.6] text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {block.text}
          </p>
        </aside>
      );
    }
  }
}

/* -------------------------------------------------------------------------- */
/*  Sections                                                                   */
/* -------------------------------------------------------------------------- */

function ArticleHeader({ post }: { post: Post }) {
  const { primary, secondary } = splitHeadline(post.title, post.excerpt);

  return (
    <header className="w-full bg-[var(--color-paper)] border-b border-[var(--color-greige)]">
      <div className="wrap pt-[88px] pb-12 md:pt-[120px] md:pb-16">
        <div className="max-w-[760px] mx-auto">
          <Reveal>
            <a
              href="/resources/blog"
              className="inline-flex items-center gap-1.5 text-[13px] text-[var(--color-charcoal)] hover:text-black transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              <span style={{ fontFamily: "var(--font-mono)" }} className="uppercase tracking-[0.12em] text-[11px]">
                All posts
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <EyebrowTag>{post.category}</EyebrowTag>
              <span
                aria-hidden
                className="w-1 h-1 rounded-full bg-[var(--color-greige)]"
              />
              <span
                className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {formatDate(post.publishedAt)}
              </span>
              <span
                aria-hidden
                className="w-1 h-1 rounded-full bg-[var(--color-greige)]"
              />
              <span
                className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {post.readMinutes} min read
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <TwoToneHeadline as="h1" primary={primary} secondary={secondary} />
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex items-center gap-4">
              <AuthorAvatar name={post.author.name} />
              <div className="flex flex-col leading-tight">
                <span className="text-[15px] font-medium text-black">
                  {post.author.name}
                </span>
                <span className="text-[13px] text-[var(--color-charcoal)]">
                  {post.author.role}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  );
}

function ArticleBody({ post }: { post: Post }) {
  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap py-14 md:py-20">
        <article className="max-w-[720px] mx-auto">
          {/* Lead excerpt sits above the body in a slightly larger weight */}
          <Reveal>
            <p
              className="text-[19px] leading-[1.55] text-black mb-10 font-medium"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {post.excerpt}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div>
              {post.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          </Reveal>

          {/* Byline footer */}
          <Reveal delay={0.1}>
            <div className="mt-16 pt-8 border-t border-[var(--color-greige)] flex items-center gap-4">
              <AuthorAvatar name={post.author.name} size={48} />
              <div className="flex flex-col leading-tight">
                <span
                  className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-charcoal)] mb-1"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Written by
                </span>
                <span className="text-[15px] font-medium text-black">
                  {post.author.name}
                </span>
                <span className="text-[13px] text-[var(--color-charcoal)]">
                  {post.author.role}
                </span>
              </div>
            </div>
          </Reveal>
        </article>
      </div>
    </section>
  );
}

function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="w-full bg-[var(--color-paper)] border-t border-[var(--color-greige)]">
      <div className="wrap py-20 md:py-24">
        <Reveal>
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div className="flex flex-col gap-3">
              <EyebrowTag>Keep reading</EyebrowTag>
              <h2
                className="font-serif font-normal text-[clamp(24px,2.6vw,34px)] leading-[1.1] tracking-[-0.02em] text-black"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Related notes from the desk.
              </h2>
            </div>
            <a
              href="/resources/blog"
              className="hidden md:inline-flex items-center gap-1.5 text-[13.5px] font-medium text-black opacity-70 hover:opacity-100 transition-opacity"
            >
              All posts
              <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>

        <Stagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={0.05}
        >
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <RelatedCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function RelatedCard({ post }: { post: Post }) {
  return (
    <Lift amount={-4} className="h-full">
      <a
        href={`/resources/blog/${post.slug}`}
        className="group h-full flex flex-col rounded-xl overflow-hidden bg-white border border-[var(--color-greige)] transition-colors hover:border-[color-mix(in_srgb,var(--color-blue)_55%,white)]"
        style={{
          boxShadow: "0 12px 36px -24px rgba(15,29,43,0.18)",
        }}
      >
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {post.category}
            </span>
            <span
              aria-hidden
              className="w-1 h-1 rounded-full bg-[var(--color-greige)]"
            />
            <span
              className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {post.readMinutes} min
            </span>
          </div>

          <h3
            className="font-serif text-[20px] leading-[1.18] tracking-[-0.01em] text-black mb-3 text-balance group-hover:text-[var(--color-blue-ink)] transition-colors"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {post.title}
          </h3>
          <p className="text-[13.5px] leading-[1.55] text-[var(--color-charcoal)] line-clamp-3">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-5 flex items-center justify-between">
            <span className="text-[12.5px] text-[var(--color-charcoal)]">
              {post.author.name}
            </span>
            <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-black opacity-70 group-hover:opacity-100 transition-opacity">
              Read
              <ArrowUpRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
              />
            </span>
          </div>
        </div>
      </a>
    </Lift>
  );
}

/* -------------------------------------------------------------------------- */
/*  Root export                                                                */
/* -------------------------------------------------------------------------- */

export function PostContent({
  post,
  related,
}: {
  post: Post;
  related: Post[];
}) {
  return (
    <>
      <ArticleHeader post={post} />
      <ArticleBody post={post} />
      <RelatedPosts posts={related} />
    </>
  );
}

export default PostContent;

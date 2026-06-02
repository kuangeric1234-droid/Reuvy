import { defineType, defineField, defineArrayMember } from "sanity";

const CATEGORIES = [
  "AHPRA",
  "AI",
  "Operations",
  "Marketing",
  "Migration",
  "Product",
] as const;

/** Blog post — mirrors the local `Post` type in src/lib/marketing/posts.ts. */
export const postType = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "One-paragraph summary used on cards and meta description.",
      validation: (r) => r.required().max(320),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: CATEGORIES.map((c) => ({ title: c, value: c })),
        layout: "dropdown",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "role", title: "Role", type: "string" }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readMinutes",
      title: "Read time (minutes)",
      type: "number",
      validation: (r) => r.required().integer().min(1).max(60),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          // Only the styles/lists the site renderer supports.
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          // Inline marks are flattened to plain text on the site for now.
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [],
          },
        }),
        defineArrayMember({ type: "callout" }),
      ],
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "Published (newest first)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", category: "category", date: "publishedAt" },
    prepare({ title, category, date }) {
      return { title, subtitle: [category, date].filter(Boolean).join(" · ") };
    },
  },
});

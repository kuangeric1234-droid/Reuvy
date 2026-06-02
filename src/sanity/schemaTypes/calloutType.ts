import { defineType, defineField } from "sanity";

/** A highlighted callout block — maps to the site's PostBlock { kind: "callout" }. */
export const calloutType = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Warning", value: "warn" },
        ],
        layout: "radio",
      },
      initialValue: "info",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { text: "text", tone: "tone" },
    prepare({ text, tone }) {
      return { title: text || "Callout", subtitle: `Callout · ${tone ?? "info"}` };
    },
  },
});

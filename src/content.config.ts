import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Long pieces: Read / Think / Feel
const essays = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/essays" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(["read", "think", "feel"]),
    description: z.string(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    inspiredBy: z.string().optional(), // e.g. "It Ends With Us"
    image: z.string().optional(),
    relatedBooks: z.array(z.string()).default([]),
  }),
});

// Margins: short thoughts, the text lives in the frontmatter
const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({
    number: z.string(),
    text: z.string(),
    date: z.coerce.date(),
  }),
});

// Bookshelf: one file per book, no ratings
const books = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/books" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    status: z.enum(["currently-reading", "finished", "want-to-read"]),
    shelf: z.string().optional(), // e.g. "When I need something different"
    color: z.string().default("#6b7a64"),
    note: z.string().optional(), // tiny personal note
  }),
});

export const collections = { essays, notes, books };
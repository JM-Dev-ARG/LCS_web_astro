import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  schema: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string(),
    img: z.string(),
    altImg: z.string(),
    imgAuthor: z.string(),
    imgAuthorAlt: z.string(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
  }),
});

export const collections = { posts };

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // One line shown on cards. Lead with the result.
      tagline: z.string(),
      // 1–2 sentences shown on featured cards and the project page.
      description: z.string(),
      group: z.enum(['featured', 'ml', 'swe']),
      order: z.number(),
      tech: z.array(z.string()),
      github: z.string().url().optional(),
      demo: z.string().url().optional(),
      paper: z.string().optional(),
      image: image(),
      highlights: z.array(z.string()).default([]),
    }),
});

export const collections = { projects };

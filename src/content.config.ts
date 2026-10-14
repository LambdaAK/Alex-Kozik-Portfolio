import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // One line shown on cards. Lead with the result.
      tagline: z.string(),
      // One impressive sentence for the projects list: what was built and what it does.
      summary: z.string().optional(),
      // The question the project answers, shown under the title.
      question: z.string().optional(),
      // 1–2 sentences shown on featured cards and the project page.
      description: z.string().optional(),
      // featured: homepage top 4. ml / systems: compact homepage lists. archive: /projects only.
      group: z.enum(['featured', 'ml', 'systems', 'archive']),
      order: z.number(),
      // When the work happened, e.g. "2025" or "Spring 2025".
      date: z.string(),
      // "Solo" or "Team of 4 · I built …". Shown on the project page.
      role: z.string().optional(),
      tech: z.array(z.string()),
      github: z.url().optional(),
      demo: z.url().optional(),
      // Project's own website (docs, landing page).
      website: z.url().optional(),
      paper: z.string().optional(),
      // Extra links (second repo, notebook, …).
      links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
      // Small square icon. Optional; compact rows fall back to a monogram.
      image: image().optional(),
      // Variant of the icon for dark mode (light lettering).
      imageDark: image().optional(),
      // Result figure or screenshot shown on featured cards and the project page.
      media: image().optional(),
      mediaAlt: z.string().optional(),
      // Looping clip under public/, e.g. /media/orb.mp4. `media` is its poster frame.
      video: z.string().optional(),
      // Headline numbers, each with what it is compared against.
      results: z
        .array(z.object({ metric: z.string(), value: z.string(), baseline: z.string().optional() }))
        .default([]),
      highlights: z.array(z.string()).default([]),
    }),
});

export const collections = { projects };

// One 1200×630 share image per project, rendered at build time: /og/<slug>.png
import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';
import { profile } from '../../data/profile';

const projects = await getCollection('projects');
const pages = Object.fromEntries(projects.map((p) => [p.id, p.data]));

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_id, page: (typeof pages)[string]) => ({
    title: page.title,
    description: `${page.tagline}\n\n${profile.name} · alexkozik.com`,
    bgGradient: [[11, 15, 20]],
    border: { color: [94, 234, 212], width: 12, side: 'inline-start' },
    padding: 72,
    font: {
      title: { families: ['Newsreader'], weight: 'SemiBold', size: 84, color: [230, 232, 235] },
      description: { families: ['Inter'], size: 34, lineHeight: 1.4, color: [163, 173, 184] },
    },
    fonts: [
      'https://cdn.jsdelivr.net/fontsource/fonts/newsreader@latest/latin-600-normal.ttf',
      'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf',
    ],
  }),
});

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const courses = defineCollection({
  loader: glob({ pattern: '**/meta.yaml', base: './courses' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    catchcopy: z.string(),
    brand: z.string(),
    target: z.string(),
    outcome: z.string(),
    tools: z.array(z.string()),
    mainColor: z.string().default('#4A90D9'),
    bgStyle: z.string().default('gradient'),
    projectRepo: z.string().optional(),
    order: z.number().default(0),
    days: z.array(
      z.object({
        day: z.number(),
        weekday: z.string(),
        theme: z.string(),
        actions: z.string(),
      })
    ).optional(),
    phases: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        lessonFile: z.string().optional(),
      })
    ),
  }),
});

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './courses' }),
  schema: z.object({
    title: z.string(),
    course: z.string(),
    phase: z.string(),
    order: z.number(),
  }),
});

export const collections = { courses, lessons };

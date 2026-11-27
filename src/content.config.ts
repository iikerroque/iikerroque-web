import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Los archivos viven en una carpeta por idioma:
 *   src/content/proyectos/es/euroverse.md  →  /proyectos/euroverse
 *   src/content/proyectos/en/euroverse.md  →  /en/projects/euroverse (futuro)
 */

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // Naturaleza del proyecto: se muestra como etiqueta.
    type: z.enum(['personal', 'academico', 'conceptual', 'profesional']),
    // Estado opcional: si no se indica, no se muestra.
    status: z.enum(['en-curso', 'en-desarrollo', 'finalizado']).optional(),
    year: z.string().optional(),
    role: z.string().optional(),
    // IDs de src/data/habilidades.json
    skills: z.array(z.string()).default([]),
    // Áreas que abarca el proyecto
    scope: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
    challenge: z.string().optional(),
    process: z
      .array(z.object({ title: z.string(), text: z.string() }))
      .default([]),
    // Solo resultados reales. Si está vacío, la sección no aparece.
    results: z.array(z.string()).default([]),
    learnings: z.string().optional(),
    // Imagen de portada (ruta en /uploads). Si no hay, se genera una portada tipográfica.
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    tone: z.enum(['navy', 'paper', 'violet', 'ink', 'lavender']).default('navy'),
    gallery: z
      .array(z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() }))
      .default([]),
    link: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    draft: z.boolean().default(false),
    seoDescription: z.string().optional(),
  }),
});

const ideas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ideas' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { proyectos, ideas };

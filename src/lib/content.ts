import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type Project = CollectionEntry<'proyectos'>;
export type Idea = CollectionEntry<'ideas'>;

/** "es/euroverse" → "euroverse" */
export const slugOf = (id: string) => id.split('/').slice(1).join('/');
const langOf = (id: string) => id.split('/')[0];

export async function getProjects(lang: Lang = 'es') {
  const all = await getCollection(
    'proyectos',
    (e) => langOf(e.id) === lang && !e.data.draft,
  );
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getIdeas(lang: Lang = 'es') {
  const all = await getCollection(
    'ideas',
    (e) => langOf(e.id) === lang && (import.meta.env.DEV || !e.data.draft),
  );
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Texto entre corchetes = pendiente de completar. */
export const isTodo = (v?: string | null) => !v || /^\s*\[.*\]\s*$/s.test(v);

export const formatDate = (d: Date, lang: Lang = 'es') =>
  d.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

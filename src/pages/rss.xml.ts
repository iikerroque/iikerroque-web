import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getIdeas, slugOf } from '../lib/content';
import perfil from '../data/perfil.json';

export async function GET(context: APIContext) {
  const ideas = (await getIdeas('es')).filter((p) => !p.data.draft);
  return rss({
    title: `${perfil.name} — Ideas`,
    description: 'Marketing, redes sociales, tecnología e inteligencia artificial.',
    site: context.site!,
    items: ideas.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/ideas/${slugOf(p.id)}`,
    })),
    customData: '<language>es-ES</language>',
  });
}

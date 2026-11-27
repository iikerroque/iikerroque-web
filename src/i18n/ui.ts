/**
 * Textos de interfaz y rutas por idioma.
 * Para activar inglés: completa `en`, crea src/content/proyectos/en/ e ideas/en/ y las páginas en src/pages/en/.
 */
export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

export const routes = {
  es: {
    home: '/',
    about: '/sobre-mi',
    projects: '/proyectos',
    skills: '/habilidades',
    cv: '/trayectoria',
    ideas: '/ideas',
    contact: '/contacto',
  },
  en: {
    home: '/en',
    about: '/en/about',
    projects: '/en/projects',
    skills: '/en/skills',
    cv: '/en/experience',
    ideas: '/en/ideas',
    contact: '/en/contact',
  },
} as const;

export const ui = {
  es: {
    'nav.about': 'Sobre mí',
    'nav.projects': 'Proyectos',
    'nav.skills': 'Habilidades',
    'nav.cv': 'Trayectoria',
    'nav.ideas': 'Ideas',
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'nav.close': 'Cerrar',
    'skip': 'Saltar al contenido',
    'type.personal': 'Proyecto personal',
    'type.academico': 'Proyecto académico',
    'type.conceptual': 'Proyecto conceptual',
    'type.profesional': 'Proyecto profesional',
    'status.en-curso': 'En curso',
    'status.en-desarrollo': 'En desarrollo',
    'status.finalizado': 'Finalizado',
    'project.view': 'Ver proyecto',
    'project.all': 'Todos los proyectos',
    'project.next': 'Siguiente proyecto',
    'project.role': 'Rol',
    'project.year': 'Año',
    'project.type': 'Tipo',
    'project.tools': 'Herramientas',
    'project.scope': 'Alcance',
    'project.challenge': 'El reto',
    'project.process': 'Proceso',
    'project.results': 'Resultados',
    'project.learnings': 'Aprendizajes',
    'project.skills': 'Habilidades aplicadas',
    'project.link': 'Visitar proyecto',
    'filter.all': 'Todos',
    'footer.cta': '¿Hablamos?',
    'footer.lead': 'Abierto a oportunidades en agencias de marketing y colaboraciones con marcas.',
    'footer.rights': 'Todos los derechos reservados.',
    'contact.copy': 'Copiar email',
    'contact.copied': 'Copiado',
    'ideas.read': 'Leer',
    'ideas.empty': 'Las primeras ideas están en camino.',
    'cv.print': 'Descargar como PDF',
  },
  en: {
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.cv': 'Experience',
    'nav.ideas': 'Ideas',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'skip': 'Skip to content',
    'type.personal': 'Personal project',
    'type.academico': 'Academic project',
    'type.conceptual': 'Concept project',
    'type.profesional': 'Professional project',
    'status.en-curso': 'Ongoing',
    'status.en-desarrollo': 'In progress',
    'status.finalizado': 'Completed',
    'project.view': 'View project',
    'project.all': 'All projects',
    'project.next': 'Next project',
    'project.role': 'Role',
    'project.year': 'Year',
    'project.type': 'Type',
    'project.tools': 'Tools',
    'project.scope': 'Scope',
    'project.challenge': 'The challenge',
    'project.process': 'Process',
    'project.results': 'Results',
    'project.learnings': 'Learnings',
    'project.skills': 'Skills applied',
    'project.link': 'Visit project',
    'filter.all': 'All',
    'footer.cta': "Let's talk",
    'footer.lead': 'Open to opportunities at marketing agencies and brand collaborations.',
    'footer.rights': 'All rights reserved.',
    'contact.copy': 'Copy email',
    'contact.copied': 'Copied',
    'ideas.read': 'Read',
    'ideas.empty': 'First ideas coming soon.',
    'cv.print': 'Download as PDF',
  },
} as const;

export type UIKey = keyof (typeof ui)['es'];

export function useTranslations(lang: Lang = defaultLang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first in languages ? (first as Lang) : defaultLang;
}

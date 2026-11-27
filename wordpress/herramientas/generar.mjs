// Genera el contenido de la web en bloques de WordPress (tema Twenty Twenty-Four)
// y el archivo de importación WXR para WordPress.com.
//
//   npm run generar   → escribe ../paginas, ../plantillas y ../importar-en-wordpress.xml
//
// Todo el texto editable vive en contenido.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { blocks } from './entorno.mjs';
import { perfil, proyectos, habilidades, trayectoria, articulos, IMG } from './contenido.mjs';

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { createBlock: B, serialize } = blocks;

/* ── Marca ─────────────────────────────────────────────────────────── */
const C = {
  navy: '#172554', violet: '#6955e8', lavender: '#a5b4fc', paper: '#f8f9fc',
  ink: '#111827', muted: '#4b5563', soft: '#ecebfd', line: '#d5d8e0', navyLine: '#3b4a7a',
};
const SIZE = {
  display: 'clamp(3rem, 1.2rem + 8vw, 8.5rem)',
  h1: 'clamp(2.6rem, 1.4rem + 5.4vw, 6rem)',
  h2: 'clamp(2rem, 1.3rem + 3vw, 3.6rem)',
  h3: 'clamp(1.4rem, 1.1rem + 1.2vw, 2rem)',
  lead: 'clamp(1.15rem, 1.05rem + 0.5vw, 1.4rem)',
  label: '0.75rem',
};
const MAX = '1200px';
// El tema solo define espaciados hasta el 60; los más grandes van con valor propio.
const SP70 = 'clamp(4rem, 2.5rem + 6vw, 8rem)';
const SP80 = 'clamp(5rem, 3rem + 8vw, 10rem)';
// Margen lateral de cada banda (no dependemos del margen global del tema).
const GUT = 'clamp(1.25rem, 4vw, 2.5rem)';

/* ── Texto en línea ────────────────────────────────────────────────── */
const mark = (t, color, bg = 'transparent') =>
  `<mark style="background-color:${bg};color:${color}" class="has-inline-color">${t}</mark>`;
const v = (t) => mark(t, C.violet);
const lav = (t) => mark(t, C.lavender);
/** [texto] → resaltado como pendiente de completar */
const todo = (s) => s.replace(/\[([^\]]+)\]/g, (_, t) => `<em>${mark(t, C.violet, C.soft)}</em>`);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const T = (s) => todo(esc(s));
const pad2 = (n) => String(n).padStart(2, '0');
const emailHtml = (e) => (/^\[/.test(e) ? T(e) : `<a href="mailto:${esc(e)}">${esc(e)}</a>`);

/* ── Bloques base ──────────────────────────────────────────────────── */
const typo = (o = {}) => ({ typography: { ...o } });
/** Enlaces dentro de un bloque: mismo color que el texto, violeta al pasar el cursor, sin subrayado */
const links = (content, color, hover = color === C.paper ? C.lavender : C.violet) => (content.includes('<a ')
  ? { elements: { link: { color: { text: color }, typography: { textDecoration: 'none' }, ':hover': { color: { text: hover }, typography: { textDecoration: 'underline' } } } } }
  : {});

function label(text, color = C.muted, extra = {}) {
  return B('core/paragraph', {
    content: text,
    style: { ...typo({ fontSize: SIZE.label, fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase' }), color: { text: color }, ...links(text, color), ...extra },
  });
}
function heading(level, content, { size = SIZE.h2, color = C.navy, lh = '1', ls = '-0.045em', weight = '600', align, mt } = {}) {
  return B('core/heading', {
    level, content, fontFamily: 'body', textAlign: align,
    style: {
      ...typo({ fontSize: size, lineHeight: lh, letterSpacing: ls, fontWeight: weight }),
      color: { text: color },
      ...(mt ? { spacing: { margin: { top: mt } } } : {}),
      ...links(content, color),
    },
  });
}
/** Línea de acento en Cardo cursiva (la «voz editorial» de la marca) */
function serif(content, { size = SIZE.h2, color = C.violet, mt = '0' } = {}) {
  return B('core/paragraph', {
    content, fontFamily: 'heading',
    style: { ...typo({ fontSize: size, fontStyle: 'italic', fontWeight: '400', lineHeight: '1.05' }), color: { text: color }, spacing: { margin: { top: mt } }, ...links(content, color, C.navy) },
  });
}
function p(content, { size, color = C.ink, lh = '1.6', mt, weight } = {}) {
  return B('core/paragraph', {
    content,
    style: {
      ...typo({ ...(size ? { fontSize: size } : {}), lineHeight: lh, ...(weight ? { fontWeight: weight } : {}) }),
      color: { text: color },
      ...(mt ? { spacing: { margin: { top: mt } } } : {}),
      ...links(content, color === C.muted ? C.ink : color),
    },
  });
}
function button(text, url, kind = 'primary', dark = false) {
  const primary = kind === 'primary';
  return B('core/button', {
    text, url,
    ...(primary ? {} : { className: 'is-style-outline' }),
    style: {
      border: { radius: '999px', ...(primary ? {} : { width: '1px', color: dark ? C.paper : C.ink }) },
      color: primary
        ? { background: dark ? C.paper : C.navy, text: dark ? C.navy : '#ffffff' }
        : { background: 'transparent', text: dark ? C.paper : C.ink },
      spacing: { padding: { top: '0.9rem', bottom: '0.9rem', left: '1.5rem', right: '1.5rem' } },
      typography: { fontSize: '0.95rem', fontWeight: '500' },
    },
  });
}
const buttons = (list, mt = 'var:preset|spacing|40') =>
  B('core/buttons', { style: { spacing: { margin: { top: mt }, blockGap: '0.75rem' } } }, list);

/** Banda a ancho completo con contenido centrado a 1200 px */
function section(inner, { bg, color, top = SP70, bottom = SP70, border = false, gap } = {}) {
  return B('core/group', {
    align: 'full',
    layout: { type: 'constrained', contentSize: MAX },
    style: {
      spacing: { padding: { top, bottom, left: GUT, right: GUT }, margin: { top: '0', bottom: '0' }, ...(gap ? { blockGap: gap } : {}) },
      ...(bg || color ? { color: { ...(bg ? { background: bg } : {}), ...(color ? { text: color } : {}) } } : {}),
      ...(border ? { border: { top: { color: C.ink, width: '1px', style: 'solid' } } } : {}),
    },
  }, inner);
}
/** Cabecera de sección: número + título pequeño, con línea superior */
function sectionHead(num, title, { dark = false, right } = {}) {
  const col = dark ? C.lavender : C.muted;
  return B('core/group', {
    layout: { type: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between' },
    style: {
      border: { top: { color: dark ? C.navyLine : C.ink, width: '1px', style: 'solid' } },
      spacing: { padding: { top: '1rem' }, margin: { bottom: 'var:preset|spacing|50' } },
    },
  }, [
    B('core/group', { layout: { type: 'flex', flexWrap: 'nowrap' }, style: { spacing: { blockGap: '1.5rem' } } }, [
      label(num, col), label(title, dark ? C.paper : C.ink),
    ]),
    ...(right ? [label(right, col)] : []),
  ]);
}
function stack(inner, gap = '0.75rem', extra = {}) {
  return B('core/group', { layout: { type: 'flex', orientation: 'vertical' }, style: { spacing: { blockGap: gap }, ...extra } }, inner);
}
function cols(list, { gap = 'var:preset|spacing|50', valign, mt } = {}) {
  return B('core/columns', {
    ...(valign ? { verticalAlignment: valign } : {}),
    style: { spacing: { blockGap: { top: gap, left: gap }, ...(mt ? { margin: { top: mt } } : {}) } },
  }, list.map(([width, inner, extra = {}]) => B('core/column', { ...(width ? { width } : {}), ...extra }, inner)));
}
function image(url, alt, href, { radius = '4px', ratio } = {}) {
  return B('core/image', {
    url, alt, sizeSlug: 'full',
    ...(href ? { linkDestination: 'custom', href } : { linkDestination: 'none' }),
    ...(ratio ? { aspectRatio: ratio, scale: 'cover' } : {}),
    style: { border: { radius } },
  });
}
function list(items, { color = C.ink, size } = {}) {
  return B('core/list', {
    className: 'is-style-default',
    style: { ...typo({ ...(size ? { fontSize: size } : {}), lineHeight: '1.5' }), color: { text: color }, spacing: { padding: { left: '1.1em' } } },
  }, items.map((t) => B('core/list-item', { content: t })));
}
/** Lista con líneas divisorias (alcance, objetivos, idiomas…) */
function ruled(rows, { color = C.ink, lineColor = C.line } = {}) {
  return B('core/group', { layout: { type: 'default' }, style: { spacing: { blockGap: '0' } } }, rows.map((r) => B('core/group', {
    layout: { type: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between', verticalAlignment: 'top' },
    style: { border: { bottom: { color: lineColor, width: '1px', style: 'solid' } }, spacing: { padding: { top: '0.7rem', bottom: '0.7rem' }, blockGap: '1rem' } },
  }, (Array.isArray(r) ? r : [r]).map((x) => (typeof x === 'string' ? p(x, { color, weight: '500', lh: '1.45' }) : x)))));
}
const spacer = (h) => B('core/spacer', { height: h });
const sep = (color = C.line) => B('core/separator', { className: 'is-style-wide', style: { color: { background: color } } });

/* ── Piezas de la web ──────────────────────────────────────────────── */
const TYPE = {
  personal: [v('●'), 'Proyecto personal'],
  academico: [mark('●', C.navy), 'Proyecto académico'],
  conceptual: [v('○'), 'Proyecto conceptual'],
  profesional: [lav('●'), 'Proyecto profesional'],
};
const STATUS = { 'en-curso': 'En curso', 'en-desarrollo': 'En desarrollo', finalizado: 'Finalizado' };
const tagText = (pr) => `${TYPE[pr.type][0]} ${TYPE[pr.type][1]}${pr.status ? ` · ${STATUS[pr.status]}` : ''}`;
const projectUrl = (pr) => `/proyectos/${pr.slug}/`;

function projectCard(pr, n, size = 'md') {
  return stack([
    image(IMG(pr.cover), `Portada del proyecto ${pr.title}`, projectUrl(pr)),
    stack([
      label(`${pad2(n)}  ·  ${tagText(pr)}`, C.muted),
      heading(3, `<a href="${projectUrl(pr)}">${esc(pr.title)}</a>`, { size: size === 'lg' ? SIZE.h2 : SIZE.h3, lh: '1.05' }),
      p(esc(pr.summary), { color: C.muted, size: '1rem', lh: '1.5' }),
      p(`<a href="${projectUrl(pr)}">Ver proyecto →</a>`, { color: C.violet, size: '0.95rem', weight: '500' }),
    ], '0.6rem', { spacing: { blockGap: '0.6rem', margin: { top: '0.75rem' } } }),
  ], '0.75rem');
}

/* ── Páginas ───────────────────────────────────────────────────────── */
const pages = {};
const pageHead = (eyebrow, title, accent, lead) => section([
  label(eyebrow),
  heading(1, title, { size: SIZE.display, lh: '0.92', ls: '-0.055em', mt: 'var:preset|spacing|30' }),
  ...(accent ? [serif(accent, { size: SIZE.h1, mt: '0.2rem' })] : []),
  ...(lead ? [p(lead, { size: SIZE.lead, lh: '1.45', mt: 'var:preset|spacing|40' })] : []),
], { top: 'var:preset|spacing|60', bottom: 'var:preset|spacing|50' });

// INICIO
{
  const featured = proyectos.filter((x) => x.featured);
  const idx = (pr) => proyectos.indexOf(pr) + 1;
  pages.inicio = [
    section([
      B('core/group', { layout: { type: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' } }, [
        label(`${v('●')}  ${perfil.availability}`),
        label(`${perfil.location ? `${esc(perfil.location)} · ` : ''}Portfolio — ${new Date().getFullYear()}`),
      ]),
      heading(1, `Contenido, marca ${v('e ideas')} que pasan a la acción${v('.')}`, { size: SIZE.display, lh: '0.92', ls: '-0.055em', mt: 'var:preset|spacing|50' }),
      cols([
        ['60%', [p(esc(perfil.intro), { size: SIZE.lead, lh: '1.45' })]],
        ['40%', [buttons([button('Ver proyectos →', '/proyectos/'), button('Contactar', '/contacto/', 'outline')], '0')], { verticalAlignment: 'bottom' }],
      ], { mt: 'var:preset|spacing|50', valign: 'bottom' }),
    ], { top: 'var:preset|spacing|60', bottom: 'var:preset|spacing|60' }),

    section([
      p(perfil.specialties.map((s, i) => (i % 2 ? `<em>${esc(s)}</em>` : esc(s))).join(`  ${v('●')}  `), { size: 'clamp(1.1rem, 0.9rem + 1vw, 1.6rem)', weight: '500', lh: '1.5' }),
    ], { top: '1.25rem', bottom: '1.25rem', border: true }),

    section([
      sectionHead('01', 'Proyectos destacados', { right: `<a href="/proyectos/">Ver todos (${proyectos.length})</a>` }),
      projectCard(featured[0], idx(featured[0]), 'lg'),
      cols([
        ['52%', [projectCard(featured[1], idx(featured[1]))]],
        ['8%', []],
        ['40%', [spacer('120px'), projectCard(featured[2], idx(featured[2]))]],
      ], { mt: 'var:preset|spacing|60' }),
    ], { top: 'var:preset|spacing|60', bottom: SP70 }),

    section([
      sectionHead('02', 'Cómo trabajo', { dark: true }),
      heading(2, 'No me quedo en la idea:', { size: SIZE.h1, color: C.paper, lh: '0.98' }),
      serif('la llevo a cabo.', { size: SIZE.h1, color: C.lavender }),
      cols(perfil.approach.map((a, i) => ['', [
        B('core/group', { style: { border: { top: { color: C.navyLine, width: '1px', style: 'solid' } }, spacing: { padding: { top: '1.25rem' }, blockGap: '1rem' } }, layout: { type: 'default' } }, [
          label(pad2(i + 1), C.lavender),
          heading(3, esc(a.title), { size: SIZE.h3, color: C.paper, mt: 'var:preset|spacing|30' }),
          p(esc(a.text), { color: '#c9cee0' }),
        ]),
      ]]), { mt: 'var:preset|spacing|60' }),
    ], { bg: C.navy, color: C.paper, top: SP70, bottom: SP80 }),

    section([
      cols([
        ['25%', [label('Sobre mí')]],
        ['75%', [
          p(esc(perfil.about.statement), { size: SIZE.h2, color: C.navy, lh: '1.12', weight: '500' }),
          serif('<a href="/sobre-mi/">Conóceme →</a>', { size: SIZE.h3, mt: 'var:preset|spacing|30' }),
        ]],
      ]),
    ], { top: SP70, bottom: SP70 }),
  ];
}

// SOBRE MÍ
{
  const a = perfil.about;
  const [first, ...rest] = a.statement.split(':');
  pages['sobre-mi'] = [
    section([
      label('Sobre mí'),
      heading(1, `${esc(first)}${rest.length ? ':' : ''}`, { size: SIZE.h1, lh: '0.98', mt: 'var:preset|spacing|30' }),
      ...(rest.length ? [serif(esc(rest.join(':').trim()), { size: SIZE.h1 })] : []),
    ], { top: 'var:preset|spacing|60', bottom: 'var:preset|spacing|50' }),
    section([
      cols([
        ['42%', [image(IMG(perfil.photo), perfil.photoAlt)]],
        ['8%', []],
        ['50%', [
          ...a.bio.map((t, i) => p(T(t), i === 0 ? { size: SIZE.lead, color: C.navy, weight: '500', lh: '1.45' } : { mt: '1.1rem' })),
          cols([
            ['', [label('Intereses', C.ink), p(a.interests.map(esc).join(` ${v('·')} `), { mt: '1rem', lh: '1.8' })]],
            ['', [label('Objetivos', C.ink), spacer('0.5rem'), ruled(a.goals.map((g, i) => [p(`${v(`<strong>${pad2(i + 1)}</strong>`)}   ${esc(g)}`, { lh: '1.45' })]))]],
          ], { mt: 'var:preset|spacing|60' }),
          buttons([button('Ver trayectoria →', '/trayectoria/'), button('Hablemos', '/contacto/', 'outline')], 'var:preset|spacing|50'),
        ]],
      ]),
    ], { top: '0', bottom: SP70 }),
  ];
}

// PROYECTOS (índice)
{
  const rows = [];
  for (let i = 0; i < proyectos.length; i += 2) {
    const a = proyectos[i], b = proyectos[i + 1];
    rows.push(cols([
      ['48%', [projectCard(a, i + 1)]],
      ['4%', []],
      ['48%', b ? [spacer(i === 0 ? '96px' : '96px'), projectCard(b, i + 2)] : []],
    ], { mt: i ? 'var:preset|spacing|60' : '0' }));
  }
  pages.proyectos = [
    pageHead(`Portfolio · ${pad2(proyectos.length)} proyectos`, 'Proyectos', null,
      'Ideas que he llevado del concepto a la ejecución. Cada proyecto indica si es personal, académico o conceptual.'),
    section([
      label(Object.values(TYPE).slice(0, 3).map(([d, t]) => `${d} ${t}`).join('     '), C.ink),
    ], { top: '0', bottom: 'var:preset|spacing|50' }),
    section(rows, { top: '0', bottom: SP70 }),
  ];
}

// PROYECTO (una página por proyecto)
proyectos.forEach((pr, i) => {
  const next = proyectos[(i + 1) % proyectos.length];
  const skills = habilidades.groups.filter((g) => pr.skills.includes(g.id));
  const facts = [
    ['Tipo', tagText(pr)],
    ...(pr.role ? [['Rol', T(pr.role)]] : []),
    ...(pr.year ? [['Año', esc(pr.year)]] : []),
    ...(pr.tools.length ? [['Herramientas', esc(pr.tools.join(', '))]] : []),
  ];
  pages[`proyecto-${pr.slug}`] = [
    section([
      p('<a href="/proyectos/">← Todos los proyectos</a>', { size: '0.9rem', color: C.muted }),
      cols([
        ['60%', [
          label(pad2(i + 1)),
          heading(1, `${esc(pr.title)}${v('.')}`, { size: SIZE.display, lh: '0.92', ls: '-0.055em', mt: '0.75rem' }),
        ]],
        ['40%', [p(esc(pr.summary), { size: SIZE.lead, lh: '1.45' })], { verticalAlignment: 'bottom' }],
      ], { mt: 'var:preset|spacing|50', valign: 'bottom' }),
      B('core/group', {
        layout: { type: 'flex', flexWrap: 'wrap', verticalAlignment: 'top' },
        style: { border: { top: { color: C.ink, width: '1px', style: 'solid' } }, spacing: { padding: { top: '1.25rem' }, margin: { top: 'var:preset|spacing|50' }, blockGap: '3rem' } },
      }, facts.map(([k, val]) => stack([label(k), p(val, { weight: '500' })], '0.4rem'))),
    ], { top: 'var:preset|spacing|50', bottom: 'var:preset|spacing|50' }),

    section([image(IMG(pr.cover), `Portada del proyecto ${pr.title}`)], { top: '0', bottom: '0' }),

    section([
      cols([
        ['34%', [
          label('Alcance'), spacer('0.5rem'),
          ruled(pr.scope.map((s) => [p(`${v('●')}  ${esc(s)}`, { weight: '500' })])),
          ...(skills.length ? [spacer('2rem'), label('Habilidades aplicadas'), p(skills.map((s) => `<a href="/habilidades/">${esc(s.title)}</a>`).join(` ${v('·')} `), { mt: '0.75rem' })] : []),
          ...(pr.link ? [buttons([button('Visitar proyecto ↗', pr.link)])] : []),
        ]],
        ['8%', []],
        ['58%', [
          ...(pr.challenge ? [label('El reto'), p(T(pr.challenge), { size: SIZE.h3, color: C.navy, weight: '500', lh: '1.25', mt: '1rem' }), spacer('2.5rem')] : []),
          ...pr.body.map((t) => p(T(t), { size: '1.0625rem', lh: '1.7', mt: '1rem' })),
          ...(pr.process.length ? [spacer('2.5rem'), label('Proceso'), ruled(pr.process.map((s, k) => [stack([p(`${v(pad2(k + 1))}   ${esc(s.title)}`, { weight: '600' }), p(esc(s.text), { color: C.muted })], '0.25rem')]))] : []),
          ...(pr.results.length ? [spacer('2.5rem'), label('Resultados'), list(pr.results.map(esc), { size: SIZE.lead })] : []),
          spacer('1rem'),
          p(todo('[Añade aquí imágenes, vídeos o capturas del proyecto: escribe «/imagen» o «/galería».]'), { color: C.muted, mt: '2rem' }),
        ]],
      ]),
    ], { top: SP70, bottom: 'var:preset|spacing|60' }),

    section([
      B('core/group', { style: { border: { top: { color: C.ink, width: '1px', style: 'solid' } }, spacing: { padding: { top: '1.25rem' } } }, layout: { type: 'default' } }, [
        label('Siguiente proyecto'),
        heading(2, `<a href="${projectUrl(next)}">${esc(next.title)} →</a>`, { size: SIZE.h1, mt: '1rem' }),
      ]),
    ], { top: 'var:preset|spacing|50', bottom: SP70 }),
  ];
});

// HABILIDADES
pages.habilidades = [
  pageHead('Habilidades', 'Lo que', 'sé hacer', esc(habilidades.intro)),
  section(habilidades.groups.map((g, i) => {
    const used = proyectos.filter((pr) => pr.skills.includes(g.id));
    return cols([
      ['8%', [label(pad2(i + 1), C.muted, { spacing: { padding: { top: '0.8rem' } } })]],
      ['46%', [heading(2, esc(g.title), { size: SIZE.h2 })]],
      ['46%', [
        p(T(g.text), { color: C.muted }),
        ...(g.items.length ? [p(g.items.map(esc).join(` ${v('·')} `), { weight: '500', mt: '0.75rem' })] : []),
        ...(used.length ? [p(`Aplicado en: ${used.map((u) => `<a href="${projectUrl(u)}">${esc(u.title)}</a>`).join(', ')}`, { size: '0.85rem', color: C.muted, mt: '0.75rem' })] : []),
      ]],
    ], { gap: '1.5rem' });
  }).flatMap((c) => [B('core/separator', { className: 'is-style-wide', style: { color: { background: C.ink }, spacing: { margin: { top: 'var:preset|spacing|40', bottom: 'var:preset|spacing|40' } } } }), c]), { top: '0', bottom: SP70 }),
];

// TRAYECTORIA (CV)
{
  const entry = (e) => cols([
    ['30%', [p(T(e.period), { size: '0.85rem', color: C.muted })]],
    ['70%', [
      heading(3, T(e.role ?? e.title), { size: '1.35rem', color: C.ink, ls: '-0.025em', lh: '1.2' }),
      p(T(e.org), { color: C.violet, weight: '500', mt: '0.3rem' }),
      ...(e.description ? [p(T(e.description), { color: C.muted, mt: '0.6rem' })] : []),
    ]],
  ], { gap: '1.5rem' });
  const block = (title, items) => cols([
    ['28%', [label(title, C.ink)]],
    ['72%', items.flatMap((e, i) => (i ? [sep(), entry(e)] : [entry(e)]))],
  ]);
  const bigSep = () => B('core/separator', { className: 'is-style-wide', style: { color: { background: C.ink }, spacing: { margin: { top: 'var:preset|spacing|50', bottom: 'var:preset|spacing|40' } } } });
  pages.trayectoria = [
    pageHead('Trayectoria · CV', 'Experiencia', 'y formación', T(trayectoria.summary)),
    section([
      bigSep(), block('Experiencia', trayectoria.experience),
      bigSep(), block('Formación', trayectoria.education),
      bigSep(), block('Cursos y formación complementaria', trayectoria.courses),
      bigSep(),
      cols([
        ['28%', [label('Idiomas', C.ink)]],
        ['72%', [ruled(trayectoria.languages.map((l) => [p(esc(l.name), { weight: '500' }), p(T(l.level), { color: C.muted })]))]],
      ]),
      bigSep(),
      cols([
        ['28%', [label('Áreas', C.ink)]],
        ['72%', [p(habilidades.groups.map((g) => esc(g.title)).join(` ${v('·')} `), { lh: '1.8' })]],
      ]),
      p(todo('[Opcional: sube tu CV en PDF a Medios y añade aquí un botón «Descargar CV».]'), { color: C.muted, mt: 'var:preset|spacing|60' }),
    ], { top: '0', bottom: SP70 }),
  ];
}

// IDEAS (blog con lista automática de entradas)
pages.ideas = [
  pageHead('Blog · Ideas', 'Ideas', 'en voz alta', 'Reflexiones, aprendizajes y análisis sobre marketing, redes sociales, tecnología e inteligencia artificial.'),
  section([
    B('core/query', {
      queryId: 1,
      query: { perPage: 10, pages: 0, offset: 0, postType: 'post', order: 'desc', orderBy: 'date', author: '', search: '', exclude: [], sticky: '', inherit: false },
    }, [
      B('core/post-template', { layout: { type: 'default' } }, [
        B('core/group', {
          style: { border: { top: { color: C.line, width: '1px', style: 'solid' } }, spacing: { padding: { top: 'var:preset|spacing|40', bottom: 'var:preset|spacing|40' } } },
          layout: { type: 'default' },
        }, [
          B('core/post-date', { style: { ...typo({ fontSize: SIZE.label, fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase' }), color: { text: C.muted } } }),
          B('core/post-title', { isLink: true, level: 2, fontFamily: 'body', style: { ...typo({ fontSize: SIZE.h3, letterSpacing: '-0.035em', fontWeight: '600', lineHeight: '1.1' }), spacing: { margin: { top: '0.6rem' } } } }),
          B('core/post-excerpt', { moreText: '', showMoreOnNewLine: false, excerptLength: 30, style: { color: { text: C.muted } } }),
        ]),
      ]),
      B('core/query-no-results', {}, [
        p(`Las primeras ideas están en camino${v('.')}`, { size: SIZE.h3, color: C.navy, weight: '500' }),
        p(`Marketing ${v('·')} Redes sociales ${v('·')} Tecnología ${v('·')} Inteligencia artificial`, { color: C.muted, mt: '1rem' }),
      ]),
      B('core/query-pagination', { layout: { type: 'flex', justifyContent: 'space-between' } }, [
        B('core/query-pagination-previous', { label: '← Anteriores' }),
        B('core/query-pagination-next', { label: 'Siguientes →' }),
      ]),
    ]),
  ], { top: '0', bottom: SP70 }),
];

// CONTACTO
pages.contacto = [
  section([
    label(`${v('●')}  ${perfil.availability}${perfil.location ? ` · ${esc(perfil.location)}` : ''}`),
    heading(1, `Hablemos${v('.')}`, { size: SIZE.display, lh: '0.92', ls: '-0.055em', mt: 'var:preset|spacing|30' }),
    p('¿Buscas a alguien con ganas para tu agencia o una colaboración para tu marca? Escríbeme y te respondo lo antes posible.', { size: SIZE.lead, lh: '1.45', mt: 'var:preset|spacing|40' }),
  ], { top: 'var:preset|spacing|60', bottom: 'var:preset|spacing|50' }),
  section([
    B('core/group', { style: { border: { top: { color: C.ink, width: '1px', style: 'solid' } }, spacing: { padding: { top: '1.25rem' } } }, layout: { type: 'default' } }, [
      label('Email'),
      p(emailHtml(perfil.email), { size: 'clamp(1.6rem, 0.6rem + 4.5vw, 5rem)', color: C.navy, weight: '600', lh: '1.05', mt: '1rem' }),
      buttons([button('Escribir email →', `mailto:${perfil.email}`)]),
    ]),
    spacer('3rem'),
    label('En redes'),
    ruled(perfil.socials.map(([name, url]) => [
      p(url ? `<a href="${url}">${esc(name)}</a>` : esc(name), { size: SIZE.h3, weight: '600', color: C.ink }),
      p(url ? '↗' : todo('[Añade el enlace]'), { color: C.muted }),
    ])),
  ], { top: '0', bottom: SP70 }),
];

/* ── Cabecera y pie (partes de plantilla) ──────────────────────────── */
const navItems = [['Sobre mí', '/sobre-mi/'], ['Proyectos', '/proyectos/'], ['Habilidades', '/habilidades/'], ['Trayectoria', '/trayectoria/'], ['Ideas', '/ideas/'], ['Contacto', '/contacto/']];
const header = [
  B('core/group', {
    align: 'full',
    layout: { type: 'constrained', contentSize: MAX },
    style: { spacing: { padding: { top: '1.1rem', bottom: '1.1rem', left: GUT, right: GUT } }, color: { background: C.paper } },
  }, [
    B('core/group', { layout: { type: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between' } }, [
      B('core/image', { url: IMG('logo-iker-roque.png'), alt: 'Iker Roque — inicio', width: '132px', sizeSlug: 'full', linkDestination: 'custom', href: '/' }),
      B('core/navigation', {
        overlayMenu: 'mobile',
        layout: { type: 'flex', justifyContent: 'right' },
        overlayBackgroundColor: undefined,
        customOverlayBackgroundColor: C.paper,
        customOverlayTextColor: C.ink,
        style: { typography: { fontSize: '0.95rem', fontWeight: '500' }, spacing: { blockGap: '1.6rem' } },
      }, navItems.map(([label_, url]) => B('core/navigation-link', { label: label_, url, kind: 'custom', isTopLevelLink: true }))),
    ]),
  ]),
];
const footer = [
  B('core/group', {
    align: 'full',
    layout: { type: 'constrained', contentSize: MAX },
    style: { color: { background: C.navy, text: C.paper }, spacing: { padding: { top: SP70, bottom: 'var:preset|spacing|40', left: GUT, right: GUT }, margin: { top: '0' } } },
  }, [
    label('Abierto a oportunidades en agencias de marketing y colaboraciones con marcas.', C.lavender),
    heading(2, `<a href="/contacto/">¿Hablamos${lav('?')}</a>`, { size: 'clamp(3.2rem, 1rem + 11vw, 11rem)', color: C.paper, lh: '0.95', ls: '-0.06em', mt: 'var:preset|spacing|40' }),
    p(emailHtml(perfil.email), { size: SIZE.h3, color: C.paper, mt: 'var:preset|spacing|40' }),
    B('core/separator', { className: 'is-style-wide', style: { color: { background: C.navyLine }, spacing: { margin: { top: 'var:preset|spacing|60', bottom: 'var:preset|spacing|40' } } } }),
    B('core/group', { layout: { type: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' } }, [
      B('core/image', { url: IMG('logo-iker-roque-blanco.png'), alt: 'Iker Roque', width: '110px', sizeSlug: 'full', linkDestination: 'custom', href: '/' }),
      label(`© ${new Date().getFullYear()} ${perfil.name}`, C.lavender),
    ]),
  ]),
];

/* ── Escritura de archivos ─────────────────────────────────────────── */
fs.mkdirSync(path.join(OUT, 'paginas'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'plantillas'), { recursive: true });
const markup = {};
for (const [slug, list_] of Object.entries(pages)) {
  markup[slug] = serialize(list_);
  fs.writeFileSync(path.join(OUT, 'paginas', `${slug}.html`), markup[slug] + '\n');
}
const headerHtml = serialize(header);
const footerHtml = serialize(footer);
fs.writeFileSync(path.join(OUT, 'plantillas', 'cabecera.html'), headerHtml + '\n');
fs.writeFileSync(path.join(OUT, 'plantillas', 'pie.html'), footerHtml + '\n');

/* ── WXR (archivo de importación) ──────────────────────────────────── */
const cdata = (s) => `<![CDATA[${String(s).replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
const now = new Date();
const fmt = (d) => d.toISOString().slice(0, 19).replace('T', ' ');
let id = 100;
const items = [];
const item = ({ title, slug, content = '', type = 'page', status = 'publish', parent = 0, order = 0, meta = {}, date = now, extra = '', excerpt = '' }) => {
  const pid = ++id;
  items.push(`
  <item>
    <title>${cdata(title)}</title>
    <link>/${slug}/</link>
    <dc:creator>${cdata('admin')}</dc:creator>
    <guid isPermaLink="false">ikerroque-${type}-${slug}</guid>
    <description></description>
    <content:encoded>${cdata(content)}</content:encoded>
    <excerpt:encoded>${cdata(excerpt)}</excerpt:encoded>
    <wp:post_id>${pid}</wp:post_id>
    <wp:post_date>${cdata(fmt(date))}</wp:post_date>
    <wp:post_date_gmt>${cdata(fmt(date))}</wp:post_date_gmt>
    <wp:comment_status>${cdata('closed')}</wp:comment_status>
    <wp:ping_status>${cdata('closed')}</wp:ping_status>
    <wp:post_name>${cdata(slug)}</wp:post_name>
    <wp:status>${cdata(status)}</wp:status>
    <wp:post_parent>${parent}</wp:post_parent>
    <wp:menu_order>${order}</wp:menu_order>
    <wp:post_type>${cdata(type)}</wp:post_type>
    <wp:post_password>${cdata('')}</wp:post_password>
    <wp:is_sticky>0</wp:is_sticky>${extra}${Object.entries(meta).map(([k, val]) => `
    <wp:postmeta>
      <wp:meta_key>${cdata(k)}</wp:meta_key>
      <wp:meta_value>${cdata(val)}</wp:meta_value>
    </wp:postmeta>`).join('')}
  </item>`);
  return pid;
};
const noTitle = { _wp_page_template: 'page-no-title' };

// Imágenes (se descargan desde GitHub al importar)
for (const f of fs.readdirSync(path.join(OUT, 'imagenes')).sort()) {
  const slug = f.replace(/\.[a-z]+$/, '');
  item({ title: slug.replace(/-/g, ' '), slug, type: 'attachment', status: 'inherit', extra: `\n    <wp:attachment_url>${cdata(IMG(f))}</wp:attachment_url>` });
}
const order = ['inicio', 'sobre-mi', 'proyectos', 'habilidades', 'trayectoria', 'ideas', 'contacto'];
const titles = { inicio: 'Inicio', 'sobre-mi': 'Sobre mí', proyectos: 'Proyectos', habilidades: 'Habilidades', trayectoria: 'Experiencia y formación', ideas: 'Ideas', contacto: 'Contacto' };
const slugs = { trayectoria: 'trayectoria' };
const ids = {};
order.forEach((k, i) => { ids[k] = item({ title: titles[k], slug: slugs[k] ?? k, content: markup[k], order: i, meta: noTitle, excerpt: '' }); });
proyectos.forEach((pr, i) => item({ title: pr.title, slug: pr.slug, content: markup[`proyecto-${pr.slug}`], parent: ids.proyectos, order: i, meta: noTitle, excerpt: pr.summary }));
for (const a of articulos) {
  item({ title: a.title, slug: a.slug, type: 'post', status: a.draft ? 'draft' : 'publish', date: new Date(a.date), excerpt: a.description,
    content: serialize(a.body.map((t) => (t.startsWith('## ') ? heading(2, esc(t.slice(3)), { size: SIZE.h3 }) : p(T(t), { lh: '1.7' })))),
    extra: a.tags.map((t) => `\n    <category domain="post_tag" nicename="${t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">${cdata(t)}</category>`).join('') });
}
// Cabecera y pie personalizados para Twenty Twenty-Four
const tp = (slug, title, area, content) => item({ title, slug, content, type: 'wp_template_part',
  extra: `\n    <category domain="wp_theme" nicename="twentytwentyfour">${cdata('twentytwentyfour')}</category>\n    <category domain="wp_template_part_area" nicename="${area}">${cdata(area)}</category>` });
tp('header', 'Cabecera', 'header', headerHtml);
tp('footer', 'Pie', 'footer', footerHtml);

const wxr = `<?xml version="1.0" encoding="UTF-8" ?>
<!-- Archivo de importación de WordPress (WXR) generado para el portfolio de ${perfil.name}. -->
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">
<channel>
  <title>${perfil.name}</title>
  <link>https://github.com/iikerroque/iikerroque-web</link>
  <description>${esc(perfil.role)}</description>
  <pubDate>${now.toUTCString()}</pubDate>
  <language>es-ES</language>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>https://github.com/iikerroque/iikerroque-web</wp:base_site_url>
  <wp:base_blog_url>https://github.com/iikerroque/iikerroque-web</wp:base_blog_url>
  <wp:author>
    <wp:author_id>1</wp:author_id>
    <wp:author_login>${cdata('admin')}</wp:author_login>
    <wp:author_email>${cdata('')}</wp:author_email>
    <wp:author_display_name>${cdata(perfil.name)}</wp:author_display_name>
    <wp:author_first_name>${cdata('')}</wp:author_first_name>
    <wp:author_last_name>${cdata('')}</wp:author_last_name>
  </wp:author>
  <generator>https://github.com/iikerroque/iikerroque-web</generator>
${items.join('\n')}
</channel>
</rss>
`;
fs.writeFileSync(path.join(OUT, 'importar-en-wordpress.xml'), wxr);
console.log(`Generado: ${Object.keys(pages).length} páginas, cabecera, pie y importar-en-wordpress.xml (${(wxr.length / 1024).toFixed(0)} KB)`);

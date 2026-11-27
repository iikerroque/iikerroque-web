# ikerroque.com

Portfolio personal de Iker Roque. Hecho con [Astro](https://astro.build): web estática, rápida y sin costes de servidor.

## Cómo se edita (lo habitual, sin código)

El contenido se edita con **[Pages CMS](https://pagescms.org)**, un editor visual gratuito que guarda los cambios en este repositorio de GitHub. Cada cambio publica la web automáticamente.

1. Entra en <https://app.pagescms.org> con tu cuenta de GitHub.
2. Abre este repositorio. Verás estas secciones:
   - **Proyectos**: añadir, editar, ordenar, destacar en inicio, subir imágenes y vídeos.
   - **Ideas (blog)**: escribir artículos. Desmarca *Borrador* para publicarlos.
   - **Perfil y enlaces**: email, redes, foto, textos de «Sobre mí».
   - **Experiencia y formación**: el CV digital.
   - **Habilidades**: áreas y herramientas.
3. Guarda. En 1–2 minutos el cambio está en la web.

> **Textos pendientes**: todo lo que va entre `[corchetes]` aparece en la web resaltado en violeta como «por completar». Sustitúyelo por información real antes de difundir la web.

### Consejos para imágenes
- Portadas de proyecto: horizontales, unos **1600 × 1100 px**, en JPG o WebP y por debajo de **400 KB** (puedes comprimir en <https://squoosh.app>).
- Si un proyecto no tiene portada, se genera una tipográfica con el color elegido en *Color de portada*.
- Vídeos: mejor subirlos a YouTube/Vimeo y enlazarlos, o MP4 cortos (< 10 MB).

## Estructura

```
src/
  content/proyectos/es/*.md   ← un archivo por proyecto = una página (/proyectos/nombre)
  content/ideas/es/*.md       ← artículos del blog (/ideas/nombre)
  data/perfil.json            ← datos personales, redes, textos de inicio y «Sobre mí»
  data/trayectoria.json       ← CV: experiencia, formación, cursos, idiomas
  data/habilidades.json       ← áreas de habilidades
  i18n/ui.ts                  ← textos de interfaz y rutas (es / en)
  styles/global.css           ← sistema visual (colores, tipografía, espaciado)
  components/  layouts/  pages/
public/
  uploads/                    ← imágenes y archivos subidos desde el CMS
  _headers                    ← cabeceras de seguridad
.pages.yml                    ← configuración del editor Pages CMS
docs/identidad/               ← manual de identidad visual (ábrelo en el navegador; no se publica en la web)
```

## Desarrollo local (para cambios de diseño, p. ej. con Claude Code)

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera /dist
```

## Publicación (gratis) — Cloudflare Pages

1. Sube este proyecto a un repositorio de GitHub (privado o público).
2. En <https://dash.cloudflare.com> → *Workers & Pages* → *Create* → *Pages* → *Connect to Git*.
3. Elige el repositorio y configura: **Framework preset** `Astro`, **Build command** `npm run build`, **Output directory** `dist`.
4. Tendrás una URL gratuita `*.pages.dev`. Cada cambio en GitHub (o desde el CMS) se publica solo.

(Netlify o Vercel funcionan igual con los mismos ajustes.)

## Dominio propio

1. Comprueba y compra `ikerroque.com` (Cloudflare Registrar vende a precio de coste, ~10 €/año).
2. En el proyecto de Cloudflare Pages → *Custom domains* → añade `ikerroque.com` y `www.ikerroque.com`.
3. Si el dominio final es otro, cámbialo en `astro.config.mjs` (`site`) y `public/robots.txt`.
4. Crea el correo `hola@ikerroque.com` (Cloudflare Email Routing lo reenvía gratis a tu Gmail) o cambia el email en *Perfil*.

## Versión en inglés (futuro)

La estructura ya está preparada:
1. Completa los textos `en` en `src/i18n/ui.ts`.
2. Crea `src/content/proyectos/en/` y `src/content/ideas/en/` con los textos traducidos (mismo nombre de archivo).
3. Crea las páginas en `src/pages/en/` (copiando las de español con `lang="en"`) y añade los `hreflang` en `BaseLayout.astro`.

## Sección de servicios (futuro)

Cuando empieces como freelance: añade `src/pages/servicios.astro` y el enlace en `Header.astro`. El sistema visual ya cubre lo necesario.

## Seguridad y copias de seguridad

- Web 100 % estática: no hay base de datos ni panel de acceso que atacar.
- Cabeceras de seguridad en `public/_headers` (CSP, HSTS, anti-iframe…).
- **Copia de seguridad = GitHub**: cada cambio (también los del CMS) queda guardado en el historial y se puede recuperar cualquier versión anterior. Para tener una copia extra, descarga el ZIP del repositorio de vez en cuando.

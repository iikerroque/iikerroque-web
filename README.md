# Portfolio de Iker Roque · WordPress

La web completa preparada para **WordPress.com (plan gratuito)** con el tema **Twenty Twenty-Four**.
Todo se carga de una vez con un archivo de importación: 7 páginas, 5 proyectos con página propia, un artículo de ejemplo, imágenes, cabecera y pie.

```
wordpress/
  importar-en-wordpress.xml   ← EL ARCHIVO QUE SUBES A WORDPRESS
  imagenes/                   ← portadas, logotipo, icono y retrato provisional
  plantillas/                 ← código de la cabecera y el pie (por si hay que pegarlo a mano)
  paginas/                    ← código de cada página (copia de seguridad / pegar a mano)
  herramientas/               ← generador y validador (solo para cambios con Claude Code)
docs/identidad/               ← manual de identidad visual (ábrelo en el navegador)
```

---

## Paso a paso (unos 15 minutos)

### 1. Crea el sitio
1. Entra en <https://wordpress.com> y crea un sitio gratuito (por ejemplo `ikerroque.wordpress.com`).
2. En el asistente, si te pide elegir diseño, elige **Twenty Twenty-Four**. Si no, después: **Apariencia → Temas →** busca *Twenty Twenty-Four* → **Activar**.

### 2. Importa el contenido
1. Descarga el archivo [`wordpress/importar-en-wordpress.xml`](wordpress/importar-en-wordpress.xml) (botón *Download raw file* en GitHub).
2. En tu escritorio de WordPress: **Herramientas → Importar → WordPress** → sube el archivo.
3. Cuando pregunte, asigna el contenido a tu usuario y **marca «Descargar e importar archivos adjuntos»** (así se traen las imágenes desde GitHub).

### 3. Ajustes
1. **Ajustes → Lectura → La página de inicio muestra: Una página estática → Página de inicio: «Inicio»**. Guarda.
2. **Ajustes → Generales**: título «Iker Roque», descripción «Creador de contenido · Marketing». Sube `icono-sitio.png` como *Icono del sitio*.
3. Borra lo que WordPress crea de ejemplo: la página «Página de ejemplo» y la entrada «¡Hola, mundo!».
4. Cuando lo tengas listo: **Lanzar sitio** (los sitios nuevos de WordPress.com empiezan en modo «Próximamente»).

### 4. Comprueba la cabecera y el pie
El archivo de importación incluye la cabecera (logo + menú) y el pie («¿Hablamos?») del tema.
Si al abrir la web ves todavía la cabecera original de Twenty Twenty-Four:

1. **Apariencia → Editor → Patrones → Partes de plantilla → Header**.
2. Menú ⋮ (arriba a la derecha) → **Editor de código**.
3. Borra todo y pega el contenido de [`wordpress/plantillas/cabecera.html`](wordpress/plantillas/cabecera.html). Guarda.
4. Repite con **Footer** y [`wordpress/plantillas/pie.html`](wordpress/plantillas/pie.html).

> Si alguna página se importa vacía o con errores, ábrela, menú ⋮ → **Editor de código** y pega el archivo correspondiente de `wordpress/paginas/`.

---

## Cómo se edita después

Todo se edita en el editor de bloques de WordPress, sin código.

| Quiero… | Dónde |
|---|---|
| Cambiar textos | **Páginas** → abre la página y escribe encima |
| Añadir un proyecto | **Páginas → Proyectos → Euroverse** → menú ⋮ → **Duplicar**. Cambia título, textos, imagen y en *Atributos de página* deja «Proyectos» como superior. Luego añade su tarjeta en la página *Proyectos* (duplica una tarjeta existente) |
| Cambiar una portada | Haz clic en la imagen → **Reemplazar** → sube la tuya (horizontal, unos 1600 × 1100 px) |
| Publicar un artículo | **Entradas → Añadir** (aparece solo en la página *Ideas*). El de ejemplo está en borrador |
| Cambiar el menú | **Apariencia → Editor → Navegación** |

**Textos pendientes.** Lo que aparece resaltado en violeta (por ejemplo *Tu rol en el proyecto*, *Nombre de tu titulación*) está pendiente: sustitúyelo por información real y quita el resaltado (selecciona el texto → icono ▾ → *Resaltado* → borrar).

**Datos que conviene revisar:** el tipo de cada proyecto (Sahara Festival, Farray y Beach Sunset están marcados como *conceptuales*), tu foto (`retrato-provisional.jpg` es un marcador) y, si quieres, añadir Instagram o TikTok en la página *Contacto*. El email, LinkedIn y la ubicación ya están puestos (los que guardaste en Pages CMS).

---

## Qué cambia respecto al diseño original (límites del plan gratuito)

El plan gratuito de WordPress.com no permite temas propios, CSS personalizado ni plugins, así que la web está construida solo con bloques estándar:

- **Tipografías:** Inter (titulares y texto) y Cardo cursiva (acentos), que son las del tema, en lugar de Instrument Sans e Instrument Serif. Colores, composición, logotipo y el punto violeta se mantienen.
- **Sin** filtro de proyectos por tipo, animaciones de entrada ni transiciones entre páginas.
- La dirección será `…wordpress.com` y WordPress.com muestra **publicidad** en los sitios gratuitos.
- **Dominio propio** (`ikerroque.com`) y **email profesional**: necesitan un plan de pago de WordPress.com (Personal o superior).

## Para cambios grandes con Claude Code

El contenido de partida se genera con `wordpress/herramientas/` usando la librería oficial de bloques de WordPress, y se valida bloque a bloque:

```bash
cd wordpress/herramientas && npm install && npm run generar && npm run validar
```

Una vez importado, **la fuente de verdad es WordPress**: los cambios que hagas allí no vuelven a este repositorio. Para tener copia de seguridad: **Herramientas → Exportar** de vez en cuando.

La versión anterior (Astro) sigue en el historial de Git, en el commit `96d0eda`.

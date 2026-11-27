// Contenido de partida del portfolio.
// Lo que va entre [corchetes] está pendiente de completar: en la web aparece resaltado en violeta.
// Una vez importado en WordPress, el contenido se edita directamente en WordPress, no aquí.

export const IMG = (file) => `https://raw.githubusercontent.com/iikerroque/iikerroque-web/main/wordpress/imagenes/${file}`;

export const perfil = {
  name: 'Iker Roque',
  role: 'Creador de contenido · Marketing',
  intro: 'Soy Iker Roque, creador de contenido con formación en marketing. Me interesa el punto donde se cruzan la comunicación, la tecnología y los proyectos propios.',
  availability: 'Abierto a agencias de marketing y colaboraciones con marcas',
  email: 'ikroquesan@gmail.com',
  location: 'Las Palmas de Gran Canaria',
  photo: 'retrato-provisional.jpg',
  photoAlt: 'Retrato de Iker Roque',
  socials: [['LinkedIn', 'https://www.linkedin.com/in/iker-r-894699244/']],
  specialties: ['Creación de contenido', 'Social media', 'Branding', 'Marketing digital', 'IA y automatización'],
  approach: [
    { title: 'Pienso en estrategia', text: 'Antes de crear, entiendo el público, el contexto y el objetivo. Cada pieza tiene que tener una razón de ser.' },
    { title: 'Creo y produzco', text: 'Del concepto al contenido final: ideas, identidad visual, copy y piezas para redes.' },
    { title: 'Construyo proyectos propios', text: 'Aprendo haciendo. Lanzo y gestiono mis propias ideas, como Euroverse, para poner a prueba lo que sé.' },
  ],
  about: {
    statement: 'Me mueve la curiosidad: entender por qué algo funciona y llevarlo a la práctica.',
    bio: [
      'Me dedico a crear contenido y tengo formación en marketing. Me interesan la comunicación, las redes sociales, la tecnología y, sobre todo, desarrollar ideas propias de principio a fin.',
      'Me he formado como Técnico Superior en Gestión de Ventas y Espacios Comerciales (2024–2026) y he completado cursos de marketing digital, SEO, SEM, social media y email marketing, además de certificaciones de Metricool, Google, Canva y Anthropic.',
      'He trabajado como asistente de marketing en Empyre Systems, apoyando campañas digitales, la gestión de redes sociales, la creación de contenido y tareas de SEO/SEM. También he trabajado de cara al público en Primark e Intimissimi Uomo, en atención al cliente y venta.',
    ],
    interests: ['Marketing', 'Comunicación', 'Redes sociales', 'Tecnología', 'Inteligencia artificial', 'Proyectos propios', 'Eurovisión'],
    goals: [
      'Incorporarme a una agencia de marketing y aprender de un equipo creativo.',
      'Colaborar con marcas creando contenido y comunicación.',
      'Seguir desarrollando proyectos propios.',
    ],
  },
};

export const proyectos = [
  {
    slug: 'euroverse', title: 'Euroverse', cover: 'portada-euroverse.jpg', featured: true,
    summary: 'Proyecto personal dedicado al universo Eurovisión. Creación de contenido, comunicación digital y gestión de redes sociales.',
    type: 'personal', role: 'Creador y gestor del proyecto',
    skills: ['contenido', 'social', 'marketing'],
    scope: ['Creación de contenido', 'Comunicación digital', 'Gestión de redes sociales'],
    tools: [], process: [], results: [],
    challenge: 'Construir desde cero un medio propio sobre Eurovisión, con una voz reconocible y contenido constante para una comunidad muy apasionada.',
    body: [
      'Euroverse es mi proyecto personal sobre el universo Eurovisión. Nace de una pasión y se ha convertido en mi laboratorio para crear contenido, comunicar en digital y gestionar una comunidad en redes sociales.',
      '[Cuenta por qué nació, a quién se dirige, en qué plataformas está y qué tipo de contenido publicas.]',
    ],
  },
  {
    slug: 'sahara-festival', title: 'Sahara Festival', cover: 'portada-sahara-festival.jpg', featured: true,
    summary: 'Creación de una marca de festival de música, de la identidad visual a la estrategia de marketing, la planificación comercial y la experiencia del asistente.',
    type: 'conceptual', role: '[Tu rol en el proyecto]',
    skills: ['branding', 'marketing'],
    scope: ['Identidad visual', 'Branding', 'Estrategia de marketing', 'Planificación comercial', 'Experiencia de usuario', 'Organización de eventos'],
    tools: [], process: [], results: [],
    challenge: 'Diseñar una marca de festival completa y coherente, capaz de atraer al público, convencer a patrocinadores y sostener una experiencia memorable.',
    body: [
      'Sahara Festival es la creación de una marca de festival de música desde cero: concepto, identidad visual, estrategia de marketing, planificación comercial, experiencia del asistente y organización del evento.',
      '[Explica el concepto del festival, el público objetivo, la identidad visual y cómo planteaste la estrategia de marketing y comercial.]',
    ],
  },
  {
    slug: 'sorb', title: 'SORB', cover: 'portada-sorb.jpg', featured: true,
    summary: 'Botella inteligente reutilizable con sensores y aplicación móvil propia. Investigación de mercado, propuesta de valor, branding y estrategia comercial.',
    type: 'academico', role: '[Tu rol en el proyecto]',
    skills: ['marketing', 'branding'],
    scope: ['Investigación de mercado', 'Análisis de competencia', 'Propuesta de valor', 'Branding', 'Estrategia comercial'],
    tools: [], process: [], results: [],
    challenge: 'Llevar al mercado un producto tecnológico nuevo y encontrar su sitio en una categoría con competidores asentados.',
    body: [
      'SORB es un proyecto académico de desarrollo de producto: una botella inteligente reutilizable con sensores y aplicación móvil propia. Trabajé la investigación de mercado, el análisis de competencia, la propuesta de valor, el branding y la estrategia comercial.',
      '[Detalla los competidores analizados, la propuesta de valor y la marca resultante. Indica si fue un trabajo en equipo.]',
    ],
  },
  {
    slug: 'farray', title: 'Farray', cover: 'portada-farray.jpg', featured: false,
    summary: 'Concepto de restaurante y discoteca en el sur de Gran Canaria. Modelo de negocio, identidad de marca, posicionamiento y estrategia de comunicación.',
    type: 'conceptual', role: '[Tu rol en el proyecto]',
    skills: ['branding', 'marketing', 'contenido'],
    scope: ['Concepto de negocio', 'Identidad de marca', 'Posicionamiento', 'Experiencia del cliente', 'Estrategia de comunicación'],
    tools: [], process: [], results: [],
    challenge: '[Define el reto principal del proyecto.]',
    body: [
      'Farray es un proyecto conceptual de restaurante y discoteca en el sur de Gran Canaria. Abarca el desarrollo del concepto de negocio, la identidad de marca, el posicionamiento, la experiencia del cliente y la estrategia de comunicación.',
      '[Describe el concepto, el público, cómo se posiciona frente a otros locales de la zona y la estrategia de comunicación.]',
    ],
  },
  {
    slug: 'beach-sunset', title: 'Beach Sunset', cover: 'portada-beach-sunset.jpg', featured: false,
    summary: 'Experiencia ligada al ambiente de playa y los atardeceres. Concepto creativo, identidad visual, propuesta de experiencia y planteamiento de marketing.',
    type: 'conceptual', role: '[Tu rol en el proyecto]',
    skills: ['branding', 'marketing'],
    scope: ['Concepto creativo', 'Identidad visual', 'Propuesta de experiencia', 'Planteamiento de marketing'],
    tools: [], process: [], results: [],
    challenge: '[Define el reto principal del proyecto.]',
    body: [
      'Beach Sunset es un proyecto de evento y experiencia vinculado al ambiente de playa y los atardeceres. Recoge el concepto creativo, la identidad visual, la propuesta de experiencia y el planteamiento de marketing.',
      '[Explica el concepto creativo, la identidad visual y la experiencia que propones.]',
    ],
  },
];

export const habilidades = {
  intro: 'Lo que sé hacer y lo que sigo aprendiendo. Cada área enlaza con los proyectos donde la he puesto en práctica.',
  groups: [
    { id: 'marketing', title: 'Marketing digital', text: 'Investigación de mercado, análisis de competencia, propuesta de valor, posicionamiento y estrategia comercial.', items: [] },
    { id: 'social', title: 'Social Media', text: 'Gestión de perfiles, planificación de publicaciones y comunicación con comunidad.', items: [] },
    { id: 'contenido', title: 'Creación de contenido', text: 'Ideación, guion, producción y edición de piezas pensadas para cada plataforma.', items: [] },
    { id: 'branding', title: 'Branding', text: 'Concepto de marca, identidad visual, tono de comunicación y experiencia de cliente.', items: [] },
    { id: 'ia', title: 'Inteligencia artificial', text: 'Uso de herramientas de IA para idear, investigar y producir de forma más eficiente.', items: [] },
    { id: 'automatizacion', title: 'Automatización', text: 'Flujos de trabajo que ahorran tiempo en tareas repetitivas de contenido y gestión.', items: [] },
    { id: 'herramientas', title: 'Herramientas digitales', text: 'Herramientas con las que trabajo y en las que me he certificado.', items: ['Metricool', 'Canva', 'Claude'] },
  ],
};

export const trayectoria = {
  summary: 'Técnico Superior en Gestión de Ventas y Espacios Comerciales, orientado al marketing digital, las redes sociales y la creación de contenido. Experiencia en agencia de marketing y atención al cliente, con conocimientos de SEO/SEM, organización de proyectos y análisis digital.',
  experience: [
    { role: 'Dependiente', org: 'Primark', period: 'Oct 2026 – Ene 2027', description: 'Atención al cliente y apoyo en las operaciones de tienda. Reposición, organización de mercancía y mantenimiento del espacio comercial.' },
    { role: 'Asistente de Marketing', org: 'Empyre Systems', period: 'Mar 2026 – May 2026', description: 'Apoyo en campañas de marketing digital, gestión de redes sociales y creación de contenido. Colaboración en tareas de SEO/SEM, documentación y seguimiento de proyectos.' },
    { role: 'Vendedor', org: 'Intimissimi Uomo', period: 'Ene 2025 – Feb 2025', description: 'Atención personalizada, asesoramiento comercial y fidelización de clientes. Gestión de ventas, caja, reposición y organización de mercancía.' },
  ],
  education: [{ title: 'Técnico Superior en Gestión de Ventas y Espacios Comerciales', org: '', period: 'Sep 2024 – May 2026' }],
  courses: [
    { title: 'Claude Academy: Claude 101', org: 'Anthropic', period: '2026' },
    { title: 'Metricool Expert Certificate', org: 'Metricool', period: '2026' },
    { title: 'Fundamentos de Marketing Digital', org: 'Google', period: '2026' },
    { title: 'Potencia tus campañas de marketing', org: 'Canva', period: '2026' },
    { title: 'SEO, SEM, Social Media y Email Marketing', org: 'UEMC', period: '2026' },
  ],
  languages: [{ name: 'Español', level: 'Nativo' }, { name: 'Inglés', level: 'B1' }, { name: 'Italiano', level: 'A2' }],
};

export const articulos = [
  {
    slug: 'por-que-abro-este-espacio', title: 'Por qué abro este espacio', draft: true, date: '2026-11-27T10:00:00Z',
    description: 'Un lugar para compartir lo que aprendo sobre marketing, redes sociales, tecnología e inteligencia artificial.',
    tags: ['Marketing', 'Aprendizaje'],
    body: [
      'Este es un artículo de ejemplo. Está guardado como borrador, así que no aparece en la web hasta que lo publiques.',
      '[Escribe aquí tu primer artículo: qué te gustaría compartir, qué temas vas a tratar y por qué.]',
    ],
  },
];

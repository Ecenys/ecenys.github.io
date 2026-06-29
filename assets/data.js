/*
 * Contenido del sitio (textos y datos) separado de index.html.
 * Para editar la web normalmente, este es el archivo que tocas:
 *   - translations : textos de la interfaz (ES / EN)
 *   - typewords     : palabras que se escriben solas en la cabecera (ES / EN)
 *   - projects      : tarjetas de la sección "Proyectos"
 *   - experience    : experiencia laboral
 *   - education     : educación
 *   - volunteering  : voluntariado
 *   - traits        : etiquetas de la sección "Sobre mí"
 *
 * Convención bilingüe: cuando un texto cambia según el idioma se escribe como
 * { es: '…', en: '…' }. Si es igual en ambos idiomas basta con un texto normal.
 */
window.SITE_DATA = {
  translations: {
    es: {
      navAbout: 'Sobre mí', navPortfolio: 'Proyectos', navResume: 'Trayectoria', navContact: 'Contacto',
      heroStatus: 'Ingeniero I+D @ Indra', heroHello: '// Hola, soy',
      heroRole: 'Ingeniero software · FPGA · I+D ferroviario · Videojuegos & VR · Safety ferroviario · Háptica',
      heroLead: 'Software donde fallar no es una opción.',
      heroCtaWork: 'Ver proyectos', heroCtaContact: 'Contáctame',
      aboutTag: '// quién soy', aboutTitle: 'Sobre mí',
      aboutP1: 'Ingeniero informático con sólida especialización en desarrollo backend y sistemas de alta fiabilidad. Mi trayectoria abarca infraestructuras ferroviarias Safety-critical, investigación en interfaces hápticas y simuladores médicos, lo que me ha dotado de una visión técnica amplia y rigurosa.',
      aboutP2: 'Actualmente, como ingeniero de I+D en Indra, contribuyo a proyectos europeos de nueva generación para ferrocarril (ETCS 3) —Virtual Coupling, Wireless Train Integrity— en entornos multidisciplinares que exigen precisión, fiabilidad y capacidad real de innovación.',
      aboutKicker: 'Comprometido con construir sistemas que importan: desde infraestructuras ferroviarias críticas hasta experiencias interactivas de última generación.',
      aboutCta: 'Ver LinkedIn',
      portfolioTag: '// trabajos seleccionados', portfolioTitle: 'Proyectos', portfolioView: 'Ver proyecto',
      portfolioGithub: 'Más proyectos en GitHub →',
      fAll: 'Todos', fGames: 'Videojuegos & VR', fHaptics: 'Háptica', fSim: 'Simulación',
      resumeTag: '// experiencia + formación', resumeTitle: 'Trayectoria',
      expTitle: 'Experiencia laboral', eduTitle: 'Educación', volTitle: 'Voluntariado',
      contactTag: '// hablemos', contactTitle: 'Contacto',
      contactLead: '¿Tienes un proyecto, una oferta o simplemente quieres saludar? Escríbeme y construyamos algo juntos.',
      namePh: 'Tu nombre', emailPh: 'Tu email', msgPh: 'Tu mensaje', send: 'Enviar mensaje', sending: 'Enviando…',
      elsewhere: 'En otros sitios',
      footer: '© 2026 Óscar Gómez Monedero'
    },
    en: {
      navAbout: 'About', navPortfolio: 'Projects', navResume: 'Resume', navContact: 'Contact',
      heroStatus: 'R&D Engineer @ Indra', heroHello: '// Hello, I am',
      heroRole: 'Software Engineer · FPGA · Railway R&D · Games & VR · Railway Safety · Haptics',
      heroLead: 'Software where failure is not an option.',
      heroCtaWork: 'View projects', heroCtaContact: 'Get in touch',
      aboutTag: '// who I am', aboutTitle: 'About me',
      aboutP1: 'Computer engineer with a strong foundation in backend development and high-reliability systems. My career spans safety-critical railway infrastructure, haptic interface research, and medical simulation — giving me a broad and rigorous technical perspective.',
      aboutP2: 'Currently working as an R&D Engineer at Indra, I contribute to next-generation European railway programmes (ETCS 3) — Virtual Coupling, Wireless Train Integrity — in multidisciplinary environments that demand precision, dependability, and a genuine drive to innovate.',
      aboutKicker: 'Committed to building systems that matter — from safety-critical railway infrastructure to cutting-edge interactive and simulation technologies.',
      aboutCta: 'View LinkedIn',
      portfolioTag: '// selected work', portfolioTitle: 'Projects', portfolioView: 'View project',
      portfolioGithub: 'More projects on GitHub →',
      fAll: 'All', fGames: 'Games & VR', fHaptics: 'Haptics', fSim: 'Simulation',
      resumeTag: '// experience + education', resumeTitle: 'Resume',
      expTitle: 'Work experience', eduTitle: 'Education', volTitle: 'Volunteering',
      contactTag: '// let’s talk', contactTitle: 'Contact',
      contactLead: 'Got a project, an offer or just want to say hi? Drop me a line and let’s build something together.',
      namePh: 'Your name', emailPh: 'Your email', msgPh: 'Your message', send: 'Send message', sending: 'Sending…',
      elsewhere: 'Find me elsewhere',
      footer: '© 2026 Óscar Gómez Monedero'
    }
  },

  typewords: {
    es: ['Ingeniero Software', 'I+D ferroviario', 'Videojuegos & VR', 'Sistemas Embebidos', 'Seguridad ferroviaria', 'Háptica'],
    en: ['Software Engineer', 'Railway R&D', 'Games & VR', 'Embedded Systems', 'Railway Safety', 'Haptics']
  },

  projects: [
    { id: 'pth', title: 'Part-Time Hero', cats: ['games'], tech: ['Unity', 'C#'], img: 'assets/proj-pth.png', fit: 'cover', link: 'https://c404games.itch.io/part-time-hero', es: 'Videojuego desarrollado en equipo (C404 Games). Acción y plataformas con un héroe a tiempo parcial.', en: 'Team-built game (C404 Games). Action-platformer starring a part-time hero.' },
    { id: 'stcc', title: 'Smart Train Composition Coupling', cats: ['iot'], tech: ['C/C++', 'MQTT', 'CBOR'], img: 'assets/proj-stcc.png', fit: 'cover', link: 'https://www.youtube.com/watch?v=pMQ0CWzOKTI', es: 'Acoplamiento inteligente de composiciones ferroviarias para ETCS 3 (Virtual Coupling).', en: 'Smart coupling of train compositions for ETCS 3 (Virtual Coupling).' },
    { id: 'obst', title: 'Simulador Obstétrico', cats: ['sim', 'haptics'], tech: ['C++', 'Háptica'], img: 'assets/proj-obst.png', fit: 'cover', link: 'https://github.com/Ecenys/Obstetric-simulator', es: 'Simulador obstétrico con realimentación háptica para entrenamiento médico.', en: 'Obstetric simulator with haptic feedback for medical training.' },
    { id: 'wti', title: 'Wireless Train Integrity', cats: ['iot'], tech: ['C/C++', 'MQTT'], img: 'assets/proj-wti.png', fit: 'cover', link: 'https://www.youtube.com/watch?v=INog83y3lKE', es: 'Sistema de integridad de tren inalámbrico para señalización ferroviaria de nueva generación.', en: 'Wireless train integrity system for next-generation railway signalling.' },
    { id: 'escape', title: 'Escape Game', cats: ['games'], tech: ['Unity', 'C#'], img: 'assets/proj-escape.png', fit: 'cover', link: 'https://github.com/Ecenys/EscapeGame', es: 'Juego tipo escape room con puzles y mecánicas de exploración.', en: 'Escape-room style game with puzzles and exploration mechanics.' },
    { id: 'hip', title: 'Render háptico subactuado', cats: ['haptics'], tech: ['C/C++', 'SenseGlove'], img: 'assets/proj-hip.png', fit: 'cover', link: 'https://github.com/Ecenys/Basic-Proxy-HIP-Simulation', es: 'Investigación de algoritmos de renderizado háptico subactuado (proxy básico HIP).', en: 'Research on underactuated haptic rendering algorithms (basic HIP proxy).' },
    { id: 'mesh', title: 'Simulaciones avanzadas en mallas', cats: ['sim'], tech: ['C++', 'FEM'], img: 'assets/proj-mesh.png', fit: 'cover', link: 'https://github.com/Ecenys/Animacion-y-simulacion-avanzada', es: 'Animación y simulación física avanzada sobre mallas deformables.', en: 'Advanced physics animation and simulation on deformable meshes.' },
    { id: 'boat', title: 'Boat VR Minigame', cats: ['games', 'sim'], tech: ['Unity', 'VR'], img: 'assets/proj-boat.png', fit: 'cover', link: 'https://github.com/Ecenys/Boat-VR-minigame', es: 'Minijuego en VR de navegación con simulación de fluidos.', en: 'VR sailing minigame with fluid simulation.' },
    { id: 'rig', title: 'Rigging y animación de personajes', cats: ['games'], tech: ['Blender', 'Maya'], img: 'assets/proj-rig.png', fit: 'cover', link: 'https://github.com/Ecenys/Modelado-y-Animacion-de-Personaje', es: 'Modelado, rigging y animación de personajes para videojuegos.', en: 'Character modeling, rigging and animation for games.' },
    { id: 'track', title: 'Seguimiento estereoscópico de marcador', cats: ['games'], tech: ['OpenCV', 'AR'], img: 'assets/proj-track.png', fit: 'cover', link: '', es: 'Seguimiento estereoscópico de marcadores para realidad aumentada.', en: 'Stereoscopic marker tracking for augmented reality.' }
  ],

  experience: [
    {
      period: { es: 'Nov 2021 — Actualidad', en: 'Nov 2021 — Present' },
      role: { es: 'Ingeniero de I+D en sistemas ferroviarios', en: 'R&D Engineer, Railway Systems' },
      org: 'Indra',
      desc: { es: 'Programa europeo «Europe’s Rail Joint Undertaking». I+D de nuevos sistemas para ETCS 3: Virtual Coupling, Wireless Train Integrity y Train Warning System.', en: 'European programme “Europe’s Rail Joint Undertaking”. R&D of new ETCS 3 systems: Virtual Coupling, Wireless Train Integrity and Train Warning System.' },
      tech: ['C/C++', 'MQTT', 'CBOR', 'Python', 'Qt5']
    },
    {
      period: { es: 'Ene 2021 — Sep 2021', en: 'Jan 2021 — Sep 2021' },
      role: { es: 'Investigador', en: 'Researcher' },
      org: 'Universidad Rey Juan Carlos',
      desc: { es: 'Grupo de investigación TouchDesign. Nuevos algoritmos de renderizado háptico subactuado.', en: 'TouchDesign research group. New underactuated haptic rendering algorithms.' },
      tech: ['C/C++', 'C#', 'Unity', 'SenseGlove DK1']
    },
    {
      period: { es: 'Ene 2020 — Dic 2020', en: 'Jan 2020 — Dec 2020' },
      role: { es: 'Programador', en: 'Software Developer' },
      org: 'Vector ITC Group',
      desc: { es: 'Programas «Programa por Puntos (PxP)» y de accidentes (ARENA) para la DGT.', en: '“Points programme (PxP)” and accidents (ARENA) systems for the Spanish DGT.' },
      tech: ['Java/JSP', 'OracleSQL', 'Angular']
    },
    {
      period: { es: 'Abr 2019 — Jun 2019', en: 'Apr 2019 — Jun 2019' },
      role: { es: 'Estudiante en prácticas', en: 'Intern' },
      org: 'CreamTeam GmbH',
      desc: { es: 'Sistema inteligente de almacenamiento de llaves de automóvil con apertura automática vía app. Tester funcional.', en: 'Smart car-key storage system with automatic app-based unlocking. Functional tester.' },
      tech: ['Java', 'Angular']
    },
    {
      period: '2013 — 2020',
      role: { es: 'Trabajador agrícola', en: 'Agricultural worker' },
      org: '',
      desc: { es: 'Tareas diversas en el sector agrícola en distintos periodos.', en: 'Various agricultural tasks across different periods.' },
      tech: []
    }
  ],

  education: [
    {
      period: { es: 'Nov 2020 — Actualidad', en: 'Nov 2020 — Present' },
      title: { es: 'Máster en Informática Gráfica, Videojuegos y Realidad Virtual', en: 'MSc in Computer Graphics, Games and Virtual Reality' },
      org: 'Universidad Rey Juan Carlos'
    },
    {
      period: { es: 'Sep 2015 — Dic 2019', en: 'Sep 2015 — Dec 2019' },
      title: { es: 'Grado en Ingeniería Informática · Esp. Computación', en: 'BSc in Computer Engineering · Computing specialty' },
      org: 'Universidad de Castilla-La Mancha'
    }
  ],

  volunteering: [
    {
      period: { es: 'Sep 2017 — Actualidad', en: 'Sep 2017 — Present' },
      title: { es: 'Organizador — Albanime', en: 'Organizer — Albanime' },
      desc: { es: 'Salón del manga, anime y ocio alternativo de Albacete.', en: 'Manga, anime and alternative-culture convention in Albacete.' }
    },
    {
      period: { es: 'Ene 2018 — Actualidad', en: 'Jan 2018 — Present' },
      title: { es: 'Socio — Nexus Outsiders', en: 'Member — Nexus Outsiders' },
      desc: { es: 'Organización promotora del ocio alternativo en Albacete.', en: 'Organization promoting alternative culture in Albacete.' }
    },
    {
      period: { es: 'Sep 2017 — Jul 2019', en: 'Sep 2017 — Jul 2019' },
      title: { es: 'Mentor de estudiantes', en: 'Student mentor' },
      desc: { es: 'Mentor de estudiantes de 1.º y 2.º del Grado de Ingeniería Informática (Albacete).', en: 'Mentor for 1st and 2nd-year Computer Engineering students (Albacete).' }
    },
    {
      period: 'Mar 2019',
      title: { es: 'Voluntario organizador — RITSI', en: 'Organizing volunteer — RITSI' },
      desc: { es: 'X Congreso Encuentro de Estudiantes de Ingeniería en Informática.', en: '10th Congress of Computer Engineering Students.' }
    }
  ],

  traits: {
    es: ['Backend', 'Videojuegos & VR', 'Háptica', 'Sistemas ferroviarios', 'Safety', 'Simulación'],
    en: ['Backend', 'Games & VR', 'Haptics', 'Railway systems', 'Safety', 'Simulation']
  }
};

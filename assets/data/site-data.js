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
 *   - categories    : categorías de proyectos (botones de filtro y etiqueta de cada tarjeta)
 *   - emailjs       : configuración del formulario de contacto
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
      aboutP2: 'Actualmente, en Indra, desarrollo sistemas embebidos Safety-critical para ferrocarril sobre FPGA y SoC (Zynq-7000, UltraScale, MicroBlaze): un detector de caída de objetos (DCO), la plataforma InVITALRAIL OMSP y componentes ASFA. También he participado en proyectos europeos de nueva generación para ETCS 3 —Virtual Coupling, Wireless Train Integrity—.',
      aboutKicker: 'Comprometido con construir sistemas que importan: desde infraestructuras ferroviarias críticas hasta experiencias interactivas de última generación.',
      aboutCta: 'Ver LinkedIn',
      portfolioTag: '// trabajos seleccionados', portfolioTitle: 'Proyectos', portfolioView: 'Ver proyecto',
      portfolioGithub: 'Más proyectos en GitHub →',
      fAll: 'Todos',
      resumeTag: '// experiencia + formación', resumeTitle: 'Trayectoria',
      expTitle: 'Experiencia laboral', eduTitle: 'Educación', volTitle: 'Voluntariado',
      contactTag: '// hablemos', contactTitle: 'Contacto',
      contactLead: '¿Tienes un proyecto, una oferta o simplemente quieres saludar? Escríbeme y construyamos algo juntos.',
      namePh: 'Tu nombre', emailPh: 'Tu email', msgPh: 'Tu mensaje', send: 'Enviar mensaje', sending: 'Enviando…',
      elsewhere: 'En otros sitios', location: '📍 Madrid · España',
      toastSent: '¡Mensaje enviado!', toastError: 'Error al enviar. Inténtalo de nuevo.',
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
      aboutP2: 'Currently at Indra, I develop safety-critical embedded railway systems on FPGA and SoC platforms (Zynq-7000, UltraScale, MicroBlaze): a falling-object detector (DCO), the InVITALRAIL OMSP platform and ASFA components. I have also contributed to next-generation European ETCS 3 programmes — Virtual Coupling, Wireless Train Integrity.',
      aboutKicker: 'Committed to building systems that matter — from safety-critical railway infrastructure to cutting-edge interactive and simulation technologies.',
      aboutCta: 'View LinkedIn',
      portfolioTag: '// selected work', portfolioTitle: 'Projects', portfolioView: 'View project',
      portfolioGithub: 'More projects on GitHub →',
      fAll: 'All',
      resumeTag: '// experience + education', resumeTitle: 'Resume',
      expTitle: 'Work experience', eduTitle: 'Education', volTitle: 'Volunteering',
      contactTag: '// let’s talk', contactTitle: 'Contact',
      contactLead: 'Got a project, an offer or just want to say hi? Drop me a line and let’s build something together.',
      namePh: 'Your name', emailPh: 'Your email', msgPh: 'Your message', send: 'Send message', sending: 'Sending…',
      elsewhere: 'Find me elsewhere', location: '📍 Madrid · Spain',
      toastSent: 'Message sent!', toastError: 'Failed to send. Please try again.',
      footer: '© 2026 Óscar Gómez Monedero'
    }
  },

  typewords: {
    es: ['Ingeniero Software', 'I+D ferroviario', 'Videojuegos & VR', 'Sistemas Embebidos', 'Seguridad ferroviaria', 'Háptica'],
    en: ['Software Engineer', 'Railway R&D', 'Games & VR', 'Embedded Systems', 'Railway Safety', 'Haptics']
  },

  projects: [
    { id: 'pth', title: 'Part-Time Hero', cats: ['games'], tech: ['Unity', 'C#'], img: 'assets/img/projects/pth.png', fit: 'cover', link: 'https://c404games.itch.io/part-time-hero', es: 'Videojuego desarrollado en equipo (C404 Games). Acción y plataformas con un héroe a tiempo parcial.', en: 'Team-built game (C404 Games). Action-platformer starring a part-time hero.' },
    { id: 'stcc', title: 'Smart Train Composition Coupling', cats: ['iot'], tech: ['C/C++', 'MQTT', 'CBOR'], img: 'assets/img/projects/stcc.png', fit: 'cover', link: 'https://www.youtube.com/watch?v=pMQ0CWzOKTI', es: 'Acoplamiento inteligente de composiciones ferroviarias para ETCS 3 (Virtual Coupling).', en: 'Smart coupling of train compositions for ETCS 3 (Virtual Coupling).' },
    { id: 'obst', title: 'Simulador Obstétrico', cats: ['sim', 'haptics'], tech: ['C++', 'Háptica'], img: 'assets/img/projects/obst.png', fit: 'cover', link: 'https://github.com/Ecenys/Obstetric-simulator', es: 'Simulador obstétrico con realimentación háptica para entrenamiento médico.', en: 'Obstetric simulator with haptic feedback for medical training.' },
    { id: 'wti', title: 'Wireless Train Integrity', cats: ['iot'], tech: ['C/C++', 'MQTT'], img: 'assets/img/projects/wti.png', fit: 'cover', link: 'https://www.youtube.com/watch?v=INog83y3lKE', es: 'Sistema de integridad de tren inalámbrico para señalización ferroviaria de nueva generación.', en: 'Wireless train integrity system for next-generation railway signalling.' },
    { id: 'escape', title: 'Escape Game', cats: ['games'], tech: ['Unity', 'C#'], img: 'assets/img/projects/escape.png', fit: 'cover', link: 'https://github.com/Ecenys/EscapeGame', es: 'Juego tipo escape room con puzles y mecánicas de exploración.', en: 'Escape-room style game with puzzles and exploration mechanics.' },
    { id: 'hip', title: 'Render háptico subactuado', cats: ['haptics'], tech: ['C/C++', 'SenseGlove'], img: 'assets/img/projects/hip.png', fit: 'cover', link: 'https://github.com/Ecenys/Basic-Proxy-HIP-Simulation', es: 'Investigación de algoritmos de renderizado háptico subactuado (proxy básico HIP).', en: 'Research on underactuated haptic rendering algorithms (basic HIP proxy).' },
    { id: 'mesh', title: 'Simulaciones avanzadas en mallas', cats: ['sim'], tech: ['C++', 'FEM'], img: 'assets/img/projects/mesh.png', fit: 'cover', link: 'https://github.com/Ecenys/Animacion-y-simulacion-avanzada', es: 'Animación y simulación física avanzada sobre mallas deformables.', en: 'Advanced physics animation and simulation on deformable meshes.' },
    { id: 'boat', title: 'Boat VR Minigame', cats: ['games', 'sim'], tech: ['Unity', 'VR'], img: 'assets/img/projects/boat.png', fit: 'cover', link: 'https://github.com/Ecenys/Boat-VR-minigame', es: 'Minijuego en VR de navegación con simulación de fluidos.', en: 'VR sailing minigame with fluid simulation.' },
    { id: 'rig', title: 'Rigging y animación de personajes', cats: ['games'], tech: ['Blender', 'Maya'], img: 'assets/img/projects/rig.png', fit: 'cover', link: 'https://github.com/Ecenys/Modelado-y-Animacion-de-Personaje', es: 'Modelado, rigging y animación de personajes para videojuegos.', en: 'Character modeling, rigging and animation for games.' },
    { id: 'track', title: 'Seguimiento estereoscópico de marcador', cats: ['games'], tech: ['OpenCV', 'AR'], img: 'assets/img/projects/track.png', fit: 'cover', link: '', es: 'Seguimiento estereoscópico de marcadores para realidad aumentada.', en: 'Stereoscopic marker tracking for augmented reality.' }
  ],

  experience: [
    {
      period: { es: 'Nov 2021 — Actualidad', en: 'Nov 2021 — Present' },
      role: { es: 'Ingeniero de Sistemas Ferroviarios · Safety y Embebidos', en: 'Railway Systems Engineer · Safety & Embedded' },
      org: 'Indra',
      desc: { es: 'Desarrollo de componentes embarcados para ASFA y ERTMS e I+D de nuevos sistemas para ETCS 3 dentro del programa europeo «Europe’s Rail Joint Undertaking».', en: 'Development of on-board components for ASFA and ERTMS, and R&D of new ETCS 3 systems within the European programme “Europe’s Rail Joint Undertaking”.' },
      // Bloques opcionales con título y lista de puntos (debajo de la descripción)
      blocks: [
        {
          title: { es: 'Productos', en: 'Products' },
          items: [
            { es: 'Detector de Caída de Objetos (DCO): todo lo embebido (programación, redes, tiempo real, seguridad, y aplicaciones y simuladores de apoyo)', en: 'Falling Object Detector (DCO): all things embedded (programming, networking, real-time, security, and supporting applications and simulators)' },
            { es: 'InVITALRAIL Open Modulable Smart Platform (OMSP): plataforma genérica, segura, escalable y adaptable para múltiples proyectos ferroviarios', en: 'InVITALRAIL Open Modulable Smart Platform (OMSP): a generic, safe, scalable and adaptable platform supporting multiple railway projects' },
            { es: 'Display ASFA: interfaz embarcada de señalización para sistemas ASFA', en: 'ASFA Display: on-board signalling interface for ASFA systems' },
            'On-Board Train Integrity',
            'Virtual Coupling (STCC)',
            'Train Warning System (TWS)'
          ]
        },
        {
          title: { es: 'Funciones', en: 'Responsibilities' },
          items: [
            { es: 'Desarrollo en MISRA C++ en entornos de seguridad crítica', en: 'MISRA C++ development in safety-critical environments' },
            { es: 'Desarrollo e integración en FPGA con Xilinx/AMD Zynq-7000, UltraScale y MicroBlaze', en: 'FPGA development and integration on Xilinx/AMD Zynq-7000, UltraScale and MicroBlaze' },
            { es: 'Simuladores y herramientas de prueba con Python, PyQt5 y Qt', en: 'Simulators and test tools with Python, PyQt5 and Qt' },
            { es: 'Comunicaciones eficientes con MQTT y RaSTA', en: 'Efficient communications over MQTT and RaSTA' },
            { es: 'Integración continua y pruebas automatizadas con Jenkins', en: 'Continuous integration and automated testing with Jenkins' },
            { es: 'Metodologías ágiles con Jira; control de versiones con Git e IBM ClearCase', en: 'Agile methodologies with Jira; version control with Git and IBM ClearCase' }
          ]
        }
      ],
      tech: ['MISRA C++', 'Zynq-7000', 'UltraScale', 'MicroBlaze', 'Python', 'PyQt5', 'Qt', 'MQTT', 'RaSTA', 'CBOR', 'Jenkins', 'Docker', 'Git', 'ClearCase', 'Jira']
    },
    {
      period: { es: 'Ene 2021 — Sep 2021', en: 'Jan 2021 — Sep 2021' },
      role: { es: 'Investigador', en: 'Researcher' },
      org: 'Universidad Rey Juan Carlos',
      desc: { es: 'Grupo de investigación TouchDesign. Nuevos algoritmos de renderizado háptico subactuado.', en: 'TouchDesign research group. New underactuated haptic rendering algorithms.' },
      blocks: [
        {
          title: { es: 'Funciones', en: 'Responsibilities' },
          items: [
            { es: 'Desarrollo de un renderizado háptico subactuado experimental en C# y Unity', en: 'Development of an experimental underactuated haptic rendering in C# and Unity' },
            { es: 'Integración con guantes hápticos SenseGlove y realidad virtual con HTC Vive', en: 'Integration with SenseGlove haptic gloves and HTC Vive virtual reality' },
            { es: 'Estudio y validación de los cálculos propuestos en un artículo de investigación del grupo', en: 'Study and validation of the calculations proposed in a research paper by the group' }
          ]
        }
      ],
      tech: ['C#', 'Unity', 'SenseGlove DK1', 'HTC Vive']
    },
    {
      period: { es: 'Ene 2020 — Dic 2020', en: 'Jan 2020 — Dec 2020' },
      role: { es: 'Programador', en: 'Software Developer' },
      org: 'Vector ITC Group',
      desc: { es: 'Desarrollo del «Programa por Puntos» (PxP) y del programa de accidentes ARENA 2 para la DGT.', en: 'Development of the “Points Programme” (PxP) and the ARENA 2 accidents system for the Spanish DGT.' },
      blocks: [
        {
          title: { es: 'Funciones', en: 'Responsibilities' },
          items: [
            { es: 'Desarrollo de aplicaciones Java con el framework JavaServer Faces (JSF)', en: 'Java application development with the JavaServer Faces (JSF) framework' },
            { es: 'Gestión de bases de datos SQL', en: 'SQL database management' },
            { es: 'Control de versiones con SVN', en: 'Version control with SVN' }
          ]
        }
      ],
      tech: ['Java', 'JSF', 'JSP', 'Oracle SQL', 'SVN', 'Angular']
    },
    {
      period: { es: 'Abr 2019 — Jun 2019', en: 'Apr 2019 — Jun 2019' },
      role: { es: 'Estudiante en prácticas', en: 'Intern' },
      org: 'CreamTeam GmbH',
      desc: { es: 'Sistema inteligente de almacenamiento de llaves de automóvil con apertura automática vía app.', en: 'Smart car-key storage system with automatic app-based unlocking.' },
      blocks: [
        {
          title: { es: 'Funciones', en: 'Responsibilities' },
          items: [
            { es: 'Desarrollo de aplicaciones con Java y Angular', en: 'Application development with Java and Angular' },
            { es: 'Pruebas funcionales de aplicaciones y sistemas', en: 'Functional testing of applications and systems' },
            { es: 'Trabajo en equipo con desarrolladores y testers en un entorno ágil', en: 'Teamwork with developers and testers in an agile environment' }
          ]
        }
      ],
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
      period: '2020 — 2021',
      title: { es: 'Máster en Informática Gráfica, Videojuegos y Realidad Virtual', en: 'MSc in Computer Graphics, Games and Virtual Reality' },
      org: 'Universidad Rey Juan Carlos'
    },
    {
      period: { es: '2015 — 2019', en: '2015 — 2019' },
      title: { es: 'Grado en Ingeniería Informática · Esp. Computación', en: 'BSc in Computer Engineering · Computing specialty' },
      org: 'Universidad de Castilla-La Mancha'
    }
  ],

  volunteering: [
    {
      period: '2017 — 2021',
      title: { es: 'Organizador — Albanime', en: 'Organizer — Albanime' },
      desc: { es: 'Salón del manga, anime y ocio alternativo de Albacete.', en: 'Manga, anime and alternative-culture convention in Albacete.' }
    },
    {
      period: '2018 — 2021',
      title: { es: 'Socio — Nexus Outsiders', en: 'Member — Nexus Outsiders' },
      desc: { es: 'Organización promotora del ocio alternativo en Albacete.', en: 'Organization promoting alternative culture in Albacete.' }
    },
    {
      period: '2017 — 2019',
      title: { es: 'Mentor de estudiantes', en: 'Student mentor' },
      desc: { es: 'Mentor de estudiantes de 1.º y 2.º del Grado de Ingeniería Informática (Albacete).', en: 'Mentor for 1st and 2nd-year Computer Engineering students (Albacete).' }
    },
    {
      period: '2019',
      title: { es: 'Voluntario organizador — RITSI', en: 'Organizing volunteer — RITSI' },
      desc: { es: 'X Congreso Encuentro de Estudiantes de Ingeniería en Informática.', en: '10th Congress of Computer Engineering Students.' }
    }
  ],

  traits: {
    es: ['Sistemas embebidos', 'FPGA', 'Backend', 'Videojuegos & VR', 'Háptica', 'Sistemas ferroviarios', 'Safety', 'Simulación'],
    en: ['Embedded systems', 'FPGA', 'Backend', 'Games & VR', 'Haptics', 'Railway systems', 'Safety', 'Simulation']
  },

  // Orden de los botones de filtro. El `id` es el que se usa en `cats` de cada proyecto;
  // la etiqueta de cada tarjeta es la de su primera categoría.
  categories: [
    { id: 'games', label: { es: 'Videojuegos & VR', en: 'Games & VR' } },
    { id: 'haptics', label: { es: 'Háptica', en: 'Haptics' } },
    { id: 'iot', label: 'IoT' },
    { id: 'sim', label: { es: 'Simulación', en: 'Simulation' } }
  ],

  // Clave pública de EmailJS (no es secreta: EmailJS la expone en el navegador por diseño)
  emailjs: { publicKey: 'TKHOE6g7-7Khy-Mr-', serviceId: 'service_txvq843', templateId: 'template_a7yaeyn' }
};

/**
 * WebAura Portfolio Projects Data
 * 
 * To add a new project, simply add an object to the `projects` array below.
 * Images can be placed in '/assets/images/' or use external premium URLs.
 */

const projects = [
  {
    id: 'aetheria-restaurant',
    title: 'Aetheria Restaurant',
    category: 'Booking',
    description: 'A luxury fine-dining portal featuring an interactive reservation wizard, dynamic menu rendering, and fluid Page-Load optimizations.',
    image: './assets/images/project-restaurant.png',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Splide.js'],
    liveUrl: 'https://webaura.github.io/aetheria-restaurant',
    githubUrl: 'https://github.com/webaura/aetheria-restaurant',
    featured: true,
    date: 'June 2026',
    client: 'Aetheria Culinary Group',
    status: 'Completed'
  },
  {
    id: 'zenith-architects',
    title: 'Zenith Architects',
    category: 'Creative',
    description: 'A minimalist 3D portfolio utilizing WebGL layer depth and scroll-triggered animations to showcase architectural blueprints.',
    image: './assets/images/project-architect.png',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Three.js', 'GSAP'],
    liveUrl: 'https://webaura.github.io/zenith-architects',
    githubUrl: 'https://github.com/webaura/zenith-architects',
    featured: true,
    date: 'May 2026',
    client: 'Zenith Studio',
    status: 'Completed'
  },
  {
    id: 'aura-salon-spa',
    title: 'Aura Salon & Spa',
    category: 'Booking',
    description: 'A premium wellness interface featuring responsive booking calendars, dynamic therapist filters, and sleek glassmorphic UI patterns.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Framer Motion (custom)', 'Soft UI'],
    liveUrl: 'https://webaura.github.io/aura-spa',
    githubUrl: 'https://github.com/webaura/aura-spa',
    featured: true,
    date: 'April 2026',
    client: 'Aura Wellness LLC',
    status: 'Completed'
  },
  {
    id: 'decora-furniture',
    title: 'Decora Premium Furniture',
    category: 'E-commerce',
    description: 'An editorial catalog platform built with reactive filtering, instant cart calculations, and lazy-loaded high-resolution assets.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Cart Engine', 'AOS'],
    liveUrl: 'https://webaura.github.io/decora-home',
    githubUrl: 'https://github.com/webaura/decora-home',
    featured: false,
    date: 'March 2026',
    client: 'Decora Design',
    status: 'Completed'
  },
  {
    id: 'vigor-fitness-gym',
    title: 'Vigor Fitness & Gym',
    category: 'Business',
    description: 'A dark-hybrid training portal featuring interactive schedule boards, dynamic plan selectors, and optimized mobile-first layouts.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Custom Timetable API'],
    liveUrl: 'https://webaura.github.io/vigor-gym',
    githubUrl: 'https://github.com/webaura/vigor-gym',
    featured: false,
    date: 'February 2026',
    client: 'Vigor Group',
    status: 'Completed'
  },
  {
    id: 'careflow-clinic',
    title: 'CareFlow Clinic',
    category: 'Business',
    description: 'An accessible doctor directory interface prioritizing technical WCAG guidelines, patient intake steps, and local SEO integrations.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'A11y Compliant Form'],
    liveUrl: 'https://webaura.github.io/careflow-clinic',
    githubUrl: 'https://github.com/webaura/careflow-clinic',
    featured: false,
    date: 'January 2026',
    client: 'CareFlow Healthcare',
    status: 'Completed'
  }
];

export default projects;

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        projects: resolve(__dirname, 'projects.html'),
        process: resolve(__dirname, 'process.html'),
        faq: resolve(__dirname, 'faq.html'),
        contact: resolve(__dirname, 'contact.html'),
        blog: resolve(__dirname, 'blog.html'),
        
        // Projects Subpages
        'project-restaurant': resolve(__dirname, 'projects/aetheria-restaurant.html'),
        'project-architect': resolve(__dirname, 'projects/zenith-architects.html'),
        'project-salon': resolve(__dirname, 'projects/aura-salon-spa.html'),
        'project-furniture': resolve(__dirname, 'projects/decora-furniture.html'),
        'project-gym': resolve(__dirname, 'projects/vigor-fitness-gym.html'),
        'project-clinic': resolve(__dirname, 'projects/careflow-clinic.html'),
        
        // Blog Subpages
        'blog-local-seo': resolve(__dirname, 'blog/local-seo-checklist-small-business.html'),
        'blog-custom-code': resolve(__dirname, 'blog/custom-code-vs-page-builders.html'),
        'blog-core-web-vitals': resolve(__dirname, 'blog/core-web-vitals-optimization-guide.html'),
        'blog-ux-design': resolve(__dirname, 'blog/ux-design-conversion-funnel.html'),
      }
    }
  }
});

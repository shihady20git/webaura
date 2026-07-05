import projects from './projects.js';
import { initAllAnimations, initCardTilts, observeScrollReveal } from './animations.js';

// Global variables
let activeCategory = 'All';
let searchQuery = '';
let displayLimit = 3;
const totalProjectsCount = projects.length;

function init() {
  // 0. Initialize Animations
  initAllAnimations();

  // 1. Initial Projects Render
  renderProjects();

  // 2. Navigation Actions
  initNavigation();

  // 3. Category & Filter Actions
  initFilters();

  // 4. Contact Form Handling
  initContactForm();

  // 5. Scroll and Resize Watchers
  initScrollEvents();

  // 6. Interactive FAQ Accordion
  initFAQ();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ==========================================
// Projects Renderer & Filter Engine
// ==========================================
function renderProjects() {
  const container = document.getElementById('projects-grid');
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (!container) return;

  // Filter projects by category and search query
  let filtered = projects;

  if (activeCategory !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
  }

  if (searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.technologies.some(t => t.toLowerCase().includes(query)) ||
      p.client.toLowerCase().includes(query)
    );
  }

  // Clear previous contents
  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16 reveal-up">
        <div class="inline-block p-4 rounded-full bg-blue-tint text-primary-gradient mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <h3 class="text-xl font-semibold text-navy mb-2">No Projects Found</h3>
        <p class="text-secondary-gray max-w-sm mx-auto">We couldn't find any projects matching your search. Try another query or browse other categories.</p>
      </div>
    `;
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    return;
  }

  // Show up to displayLimit
  const displayed = filtered.slice(0, displayLimit);

  displayed.forEach((project, idx) => {
    const card = document.createElement('a');
    card.href = `./projects/${project.id}.html`;
    card.className = `project-card bg-card border border-border rounded-card overflow-hidden tilt-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer reveal-up`;
    card.style.animationDelay = `${idx * 0.1}s`;
    card.setAttribute('data-id', project.id);

    // Build badges
    const techBadges = project.technologies.slice(0, 3).map(tech => 
      `<span class="text-xs px-3 py-1 rounded-full bg-blue-tint text-indigo font-medium">${tech}</span>`
    ).join('');

    const extraBadge = project.technologies.length > 3 ? 
      `<span class="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-500 font-medium">+${project.technologies.length - 3}</span>` : '';

    card.innerHTML = `
      <div class="project-img-wrapper relative overflow-hidden aspect-[16/10] bg-slate-100">
        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" width="400" height="250">
        <div class="project-overlay absolute inset-0 bg-navy/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <span class="view-btn px-5 py-2.5 rounded-full bg-white text-navy font-semibold text-sm shadow-md transform translate-y-4 hover:scale-105 transition-all duration-300 flex items-center gap-2">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </span>
        </div>
        <span class="absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/95 text-navy shadow-sm backdrop-blur-md">${project.category}</span>
      </div>
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="text-xl font-bold text-navy mb-2 hover:text-indigo transition-colors duration-200">${project.title}</h3>
          <p class="text-secondary-gray text-sm line-clamp-2 mb-4">${project.description}</p>
        </div>
        <div class="flex flex-wrap items-center gap-1.5 pt-4 border-t border-border">
          ${techBadges}
          ${extraBadge}
        </div>
      </div>
      <div class="card-shine"></div>
    `;

    container.appendChild(card);
    observeScrollReveal(card);
  });

  // Toggle load more button
  if (loadMoreBtn) {
    if (filtered.length > displayLimit) {
      loadMoreBtn.style.display = 'inline-flex';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }

  // Re-run card tilts for newly added cards
  initCardTilts();
}

// ==========================================
// Project Details Modal System
// ==========================================
function openProjectModal(project) {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  // Insert project content
  modal.querySelector('#modal-title').textContent = project.title;
  modal.querySelector('#modal-category').textContent = project.category;
  modal.querySelector('#modal-client').textContent = project.client;
  modal.querySelector('#modal-date').textContent = project.date;
  modal.querySelector('#modal-status').textContent = project.status;
  modal.querySelector('#modal-description').textContent = project.description;
  modal.querySelector('#modal-img').src = project.image;
  modal.querySelector('#modal-img').alt = project.title;

  // Tech badges
  const techContainer = modal.querySelector('#modal-tech-badges');
  techContainer.innerHTML = project.technologies.map(tech => 
    `<span class="text-xs px-3 py-1.5 rounded-full bg-blue-tint text-indigo font-medium border border-blue-100">${tech}</span>`
  ).join('');

  // Buttons
  const liveBtn = modal.querySelector('#modal-live-btn');
  const codeBtn = modal.querySelector('#modal-code-btn');

  if (liveBtn) liveBtn.href = project.liveUrl;
  if (codeBtn) codeBtn.href = project.githubUrl;

  // Show modal
  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
}

// ==========================================
// Filters Setup
// ==========================================
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('project-search');
  const loadMoreBtn = document.getElementById('load-more-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter');
      displayLimit = 3; // Reset limit
      renderProjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      displayLimit = 3; // Reset limit
      renderProjects();
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      displayLimit += 3;
      renderProjects();
    });
  }

  // Modal close buttons
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('project-modal');
  
  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  // Press ESC to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });
}

// ==========================================
// Navigation & Active Links (Scrollspy)
// ==========================================
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinksList = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  if (navToggle && navLinksList) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksList.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksList.classList.remove('active');
      });
    });
  }

  // Smooth scroll logic for a elements with hash
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const offset = 80; // height of sticky header
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ==========================================
// Scroll Events & Scrollspy
// ==========================================
function initScrollEvents() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY;

    // 1. Header scroll class
    if (header) {
      if (scrollPos > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // 2. Scrollspy - Highlight active nav item
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = sectionId;
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', onScroll);
  onScroll(); // Run once initially
}

// ==========================================
// Contact Form & WhatsApp Integration
// ==========================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successModal = document.getElementById('success-modal');
  const closeSuccess = document.getElementById('close-success-btn');
  const sendWhatsappCopy = document.getElementById('whatsapp-copy-btn');
  
  let formSubmittedData = null;

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather fields
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const businessName = form.querySelector('#business-name').value.trim();
    const budgetEl = form.querySelector('input[name="budget"]:checked');
    const budget = budgetEl ? budgetEl.value : '';
    const details = form.querySelector('#details').value.trim();

    // Basic Validation
    if (!name || !email || !details) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    // Save data for WhatsApp copy redirect
    formSubmittedData = { name, email, phone, businessName, budget, details };

    // Build and open WhatsApp URL directly
    const phoneNum = '919916699894'; // Brand contact phone number
    const intro = `Hello WebAura! I would like to inquire about a web design project.`;
    const body = `*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || 'N/A'}\n*Business:* ${businessName || 'N/A'}\n*Budget:* ${budget}\n*Project Details:* ${details}`;
    
    const fullMessage = encodeURIComponent(`${intro}\n\n${body}`);
    const whatsappUrl = `https://wa.me/${phoneNum}?text=${fullMessage}`;

    // Open WhatsApp directly
    window.open(whatsappUrl, '_blank');

    // Trigger visual success modal
    if (successModal) {
      successModal.classList.add('active');
      document.body.classList.add('modal-open');
    }

    // Reset form fields
    form.reset();
  });

  // Close Success Modal
  if (closeSuccess) {
    closeSuccess.addEventListener('click', () => {
      successModal.classList.remove('active');
      document.body.classList.remove('modal-open');
    });
  }

  // Redirect to WhatsApp with filled details (Manual Fallback)
  if (sendWhatsappCopy) {
    sendWhatsappCopy.addEventListener('click', () => {
      if (!formSubmittedData) return;

      const { name, email, phone, businessName, budget, details } = formSubmittedData;
      
      const phoneNum = '919916699894'; // Brand contact phone number
      const intro = `Hello WebAura! I would like to inquire about a web design project.`;
      const body = `*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || 'N/A'}\n*Business:* ${businessName || 'N/A'}\n*Budget:* ${budget}\n*Project Details:* ${details}`;
      
      const fullMessage = encodeURIComponent(`${intro}\n\n${body}`);
      const whatsappUrl = `https://wa.me/${phoneNum}?text=${fullMessage}`;

      window.open(whatsappUrl, '_blank');
      
      // Close success modal
      successModal.classList.remove('active');
      document.body.classList.remove('modal-open');
    });
  }
}

// Simple toast notification helper
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `px-5 py-3 rounded-xl shadow-lg font-medium text-sm text-white transform translate-y-5 opacity-0 transition-all duration-300 pointer-events-auto flex items-center gap-2 ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`;
  
  const icon = type === 'error' ? 
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>` : 
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

  toast.innerHTML = `${icon} ${message}`;
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.remove('translate-y-5', 'opacity-0');
  }, 10);

  // Fade out and remove
  setTimeout(() => {
    toast.classList.add('translate-y-5', 'opacity-0');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// ==========================================
// FAQ Accordion Engine
// ==========================================
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (!questionBtn || !answer) return;
    
    questionBtn.addEventListener('click', () => {
      const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';
      
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });
      
      // Toggle current item
      if (isExpanded) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

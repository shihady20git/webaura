/**
 * WebAura Premium Motion & Animation Suite
 * Custom, high-performance interactions matching top creative agencies.
 */

export function initAllAnimations() {
  initScrollReveals();
  initMagneticButtons();
  initCardTilts();
  initAnimatedCounters();
  initMouseParallax();
  initButtonRipples();
}

// ==========================================
// 1. Scroll Reveal (Intersection Observer)
// ==========================================
let revealObserver;

function getRevealObserver() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          // Animate counters if they are inside the revealed element
          const counters = entry.target.querySelectorAll('.stat-number');
          counters.forEach(counter => animateCounter(counter));
          
          // If the element itself is a counter
          if (entry.target.classList.contains('stat-number')) {
            animateCounter(entry.target);
          }
          
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters view
    });
  }
  return revealObserver;
}

export function observeScrollReveal(el) {
  getRevealObserver().observe(el);
}

function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale');
  revealElements.forEach(el => {
    observeScrollReveal(el);
  });
}

// ==========================================
// 2. Magnetic Buttons
// ==========================================
function initMagneticButtons() {
  const magneticEls = document.querySelectorAll('.magnetic');
  
  if (window.innerWidth < 768) return; // Disable on touch devices for UX

  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      // Calculate cursor position relative to button center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Pull element towards cursor (30% of actual movement for subtle magnet effect)
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      
      // If there is an inner element (e.g. text/icon), pull it even more for depth
      const inner = el.querySelector('.magnetic-inner');
      if (inner) {
        inner.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      }
    });

    el.addEventListener('mouseleave', () => {
      // Smoothly return to original position
      el.style.transform = 'translate(0px, 0px)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      
      const inner = el.querySelector('.magnetic-inner');
      if (inner) {
        inner.style.transform = 'translate(0px, 0px)';
        inner.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      }
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'none';
      const inner = el.querySelector('.magnetic-inner');
      if (inner) inner.style.transition = 'none';
    });
  });
}

// ==========================================
// 3. 3D Card Tilt Effect
// ==========================================
export function initCardTilts() {
  const tiltCards = document.querySelectorAll('.tilt-card');

  if (window.innerWidth < 992) return; // Disable tilt on mobile/tablets

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation (-10 to 10 degrees)
      const rotateX = ((centerY - y) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Subtle shine element overlay
      let shine = card.querySelector('.card-shine');
      if (!shine) {
        shine = document.createElement('div');
        shine.className = 'card-shine';
        card.appendChild(shine);
      }
      
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      shine.style.background = `radial-gradient(circle 120px at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.15), transparent 80%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      
      const shine = card.querySelector('.card-shine');
      if (shine) {
        shine.style.background = 'transparent';
        shine.style.transition = 'background 0.5s ease';
      }
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

// ==========================================
// 4. Animated Counters
// ==========================================
function initAnimatedCounters() {
  // Counters are triggered when their wrapper has revealed class
  // handled in scroll reveal observer
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000; // ms
  const startTime = performance.now();
  const suffix = el.getAttribute('data-suffix') || '';

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // EaseOutQuad formula
    const easeProgress = progress * (2 - progress);
    const currentValue = Math.floor(easeProgress * target);
    
    el.textContent = currentValue + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      el.textContent = target + suffix;
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// ==========================================
// 5. Mouse Parallax for Hero Elements
// ==========================================
function initMouseParallax() {
  const parallaxContainer = document.querySelector('.hero-parallax-container');
  const layers = document.querySelectorAll('.parallax-layer');

  if (!parallaxContainer || window.innerWidth < 768) return;

  window.addEventListener('mousemove', (e) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const mouseX = e.clientX - width / 2;
    const mouseY = e.clientY - height / 2;

    layers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-depth')) || 0.05;
      const x = mouseX * speed;
      const y = mouseY * speed;
      
      layer.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

// ==========================================
// 6. Button Ripples
// ==========================================
function initButtonRipples() {
  const rippleButtons = document.querySelectorAll('.ripple-btn');
  
  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple-span';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   NAYANA R — PORTFOLIO JAVASCRIPT
   Theme Toggle · Typing Animation · Scroll Effects · Navigation
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── NIGHT MODE TOGGLE ───────────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Detect browser's preferred color scheme
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Initialize theme from localStorage or system preference
  function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      root.setAttribute('data-theme', savedTheme);
    } else {
      const systemTheme = getSystemTheme();
      root.setAttribute('data-theme', systemTheme);
    }
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  }

  themeToggle.addEventListener('click', toggleTheme);

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });

  initTheme();


  // ─── TYPING ANIMATION ───────────────────────────────────
  const taglineElement = document.getElementById('typed-tagline');
  const phrases = [
    'Aspiring Software Engineer',
    'Python · C · Java Learner',
    'B.E. Student at AIT, Chikkamagaluru',
    'Building Real-World Solutions',
    'Always Believe ♡'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      taglineElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      taglineElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of phrase
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();


  // ─── MOBILE NAVIGATION TOGGLE ───────────────────────────
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const sidebarNav = document.getElementById('sidebar-nav');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    sidebarNav.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      sidebarNav.classList.remove('open');
    });
  });


  // ─── ACTIVE NAV LINK ON SCROLL ──────────────────────────
  const sections = document.querySelectorAll('section[id], header[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });


  // ─── SCROLL REVEAL ANIMATION ────────────────────────────
  const revealElements = document.querySelectorAll(
    '.section-header, .about-grid, .skill-category, .timeline-item, .project-card, .achievement-card, .contact-grid'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ─── SKILL BARS ANIMATION ON SCROLL ─────────────────────
  const skillCards = document.querySelectorAll('.skill-card');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        skillObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  skillCards.forEach(card => skillObserver.observe(card));


  // ─── SMOOTH SCROLL FOR NAV LINKS ────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });


  // ─── CONTACT FORM HANDLER ───────────────────────────────
  window.handleFormSubmit = function(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('#form-submit');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = '✓ Sent!';
    submitBtn.style.background = '#2ecc71';
    submitBtn.style.borderColor = '#2ecc71';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.style.borderColor = '';
      submitBtn.disabled = false;
      form.reset();
    }, 2500);
  };


  // ─── PIXEL SPARKLE EFFECT ON HERO (decorative) ──────────
  const hero = document.querySelector('.hero');
  if (hero) {
    for (let i = 0; i < 15; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(201, 168, 76, ${Math.random() * 0.4 + 0.1});
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        z-index: 2;
        pointer-events: none;
        animation: sparkle-float ${Math.random() * 4 + 3}s ease-in-out infinite alternate;
        animation-delay: ${Math.random() * 3}s;
      `;
      hero.appendChild(sparkle);
    }

    // Add sparkle animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes sparkle-float {
        0% { opacity: 0.2; transform: translateY(0) scale(1); }
        100% { opacity: 0.8; transform: translateY(-20px) scale(1.5); }
      }
    `;
    document.head.appendChild(style);
  }

});

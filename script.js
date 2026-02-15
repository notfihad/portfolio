/**
 * NOBIUL ISLAM FIHAD — Portfolio Script
 * Features: Dark mode toggle · Scroll reveal · Typing effect · Nav behavior · Mobile menu
 */

/* ─── DARK MODE TOGGLE ─────────────────────── */
(function () {
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  // Load saved preference or system default
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  html.setAttribute('data-theme', initial);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();


/* ─── TYPING EFFECT ────────────────────────── */
(function () {
  const el = document.getElementById('typingText');
  if (!el) return;

  // Tech stack phrases to cycle through
  const phrases = [
    'Backend Engineer',
    'Java & Spring Boot',
    'Fintech Systems',
    'Microservices',
    'AI & NLP Explorer',
    'API Architect',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const TYPING_SPEED = 90;
  const DELETING_SPEED = 50;
  const PAUSE_AFTER_TYPE = 1800;
  const PAUSE_AFTER_DELETE = 300;

  function tick() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      // Typing forward
      charIndex++;
      el.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === currentPhrase.length) {
        // Pause then start deleting
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(tick, TYPING_SPEED);
    } else {
      // Deleting
      charIndex--;
      el.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(tick, DELETING_SPEED);
    }
  }

  // Delay start until hero loads
  setTimeout(tick, 1200);
})();


/* ─── SCROLL REVEAL ────────────────────────── */
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealEls.forEach((el) => observer.observe(el));
})();


/* ─── NAVIGATION SCROLL BEHAVIOR ──────────── */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const SCROLL_THRESHOLD = 40;

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run on load
})();


/* ─── MOBILE MENU ──────────────────────────── */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
})();


/* ─── ACTIVE NAV LINK HIGHLIGHT ────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            link.style.color = href === `#${id}` ? 'var(--accent)' : '';
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((section) => observer.observe(section));
})();


/* ─── SMOOTH SCROLL POLYFILL (fallback) ────── */
(function () {
  // Modern browsers handle this via CSS scroll-behavior: smooth
  // This is a lightweight fallback for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

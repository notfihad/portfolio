/**
 * NOBIUL ISLAM FIHAD — Portfolio Script
 *
 * Features:
 *   1. Dark mode toggle (persists via localStorage)
 *   2. Terminal intro sequence on first load
 *   3. Hero name typing effect (after terminal closes)
 *   4. Rotating subtitle typing effect
 *   5. Bidirectional scroll reveal (fade in on scroll down, fade out on scroll up)
 *   6. Nav scroll behavior + active link highlight
 *   7. Mobile hamburger menu
 */

'use strict';

/* ============================================================
   1. DARK MODE
   ============================================================ */
(function initTheme() {
  const html   = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  const saved      = localStorage.getItem('nif-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  html.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));

  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('nif-theme', next);
  });
})();


/* ============================================================
   2. TERMINAL INTRO
   ============================================================ */
function runTerminalIntro(onComplete) {
  const overlay = document.getElementById('terminalIntro');
  const line1   = document.getElementById('termLine1');
  const line2   = document.getElementById('termLine2');
  const output  = document.getElementById('termOutput');
  const line3   = document.getElementById('termLine3');

  // Helper: type text into an element, return Promise
  function typeInto(el, text, speed) {
    return new Promise(resolve => {
      let i = 0;
      el.style.display = '';
      el.textContent = '';

      // Add blinking cursor span
      const cursor = document.createElement('span');
      cursor.className = 'terminal-intro__cursor';
      el.appendChild(cursor);

      const interval = setInterval(() => {
        cursor.before(text[i]);
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          // Remove cursor after typing finishes
          setTimeout(() => {
            cursor.remove();
            resolve();
          }, 220);
        }
      }, speed);
    });
  }

  // Helper: show element with fade
  function show(el, delay = 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        el.style.display = '';
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.4s ease';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.opacity = '1';
            resolve();
          });
        });
      }, delay);
    });
  }

  // Sequence
  async function run() {
    // Prompt 1: cat command
    await typeInto(line1, '$ cat nobiul_islam_fihad.profile', 55);
    await new Promise(r => setTimeout(r, 180));

    // Prompt 2: executing
    await typeInto(line2, '> loading profile...', 45);
    await new Promise(r => setTimeout(r, 260));

    // Show the profile output block
    await show(output, 0);
    await new Promise(r => setTimeout(r, 600));

    // Prompt 3: done message
    await typeInto(line3, '> done. launching portfolio ✓', 42);
    await new Promise(r => setTimeout(r, 700));

    // Fade out the overlay
    overlay.classList.add('fade-out');
    await new Promise(r => setTimeout(r, 750));
    overlay.style.display = 'none';

    onComplete();
  }

  run();
}


/* ============================================================
   3. HERO NAME TYPING
   ============================================================ */
function typeHeroName(onComplete) {
  const nameEl   = document.getElementById('heroTypedName');
  const heroName = document.getElementById('heroName');
  const fullName = 'Nobiul';

  // Show the h1
  heroName.classList.remove('hero-hidden');
  heroName.style.opacity = '0';
  heroName.style.transform = 'translateY(12px)';
  requestAnimationFrame(() => {
    heroName.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    heroName.style.opacity    = '1';
    heroName.style.transform  = 'translateY(0)';
  });

  // Create an inline cursor for the name
  const cursor = document.createElement('span');
  cursor.className = 'hero__name-cursor';
  nameEl.after(cursor);

  let i = 0;
  const interval = setInterval(() => {
    nameEl.textContent += fullName[i];
    i++;
    if (i >= fullName.length) {
      clearInterval(interval);
      // Keep cursor blinking briefly, then remove
      setTimeout(() => {
        cursor.remove();
        onComplete();
      }, 500);
    }
  }, 80);
}


/* ============================================================
   4. HERO CONTENT SEQUENCE (runs after terminal)
   ============================================================ */
function launchHero() {
  const eyebrow = document.getElementById('heroEyebrow');
  const title   = document.getElementById('heroTitle');
  const tagline = document.getElementById('heroTagline');
  const cta     = document.getElementById('heroCta');
  const scroll  = document.getElementById('heroScroll');

  // Step 1: show eyebrow
  function showEl(el, delay) {
    setTimeout(() => {
      el.classList.remove('hero-hidden');
      el.classList.add('hero-visible');
    }, delay);
  }

  showEl(eyebrow, 80);

  // Step 2: type the name
  setTimeout(() => {
    typeHeroName(() => {
      // Step 3: reveal rest of hero staggered
      showEl(title,   120);
      showEl(tagline, 280);
      showEl(cta,     440);
      showEl(scroll,  620);

      // Step 4: start subtitle typing loop
      setTimeout(startSubtitleTyping, 600);
    });
  }, 200);
}


/* ============================================================
   5. SUBTITLE TYPING LOOP
   ============================================================ */
function startSubtitleTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'Backend Engineer',
    'Java & Spring Boot',
    'Fintech Systems',
    'Microservices',
    'AI & NLP Builder',
    'API Architect',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;

  const TYPE_SPEED   = 85;
  const DELETE_SPEED = 48;
  const PAUSE_TYPED  = 1800;
  const PAUSE_DELETED= 320;

  function tick() {
    const phrase = phrases[phraseIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === phrase.length) {
        isDeleting = true;
        return setTimeout(tick, PAUSE_TYPED);
      }
      return setTimeout(tick, TYPE_SPEED);
    }

    charIndex--;
    el.textContent = phrase.slice(0, charIndex);
    if (charIndex === 0) {
      isDeleting   = false;
      phraseIndex  = (phraseIndex + 1) % phrases.length;
      return setTimeout(tick, PAUSE_DELETED);
    }
    setTimeout(tick, DELETE_SPEED);
  }

  tick();
}


/* ============================================================
   6. BIDIRECTIONAL SCROLL REVEAL
   Elements animate IN when entering viewport from below,
   and animate OUT (up) when they leave upward.
   ============================================================ */
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  // Track previous scroll position to detect direction
  let lastY = window.scrollY;

  const observer = new IntersectionObserver((entries) => {
    const currentY = window.scrollY;
    const scrollingDown = currentY >= lastY;
    lastY = currentY;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Entering viewport — always animate IN
        entry.target.classList.remove('hidden-above');
        entry.target.classList.add('visible');
      } else {
        // Leaving viewport
        const rect = entry.boundingClientRect;
        if (rect.bottom < 0) {
          // Element has scrolled OUT above the top → apply inverse (upward exit)
          entry.target.classList.remove('visible');
          entry.target.classList.add('hidden-above');
        } else {
          // Element is below the fold → reset to default downward state
          entry.target.classList.remove('visible', 'hidden-above');
        }
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -32px 0px',
  });

  els.forEach(el => observer.observe(el));
})();


/* ============================================================
   7. NAV SCROLL BEHAVIOR + ACTIVE LINK
   ============================================================ */
(function initNav() {
  const nav     = document.getElementById('nav');
  const links   = document.querySelectorAll('.nav__link');
  const sections= document.querySelectorAll('section[id]');

  // Scrolled class for shadow/border
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 36);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link via IntersectionObserver
  const linkObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => linkObserver.observe(s));
})();


/* ============================================================
   8. MOBILE MENU
   ============================================================ */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  document.addEventListener('click', e => {
    if (!document.getElementById('nav').contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
})();


/* ============================================================
   9. SMOOTH ANCHOR SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id     = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ============================================================
   ENTRY POINT — Run terminal, then launch hero
   ============================================================ */
window.addEventListener('DOMContentLoaded', () => {
  // Prevent body scroll during intro
  document.body.style.overflow = 'hidden';

  runTerminalIntro(() => {
    document.body.style.overflow = '';
    launchHero();
  });
});
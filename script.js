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
   1. DARK MODE WITH SMOOTH TRANSITION
   ============================================================ */
(function initTheme() {
  const html   = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const overlay = document.getElementById('themeTransitionOverlay');

  const saved      = localStorage.getItem('nif-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  html.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));

  toggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Show overlay with smooth dimming/brightening
    overlay.classList.add('active');
    
    // Change background color based on direction
    if (nextTheme === 'dark') {
      // Light to dark: fade to dark overlay
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    } else {
      // Dark to light: fade to light overlay
      overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    }
    
    // Apply theme change after 100ms (gives smooth fade start)
    setTimeout(() => {
      html.setAttribute('data-theme', nextTheme);
      localStorage.setItem('nif-theme', nextTheme);
      
      // Fade out the overlay after another 400ms
      setTimeout(() => {
        overlay.classList.remove('active');
      }, 400);
    }, 100);
  });
})();


/* ============================================================
   2. TERMINAL INTRO (Raw CLI Output)
   ============================================================ */
function runTerminalIntro(onComplete) {
  const overlay = document.getElementById('terminalIntro');
  const body = document.getElementById('terminalBody');

  const paths = [
    'C:\\Users\\Admin\\portfolio>',
    'C:\\Users\\Admin\\Documents\\GitHub\\portfolio>',
    'C:\\portfolio>',
    'D:\\Dev\\projects\\portfolio>',
  ];

  const outputLines = [
    paths[Math.floor(Math.random() * paths.length)] + ' npm install',
    'Initializing system...',
    'Loading modules...',
    paths[Math.floor(Math.random() * paths.length)] + ' webpack build',
    'Compiling portfolio assets...',
    'Rendering components...',
    'Setting up event listeners...',
    paths[Math.floor(Math.random() * paths.length)] + ' babel transform',
    'Initializing animations...',
    'Loading theme configuration...',
    'Optimizing assets...',
    'Preparing viewport...',
    paths[Math.floor(Math.random() * paths.length)] + ' npm start',
    'Starting web server...',
    'Server ready on localhost:3000',
    'Mounting React Application...',
    'Hydrating components...',
    'Connecting WebSocket...',
    'Syncing state...',
    'Rendering UI layer...',
    paths[Math.floor(Math.random() * paths.length)] + ' portfolio --load',
    'Portfolio online.',
    '',
  ];

  let lineIndex = 0;
  const LINE_SPEED = 20; // Much faster

  function outputNextLine() {
    if (lineIndex < outputLines.length) {
      const line = outputLines[lineIndex];
      body.textContent += line + '\n';
      
      // Auto-scroll to bottom
      body.scrollTop = body.scrollHeight;
      
      lineIndex++;
      setTimeout(outputNextLine, LINE_SPEED);
    } else {
      // All lines done - quick fade
      setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => {
          overlay.style.display = 'none';
          onComplete();
        }, 300);
      }, 50);
    }
  }

  outputNextLine();
}


/* ============================================================
   3. HERO NAME TYPING
   ============================================================ */
function typeHeroName(onComplete) {
  const nameEl   = document.getElementById('heroTypedName');
  const heroName = document.getElementById('heroName');
  const fihadEl  = document.getElementById('heroFihad');
  const fullName = 'Nobiul Islam';

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
        // Reveal Fihad on next line
        fihadEl.classList.remove('hero-hidden');
        fihadEl.classList.add('hero-visible');
        onComplete();
      }, 500);
    }
  }, 80);
}


/* ============================================================
   4. HERO CONTENT SEQUENCE (runs after terminal)
   ============================================================ */
function launchHero() {
  const heroSection = document.getElementById('hero');
  const eyebrow = document.getElementById('heroEyebrow');
  const title   = document.getElementById('heroTitle');
  const tagline = document.getElementById('heroTagline');
  const cta     = document.getElementById('heroCta');
  const scroll  = document.getElementById('heroScroll');

  // Fade in the entire hero section subtly
  heroSection.style.opacity = '0';
  heroSection.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  requestAnimationFrame(() => {
    heroSection.style.opacity = '1';
  });

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
   6. SCROLL PROGRESS BAR
   Tracks scroll position and shows progress at top
   ============================================================ */
(function initScrollProgressBar() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  function updateProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
})();


/* ============================================================
   7. BIDIRECTIONAL SCROLL REVEAL
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
    threshold: [0.1, 0.25],
    rootMargin: '0px 0px -48px 0px',
  });

  els.forEach(el => observer.observe(el));
})();


/* ============================================================
   8. NAV SCROLL BEHAVIOR + ACTIVE LINK
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
   9. MOBILE MENU
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
   10. SMOOTH ANCHOR SCROLL
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
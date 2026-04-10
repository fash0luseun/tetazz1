// =========================================
// TETAZZ NIGERIA LIMITED — WEBSITE SCRIPTS
// =========================================

document.addEventListener('DOMContentLoaded', () => {

  // ── THEME SWITCHER ──────────────────────────────────────
  const html = document.documentElement;
  const themeButtons = document.querySelectorAll('.theme-btn');

  function applyTheme(mode) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (mode === 'dark' || (mode === 'system' && prefersDark)) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
    }
    // Highlight active button
    themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    localStorage.setItem('theme', mode);
  }

  // Load saved preference (default: system)
  const saved = localStorage.getItem('theme') || 'system';
  applyTheme(saved);

  // Button clicks
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.mode));
  });

  // React to OS preference changes when in system mode
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'system') applyTheme('system');
  });


  // ── SMOOTH SCROLL ──────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ── SCROLL FADE-IN ─────────────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => fadeObserver.observe(el));


  // ── STATS COUNTER ──────────────────────────────────────
  const statEls = document.querySelectorAll('[data-count]');
  let counted = false;
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statEls.forEach(el => {
          const end    = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          animateCount(el, 0, end, suffix, 1400);
        });
      }
    });
  }, { threshold: 0.5 });
  const aboutSection = document.getElementById('about');
  if (aboutSection) statsObserver.observe(aboutSection);

  function animateCount(el, start, end, suffix, duration) {
    const startTime = performance.now();
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(start + (end - start) * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }


  // ── PROJECT FILTER ─────────────────────────────────────
  const filterBtns    = document.querySelectorAll('.filter-btn');
  const projectCards  = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
        if (match) card.style.animation = 'cardIn 0.35s ease forwards';
      });
    });
  });


  // ── CONTACT FORM ───────────────────────────────────────
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitBtn.textContent = '✓ Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg,#16a34a,#22c55e)';
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.innerHTML = 'Send Message <svg class="w-4 h-4 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>';
        submitBtn.style.background = 'linear-gradient(135deg,#2C1206,#8B3A2A)';
        submitBtn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

});

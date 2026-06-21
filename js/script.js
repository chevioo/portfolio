/* =============================================
   CHEVIO PORTFOLIO — SCRIPT.JS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL STATE =====
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ===== ACTIVE NAV LINK =====
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const isHome = (href === 'index.html' || href === './index.html' || href === '/') &&
                   (currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('/'));
    const isMatch = !isHome && currentPath.includes(href.replace('./', '').replace('.html', ''));
    if (isHome || isMatch) link.classList.add('active');
    // Also check exact filename
    const filename = currentPath.split('/').pop();
    if (href.includes(filename) && filename !== '') link.classList.add('active');
    // Home fallback
    if ((filename === '' || filename === 'index.html') && (href.includes('index') || href === '/')) link.classList.add('active');
  });

  // ===== MOBILE MENU =====
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  // ===== CONTACT FORM =====
  const form = document.querySelector('.contact-form');
  const successMsg = document.querySelector('.form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      const btnText = btn.querySelector('.btn-text');
      const originalText = btnText ? btnText.textContent : btn.textContent;

      // Loading state
      btn.disabled = true;
      if (btnText) btnText.textContent = 'Sending...';

      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) {
          successMsg.style.display = 'block';
        }
      }, 1200);
    });
  }

  // ===== SMOOTH LINK TRANSITIONS =====
  document.querySelectorAll('a[href$=".html"], a[href="/"]').forEach(link => {
    if (link.hostname === window.location.hostname) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(-6px)';
        document.body.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        setTimeout(() => { window.location.href = href; }, 240);
      });
    }
  });

  // ===== SKILL BADGE STAGGER =====
  const skillBadges = document.querySelectorAll('.skill-badge');
  skillBadges.forEach((badge, i) => {
    badge.style.transitionDelay = `${i * 0.05}s`;
  });

});

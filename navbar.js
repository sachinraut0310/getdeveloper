(function () {
  /* ── Which page are we on? ── */
  const page  = (window.location.pathname.split('/').pop() || 'index.html');
  const isHome = page === '' || page === 'index.html';
  const h     = isHome ? '' : 'index.html';   // anchor prefix for subpages

  /* ── Inject Navbar + Sticky + Footer CSS ── */
  const style = document.createElement('style');
  style.id = 'navbar-css';
  style.textContent = `
    /* ─── NAVBAR (navbar.js) ─── */
    .navbar {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 1000; padding: 20px 0;
      transition: all .4s ease;
    }
    .navbar.scrolled {
      padding: 12px 0;
      background: var(--navbar-bg);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
    }
    .nav-inner {
      display: flex; align-items: center; justify-content: space-between;
    }
    .nav-logo img { height: 44px; width: auto; display: block; }
    .nav-links { display: flex; gap: 32px; list-style: none; }
    .nav-links a {
      font-size: 14px; font-weight: 500;
      color: var(--muted); transition: color .3s; text-decoration: none;
    }
    .nav-links a:hover, .nav-links a.active { color: var(--text); }
    .nav-cta { display: flex; gap: 12px; align-items: center; }
    .nav-audit-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 10px 22px; border-radius: 99px;
      font-weight: 600; font-size: 13px;
      background: linear-gradient(135deg,#7c3aed,#a855f7,#06b6d4);
      color: #fff; border: none; cursor: pointer;
      box-shadow: 0 0 24px rgba(124,58,237,0.35);
      text-decoration: none; transition: all .3s;
    }
    .nav-audit-btn:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(124,58,237,0.55); }
    .theme-toggle {
      width: 42px; height: 42px; border-radius: 50%;
      border: 1px solid var(--border); background: var(--surface);
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      font-size: 18px; transition: all .3s ease; flex-shrink: 0;
      backdrop-filter: blur(8px);
    }
    .theme-toggle:hover { border-color: var(--purple2); background: rgba(124,58,237,0.1); transform: rotate(20deg) scale(1.1); }
    .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
    .hamburger span { display: block; width: 24px; height: 2px; background: var(--text); border-radius: 2px; transition: all .3s; }
    /* ─── MOBILE MENU (navbar.js) ─── */
    .mobile-menu {
      display: none; position: fixed; inset: 0;
      background: rgba(6,6,15,0.97);
      z-index: 999; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 36px; backdrop-filter: blur(20px);
    }
    html[data-theme="light"] .mobile-menu { background: rgba(240,244,255,0.97); }
    .mobile-menu.open { display: flex; }
    .mobile-menu a { font-size: 24px; font-weight: 700; color: var(--text); text-decoration: none; }
    .mobile-menu a:hover { color: var(--purple2); }
    .mobile-close { position: absolute; top: 24px; right: 24px; font-size: 28px; cursor: pointer; color: var(--muted); }
    /* ─── RESPONSIVE ─── */
    @media (max-width: 1024px) { .nav-links { gap: 22px; } .nav-links a { font-size: 13px; } }
    @media (max-width: 768px)  { .nav-links, .nav-cta { display: none; } .hamburger { display: flex; } #nb-mobile-theme { display: flex !important; } }

    /* ─── STICKY BUTTONS (navbar.js) ─── */
    .nb-sticky-btns {
      position: fixed; right: 20px; bottom: 40px;
      z-index: 999; display: flex; flex-direction: column;
      gap: 12px; align-items: center;
    }
    .nb-sticky-btn {
      width: 52px; height: 52px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      transition: all .3s ease; position: relative;
      border: 2px solid rgba(255,255,255,0.12);
    }
    .nb-sticky-btn:hover { transform: scale(1.15) translateX(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.4); }
    .nb-sticky-btn:hover .nb-sticky-tooltip { opacity: 1; transform: translateX(0); pointer-events: auto; }
    .nb-sticky-btn.whatsapp { background: #25d366; }
    .nb-sticky-btn.call     { background: linear-gradient(135deg,#7c3aed,#a855f7); }
    .nb-sticky-btn.mail     { background: linear-gradient(135deg,#06b6d4,#0891b2); }
    .nb-sticky-tooltip {
      position: absolute; right: 62px;
      background: rgba(10,10,20,0.92); color: #fff;
      font-size: 12px; font-weight: 600;
      padding: 6px 14px; border-radius: 8px;
      white-space: nowrap; border: 1px solid rgba(255,255,255,0.08);
      opacity: 0; transform: translateX(8px);
      transition: all .25s ease; pointer-events: none;
      backdrop-filter: blur(8px);
    }
    .nb-sticky-tooltip::after {
      content: ''; position: absolute;
      right: -6px; top: 50%; transform: translateY(-50%);
      border: 6px solid transparent;
      border-left-color: rgba(10,10,20,0.92); border-right: none;
    }
    .nb-sticky-divider {
      width: 2px; height: 24px;
      background: linear-gradient(to bottom,#7c3aed,transparent);
      border-radius: 2px;
    }
    .nb-call-wrap { display: none; }
    @media (max-width: 768px) {
      .nb-call-wrap { display: contents; }
      .nb-sticky-btns { right: 12px; bottom: 28px; gap: 10px; }
      .nb-sticky-btn  { width: 46px; height: 46px; }
      .nb-sticky-tooltip { display: none; }
    }

    /* ─── COMMON FOOTER (navbar.js) ─── */
    .nb-footer {
      background: var(--bg2, #0d0d1f);
      border-top: 1px solid var(--border, rgba(255,255,255,0.08));
      padding: 40px 0; text-align: center;
      position: relative; z-index: 10;
      font-family: 'Inter', sans-serif;
    }
    .nb-footer-logo { margin-bottom: 18px; }
    .nb-footer-logo img { height: 48px; width: auto; }
    .nb-foot-links {
      display: flex; gap: 20px; justify-content: center;
      flex-wrap: wrap; margin-bottom: 14px;
    }
    .nb-foot-links a {
      color: var(--muted, #94a3b8); font-size: 13px;
      transition: color .2s; text-decoration: none;
    }
    .nb-foot-links a:hover { color: var(--text, #f1f5f9); }
    .nb-footer p { color: var(--muted, #94a3b8); font-size: 14px; margin: 0; }
    html[data-theme="light"] .nb-footer { background: var(--bg2, #e8eeff); }
    @media (max-width: 480px) {
      .nb-foot-links { gap: 14px; }
      .nb-foot-links a { font-size: 12px; }
      .nb-footer p { font-size: 12px; }
    }
  `;
  document.head.appendChild(style);

  /* ── Active link helper ── */
  function activeClass(key) { return key === page ? ' class="active"' : ''; }

  /* ── Build navbar HTML ── */
  const auditHref = h + '#contact';
  const navHtml = `

<nav class="navbar" id="navbar">
  <div class="container">
    <div class="nav-inner">
      <a href="${h || 'index.html'}" class="nav-logo">
        <img src="sachin-raut-logo.svg" alt="Sachin Raut" />
      </a>
      <div class="nav-cta">
        <button class="theme-toggle" onclick="window.toggleTheme()" id="themeBtn" aria-label="Toggle theme">🌙</button>
      </div>
    </div>
  </div>
</nav>`;

  document.body.insertAdjacentHTML('afterbegin', navHtml);

  /* ── Inject sticky buttons at end of body ── */
  const stickyHtml = `
<div class="nb-sticky-btns">
  <a href="https://wa.me/917304705124" target="_blank" class="nb-sticky-btn whatsapp" aria-label="WhatsApp">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <span class="nb-sticky-tooltip">Chat on WhatsApp</span>
  </a>

  <div class="nb-sticky-divider"></div>

  <div class="nb-call-wrap">
    <a href="tel:+917304705124" class="nb-sticky-btn call" aria-label="Call">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
      <span class="nb-sticky-tooltip">Call Now</span>
    </a>
    <div class="nb-sticky-divider"></div>
  </div>

  <a href="mailto:sachinraut0310@gmail.com" class="nb-sticky-btn mail" aria-label="Email">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
    <span class="nb-sticky-tooltip">Send Email</span>
  </a>
</div>`;

  /* ── Common footer HTML ── */
  const footerHtml = `
<div class="nb-footer-logo">
  <img src="sachin-raut-logo.svg" alt="Sachin Raut" />
</div>
<div class="nb-foot-links">
  <a href="index.html">Home</a>
  <a href="privacy-policy.html">Privacy Policy</a>
  <a href="terms-and-conditions.html">Terms</a>
</div>
<div class="nb-foot-links">
  <a href="mailto:sachinraut0310@gmail.com">sachinraut0310@gmail.com</a>
</div>
<p>Address : 1/13 jay ambe seva sangh chawl, jay shankar nagar, bhandup west, mumbai-400078</p>
<p>© 2026 Sachin Raut · Mumbai, India · All rights reserved.</p>`;

  /* ── Inject sticky buttons + footer AFTER DOM is ready ── */
  document.addEventListener('DOMContentLoaded', function () {
    /* Sticky buttons */
    document.body.insertAdjacentHTML('beforeend', stickyHtml);

    /* Replace existing footer OR inject new one */
    const existingFooter = document.querySelector('footer');
    if (existingFooter) {
      existingFooter.className = 'nb-footer';
      existingFooter.innerHTML = footerHtml;
    } else {
      document.body.insertAdjacentHTML('beforeend', `<footer class="nb-footer">${footerHtml}</footer>`);
    }
  });

  /* ── Scroll behaviour ── */
  const nav = document.getElementById('navbar');
  if (isHome) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  } else {
    nav.classList.add('scrolled');
  }

  /* ── Global functions ── */
  window.toggleMenu = function () {
    document.getElementById('mobileMenu').classList.toggle('open');
  };

  const THEME_KEY = 'sr-theme';

  window.applyTheme = function (t) {
    document.documentElement.setAttribute('data-theme', t);
    const icon = t === 'light' ? '☀️' : '🌙';
    ['themeBtn', 'themeBtnMobile', 'nb-mobile-theme'].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) b.textContent = icon;
    });
    localStorage.setItem(THEME_KEY, t);
  };

  window.toggleTheme = function () {
    var cur = document.documentElement.getAttribute('data-theme') || 'dark';
    window.applyTheme(cur === 'dark' ? 'light' : 'dark');
  };

  /* Apply saved theme immediately (before page renders) */
  window.applyTheme(localStorage.getItem(THEME_KEY) || 'dark');

})();

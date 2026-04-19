(function () {
  /* ── Which page are we on? ── */
  const page  = (window.location.pathname.split('/').pop() || 'index.html');
  const isHome = page === '' || page === 'index.html';
  const h     = isHome ? '' : 'index.html';   // anchor prefix for subpages

  /* ── Inject Navbar CSS ── */
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
  `;
  document.head.appendChild(style);

  /* ── Active link helper ── */
  function activeClass(key) { return key === page ? ' class="active"' : ''; }

  /* ── Build HTML ── */
  const auditHref = h + '#contact';
  const html = `
<div class="mobile-menu" id="mobileMenu">
  <span class="mobile-close" onclick="window.toggleMenu()">✕</span>
  <a href="${h}#services"         onclick="window.toggleMenu()">Services</a>
  <a href="web-development.html"  onclick="window.toggleMenu()">Web Development</a>
  <a href="seo.html"              onclick="window.toggleMenu()">Technical SEO</a>
  <a href="qa-testing.html"       onclick="window.toggleMenu()">QA Testing</a>
  <a href="${h}#work"             onclick="window.toggleMenu()">Portfolio</a>
  <a href="${h}#faq"              onclick="window.toggleMenu()">FAQ</a>
  <a href="${h}#contact"          onclick="window.toggleMenu()">Contact</a>
</div>

<nav class="navbar" id="navbar">
  <div class="container">
    <div class="nav-inner">
      <a href="${h || 'index.html'}" class="nav-logo">
        <img src="sachin-raut-logo.svg" alt="Sachin Raut" />
      </a>
      <ul class="nav-links">
        <li><a href="${h}#services"${activeClass('')}>Services</a></li>
        <li><a href="web-development.html"${activeClass('web-development.html')}>Web Dev</a></li>
        <li><a href="seo.html"${activeClass('seo.html')}>SEO</a></li>
        <li><a href="qa-testing.html"${activeClass('qa-testing.html')}>QA Testing</a></li>
        <li><a href="${h}#work"${activeClass('')}>Portfolio</a></li>
        <li><a href="${h}#faq"${activeClass('')}>FAQ</a></li>
      </ul>
      <div class="nav-cta">
        <button class="theme-toggle" onclick="window.toggleTheme()" id="themeBtn" aria-label="Toggle theme">🌙</button>
        <a href="${auditHref}" class="nav-audit-btn">Get Free Audit ✦</a>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="theme-toggle" id="nb-mobile-theme" onclick="window.toggleTheme()" aria-label="Toggle theme" style="display:none;">🌙</button>
        <div class="hamburger" onclick="window.toggleMenu()">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  </div>
</nav>`;

  document.body.insertAdjacentHTML('afterbegin', html);

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

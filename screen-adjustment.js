// ========== ADVANCED MOBILE RESPONSIVENESS ==========
(function() {
  // Helper: inject CSS rules
  function injectCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  // 1. Base responsive styles (viewport, touch, layout)
  injectCSS(`
    /* Ensure proper touch targets */
    button, .platform-btn, .link-stack a {
      min-height: 44px;
      min-width: 44px;
    }
    .platform-btn {
      white-space: nowrap;
    }
    /* Prevent horizontal overflow */
    img, svg {
      max-width: 100%;
      height: auto;
    }
    /* Fix iOS viewport height */
    :root {
      --vh: 1vh;
    }
    .sidebar, .main-panel {
      max-height: calc(var(--vh, 1vh) * 100);
    }
  `);

  // 2. Set correct viewport height on mobile (fixes 100vh issues)
  function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);

  // 3. Responsive breakpoint logic with fine‑grained adjustments
  function applyResponsiveLayout() {
    const width = window.innerWidth;
    const isMobile = width <= 768;
    const isSmallMobile = width <= 480;
    const isTablet = width > 768 && width <= 1024;

    // Sidebar behavior
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      if (isMobile) {
        sidebar.style.position = 'fixed';
        sidebar.style.top = '0';
        sidebar.style.left = '0';
        sidebar.style.height = '100vh';
        sidebar.style.width = '260px';
        sidebar.style.transform = 'translateX(-100%)';
        sidebar.style.transition = 'transform 0.3s ease';
        sidebar.style.zIndex = '999';
        sidebar.style.boxShadow = '2px 0 15px rgba(0,0,0,0.5)';
      } else {
        sidebar.style.position = '';
        sidebar.style.top = '';
        sidebar.style.left = '';
        sidebar.style.height = '';
        sidebar.style.width = '';
        sidebar.style.transform = '';
        sidebar.style.transition = '';
        sidebar.style.zIndex = '';
        sidebar.style.boxShadow = '';
        sidebar.classList.remove('open');
      }
    }

    // Main panel padding adjustments
    const mainPanel = document.querySelector('.main-panel');
    if (mainPanel) {
      if (isMobile) {
        mainPanel.style.padding = '70px 16px 20px';
      } else if (isTablet) {
        mainPanel.style.padding = '30px 24px';
      } else {
        mainPanel.style.padding = '30px 40px';
      }
    }

    // Grid columns for tools/skinpacks containers
    const container = document.querySelector('#tools-container, #skinpacks-container, #news-container');
    if (container) {
      if (isSmallMobile) {
        container.style.gridTemplateColumns = '1fr';
        container.style.gap = '12px';
      } else if (isMobile) {
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px, 1fr))';
        container.style.gap = '16px';
      } else if (isTablet) {
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
        container.style.gap = '20px';
      } else {
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(240px, 1fr))';
        container.style.gap = '24px';
      }
    }

    // Card padding and icon sizes
    const cards = document.querySelectorAll('.tool-card, .pack-card, .news-card');
    cards.forEach(card => {
      if (isSmallMobile) {
        card.style.padding = '12px';
      } else if (isMobile) {
        card.style.padding = '16px';
      } else {
        card.style.padding = '20px';
      }
    });

    const icons = document.querySelectorAll('.tool-icon, .pack-thumbnail');
    icons.forEach(icon => {
      if (isSmallMobile) {
        icon.style.width = '50px';
        icon.style.height = '50px';
      } else if (isMobile) {
        icon.style.width = '60px';
        icon.style.height = '60px';
      } else {
        icon.style.width = '80px';
        icon.style.height = '80px';
      }
    });

    // Title font sizes
    const title = document.querySelector('.centered h1');
    if (title) {
      if (isSmallMobile) {
        title.style.fontSize = '1.8rem';
      } else if (isMobile) {
        title.style.fontSize = '2rem';
      } else {
        title.style.fontSize = '';
      }
    }

    // Subtitle font size
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
      subtitle.style.fontSize = isMobile ? '1rem' : '1.2rem';
    }

    // Platform buttons adjustment
    const platformBtns = document.querySelectorAll('.platform-btn');
    platformBtns.forEach(btn => {
      if (isSmallMobile) {
        btn.style.padding = '4px 8px';
        btn.style.fontSize = '0.75rem';
      } else if (isMobile) {
        btn.style.padding = '5px 10px';
        btn.style.fontSize = '0.8rem';
      } else {
        btn.style.padding = '6px 12px';
        btn.style.fontSize = '0.85rem';
      }
    });

    // Logo size
    const logo = document.querySelector('.Logo');
    if (logo) {
      logo.style.width = isSmallMobile ? '70px' : (isMobile ? '80px' : '100px');
    }

    // Link stack font size
    const links = document.querySelectorAll('.link-stack a');
    links.forEach(link => {
      link.style.fontSize = isMobile ? '1.1rem' : '1.25rem';
    });
  }

  // 4. Hamburger menu setup (only on mobile)
  function setupMobileMenu() {
    if (document.getElementById('mobile-menu-toggle')) return; // already exists

    const menuBtn = document.createElement('button');
    menuBtn.id = 'mobile-menu-toggle';
    menuBtn.innerHTML = '☰';
    menuBtn.setAttribute('aria-label', 'Menu');
    menuBtn.style.cssText = `
      display: none;
      position: fixed;
      top: 12px;
      left: 12px;
      z-index: 1000;
      background: #1a1a1a;
      color: #fff;
      border: 1px solid #444;
      border-radius: 8px;
      padding: 8px 14px;
      font-size: 1.5rem;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.5);
      transition: background 0.2s;
    `;
    document.body.appendChild(menuBtn);

    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && e.target !== menuBtn) {
          sidebar.classList.remove('open');
        }
      }
    });

    // Close on link click
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) sidebar.classList.remove('open');
      });
    });

    // Show/hide button based on width
    function toggleMenuButton() {
      menuBtn.style.display = window.innerWidth <= 768 ? 'block' : 'none';
    }
    toggleMenuButton();
    window.addEventListener('resize', toggleMenuButton);
  }

  // 5. Initialize everything
  function init() {
    applyResponsiveLayout();
    setupMobileMenu();

    // Ensure Oneko z-index is above sidebar on mobile
    const oneko = document.getElementById('oneko');
    if (oneko) oneko.style.zIndex = '1001';

    // Reapply on resize (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        applyResponsiveLayout();
        setVH();
      }, 100);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

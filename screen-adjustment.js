// ========== MOBILE PERFECTION SCRIPT ==========
(function() {
  // 1. Inject bulletproof mobile CSS (overrides everything)
  const style = document.createElement('style');
  style.textContent = `
    /* === GLOBAL MOBILE FIXES === */
    *, *::before, *::after { box-sizing: border-box; }
    body {
      overflow-x: hidden;
      width: 100%;
    }

    /* === HAMBURGER BUTTON (hidden on desktop) === */
    #mobile-menu-toggle {
      display: none;
    }

    /* === MOBILE BREAKPOINT (≤ 768px) === */
    @media (max-width: 768px) {
      /* Show hamburger */
      #mobile-menu-toggle {
        display: flex !important;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 10001;
        background: #1e1e1e;
        color: white;
        border: 1px solid #555;
        border-radius: 8px;
        width: 48px;
        height: 48px;
        font-size: 26px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        backdrop-filter: blur(4px);
        padding: 0;
        line-height: 1;
      }

      /* Sidebar – off‑canvas */
      .sidebar {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        height: 100dvh !important;
        width: min(280px, 80vw) !important;
        transform: translateX(-100%) !important;
        transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1) !important;
        z-index: 10000 !important;
        box-shadow: 4px 0 20px rgba(0,0,0,0.5) !important;
        background: #0b0b0b !important;
        overflow-y: auto !important;
        padding: 20px 16px !important;
        border-right: none !important;
      }
      .sidebar.open {
        transform: translateX(0) !important;
      }

      /* Main panel – full width, proper spacing */
      .main-panel {
        width: 100% !important;
        padding: 16px 12px 20px !important;
        margin-left: 0 !important;
        margin-top: 0 !important;
        overflow-x: hidden !important;
        max-height: none !important;
      }

      /* Header adjustments */
      .centered {
        margin-top: 8px !important;
        margin-bottom: 20px !important;
        padding-top: 30px !important; /* space for fixed hamburger */
      }
      .centered h1 {
        font-size: 2rem !important;
        word-break: break-word !important;
      }
      .subtitle {
        font-size: 1rem !important;
        padding: 0 4px !important;
      }

      /* Grid – single column, better spacing */
      #tools-container,
      #skinpacks-container,
      #news-container {
        display: flex !important;
        flex-direction: column !important;
        gap: 16px !important;
        width: 100% !important;
      }

      /* Cards – clean, full width */
      .tool-card,
      .pack-card,
      .news-card {
        width: 100% !important;
        padding: 16px 14px !important;
        margin: 0 !important;
        border-radius: 14px !important;
        border-left-width: 4px !important;
      }

      /* Tool icon / thumbnail – appropriate size */
      .tool-icon,
      .pack-thumbnail {
        width: 70px !important;
        height: 70px !important;
        margin: 0 auto 12px !important;
      }

      /* Card title */
      .tool-name,
      .pack-name,
      .news-card h3 {
        font-size: 1.25rem !important;
        margin-bottom: 6px !important;
      }

      /* Credit text */
      .tool-credit,
      .pack-uuid,
      .news-card .date {
        font-size: 0.8rem !important;
        margin-bottom: 12px !important;
      }

      /* Platform buttons – wrap nicely, larger tap area */
      .platform-buttons {
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 8px !important;
        justify-content: flex-start !important;
        margin-top: 4px !important;
      }
      .platform-btn {
        flex: 0 0 auto !important;
        padding: 8px 14px !important;
        font-size: 0.9rem !important;
        border-radius: 24px !important;
        min-height: 44px !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        background: #2a2a2a !important;
        border: 1px solid #4a4a4a !important;
      }
      .platform-btn svg {
        width: 18px !important;
        height: 18px !important;
      }

      /* Download button (skinpacks) */
      .download-btn {
        padding: 10px 16px !important;
        font-size: 0.95rem !important;
        min-height: 44px !important;
      }

      /* Footer */
      footer {
        margin-top: 32px !important;
        padding: 16px 0 !important;
        font-size: 0.8rem !important;
      }

      /* Link stack inside sidebar – easier to tap */
      .link-stack a {
        font-size: 1.2rem !important;
        padding: 10px 0 !important;
        margin-bottom: 6px !important;
        min-height: 48px !important;
        display: flex !important;
        align-items: center !important;
      }

      /* Logo smaller */
      .Logo {
        width: 80px !important;
        margin-bottom: 24px !important;
      }

      /* Prevent any horizontal scroll */
      .main-panel,
      body {
        overflow-x: hidden !important;
      }

      /* Oneko cat stays on top but not in the way */
      #oneko {
        z-index: 9999 !important;
      }
    }

    /* === EXTRA SMALL (≤ 480px) === */
    @media (max-width: 480px) {
      .centered h1 {
        font-size: 1.8rem !important;
      }
      .tool-icon,
      .pack-thumbnail {
        width: 60px !important;
        height: 60px !important;
      }
      .platform-btn {
        padding: 6px 12px !important;
        font-size: 0.8rem !important;
      }
      .platform-btn svg {
        width: 16px !important;
        height: 16px !important;
      }
    }

    /* === TABLET (769–1024) – refined spacing === */
    @media (min-width: 769px) and (max-width: 1024px) {
      .main-panel {
        padding: 24px 28px !important;
      }
      #tools-container,
      #skinpacks-container {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
        gap: 20px !important;
      }
    }
  `;
  document.head.appendChild(style);

  // 2. Create hamburger button (if not exists)
  function createHamburger() {
    if (document.getElementById('mobile-menu-toggle')) return;
    const btn = document.createElement('button');
    btn.id = 'mobile-menu-toggle';
    btn.innerHTML = '☰';
    btn.setAttribute('aria-label', 'Menu');
    document.body.appendChild(btn);
    return btn;
  }

  // 3. Set up mobile interactions
  function setupMobile() {
    const hamburger = createHamburger();
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // Toggle sidebar
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && e.target !== hamburger) {
          sidebar.classList.remove('open');
        }
      }
    });

    // Close when a link is clicked
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('open');
        }
      });
    });

    // Reset sidebar state on resize above mobile
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
      }
    });
  }

  // 4. Fix viewport height issues (100vh on mobile browsers)
  function fixViewportHeight() {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
  }

  // 5. Ensure Oneko doesn't block interactions
  function handleOneko() {
    const oneko = document.getElementById('oneko');
    if (oneko) {
      oneko.style.pointerEvents = 'none';
      oneko.style.zIndex = '9999';
    }
  }

  // 6. Initialize everything
  function init() {
    fixViewportHeight();
    setupMobile();
    handleOneko();
    
    // Additional: fix any existing inline padding that might break layout
    const mainPanel = document.querySelector('.main-panel');
    if (mainPanel && window.innerWidth <= 768) {
      mainPanel.style.paddingTop = '16px';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ========== MOBILE TOGGLE – FIXED & WORKING ==========
(function() {
  // Ensure we run after DOM is ready
  function init() {
    // 1. Inject bulletproof mobile CSS
    const style = document.createElement('style');
    style.textContent = `
      /* Hamburger button – always on top */
      #mobile-menu-toggle {
        display: none;
        position: fixed;
        top: 15px;
        left: 15px;
        z-index: 99999;
        background: #1e1e1e;
        color: white;
        border: 1px solid #666;
        border-radius: 12px;
        width: 52px;
        height: 52px;
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.6);
        align-items: center;
        justify-content: center;
        padding: 0;
        line-height: 1;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        transition: background 0.2s;
      }
      #mobile-menu-toggle:hover {
        background: #2a2a2a;
      }

      @media (max-width: 768px) {
        #mobile-menu-toggle {
          display: flex !important;
        }

        body {
          overflow-x: hidden;
          width: 100%;
        }

        .sidebar {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          height: 100dvh !important;
          width: min(280px, 80vw) !important;
          transform: translateX(-100%) !important;
          transition: transform 0.3s ease !important;
          z-index: 99998 !important;
          box-shadow: 4px 0 25px rgba(0,0,0,0.6) !important;
          background: #0b0b0b !important;
          overflow-y: auto !important;
          padding: 20px 16px !important;
          border-right: none !important;
        }
        .sidebar.open {
          transform: translateX(0) !important;
        }

        .main-panel {
          width: 100% !important;
          padding: 16px 12px 20px !important;
          margin-left: 0 !important;
          overflow-x: hidden !important;
          max-height: none !important;
        }

        .centered {
          margin-top: 8px !important;
          margin-bottom: 20px !important;
          padding-top: 40px !important; /* make room for fixed button */
        }
        .centered h1 {
          font-size: 2rem !important;
          word-break: break-word !important;
        }
        .subtitle {
          font-size: 1rem !important;
          padding: 0 4px !important;
        }

        #tools-container,
        #skinpacks-container,
        #news-container {
          display: flex !important;
          flex-direction: column !important;
          gap: 16px !important;
          width: 100% !important;
        }

        .tool-card,
        .pack-card,
        .news-card {
          width: 100% !important;
          padding: 16px 14px !important;
          margin: 0 !important;
          border-radius: 14px !important;
        }

        .tool-icon,
        .pack-thumbnail {
          width: 70px !important;
          height: 70px !important;
          margin: 0 auto 12px !important;
        }

        .platform-buttons {
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 8px !important;
          justify-content: flex-start !important;
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

        .link-stack a {
          font-size: 1.2rem !important;
          padding: 10px 0 !important;
          margin-bottom: 6px !important;
          min-height: 48px !important;
          display: flex !important;
          align-items: center !important;
        }

        .Logo {
          width: 80px !important;
          margin-bottom: 24px !important;
        }

        #oneko {
          z-index: 9999 !important;
          pointer-events: none !important;
        }
      }

      @media (max-width: 480px) {
        .centered h1 { font-size: 1.8rem !important; }
        .tool-icon, .pack-thumbnail { width: 60px !important; height: 60px !important; }
        .platform-btn { padding: 6px 12px !important; font-size: 0.8rem !important; }
        .platform-btn svg { width: 16px !important; height: 16px !important; }
      }
    `;
    document.head.appendChild(style);

    // 2. Create hamburger button (if not already present)
    let hamburger = document.getElementById('mobile-menu-toggle');
    if (!hamburger) {
      hamburger = document.createElement('button');
      hamburger.id = 'mobile-menu-toggle';
      hamburger.setAttribute('aria-label', 'Menu');
      hamburger.innerHTML = '☰';
      document.body.appendChild(hamburger);
    }

    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // 3. Toggle function (explicit and reliable)
    function toggleSidebar(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      sidebar.classList.toggle('open');
    }

    // 4. Attach event listeners – use both click and touch for reliability
    hamburger.addEventListener('click', toggleSidebar);
    hamburger.addEventListener('touchstart', toggleSidebar, { passive: false });

    // 5. Close sidebar when clicking outside (on mobile only)
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      }
    });
    document.addEventListener('touchstart', function(e) {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      }
    }, { passive: true });

    // 6. Close sidebar when a navigation link is clicked
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('open');
        }
      });
    });

    // 7. Ensure sidebar resets when resizing above mobile
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
      }
    });

    // 8. Fix viewport height for mobile browsers
    function setVH() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // 9. Make sure Oneko doesn't block taps
    const oneko = document.getElementById('oneko');
    if (oneko) {
      oneko.style.pointerEvents = 'none';
      oneko.style.zIndex = '9999';
    }

    // 10. Log to confirm script ran (optional, remove in production)
    console.log('✅ Mobile toggle initialized – click the ☰ button');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

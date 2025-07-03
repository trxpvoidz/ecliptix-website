
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('show');
    page.style.display = 'none';
  });
  const page = document.getElementById(pageId + '-page');
  page.style.display = 'block';
  setTimeout(() => page.classList.add('show'), 10);
  runTypewriter(pageId);
}

function runTypewriter(page) {
  const texts = {
    home: "A community for skin creators!",
    about: "Supporting artists since 2025",
    preview: "Stay tuned for updates!"
  };
  const el = document.getElementById('typewriter' + (page==='home'?'':'-'+page));
  if (!el) return;
  el.innerHTML = "";
  let i = 0;
  (function type() {
    if (i < texts[page].length) {
      el.innerHTML += texts[page].charAt(i);
      i++;
      setTimeout(type, 60);
    }
  })();
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => observer.observe(section));

window.onload = () => showPage('home');

// Ultimate low graphics detection: reduced motion, old browsers, ?lowgraphics, low memory or CPU
if (
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  !('IntersectionObserver' in window) ||
  location.search.includes("lowgraphics") ||
  (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
  (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2)
) {
  document.body.classList.add("reduced");

  const banner = document.createElement("div");
  banner.className = "performance-banner";
  banner.innerText = "⚡ Low graphics mode activated to improve performance.";
  document.body.prepend(banner);
}

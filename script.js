let typewriterTimeout = null;

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('show');
    page.style.display = 'none';
  });
  const page = document.getElementById(pageId + '-page');
  if (!page) return;
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
  if (!el || !texts[page]) return;

  // stop previous typing
  if (typewriterTimeout) clearTimeout(typewriterTimeout);

  el.innerHTML = "";
  let i = 0;

  function type() {
    if (i < texts[page].length) {
      el.innerHTML += texts[page].charAt(i);
      i++;
      typewriterTimeout = setTimeout(type, 60);
    }
  }
  type();
}

// Fade in sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => observer.observe(section));

window.onload = () => showPage('home');

if (
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  !('IntersectionObserver' in window) ||
  location.search.includes("lowgraphics")
) {
  document.body.classList.add("reduced");
  const banner = document.createElement("div");
  banner.className = "performance-banner";
  banner.innerText = "⚡ Low graphics mode activated to improve performance.";
  document.body.prepend(banner);
}


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

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

function loadNews() {
  fetch('news.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('news-container');
      container.innerHTML = "";
      data.slice().reverse().forEach(item => {
        const section = document.createElement('section');
        section.innerHTML = `<h2>${item.title}</h2><p><strong>${item.date}</strong></p><p>${item.message}</p>`;
        container.appendChild(section);
        observer.observe(section);
      });
    })
    .catch(() => {
      document.getElementById('news-container').innerHTML = "<p>Couldn't load news.</p>";
    });
}
window.onload = () => loadNews();
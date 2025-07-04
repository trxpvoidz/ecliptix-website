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
        let content = `<h2>${item.title}</h2><p><strong>${item.date}</strong></p><p>${item.message}</p>`;
        
        if (item.attachment) {
          if (item.attachment.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            content += `<img src="${item.attachment}" style="max-width:100%; margin-top:1em;" />`;
          } else if (item.attachment.match(/\.(mp4|webm)$/i)) {
            content += `<video controls style="max-width:100%; margin-top:1em;"><source src="${item.attachment}"></video>`;
          } else if (item.attachment.includes("youtube.com/embed")) {
            content += `<iframe width="560" height="315" src="${item.attachment}" frameborder="0" allowfullscreen style="margin-top:1em;"></iframe>`;
          }
        }
        
        section.innerHTML = content;
        container.appendChild(section);
        observer.observe(section);
      });
    })
    .catch(() => {
      document.getElementById('news-container').innerHTML = "<p>Couldn't load news.</p>";
    });
}
window.onload = () => loadNews();
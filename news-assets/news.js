
fetch('news.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('news-container');
    data.slice().reverse().forEach(item => {
      const section = document.createElement('section');
      let html = `<h2>${item.title}</h2><p><strong>${item.date}</strong></p><p>${item.message || ''}</p>`;
      if (item.image) {
        html += `<img src="news-assets/${item.image}" alt="${item.title} image" style="max-width:100%; margin-top:1rem;">`;
      }
      if (item.video) {
        html += `<video controls style="max-width:100%; margin-top:1rem;"><source src="news-assets/${item.video}" type="video/mp4"></video>`;
      }
      if (item.youtube) {
        const ytId = item.youtube.split("v=")[1] || item.youtube.split("/").pop();
        html += `<iframe width="300" height="169" src="https://www.youtube.com/embed/${ytId}" frameborder="0" allowfullscreen style="margin-top:1rem;"></iframe>`;
      }
      section.innerHTML = html;
      container.appendChild(section);
    });
    document.querySelectorAll('section').forEach(s => observer.observe(s));
  });


fetch('news.json')
  .then(res => res.json())
  .then(news => {
    const container = document.getElementById('news-container');
    news.forEach(item => {
      const section = document.createElement('section');
      section.innerHTML = `<h2>${item.title}</h2><p><strong>${item.date}</strong></p><p>${item.content}</p>`;
      if (item.attachment) {
        section.innerHTML += `<img src="${item.attachment}" alt="${item.title} image" style="max-width:100%;border-radius:8px;">`;
      }
      container.appendChild(section);
    });
  });

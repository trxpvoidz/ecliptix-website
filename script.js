
function typeWriterText(elementId, text) {
  let i = 0;
  const el = document.getElementById(elementId);
  el.innerHTML = "";
  function type() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 75);
    }
  }
  type();
}
function resetFadeIn() {
  document.querySelectorAll('section').forEach(section => {
    section.classList.remove('visible');
    setTimeout(() => section.classList.add('visible'), 100);
  });
}
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById(pageId + '-page').style.display = 'block';
  window.scrollTo(0,0);
  resetFadeIn();
  if (pageId === 'home') typeWriterText('typewriter', "A community for skin creators!");
  if (pageId === 'about') typeWriterText('typewriter-about', "Learn more about who we are and what drives us.");
  if (pageId === 'preview') typeWriterText('typewriter-preview', "Sneak peeks of upcoming content!");
}
typeWriterText('typewriter', "A community for skin creators!");
resetFadeIn();

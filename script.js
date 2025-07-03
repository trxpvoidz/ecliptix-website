
function showPage(page) {
  document.querySelectorAll('.page').forEach(el => el.style.display = 'none');
  document.getElementById(page + '-page').style.display = 'block';
  typewriters[page]();
}
const typewriters = {
  home: () => typeIt('typewriter', "A community for skin creators!"),
  about: () => typeIt('typewriter-about', "Supporting artists since 2025"),
  preview: () => typeIt('typewriter-preview', "Stay tuned for updates!")
};
function typeIt(id, text) {
  const el = document.getElementById(id);
  el.innerHTML = '';
  let i = 0;
  (function type() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 50);
    }
  })();
}
window.onload = () => typewriters['home']();

// Example from your GitHub - including fade, mobile optimization, performance detection
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(section => observer.observe(section));

  // Performance / reduced motion fallback
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !('IntersectionObserver' in window)) {
    document.body.classList.add("reduced");
  }
});
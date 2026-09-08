// FORME ART — gedeelde scripts voor alle pagina's.

// Mobiel menu (alleen aanwezig op index.html).
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Close' : 'Menu';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
  }));
}

// Elementen met .reveal laten infaden zodra ze in beeld komen.
const revealTargets = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('is-visible'));
}

// Jaartal in de footer (index.html gebruikt #year, artwork-pagina's .year).
const year = String(new Date().getFullYear());
document.querySelectorAll('#year, .year').forEach(el => { el.textContent = year; });

// Ontbrekende afbeeldingen: toon een nette placeholder in plaats van een kapot icoon.
document.querySelectorAll('img').forEach(img => {
  const markMissing = () => img.classList.add('img-missing');
  if (img.complete && img.naturalWidth === 0) markMissing();
  else img.addEventListener('error', markMissing, { once: true });
});

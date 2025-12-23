// Smooth scrolling for anchor links (keeps GitHub Pages friendly)
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');

if (navToggle && navMenu) {
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const expanded = navMenu.classList.contains('open') ? 'true' : 'false';
    navToggle.setAttribute('aria-expanded', expanded);
  });

  // Close mobile menu after selection
  navMenu.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Contact form placeholder handler
// NOTE: On GitHub Pages there is no backend. When you add a backend or a form provider,
// replace this with a real POST request.
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    alert(`Thanks, ${name}! We will reply within one business day.`);
    form.reset();
  });
}

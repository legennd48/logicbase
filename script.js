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

// Contact form mailto handler for the static GitHub Pages site.
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const intent = data.get('intent');
    const message = data.get('message');
    const subject = `Logicbase enquiry: ${intent === 'learning' ? 'Learning & Education' : intent === 'software' ? 'Software Development' : 'Learning and Software'}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Interest: ${intent}`,
      '',
      'Message:',
      message
    ].join('\n');
    const mailto = `mailto:admin@baselogic.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });
}

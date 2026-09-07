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

// Intersection Observer for fade-in animations and active nav links
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Fade in animations
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Active nav state
        const id = entry.target.getAttribute('id');
        if (id) {
          navItems.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      }
    });
  },
  { threshold: 0.12 }
);

sections.forEach((section) => {
  const reveals = section.querySelectorAll('.reveal');
  reveals.forEach((el) => observer.observe(el));
  observer.observe(section);
});

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  // Check local storage or system preference
  const currentTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });
}

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

    // Simulate success to prevent navigating away and to improve UX.
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Opening mail client...';
    btn.disabled = true;
    
    setTimeout(() => {
        window.location.href = mailto;
        setTimeout(() => {
            btn.textContent = 'Message Ready!';
            btn.classList.add('btn-primary');
            form.reset();
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 3000);
        }, 1000);
    }, 500);
  });
}

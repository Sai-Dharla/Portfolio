// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navHamburger = document.getElementById('navHamburger');
const themeToggle = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('.nav-link');

// ===== MOBILE MENU TOGGLE =====
navHamburger.addEventListener('click', () => {
  navHamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navHamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navHamburger.contains(e.target)) {
    navHamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// ===== THEME TOGGLE =====
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function getStoredTheme() {
  return localStorage.getItem('theme') || 'dark';
}

// Initialize theme
setTheme(getStoredTheme());

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// ===== ACTIVE NAV LINK ON SCROLL =====
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// ===== CONTACT FORM VALIDATION (front-end demo only — no backend) =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setFieldError(field, message) {
  const errorEl = field.closest('.form-group').querySelector('.form-error');
  if (message) {
    field.classList.add('invalid');
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  } else {
    field.classList.remove('invalid');
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }
}

function validateField(field) {
  const value = field.value.trim();

  if (field.name === 'name' && !value) {
    setFieldError(field, 'Please enter your name.');
    return false;
  }
  if (field.name === 'email') {
    if (!value) {
      setFieldError(field, 'Please enter your email.');
      return false;
    }
    if (!emailPattern.test(value)) {
      setFieldError(field, 'Please enter a valid email address.');
      return false;
    }
  }
  if (field.name === 'subject' && !value) {
    setFieldError(field, 'Please enter a subject.');
    return false;
  }
  if (field.name === 'message') {
    if (!value) {
      setFieldError(field, 'Please enter your message.');
      return false;
    }
    if (value.length < 10) {
      setFieldError(field, 'Message must be at least 10 characters.');
      return false;
    }
  }

  setFieldError(field, '');
  return true;
}

if (contactForm) {
  // Validate on blur; re-validate live once a field has an error
  contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('invalid')) validateField(field);
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) return;

    // Front-end demo only — no backend or email sending is connected yet.
    formStatus.classList.remove('success');
    void formStatus.offsetWidth; // restart in case of repeated submits
    formStatus.textContent = 'Thank you! Your message has been validated successfully. (Demo only — no backend is connected yet.)';
    formStatus.classList.add('success');
    contactForm.reset();
  });
}


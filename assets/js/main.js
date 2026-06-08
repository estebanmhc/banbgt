/* =============================================
   BAN — Script
   ============================================= */

// --- Header scroll effect ---
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });


// --- Hamburger / Mobile menu ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-menu__link');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
});


// --- Scroll reveal ---
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));


// --- Newsletter ---
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('.newsletter__input');
  const btn   = e.target.querySelector('.newsletter__btn');
  const email = input.value.trim();

  if (!email) return;

  btn.textContent = '¡Listo!';
  btn.style.background = '#6B747C';
  input.value = '';
  input.placeholder = 'Te tendremos en cuenta 🖤';
  input.disabled = true;
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Suscribirse';
    btn.style.background = '';
    input.placeholder = 'tucorreo@ejemplo.com';
    input.disabled = false;
    btn.disabled = false;
  }, 4000);
}


// --- Smooth anchor scroll offset (for fixed header) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


// --- Parallax subtle on hero image ---
const heroImg = document.querySelector('.hero__img');

if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroImg.style.transform = `translateY(${scrolled * 0.25}px)`;
    }
  }, { passive: true });
}
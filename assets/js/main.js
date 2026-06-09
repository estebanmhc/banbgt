/* =============================================
   BAN — Script
   ============================================= */

/* --------------------------------------------------
   1. HEADER — efecto scroll
-------------------------------------------------- */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });


/* --------------------------------------------------
   2. MENÚ HAMBURGUESA
   Correcciones:
   - Se usa un flag "isOpen" para evitar estados dobles
   - El body.overflow se gestiona correctamente
   - Los enlaces del menú cierran el menú antes de navegar
   - Se cierra también con la tecla Escape
-------------------------------------------------- */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-menu__link');

let menuOpen = false;

function openMenu() {
  menuOpen = true;
  header.classList.add('menu-open');
  mobileMenu.classList.add('open');
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menuOpen = false;
  header.classList.remove('menu-open');
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (menuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Cerrar al hacer clic en cualquier enlace del menú
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

// Cerrar con la tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen) closeMenu();
});


/* --------------------------------------------------
   3. SCROLL REVEAL
-------------------------------------------------- */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));


/* --------------------------------------------------
   4. NEWSLETTER
-------------------------------------------------- */
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


/* --------------------------------------------------
   5. SCROLL SUAVE con offset del header fijo
-------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return; // ignorar "#" vacíos
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const headerH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h')
    ) || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* --------------------------------------------------
   6. PARALLAX SUAVE en hero
-------------------------------------------------- */
const heroImg = document.querySelector('.hero__img');

if (heroImg) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroImg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    }
  }, { passive: true });
}


/* --------------------------------------------------
   7. MODAL DE PRODUCTO
   Correcciones:
   - Se usa visibility en lugar de sólo opacity
   - Se cierra con Escape y clic en overlay
   - El scroll del body se bloquea correctamente
   - Los thumbnails se limpian antes de cada apertura
-------------------------------------------------- */
const products = {
  camisa1: {
    title: 'Camisa Blanca Diamante',
    price: '$90.000 COP',
    description: 'Camiseta premium de algodón de silueta oversize amplia y caída natural. Estampada con la frase: "Aprendí que no todo lo que brilla es VVS".',
    images: [
      'assets/img/products/camisa1/coleccion1_0000s_0000_Mesa-de-trabajo-8.png',
      'assets/img/products/camisa1/coleccion1_0000s_0002_Mesa-de-trabajo-6.png',
      'assets/img/products/camisa1/coleccion1_0000s_0005_Mesa-de-trabajo-3.png',
      'assets/img/products/camisa1/coleccion1_0000s_0007_Mesa-de-trabajo-1.png',
    ],
  },
  camisa2: {
    title: 'Camisa Negra Diamante',
    price: '$90.000 COP',
    description: 'Camiseta premium de algodón de silueta oversize amplia y caída natural. Estampada con la frase: "Aprendí que no todo lo que brilla es VVS".',
    images: [
      'assets/img/products/camisa2/coleccion1_0000s_0001_Mesa-de-trabajo-7.png',
      'assets/img/products/camisa2/coleccion1_0000s_0003_Mesa-de-trabajo-5.png',
      'assets/img/products/camisa2/coleccion1_0000s_0004_Mesa-de-trabajo-4.png',
      'assets/img/products/camisa2/coleccion1_0000s_0006_Mesa-de-trabajo-2.png',
    ],
  },
  camisa3: {
    title: 'Camisa Blanca Reloj',
    price: '$90.000 COP',
    description: 'Camiseta premium de algodón de silueta oversize amplia y caída natural. Estampada con la frase: "Me pediste un reloj y yo perdiendo mi tiempo".',
    images: [
      'assets/img/products/camisa3/coleccion1_0000s_0008_Mesa-de-trabajo-6.png',
      'assets/img/products/camisa3/coleccion1_0000s_0010_Mesa-de-trabajo-4.png',
      'assets/img/products/camisa3/coleccion1_0000s_0012_Mesa-de-trabajo-2.png',
    ],
  },
  camisa4: {
    title: 'Camisa Negra Reloj',
    price: '$90.000 COP',
    description: 'Camiseta premium de algodón de silueta oversize amplia y caída natural. Estampada con la frase: "Me pediste un reloj y yo perdiendo mi tiempo".',
    images: [
      'assets/img/products/camisa4/coleccion1_0000s_0009_Mesa-de-trabajo-5.png',
      'assets/img/products/camisa4/coleccion1_0000s_0011_Mesa-de-trabajo-3.png',
      'assets/img/products/camisa4/coleccion1_0000s_0013_Mesa-de-trabajo-1.png',
      'assets/img/products/camisa4/coleccion1_0000s_0014_Mesa-de-trabajo-7.png',
    ],
  },
};

const modal          = document.getElementById('productModal');
const modalImage     = document.getElementById('modalMainImage');
const modalThumbs    = document.getElementById('modalThumbs');
const modalTitle     = document.getElementById('modalTitle');
const modalPrice     = document.getElementById('modalPrice');
const modalDesc      = document.getElementById('modalDescription');
const closeModalBtn  = document.getElementById('closeModal');
const modalOverlay   = document.querySelector('.product-modal__overlay');

function openModal(productKey) {
  const product = products[productKey];
  if (!product) return;

  // Poblar info
  modalTitle.textContent = product.title;
  modalPrice.textContent = product.price;
  modalDesc.textContent  = product.description;

  // Imagen principal
  modalImage.src = product.images[0];
  modalImage.alt = product.title;

  // Limpiar y crear miniaturas
  modalThumbs.innerHTML = '';
  product.images.forEach((src, i) => {
    const thumb = document.createElement('img');
    thumb.src = src;
    thumb.alt = `${product.title} — vista ${i + 1}`;
    if (i === 0) thumb.classList.add('active');

    thumb.addEventListener('click', () => {
      modalImage.src = src;
      modalThumbs.querySelectorAll('img').forEach(img => img.classList.remove('active'));
      thumb.classList.add('active');
    });

    modalThumbs.appendChild(thumb);
  });

  // Mostrar modal
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

// Abrir al hacer clic en la tarjeta
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    openModal(card.dataset.product);
  });
});

// Cerrar con botón ×
closeModalBtn.addEventListener('click', closeModal);

// Cerrar al hacer clic en el overlay
modalOverlay.addEventListener('click', closeModal);

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});
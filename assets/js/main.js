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

/* ==================================
   PRODUCT MODAL
================================== */

const products = {

  camisa1: {
  title: "Camisa Blanca Diamante",
  price: "$90.000 COP",
  description:
    'Camiseta premium de algodón de silueta oversize amplia y caída natural. Estampada con la frase: "Aprendí que no todo lo que brilla es VVS".',

    images: [
      "assets/img/products/camisa1/coleccion1_0000s_0000_Mesa-de-trabajo-8.png",
      "assets/img/products/camisa1/coleccion1_0000s_0002_Mesa-de-trabajo-6.png",
      "assets/img/products/camisa1/coleccion1_0000s_0005_Mesa-de-trabajo-3.png",
      "assets/img/products/camisa1/coleccion1_0000s_0007_Mesa-de-trabajo-1.png"
    ]
  },

  camisa2: {
  title: "Camisa Negra Diamante",
  price: "$90.000 COP",
  description:
    'Camiseta premium de algodón de silueta oversize amplia y caída natural. Estampada con la frase: "Aprendí que no todo lo que brilla es VVS".',

    images: [
      "assets/img/products/camisa2/coleccion1_0000s_0001_Mesa-de-trabajo-7.png",
      "assets/img/products/camisa2/coleccion1_0000s_0003_Mesa-de-trabajo-5.png",
      "assets/img/products/camisa2/coleccion1_0000s_0004_Mesa-de-trabajo-4.png",
      "assets/img/products/camisa2/coleccion1_0000s_0006_Mesa-de-trabajo-2.png"
    ]
  },

 camisa3: {
  title: "Camisa Blanca Reloj",
  price: "$90.000 COP",
  description:
    'Camiseta premium de algodón de silueta oversize amplia y caída natural. Estampada con la frase: "Me pediste un reloj y yo perdiendo mi tiempo".',

    images: [
      "assets/img/products/camisa3/coleccion1_0000s_0008_Mesa-de-trabajo-6.png",
      "assets/img/products/camisa3/coleccion1_0000s_0010_Mesa-de-trabajo-4.png",
      "assets/img/products/camisa3/coleccion1_0000s_0012_Mesa-de-trabajo-2.png"
    ]
  },

  camisa4: {
  title: "Camisa Negra Reloj",
  price: "$90.000 COP",
  description:
    'Camiseta premium de algodón de silueta oversize amplia y caída natural. Estampada con la frase: "Me pediste un reloj y yo perdiendo mi tiempo".',
    images: [
      "assets/img/products/camisa4/coleccion1_0000s_0009_Mesa-de-trabajo-5.png",
      "assets/img/products/camisa4/coleccion1_0000s_0011_Mesa-de-trabajo-3.png",
      "assets/img/products/camisa4/coleccion1_0000s_0013_Mesa-de-trabajo-1.png",
      "assets/img/products/camisa4/coleccion1_0000s_0014_Mesa-de-trabajo-7.png"
    ]
  }

};

const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalMainImage");
const modalThumbs = document.getElementById("modalThumbs");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");

document.querySelectorAll(".product-card").forEach(card => {

  card.addEventListener("click", () => {

    const productKey = card.dataset.product;

    const product = products[productKey];

    modalTitle.textContent = product.title;
    modalPrice.textContent = product.price;
    modalDescription.textContent = product.description;

    modalImage.src = product.images[0];

    modalThumbs.innerHTML = "";

    product.images.forEach(image => {

      const thumb = document.createElement("img");

      thumb.src = image;

      thumb.addEventListener("click", () => {
        modalImage.src = image;
      });

      modalThumbs.appendChild(thumb);

    });

    modal.classList.add("active");

    document.body.classList.add("modal-open");

  });

});

document
  .querySelector(".product-modal__overlay")
  .addEventListener("click", closeModal);

document
  .getElementById("closeModal")
  .addEventListener("click", closeModal);

function closeModal() {

  modal.classList.remove("active");

  document.body.classList.remove("modal-open");

}

thumb.addEventListener("click", () => {

  modalImage.src = image;

  document
    .querySelectorAll(".product-modal__thumbs img")
    .forEach(img => img.classList.remove("active"));

  thumb.classList.add("active");

});

if(modalThumbs.firstChild){
  modalThumbs.firstChild.classList.add("active");
}
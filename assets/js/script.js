document.addEventListener('DOMContentLoaded', function () {

  // =========================
  // Menu hambúrguer
  // =========================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    window.toggleMenu = function () {
      mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    };

    document.addEventListener('click', function (event) {
      const isClickInside = hamburger.contains(event.target) || mobileMenu.contains(event.target);
      if (!isClickInside) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }

  // =========================
  // Igualar altura dos cards
  // =========================
  function igualarAlturaDosCards() {
    const cards = document.querySelectorAll('.card');
    let maxHeight = 0;

    cards.forEach(card => {
      card.style.height = 'auto';
    });

    cards.forEach(card => {
      const height = card.offsetHeight;
      if (height > maxHeight) maxHeight = height;
    });

    cards.forEach(card => {
      card.style.height = maxHeight + 'px';
    });
  }

  window.addEventListener('load', igualarAlturaDosCards);
  window.addEventListener('resize', igualarAlturaDosCards);

  // =========================
  // Menu toggle (se existir)
  // =========================
  const toggleBtn = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  // =========================
  // Rolagem suave no menu
  // =========================
  const linksMenu = document.querySelectorAll('nav a');

  linksMenu.forEach(link => {
    link.addEventListener('click', function (e) {
      const destino = document.querySelector(this.getAttribute('href'));
      if (destino) {
        e.preventDefault();
        destino.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // =========================
  // Botão voltar ao topo
  // =========================
  const scrollToTopBtn = document.getElementById("scrollToTop");

  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

});

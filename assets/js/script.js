// ==================== MENU HAMBURGER ====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu() {
  mobileMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
}

document.addEventListener('click', function (event) {
  const isClickInside = hamburger.contains(event.target) || mobileMenu.contains(event.target);
  if (!isClickInside) {
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

// ==================== IGUALAR ALTURA DOS CARDS ====================
function igualarAlturaDosCards() {
  const cards = document.querySelectorAll('.card');
  let maxHeight = 0;
  cards.forEach(card => card.style.height = 'auto');
  cards.forEach(card => {
    const height = card.offsetHeight;
    if (height > maxHeight) maxHeight = height;
  });
  cards.forEach(card => card.style.height = maxHeight + 'px');
}

window.addEventListener('load', igualarAlturaDosCards);
window.addEventListener('resize', igualarAlturaDosCards);

// ==================== MENU DESKTOP ====================
const toggleBtn = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

// ==================== SCROLL SUAVE COM LENIS ====================
const lenis = new Lenis({
  duration: 0.5, // quanto maior, mais lento
  easing: t => t, // linear
  smooth: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Links do menu
// Links com scroll suave (menu e botões)
document.addEventListener('DOMContentLoaded', function () {
  const linksSuaves = document.querySelectorAll('a[href^="#"]'); // pega todos os links âncora

  linksSuaves.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const destino = document.querySelector(this.getAttribute('href'));
      if (destino) {
        lenis.scrollTo(destino);
      }
    });
  });
});


// ==================== BOTÃO VOLTAR AO TOPO ====================
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
    lenis.scrollTo(0); // usa o Lenis também
  });
}


//! Formulário
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault(); // Impede recarregamento da página
  
  const form = e.target;
  const message = document.getElementById("formMessage");

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      message.style.display = "block";
      message.style.color = "green";
      message.textContent = "Mensagem enviada com sucesso!";
      form.reset();
    } else {
      message.style.display = "block";
      message.style.color = "red";
      message.textContent = "Ocorreu um erro ao enviar. Tente novamente.";
    }
  } catch (error) {
    message.style.display = "block";
    message.style.color = "red";
    message.textContent = "Erro de conexão. Tente mais tarde.";
  }
});
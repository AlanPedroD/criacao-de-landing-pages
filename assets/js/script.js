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

const menuLinks = mobileMenu.querySelectorAll('a[href^="#"]');

menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Evita o salto imediato

    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });

      // Fecha o menu depois da rolagem (tempo ajustável)
      setTimeout(() => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }, 500); // 0.5s funciona bem, mas você pode ajustar
    }
  });
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
  const linksSuaves = document.querySelectorAll('a[href^="#"]');

  linksSuaves.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const destino = document.querySelector(this.getAttribute('href'));
      if (destino) {
        const offset = 60; // altura do cabeçalho fixo
        const topPos = destino.getBoundingClientRect().top + window.scrollY - offset;

        lenis.scrollTo(topPos);
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
const form = document.getElementById("contactForm");
const inputs = form.querySelectorAll("input, textarea");

const nomesCurtosValidos = ["Jo", "Jó", "Li", "Lu", "Bo", "Di", "Su", "An"];

function validarNome(nome) {
  const nomeTrim = nome.trim();
  const soLetras = /^[A-Za-zÀ-ÿ\s]+$/.test(nomeTrim);

  if (!soLetras) return false;

  const semEspacos = nomeTrim.replace(/\s+/g, '');

  // Nome com 3 ou mais letras é aceito
  if (semEspacos.length >= 3) return true;

  // Se tiver menos de 3 letras, só aceita se estiver na lista
  return nomesCurtosValidos.some(n => n.toLowerCase() === nomeTrim.toLowerCase());
}

function validateField(field) {
  let isValid = true;

  if (field.name === "name") {
    isValid = validarNome(field.value);
  } 
  else if (field.type === "email") {
    isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
  } 
  else {
    isValid = field.value.trim().length >= (field.getAttribute("minlength") || 1);
  }

  field.classList.remove("valid", "invalid");
  if (field.classList.contains("touched")) {
    field.classList.add(isValid ? "valid" : "invalid");
  }

  return isValid;
}

inputs.forEach(input => {
  input.addEventListener("input", () => {
    input.classList.add("touched");
    validateField(input);
  });
  input.addEventListener("blur", () => {
    input.classList.add("touched");
    validateField(input);
  });
});

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  let allValid = true;
  inputs.forEach(input => {
    input.classList.add("touched");
    if (!validateField(input)) {
      allValid = false;
    }
  });

  if (!allValid) {
    alert("Por favor, preencha todos os campos corretamente antes de enviar.");
    return;
  }

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert("Mensagem enviada com sucesso!");
      form.reset();
      inputs.forEach(input => input.classList.remove("touched", "valid", "invalid"));
    } else {
      alert("Ocorreu um erro ao enviar. Tente novamente.");
    }
  } catch (error) {
    alert("Erro de conexão. Tente mais tarde.");
  }
});


function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 50;

    if (elementTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", revealOnScroll);

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu() {
  mobileMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
}

document.addEventListener('click', function(event) {
  const isClickInside = hamburger.contains(event.target) || mobileMenu.contains(event.target);
  if (!isClickInside) {
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }
});


function igualarAlturaDosCards() {
  const cards = document.querySelectorAll('.card');
  let maxHeight = 0;

  // Resetar altura para medir corretamente
  cards.forEach(card => {
    card.style.height = 'auto';
  });

  // Encontrar o maior card
  cards.forEach(card => {
    const height = card.offsetHeight;
    if (height > maxHeight) maxHeight = height;
  });

  // Aplicar a mesma altura a todos
  cards.forEach(card => {
    card.style.height = maxHeight + 'px';
  });
}

window.addEventListener('load', igualarAlturaDosCards);
window.addEventListener('resize', igualarAlturaDosCards);

const toggleBtn = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

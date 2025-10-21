document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      // Alterna o estado do menu (aberto/fechado)
      mainNav.classList.toggle("nav-open");

      // Alterna o estado do botão (hamburger/X)
      navToggle.classList.toggle("is-active");

      // Atualiza o ARIA para acessibilidade
      const isExpanded = mainNav.classList.contains("nav-open");
      navToggle.setAttribute("aria-expanded", isExpanded);

      // Trava/destrava o scroll do body
      document.body.classList.toggle("nav-lock-scroll");
    });
  }
});

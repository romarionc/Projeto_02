document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".carousel-container");
  const wrapper = document.querySelector(".carousel-wrapper");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const items = document.querySelectorAll(".grid-item");

  if (!container || !wrapper || !prevBtn || !nextBtn || items.length === 0) {
    console.error(
      "Elementos do carrossel não encontrados. O script não será executado."
    );
    return;
  }

  let currentIndex = 0;
  let itemsVisible = 1; // Valor inicial
  let totalSlides = items.length; // Valor inicial

  // --- FUNÇÃO PARA CALCULAR O LAYOUT ATUAL ---
  function calculateLayout() {
    // Pega a largura real do container e de um item do grid
    const containerWidth = container.offsetWidth;
    const itemWidth = items[0].offsetWidth;

    // Calcula quantos itens cabem na tela e arredonda para o número inteiro mais próximo
    itemsVisible = Math.round(containerWidth / itemWidth);

    // Recalcula o número total de "páginas" do carrossel
    totalSlides = Math.ceil(items.length / itemsVisible);

    // Garante que o slide atual não seja inválido após redimensionar
    if (currentIndex >= totalSlides) {
      currentIndex = totalSlides - 1;
    }

    updateCarousel();
  }

  // --- FUNÇÃO PARA MOVER O CARROSSEL ---
  function updateCarousel() {
    // A lógica de mover 100% continua funcionando, pois o CSS já ajustou o tamanho da "página"
    const offset = currentIndex * -100;
    wrapper.style.transform = `translateX(${offset}%)`;
  }

  // --- LÓGICA DOS BOTÕES ---
  nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= totalSlides) {
      currentIndex = 0; // Loop para o início
    }
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = totalSlides - 1; // Loop para o fim
    }
    updateCarousel();
  });

  // --- EVENTO PARA TORNAR RESPONSIVO ---
  // Adiciona um "ouvinte" que executa a função de cálculo sempre que a janela muda de tamanho
  window.addEventListener("resize", calculateLayout);

  // --- INICIALIZAÇÃO ---
  // Calcula o layout pela primeira vez quando a página carrega
  calculateLayout();
});

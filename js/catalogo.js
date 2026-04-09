function openModal(rio) {
   const modalId = rio;
   document.getElementById("modal-" + modalId).style.display = "flex";
   updateCarousel(modalId, 0); // Inicializar visibilidade das setas
}

function closeModal(rio) {
   document.getElementById("modal-" + rio).style.display = "none";
}

function prevImage(modalId) {
   const modal = document.getElementById("modal-" + modalId);
   const carouselImages = modal.querySelector('.carousel-images');
   const images = carouselImages.querySelectorAll('.carousel-image');
   const indicators = modal.querySelectorAll('.indicator');
   let currentIndex = Array.from(indicators).findIndex(ind => ind.classList.contains('active'));
   currentIndex = (currentIndex - 1 + images.length) % images.length;
   updateCarousel(modalId, currentIndex);
}

function nextImage(modalId) {
   const modal = document.getElementById("modal-" + modalId);
   const carouselImages = modal.querySelector('.carousel-images');
   const images = carouselImages.querySelectorAll('.carousel-image');
   const indicators = modal.querySelectorAll('.indicator');
   let currentIndex = Array.from(indicators).findIndex(ind => ind.classList.contains('active'));
   currentIndex = (currentIndex + 1) % images.length;
   updateCarousel(modalId, currentIndex);
}

function goToImage(modalId, index) {
   updateCarousel(modalId, index);
}

function updateCarousel(modalId, index) {
   const modal = document.getElementById("modal-" + modalId);
   const carouselImages = modal.querySelector('.carousel-images');
   const prevBtn = modal.querySelector('.carousel-btn.prev');
   const nextBtn = modal.querySelector('.carousel-btn.next');
   const indicatorsContainer = modal.querySelector('.carousel-indicators');
   const images = carouselImages.querySelectorAll('.carousel-image');

   // Limpar indicadores existentes
   indicatorsContainer.innerHTML = '';

   // Criar indicadores dinamicamente
   images.forEach((_, i) => {
      const indicator = document.createElement('span');
      indicator.classList.add('indicator');
      if (i === index) indicator.classList.add('active');
      indicator.onclick = () => goToImage(modalId, i);
      indicatorsContainer.appendChild(indicator);
   });

   carouselImages.style.transform = `translateX(-${index * 100}%)`;

   // Controlar visibilidade das setas e indicadores
   if (images.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      indicatorsContainer.style.display = 'none';
   } else {
      prevBtn.style.display = index === 0 ? 'none' : 'flex';
      nextBtn.style.display = index === images.length - 1 ? 'none' : 'flex';
      indicatorsContainer.style.display = 'flex';
   }
}
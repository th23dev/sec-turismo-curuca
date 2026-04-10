// ===== ZOOM NO MAPA =====
let mapScale = 1;
const minScale = 1;
const maxScale = 3;
const scaleStep = 0.2;

const mapContainer = document.getElementById('mapZoomContainer');
const mapImage = document.getElementById('map');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const zoomResetBtn = document.getElementById('zoomReset');

function updateMapTransform() {
   mapImage.style.transform = `scale(${mapScale})`;
}

function zoomIn() {
   if (mapScale < maxScale) {
      mapScale = Math.min(mapScale + scaleStep, maxScale);
      updateMapTransform();
   }
}

function zoomOut() {
   if (mapScale > minScale) {
      mapScale = Math.max(mapScale - scaleStep, minScale);
      updateMapTransform();
   }
}

function resetZoom() {
   mapScale = minScale;
   updateMapTransform();
}

// Botões de zoom
if (zoomInBtn) zoomInBtn.addEventListener('click', zoomIn);
if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOut);
if (zoomResetBtn) zoomResetBtn.addEventListener('click', resetZoom);

// Scroll wheel zoom
if (mapContainer) {
   mapContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
         zoomIn();
      } else {
         zoomOut();
      }
   }, { passive: false });
}

// Touch pinch zoom
let lastDistance = 0;
if (mapContainer) {
   mapContainer.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2) {
         const touch1 = e.touches[0];
         const touch2 = e.touches[1];
         const distance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
         );

         if (lastDistance > 0) {
            if (distance > lastDistance) {
               zoomIn();
            } else if (distance < lastDistance) {
               zoomOut();
            }
         }
         lastDistance = distance;
      }
   }, { passive: true });

   mapContainer.addEventListener('touchend', () => {
      lastDistance = 0;
   });
}

// ===== SWIPE NOS MODAIS - PASSAR IMAGENS =====
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;

function handleSwipe(modalId) {
   const diff = touchStartX - touchEndX;

   if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
         // Swipe para esquerda = próxima imagem
         nextImage(modalId);
      } else {
         // Swipe para direita = imagem anterior
         prevImage(modalId);
      }
   }
}

// Adicionar listeners de swipe aos modais
document.addEventListener('touchstart', (e) => {
   const modal = e.target.closest('.modal');
   if (modal) {
      touchStartX = e.changedTouches[0].clientX;
   }
}, false);

document.addEventListener('touchend', (e) => {
   const modal = e.target.closest('.modal');
   if (modal) {
      touchEndX = e.changedTouches[0].clientX;
      const modalId = modal.id.replace('modal-', '');
      handleSwipe(modalId);
   }
}, false);

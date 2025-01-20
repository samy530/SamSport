let currentIndex = 0;
let totalItems;

function setupCarousel() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    totalItems = items.length;

    // Ajouter des copies des éléments au début et à la fin pour créer un effet infini
    const firstItem = items[0].cloneNode(true);
    const lastItem = items[totalItems - 1].cloneNode(true);
    carousel.appendChild(firstItem);
    carousel.insertBefore(lastItem, items[0]);

    // Ajuster la largeur du carrousel en fonction du nombre d'éléments
    const itemWidth = items[0].offsetWidth;
    carousel.style.width = `${(totalItems + 2) * itemWidth}px`;

    // Déplacer le carrousel à la position initiale (le premier élément doit être visible)
    carousel.style.transform = `translateX(-${itemWidth}px)`;
}

function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth;

    // Calculer le nouvel index
    currentIndex += direction;

    // Appliquer la transformation pour déplacer le carrousel
    carousel.style.transition = 'transform 0.5s ease';
    carousel.style.transform = `translateX(-${(currentIndex + 1) * itemWidth}px)`; 

    // Si on atteint le dernier ou premier élément après le défilement, réinitialiser la position sans transition
    if (currentIndex === totalItems) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentIndex = 1;
            carousel.style.transform = `translateX(-${(currentIndex + 1) * itemWidth}px)`;
        }, 500); // Délai pour correspondre à la durée de la transition
    } else if (currentIndex === -1) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentIndex = totalItems - 2;
            carousel.style.transform = `translateX(-${(currentIndex + 1) * itemWidth}px)`;
        }, 500); // Délai pour correspondre à la durée de la transition
    }
}

// Initialiser le carrousel après le chargement de la page
window.onload = () => {
    setupCarousel();
};

// Boutons de navigation
document.querySelector('.carousel-btn.left').addEventListener('click', () => moveCarousel(-1));
document.querySelector('.carousel-btn.right').addEventListener('click', () => moveCarousel(1));

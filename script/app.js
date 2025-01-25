function mettreAJourCompteurPanier() {
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    const compteurElement = document.querySelector(".panier-compteur");
    if (compteurElement) {
        const totalArticles = panier.length; // Affiche simplement le nombre d'articles
        compteurElement.innerText = totalArticles;
    }
}

// Mettre à jour le compteur à l'initialisation
mettreAJourCompteurPanier();

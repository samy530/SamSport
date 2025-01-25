// Fonction pour afficher les produits du panier
function afficherPanier() {
    const cartItems = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    cartItems.innerHTML = '';
    let total = 0;

    panier.forEach((produit, index) => {
        const item = document.createElement('div');
        item.classList.add('cart-item');
        item.innerHTML = `
            <img src="${produit.image}" alt="${produit.nom}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${produit.nom}</h4>
                <p>Prix: ${produit.prix} €</p>
                <button class="remove" data-index="${index}">Supprimer</button>
            </div>
        `;
        cartItems.appendChild(item);
        total += produit.prix;
    });

    totalPriceElement.innerText = total.toFixed(2);
}

// Fonction pour supprimer un produit du panier
function removeProduct(index) {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    panier.splice(index, 1); // Supprime le produit à l'index donné
    localStorage.setItem('panier', JSON.stringify(panier));
    afficherPanier();
}

// Fonction pour vider le panier
function viderPanier() {
    localStorage.removeItem('panier');
    afficherPanier();
}

// Fonction pour passer à la page de commande
function passerCommande() {
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    if (panier.length === 0) {
        alert("Votre panier est vide !");
        return;
    }
    window.location.href = 'commande.html'; // Redirige vers la page de commande
}

// Afficher le panier au chargement de la page
window.onload = () => {
    afficherPanier();

    // Événements sur les boutons supprimer
    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeProduct(index);
        });
    });
};

// Ajouter un événement au bouton "Vider le panier"
document.querySelector('.clear-cart').addEventListener('click', viderPanier);

// Ajouter un événement au bouton "Commander"
document.querySelector('.order-cart').addEventListener('click', passerCommande);

const produits = [
    {
        id: 1,
        nom: "FC Barcelona 2024/2025 Staduim Domicile",
        prix: 99.99,
        description: "Maillot de foot replica Nike Dri-FIT pour homme",
        image: "../images/maillot_barça.webp"
    },
    {
        id: 2,
        nom: "Nike Air Max Alpha Trainer 6",
        prix: 67.49,
        description: "Chaussure d'entrainement pour homme",
        image: "../images/nike_airmaxalphatrainer6.webp"
    },
    {
        id: 3,
        nom: "Jordan Brooklyn Fleece",
        prix: 129.99,
        description: "Sweat à capuche et zip oversize pour homme",
        image: "../images/sweat_jordan.webp"
    },
    {
        id: 4,
        nom: "FC Barcelona 2024/2025 Staduim Domicile",
        prix: 99.99,
        description: "Maillot de foot replica Nike Dri-FIT pour homme",
        image: "../images/maillot_barça.webp"
    },
    {
        id: 5,
        nom: "Nike Air Max Alpha Trainer 6",
        prix: 67.49,
        description: "Chaussure d'entrainement pour homme",
        image: "../images/nike_airmaxalphatrainer6.webp"
    },
    {
        id: 6,
        nom: "Jordan Brooklyn Fleece",
        prix: 129.99,
        description: "Sweat à capuche et zip oversize pour homme",
        image: "../images/sweat_jordan.webp"
    }
];

// Fonction pour afficher les produits
function genererProduits(produits) {
    const sectionCards = document.querySelector(".cards");
    sectionCards.innerHTML = '';  // Clear previous products

    if (produits.length === 0) {
        // Afficher un message si aucun produit n'est trouvé
        const message = document.createElement("p");
        message.classList.add("no-results");
        message.innerText = "Malheureusement, aucun produit ne correspond à votre recherche ou filtre.";
        sectionCards.appendChild(message);
        return;
    }

    produits.forEach(produit => {
        const article = document.createElement("article");

        const imageElement = document.createElement("img");
        imageElement.src = produit.image;
        imageElement.classList.add("product-image");

        const nomElement = document.createElement("h4");
        nomElement.innerText = produit.nom;

        const prixElement = document.createElement("h6");
        prixElement.innerText = `Prix: ${produit.prix} €`;

        const descElement = document.createElement("p");
        descElement.innerText = produit.description;

        const buttonElement = document.createElement("a");
        buttonElement.classList.add("cta-button");
        buttonElement.innerText = "Ajouter au panier";
        // Modifie le lien pour inclure l'ID du produit
        buttonElement.href = `#`;

        article.appendChild(imageElement);
        article.appendChild(nomElement);
        article.appendChild(prixElement);
        article.appendChild(descElement);
        article.appendChild(buttonElement);

        sectionCards.appendChild(article);
    });
}

// Fonction de recherche
document.querySelector("#search").addEventListener("input", function () {
    const recherche = this.value.toLowerCase();
    const produitsFiltrés = produits.filter(produit => produit.nom.toLowerCase().includes(recherche) || produit.description.toLowerCase().includes(recherche));
    genererProduits(produitsFiltrés);
});

// Trier les produits par prix croissant
document.querySelector(".btn-trier").addEventListener("click", function () {
    const produitsTriés = [...produits].sort((a, b) => a.prix - b.prix);
    genererProduits(produitsTriés);
});

// Trier les produits par prix décroissant
document.querySelector(".btn-decroissant").addEventListener("click", function () {
    const produitsTriés = [...produits].sort((a, b) => b.prix - a.prix);
    genererProduits(produitsTriés);
});

// Filtrer les produits de moins de 50€
document.querySelector(".btn-filtrer").addEventListener("click", function () {
    const produitsFiltrés = produits.filter(produit => produit.prix < 50);
    genererProduits(produitsFiltrés);
});

// Afficher tous les produits
document.querySelector(".btn-main").addEventListener("click", function () {
    genererProduits(produits);
});

// Afficher initialement tous les produits
genererProduits(produits);

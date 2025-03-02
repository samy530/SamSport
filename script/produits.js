const produits = [
    {
        id: 1,
        nom: "FC Barcelona 2024/2025 Staduim Domicile",
        prix: 99.99,
        description: "Maillot de foot replica Nike Dri-FIT pour homme",
        image: "../images/maillot_barça.jpg"
    },
    {
        id: 2,
        nom: "Nike Air Max Alpha Trainer 6",
        prix: 67.49,
        description: "Chaussure d'entrainement pour homme",
        image: "../images/nike_airmaxalphatrainer6.jpg"
    },
    {
        id: 3,
        nom: "Jordan Brooklyn Fleece",
        prix: 129.99,
        description: "Sweat à capuche et zip oversize pour homme",
        image: "../images/sweat_jordan.jpg"
    },
    {
        id: 4,
        nom: "Maillot Domicile Aston Villa FC 24/25",
        prix: 100.00,
        description: "Un maillot domicile de l'Aston Villa FC dédié aux plus grands fans du club, conçu en matières recyclées.",
        image: "../images/aston_villa_maillot_2025.png"
    },
    {
        id: 5,
        nom: "T-shirt Club Tennis Enfants",
        prix: 25.00,
        description: "Un t-shirt de tennis ras-du-cou qui te garde au frais, au sec et prêt à tout.",
        image: "../images/tshirt_tennis_enfant.png"
    },
    {
        id: 6,
        nom: "Chaussure Campus 00s",
        prix: 120.00,
        description: "Une Campus qui fait évoluer l'héritage.",
        image: "../images/chaussure_campus_00s_femme.png"
    },
    {
        id: 7,
        nom: "Nike Dri-FIT Club",
        prix: 24.99,
        description: "Casquette Swoosh avec structure",
        image: "../images/casquette_nike.jpg"
    },
    {
        id: 8,
        nom: "Nike ACG",
        prix: 74.99,
        description: "Serviette de running",
        image: "../images/serviette_nike_orange.jpg"
    },
    {
        id: 9,
        nom: "Nike Pegasus Premium",
        prix: 209.99,
        description: "Chaussure de running sur route pour femme",
        image: "../images/nike_pegasus_premium.jpg"
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
        buttonElement.href = "#"; // Bloque temporairement la redirection
        buttonElement.dataset.id = produit.id; // Ajouter l'ID du produit

        // Gestion de l'événement clic pour ajouter au panier
        buttonElement.addEventListener("click", function (e) {
            e.preventDefault(); // Empêche le comportement par défaut (redirection)

            // Récupérer l'ID du produit cliqué
            const produitId = parseInt(this.dataset.id, 10);

            // Ajouter le produit au panier
            ajouterAuPanier(produitId);

            // Mettre à jour le compteur du panier dans la navbar
            mettreAJourCompteurPanier();
        });

        article.appendChild(imageElement);
        article.appendChild(nomElement);
        article.appendChild(prixElement);
        article.appendChild(descElement);
        article.appendChild(buttonElement);

        sectionCards.appendChild(article);
    });
}

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(id) {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    const produit = produits.find(p => p.id === id);

    if (produit) {
        panier.push(produit);
        localStorage.setItem('panier', JSON.stringify(panier));
    }
}

// Fonction pour mettre à jour le compteur du panier dans la navbar
function mettreAJourCompteurPanier() {
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    const compteurElement = document.querySelector(".panier-compteur");
    compteurElement.innerText = panier.length;
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

// Initialisation
genererProduits(produits);
mettreAJourCompteurPanier(); // Met à jour le compteur du panier à l'initialisation

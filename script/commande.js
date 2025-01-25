// Fonction pour afficher les détails de la commande
function afficherCommande() {
    const orderDetails = document.querySelector('.order-details');
    const panier = JSON.parse(localStorage.getItem('panier')) || [];

    if (panier.length === 0) {
        orderDetails.innerHTML = "<p>Votre panier est vide !</p>";
        return;
    }

    let total = 0;
    panier.forEach(produit => {
        const item = document.createElement('div');
        item.innerHTML = `
            <img src="${produit.image}" alt="${produit.nom}" style="width: 50px; height: 50px; object-fit: cover;">
            <p>${produit.nom} - ${produit.prix} €</p>
        `;
        orderDetails.appendChild(item);
        total += produit.prix;
    });

    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<p>Total : ${total.toFixed(2)} €</p>`;
    orderDetails.appendChild(totalElement);
    // Storing the total value in a global variable to use it later in the invoice
    window.totalPrice = total;
}

// Fonction de paiement simulée
function processPayment(event) {
    event.preventDefault();

    const cardNumber = document.getElementById('credit-card').value;
    const month = document.getElementById('expiry-month').value;
    const year = document.getElementById('expiry-year').value;
    const ccv = document.getElementById('ccv').value;

    // Validation des champs
    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        alert("Le numéro de carte doit comporter exactement 16 chiffres.");
        return;
    }

    if (!/^\d+$/.test(ccv) || ccv.length !== 3) {
        alert("Le CCV doit comporter exactement 3 chiffres.");
        return;
    }

    if (!validateExpiryDate(month, year)) {
        alert("La date d'expiration est invalide. Veuillez entrer une date future.");
        return;
    }

    // Simuler un paiement réussi
    const isPaymentSuccessful = true;

    if (isPaymentSuccessful) {
        document.querySelector('.success-message').style.display = 'block';
        document.querySelector('.error-message').style.display = 'none';
        // Vider le panier
        localStorage.setItem('panier', JSON.stringify([]));
    } else {
        document.querySelector('.success-message').style.display = 'none';
        document.querySelector('.error-message').style.display = 'block';
    }
}

// Fonction pour imprimer la facture
function printInvoice() {
    const orderDetails = document.querySelector('.order-details').innerHTML;
    const total = window.totalPrice; // Utiliser le total de la commande
    const customerInfo = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        date: new Date().toLocaleDateString('fr-FR'),
    };

    const printWindow = window.open('', '', 'height=600, width=800');
    printWindow.document.write('<html><head><title>Facture</title><style>body { font-family: Arial, sans-serif; }</style></head><body>');
    printWindow.document.write('<img src="../images/logo.png" alt="SamSport Logo" style="width: 100px; height: 100px;"><h1>SamSport - Facture de Commande</h1>');
    printWindow.document.write('<p><strong>Nom:</strong> ' + customerInfo.name + '</p>');
    printWindow.document.write('<p><strong>Adresse:</strong> ' + customerInfo.address + '</p>');
    printWindow.document.write('<p><strong>Date de commande:</strong> ' + customerInfo.date + '</p>');
    printWindow.document.write('<h2>Détails de la commande :</h2>');
    printWindow.document.write(orderDetails);
    printWindow.document.write('<p><strong>Total payé :</strong> ' + total.toFixed(2) + ' €</p>');
    printWindow.document.write('<p><strong>Statut :</strong> Paiement accepté.</p>');
    printWindow.document.write('<p><strong>Remarque :</strong> Vous pouvez demander un remboursement en cas de problème.</p>');
    printWindow.document.write('<button onclick="window.print()">Imprimer</button>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
}

// Fonction pour valider la date d'expiration
function validateExpiryDate(month, year) {
    const today = new Date();
    const expiryDate = new Date(year, month - 1);  // Le mois commence à 0

    if (expiryDate.getFullYear() < today.getFullYear()) {
        return false;
    }

    if (expiryDate.getFullYear() === today.getFullYear()) {
        if (expiryDate.getMonth() < today.getMonth()) {
            return false;
        }
    }

    return true;
}

// Ajouter les événements au chargement de la page
window.onload = () => {
    afficherCommande();
    populateYearOptions();
    document.getElementById('payment-form').addEventListener('submit', processPayment);
    document.getElementById('print-invoice').addEventListener('click', printInvoice);
};

// Remplir les options d'année jusqu'à 2050
function populateYearOptions() {
    const expiryYearSelect = document.getElementById('expiry-year');
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= 2050; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.text = year;
        expiryYearSelect.appendChild(option);
    }
}

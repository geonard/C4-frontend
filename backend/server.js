const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Configurer le middleware express-session
app.use(session({
  secret: 'votre_secret',
  resave: false,
  saveUninitialized: true
}));

app.use(cors());
app.use(bodyParser.json());

// Variable pour stocker les données des produits
let products = [];

// Fonction pour lire le fichier products.json
function loadProducts() {
    const filePath = path.join(__dirname, 'products.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        products = JSON.parse(data);
        console.log('Produits chargés avec succès.');
    } catch (err) {
        console.error('Erreur lors du chargement des produits:', err);
    }
}

// Charger les produits au démarrage du serveur
loadProducts();

// Point de terminaison pour récupérer les articles achetés
app.get('/api/purchased-items', (req, res) => {
    // Récupérer les produits achetés stockés dans la session de l'utilisateur
    const purchasedItems = req.session.cart || [];
    console.log('Purchased Items:', purchasedItems);
    res.json(purchasedItems);
});

// Route pour recevoir des données du client
app.post('/send-data', (req, res) => {
    console.log('Données reçues du client:', req.body);
    res.json({ message: 'Bonjour du BackEnd' });
});

// Route pour obtenir les produits
app.get('/products', (req, res) => {
    res.json(products);
});

// Route pour ajouter un produit au panier
app.post('/api/add-to-cart', (req, res) => {
    console.log('Requête reçue pour ajouter au panier');
    // Récupérer les données du produit envoyées depuis le frontend
    const product = req.body.product;
    console.log('Produit à ajouter:', product);
    // Initialiser la propriété 'cart' dans la session si elle n'existe pas
    req.session.cart = req.session.cart || [];
  
    // Logique pour ajouter le produit au panier
    req.session.cart.push(product);
    console.log('Produit ajouté au panier:', req.session.cart);
    // Envoyer une réponse au frontend pour indiquer que le produit a été ajouté avec succès
    res.status(200).json({ message: 'Product added to cart successfully', product });
});

// Route POST pour gérer les données envoyées depuis le client
app.post('/submit-form', (req, res) => {
    let { categorie, prixMin, prixMax, notesMin, notesMax } = req.body;

    console.log('Données reçues du client:', req.body);

    // Vérifier si la case "Tous" est cochée dans les catégories
    if (categorie && Array.isArray(categorie) && categorie.includes('Tous')) {
        // Si "Tous" est sélectionné, désélectionner toutes les autres catégories
        categorie = ['Tous'];
    }

    // Filtrer les produits selon les catégories, les prix et les notes
    const filteredProducts = products.filter(product => {
        const productPrice = parseFloat(product.price);
        const productNotes = parseFloat(product.note);

        // Filtrer par prix
        if (prixMin && productPrice < parseFloat(prixMin)) return false;
        if (prixMax && productPrice > parseFloat(prixMax)) return false;

        // Filtrer par notes
        if (notesMin && productNotes < parseFloat(notesMin)) return false;
        if (notesMax && productNotes > parseFloat(notesMax)) return false;

        // Filtrer par catégories
        if (categorie && categorie.length > 0 && !categorie.includes('Tous')) {
            const selectedCategories = categorie.map(cat => cat.toLowerCase());
            const matches = selectedCategories.filter(cat => product.category[cat]);
            if (matches.length === 0) return false;
        }

        return true;
    });

    console.log('Produits filtrés:', filteredProducts);
    res.json({ produits: filteredProducts });
});

// Fonction pour démarrer le serveur
function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`Serveur backend démarré sur le port ${port}`);
    });

    server.on('error', (err) => {
        console.error(`Erreur de démarrage du serveur sur le port ${port}:`, err);
        if (err.code === 'EADDRINUSE') {
            port++;
            console.log(`Tentative de démarrage du serveur sur le port suivant, ${port}...`);
            startServer(port);
        } else {
            process.exit(1);
        }
    });
}

// Port initial pour démarrer le serveur
let port = 5000;

// Démarrer le serveur
startServer(port);

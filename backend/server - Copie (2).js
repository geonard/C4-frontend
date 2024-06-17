const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

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

// Route pour recevoir des données du client
app.post('/send-data', (req, res) => {
    console.log('Données reçues du client:', req.body);
    res.json({ message: 'Bonjour du BackEnd' });
});

// Route pour obtenir les produits
app.get('/products', (req, res) => {
    res.json(products);
});

// Route POST pour gérer les données envoyées depuis le client
app.post('/submit-form', (req, res) => {
    const { categorie, prixMin, prixMax, notesMin, notesMax } = req.body;

    console.log('Données reçues du client:', req.body);

    // Filtrer les produits selon les catégories et les prix
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
        if (categorie.length > 0 && !categorie.includes(product.categorie)) return false;

        return true;
    });

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

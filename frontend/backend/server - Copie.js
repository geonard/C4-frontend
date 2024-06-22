const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors()); 
// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());


// Variable to store product data
let products = [];

// Function to read the products.json file
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

// Load products on server startup
loadProducts();


app.post('/send-data', (req, res) => {
    // Logique pour traiter les données envoyées par le client
    console.log('Données reçues du client:', req.body);
    res.json({ message: 'Bonjour du BackEnd' });
});

// Fonction pour démarrer le serveur
function startServer(port) {
    // Route POST pour gérer les données envoyées depuis le client
    app.post('/submit-form', (req, res) => {
        // Affiche le contenu reçu dans la console
        console.log('Données reçues du client:', req.body);
        res.send('Données reçues avec succès !');
    });

    // Démarrer le serveur et écouter les requêtes sur le port spécifié
    app.listen(port, () => {
        console.log(`Serveur backend démarré sur le port ${port}`);
    });
}

// Port initial sur lequel le serveur devrait écouter
let port = 5000;

// Fonction pour essayer de démarrer le serveur sur un port spécifique
function tryPort(port) {
    startServer(port);

    // Gestionnaire d'erreur en cas d'échec de démarrage du serveur sur le port spécifié
    app.on('error', (err) => {
        console.error(`Erreur de démarrage du serveur sur le port ${port}:`, err);
        // Si le port est déjà utilisé, essayer le port suivant
        if (err.code === 'EADDRINUSE') {
            port++;
            console.log(`Tentative de démarrage du serveur sur le port suivant, ${port}...`);
            tryPort(port);
        } else {
            // Autre erreur, arrêter le processus
            process.exit(1);
        }
    });
}

// Démarrer le serveur
tryPort(port);

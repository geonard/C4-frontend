<?php
// Récupérer les données du formulaire
$data = json_decode(file_get_contents('php://input'), true);

// Exemple de données du formulaire
// $data = array(
//     'minPrice' => 2.0,
//     'maxPrice' => 5.0,
//     'minNote' => 4,
//     'maxNote' => 5,
//     'category' => array(
//         'lait' => true,
//         'noix' => true,
//         'fruit' => false
//     )
// );

// Exemple de liste de produits
$products = array(
    array(
        "id" => "1",
        "title" => "Cerisier",
        "price" => 2.99,
        "note" => 5,
        "image" => "images/produit1.jpg",
        "category" => array(
            "blanc" => false,
            "lait" => true,
            "noir" => false,
            "caramel" => false,
            "noix" => true,
            "fruit" => true,
            "liqueur" => false
        ),
        "description" => "Cerisier - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "ingredients" => "Cerise enrobée de pâtes d'amandes, de chocolat au lait et d'éclat de noisettes. Allergènes : SOJA, LAIT (LACTOSE). Contient de l'anhydride sulfureux"
    ),
    // Ajouter d'autres produits ici...
);

// Filtrer les produits en fonction des critères spécifiés
$filteredProducts = array_filter($products, function ($product) use ($data) {
    // Filtrer par prix
    if (isset($data['minPrice']) && $product['price'] < $data['minPrice']) {
        return false;
    }
    if (isset($data['maxPrice']) && $product['price'] > $data['maxPrice']) {
        return false;
    }
    // Filtrer par note
    if (isset($data['minNote']) && $product['note'] < $data['minNote']) {
        return false;
    }
    if (isset($data['maxNote']) && $product['note'] > $data['maxNote']) {
        return false;
    }
    // Filtrer par catégorie
    if (isset($data['category'])) {
        foreach ($data['category'] as $category => $selected) {
            if ($selected && !$product['category'][$category]) {
                return false;
            }
        }
    }
    return true;
});

// Limiter la liste à 9 éléments au maximum
$limitedProducts = array_slice($filteredProducts, 0, 9);

// Renvoyer la liste JSON de produits filtrés
header('Content-Type: application/json');
echo json_encode($limitedProducts);
?>

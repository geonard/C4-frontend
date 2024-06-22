import React, { useState } from 'react';
import ProductGrid from './ProductGrid';
import Form from './Form';
import './Boutique.css'; // Assurez-vous d'importer le fichier CSS

const Boutique = ({ incrementCartCount }) => {
const [produits, setProduits] = useState([]);


  return (
    <div className="boutique-container">
      <p className="boutique-title">BOUTIQUE</p>
      <div className="row">
        <div className="col-12 col-md-3">
          <fieldset className="fieldset-container">
            <legend className="filtre">FILTRE</legend>
            <form>
              <div className="form">
                <Form setProduits={setProduits} />
              </div>
            </form>
          </fieldset>
        </div>
        <div className="col-12 col-md-9">
          <div className="articles-container" style={{ marginTop: '20px' }}>
            <ProductGrid products={produits} incrementCartCount={incrementCartCount}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boutique;

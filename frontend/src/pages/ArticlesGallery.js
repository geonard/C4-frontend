import React from 'react';
import './ArticlesGallery.css';

const ArticlesGallery = ({ products }) => {
  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Galerie d'Articles</h2>
      <div className="gallery-list">
        {products.map((product) => (
          <div key={product.id} className="gallery-item">
            <h3>{product.title}</h3>
            <p>Prix: {product.price} €</p>
            <p>Note: {product.note}</p>
            <img src={`../assets/images/${product.image}`} alt={product.title} width="100" />
            <p>Description: {product.description}</p>
            <p>Ingrédients: {product.ingredients}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesGallery;

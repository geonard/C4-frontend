import React from 'react';
import './ProductGrid.css';
import axios from 'axios';


const ProductGrid = ({ products, incrementCartCount }) => {
  const addToCart = (product) => {
    // Send a request to the backend to notify the addition of the product
    axios.post('/api/add-to-cart', { product })
      .then(response => {
        // Increment the cart count
        incrementCartCount();
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  };

  return (
    <div className="product-grid">
      {products.slice(0, 9).map(product => (
        <Product key={product.id} product={product} addToCart={() => addToCart(product)} />
      ))}
    </div>
  );
};

const Product = ({ product, addToCart }) => {
  return (
    <div className="product">
      <img src={product.image} alt={product.title} />
      <div className="product-info">
        <h2>{product.title}</h2>
        <p>{product.price} €</p>
        <p>Note: {product.note}</p>
        <button className="ajout-panier" onClick={addToCart}>Ajouter au panier</button>
      </div>
    </div>
  );
};

export default ProductGrid;

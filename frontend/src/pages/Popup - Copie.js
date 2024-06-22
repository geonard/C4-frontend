import React from 'react';
import './Popup.css'

const Popup = ({ isOpen, togglePopup, data, decrementCartCount }) => {
  const handleDecrement = () => {
    decrementCartCount();
    togglePopup(); // Fermer la popup après avoir décrémenté le compteur
  };

  return isOpen ? (
    <div className="cart-popup" style={{ position: 'absolute', top: 0, right: 400, padding: '10px', background: '#fff', border: '1px solid #ccc' }}>
      <h3>Votre Panier</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.nom} - {item.prix} €</li>
        ))}
      </ul>
      {/* Bouton pour décrémenter le cartCount */}
      <button onClick={handleDecrement}>Fermer et Décrémenter</button>
      {/* Icône de croix pour fermer le popup sans décrémenter */}
      <span className="close-icon" onClick={togglePopup}>X</span>
    </div>
  ) : null;
};

export default Popup;


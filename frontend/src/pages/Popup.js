import React from 'react';
import 'devextreme/dist/css/dx.light.css'; 
import { ScrollView } from 'devextreme-react/scroll-view';
import './Popup.css';

const Popup = ({ isOpen, togglePopup, data, decrementCartCount }) => {
  if (!isOpen) return null;

  const handleDecrement = () => {
    decrementCartCount();
    togglePopup(); // Fermer la popup après avoir décrémenté le compteur
  };

  return (
    <div className="modal-overlay" onClick={togglePopup}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="cart-popup"> 
          <ScrollView height="300px" width="100%">
            <h3>Votre Panier</h3>
            <div className="cart-content">
              <ul>
                {data.map((item, index) => (
                  <li key={index}>{item.nom} - {item.prix} €</li>
                ))}
              </ul>
            </div>
          </ScrollView>
          <button onClick={handleDecrement}>Fermer et Décrémenter</button>
          <span className="close-icon" onClick={togglePopup}>X</span>
        </div>
      </div>
    </div>
  );
};

export default Popup;

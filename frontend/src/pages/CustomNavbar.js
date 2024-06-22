import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import './CustomNavbar.css';

const CustomNavbar = ({ cartCount }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);

  // Function to fetch purchased items from API
  const fetchPurchasedItems = async () => {
    try {
      const response = await fetch('/api/purchased-items');
      if (!response.ok) {
        throw new Error('Failed to fetch purchased items');
      }
      const data = await response.json();
      return data; // Assuming data is an array of purchased items
    } catch (error) {
      console.error('Error fetching purchased items:', error);
      return []; // Return empty array in case of error
    }
  };

  useEffect(() => {
    fetchPurchasedItems().then(data => setPurchasedItems(data));
  }, []); // Run once on component mount

  const handleCartClick = async () => {
    try {
      const data = await fetchPurchasedItems();
      setPurchasedItems(data);
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching purchased items:', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleRemoveItem = (id) => {
    const updatedItems = purchasedItems.filter(item => item.id !== id);
    setPurchasedItems(updatedItems);
    // Example: Decrement cart count
    // setCartCount(prevCount => prevCount - 1);
  };

  const calculateTotal = () => {
    const total = purchasedItems.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
    return total.toFixed(2);
  };

  const handleReinitPanier = () => {
    setPurchasedItems([]);
    setShowPopup(false);
  };

  const handleValidPanier = () => {
    // Logic to validate the cart
  };

  return (
    <div>
      <Navbar className="navbar-custom" expand="lg">
        <Container>
          <img src="./images/logo.png" className="navbar-logo" alt="Logo" />
          <Navbar.Brand href="/">Accueil</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/boutique">Boutique</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Item onClick={handleCartClick}>
                <Nav.Link>
                  <span className="cart-counter">{cartCount}</span>
                  <FaShoppingCart />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-header" style={{ width: '100%', border: '1px solid #ccc', padding: '10px' }}>
              <FaTimes size={32} className="icon-close-popup icon-large" onClick={handleClosePopup} />
              <h2>PANIER</h2>
            </div>

            <div classNam="liste-container">
            <ul>
              {purchasedItems.map((item, index) => (
                <li key={index} className="purchased-item">
                  <FaTimes className="remove-item" onClick={() => handleRemoveItem(item.id)} />
                  <img src={item.image} alt={item.title} className="item-image" />
                  <div className="item-details">
                    <span className="item-title">{item.title}</span>
                    <span className="item-price">{item.price} €</span>
                    <span className="item-quantity">Quantité: {item.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>
            </div>

            <div className="total-container">
              <span className="total-label">Total: </span>
              <span className="total-amount">{calculateTotal()} €</span>

              <div className="button-container">
                <button onClick={handleReinitPanier} className="reinit-button">
                  REINITIALISER LE PANIER
                </button>
                <button onClick={handleValidPanier} className="valid-button">
                  VALIDER LE PANIER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomNavbar;

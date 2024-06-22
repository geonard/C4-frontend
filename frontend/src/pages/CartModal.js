import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CartModal.css'; // Assurez-vous de créer un fichier CSS pour vos styles personnalisés

const CartModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title></Modal.Title>
        <Button variant="close" onClick={handleClose} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </Button>
      </Modal.Header>
      <Modal.Body>
        {/* Contenu du panier */}
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;

import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import './Barsearch.css'; // Importation des styles CSS personnalisés pour le Barsearch

const Barsearch = () => {
  return (
    <div className="barsearch">
      {/* Flèche gauche */}
      <Button variant="light">
        <i className="fas fa-arrow-left"></i>
      </Button>
      {/* Flèche droite */}
      <Button variant="light">
        <i className="fas fa-arrow-right"></i>
      </Button>
      {/* Croix rouge */}
      <Button variant="danger">
        <i className="fas fa-times"></i>
      </Button>
      {/* Home */}
      <Button variant="light">
        <i className="fas fa-home"></i>
      </Button>

      <div className="barsearch-center">
        {/* Barre de recherche */}
        <InputGroup>
          <FormControl placeholder="https://" />
        </InputGroup>
      </div>
      <div className="icon-loupe">
        {/* Loupe */}
        <Button className="icon-loupe" variant="light">
          <i className="fas fa-search"></i>
        </Button>
      </div>
    </div>
  );
};

export default Barsearch;

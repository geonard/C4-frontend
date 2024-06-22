import React from 'react';
import './Footer.css'; // Importation des styles CSS pour le Footer
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container">
        <div className="row">
          {/* Première colonne */}
          <div className="col-12 col-md-4 grid1">
            <p className="choco">Choco Pap</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eleifend, eros sit amet tristique ultricies, odio libero ultrices velit, nec sollicitudin felis nulla non diam.
            </p>
          </div>
          {/* Deuxième colonne */}
          <div className="col-12 col-md-4 grid2">
            <p className="contact">Contact</p>
            <p>
              Adresse : 51 rue du chocolat 75000 Paris.<br />
              Horaires: 9h00-17h00 du Lundi au Vendredi
            </p>
          </div>
          {/* Troisième colonne */}
<div className="col-12 col-md-4 grid3">
  <div className="row align-items-center">
    <div className="col-4">
      {/* Widget Facebook */}
      <div className="social-widget">
        <FontAwesomeIcon icon={faFacebook} />
      </div>
    </div>
    <div className="col-4">
      {/* Widget Instagram */}
      <div className="social-widget">
        <FontAwesomeIcon icon={faInstagram} />
      </div>
    </div>
    <div className="col-4">
      {/* Widget Twitter */}
      <div className="social-widget">
        <FontAwesomeIcon icon={faTwitter}  />
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RadioButtons.css'; // Importation des styles CSS

const RadioButtons = ({ selectedOption, setSelectedOption }) => {
    const [backgroundImage, setBackgroundImage] = useState('/images/accueil1.jpg');

    useEffect(() => {
        setBackgroundImage('/images/accueil1.jpg'); // Initialisation avec l'image de fond
    }, []); // Utilisation d'un tableau vide pour s'assurer que cela se produit une seule fois lors du montage du composant

    const handleBackgroundChange = (imagePath) => {
        setBackgroundImage(imagePath);
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="d-flex flex-column align-items-center" style={{ minHeight: '100vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <div className="mt-5"> {/* Utilisation de mt-5 pour la marge supérieure */}
                <div className="form-check form-check-inline me-4"> {/* Utilisation de me-4 pour espacement droit */}
                    <input className="form-check-input" type="radio" name="options" id="option1" checked={selectedOption === 'option1'} onClick={() => { handleBackgroundChange('/images/accueil1.jpg'); handleOptionChange('option1'); }} />
                </div>
                <div className="form-check form-check-inline me-4"> {/* Utilisation de me-4 pour espacement droit */}
                    <input className="form-check-input" type="radio" name="options" id="option2" checked={selectedOption === 'option2'} onClick={() => { handleBackgroundChange('/images/accueil2.jpg'); handleOptionChange('option2'); }} />
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="options" id="option3" checked={selectedOption === 'option3'} onClick={() => { handleBackgroundChange('/images/accueil3.jpg'); handleOptionChange('option3'); }} />
                </div>
            </div>
        </div>
    );
};

export default RadioButtons;

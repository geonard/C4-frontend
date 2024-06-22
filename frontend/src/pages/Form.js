import React, { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';
import './Form.css'; 
import '../App.css'; 

const Form = ({ setProduits }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [formData, setFormData] = useState({
    categorie: [],
    prixMin: '0',
    prixMax: '100',
    notesMin: '0',
    notesMax: '5'
  });

  const [sections, setSections] = useState({
    prix: { visible: false, title: 'Prix +' },
    categories: { visible: false, title: 'Catégories +' },
    notes: { visible: false, title: 'Notes +' },
    // Ajoutez plus de sections si nécessaire
  });

  const prixMinOptions = [
    { label: '0 €', value: '' },
    { label: '1 €', value: '1' },
    { label: '2 €', value: '2' },
    { label: '3 €', value: '3' },
    { label: '4 €', value: '4' },
    { label: '5 €', value: '5' },
    { label: '6 €', value: '6' },
    { label: '7 €', value: '7' },
    { label: '8 €', value: '8' },
    { label: '9 €', value: '9' }
  ];

  const prixMaxOptions = [
    { label: '0 €', value: '' },
    { label: '10 €', value: '10' },
    { label: '20 €', value: '20' },
    { label: '30 €', value: '30' },
    { label: '40 €', value: '40' },
    { label: '50 €', value: '50' },
    { label: '60 €', value: '60' },
    { label: '70 €', value: '70' },
    { label: '80 €', value: '80' },
    { label: '90 €', value: '90' },
    { label: '100 €', value: '100' }
  ];

  const notesMinOptions = [
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' }
  ];

  const notesMaxOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' }
  ];

  const categoryMap = {
    'Tous': 'Tous',
    'blanc': 'Chocolat blanc',
    'lait': 'Chocolat au lait',
    'noir': 'Chocolat noir',
    'Noix': 'Noix/Noisette',
    'Fruit': 'Fruit',
    'Caramel': 'Caramel',
    'Liqueur': 'Liqueur'
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setSections((prevSections) => ({
      ...prevSections,
      categories: {
        ...prevSections.categories,
        title: window.innerWidth > 768 ? 'Catégories' : 'Catégories +',
        visible: window.innerWidth > 768 ? true : false
      },
      prix: {
        ...prevSections.prix,
        title: window.innerWidth > 768 ? 'Prix' : 'Prix +',
        visible: window.innerWidth > 768 ? true : false
      },
      notes: {
        ...prevSections.notes,
        title: window.innerWidth > 768 ? 'Notes' : 'Notes +',
        visible: window.innerWidth > 768 ? true : false
      },
    }));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleVisibility = (section) => {alert('rrr');
    if (windowWidth <= 768) { // Actif seulement en petit écran
      setSections((prevSections) => ({
        ...prevSections,
        [section]: {
          ...prevSections[section],
          visible: !prevSections[section].visible,
          title: prevSections[section].visible ? `${section.charAt(0).toUpperCase() + section.slice(1)} +` : `${section.charAt(0).toUpperCase() + section.slice(1)} -`,
        },
      }));
    }
  };
  

  const envoyerDonneesAuServeur = useCallback(debounce((donnees) => {
    const categoriesSelectionnees = donnees.categorie.includes('Tous')
      ? []
      : donnees.categorie;

    const donneesAEnvoyer = {
      ...donnees,
      categorie: categoriesSelectionnees
    };

    fetch('http://localhost:5000/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donneesAEnvoyer),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Réponse du serveur:', data);
        setProduits(data.produits);
      })
      .catch(error => {
        console.error('Erreur lors de l\'envoi des données:', error);
      });
  }, 300), [setProduits]);

  const handleSelectChange = (event) => {alert('handleSelectChange');
    const { name, value } = event.target;
    setFormData(prevData => {
      const newData = { ...prevData };

      if (name === 'notesMin') {
        if (value !== '' && prevData.notesMax !== '' && parseFloat(value) > parseFloat(prevData.notesMax)) {
          setError('Prix min ne peut pas être supérieure à Prix max');
          return prevData;
        }
        newData.notesMin = value;
      } else if (name === 'notesMax') {
        if (value !== '' && prevData.notesMin !== '' && parseFloat(value) < parseFloat(prevData.notesMin)) {
          setError('Prix min ne peut pas être supérieure à Prix max');
          return prevData;
        }
        newData.notesMax = value;
      } else {
        newData[name] = value;
      }

      envoyerDonneesAuServeur(newData);
      return newData;
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setFormData(prevData => {
      let newCategories;
      if (name === 'Tous') {
        newCategories = checked ? ['Tous'] : [];
      } else {
        newCategories = checked
          ? [...prevData.categorie.filter(cat => cat !== 'Tous'), name]
          : prevData.categorie.filter(cat => cat !== name);
      }

      const newData = { ...prevData, categorie: newCategories };
      envoyerDonneesAuServeur(newData);
      return newData;
    });
  };

  const isSmallScreen = windowWidth <= 768;

  const [error, setError] = useState(null); // État pour l'erreur

  return (
    <div className="filtre-container">
      {/* Section Catégories */}
      <div>
        <h1 id="categories-titre" onClick={() => toggleVisibility('categories')}>
          {sections.categories.title}
        </h1>
        {sections.categories.visible && (
          <div className="section" id="categories-section">
            {Object.keys(categoryMap).map((categorie, index) => (
              <div key={index} className="checkbox-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name={categorie}
                    checked={formData.categorie.includes(categorie)}
                    onChange={handleCheckboxChange}
                  />
                  {categoryMap[categorie]}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section Prix */}
      <div>
        <h1 id="prix-titre" onClick={() => toggleVisibility('prix')}>
          {sections.prix.title}
        </h1>
        {sections.prix.visible && (
          <div className="section" id="prix-section">
            <label>
              Prix minimum:
              <select name="prixMin" value={formData.prixMin} onChange={handleSelectChange}>
                {prixMinOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
            <label>
              Prix maximum:
              <select name="prixMax" value={formData.prixMax} onChange={handleSelectChange}>
                {prixMaxOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>
        )}
      </div>

      {/* Section Notes */}
      <div>
        <h1 id="notes-titre" onClick={() => toggleVisibility('notes')}>
          {sections.notes.title}
        </h1>
        {sections.notes.visible && (
          <div className="section" id="notes-section">
            <label>
              Note minimum:
              <select name="notesMin" value={formData.notesMin} onChange={handleSelectChange}>
                {notesMinOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
            <label>
              Note maximum:
              <select name="notesMax" value={formData.notesMax} onChange={handleSelectChange}>
                {notesMaxOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;

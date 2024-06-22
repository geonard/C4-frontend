import React, { useEffect, useState, useCallback } from 'react';
import './Form.css';

function Form() {
  const priceOptions = [
    { label: 'Tous les prix', value: '' },
    { label: '0 - 5 €', value: '0-5' },
    { label: '5 - 10 €', value: '5-10' },
    { label: '10 - 20 €', value: '10-20' },
    { label: '20 - 50 €', value: '20-50' },
    { label: '50 € et plus', value: '50-' },
  ];

  const notesOptions = [
    { label: 'Toutes les notes', value: '' },
    { label: '0 - 5', value: '0-5' },
    { label: '5 - 7', value: '5-7' },
    { label: '7 - 9', value: '7-9' },
    { label: '9 et plus', value: '9-' },
  ];

  const [formData, setFormData] = useState({
    category: [],
    price: '',
    notes: ''
  });

  const [products, setProducts] = useState([]);

  const sendDataToServer = useCallback(() => {
    const selectedCategories = formData.category.includes('Tous')
      ? formData.category.filter(category => category !== 'Tous')
      : formData.category;

    const dataToSend = {
      ...formData,
      category: selectedCategories
    };

    fetch('http://localhost:5000/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Réponse du serveur:', data);
        setProducts(data.products); // Mettre à jour les produits affichés
      })
      .catch(error => {
        console.error('Erreur lors de l\'envoi des données:', error);
      });
  }, [formData]);

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    sendDataToServer();
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === 'Tous') {
      setFormData(prevData => ({
        ...prevData,
        category: checked ? ['Tous', 'Chocolat blanc', 'Chocolat au lait', 'Chocolat noir', 'Noix/Noisette', 'Fruit', 'Caramel', 'Liqueur'] : []
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        category: checked ? [...prevData.category, name] : prevData.category.filter(cat => cat !== name)
      }));
    }
    sendDataToServer();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendDataToServer();
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}> 
        <fieldset>
          <legend className="filtre">FILTRE</legend>
          <div className="container">
            <h2 id="categories-titre">Catégories</h2>
            <div>
              {['Tous', 'Chocolat blanc', 'Chocolat au lait', 'Chocolat noir', 'Noix/Noisette', 'Fruit', 'Caramel', 'Liqueur'].map((category, index) => (
                <div key={index}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name={category}
                      checked={formData.category.includes(category)}
                      onChange={handleCheckboxChange}
                    />
                    {category}
                  </label>
                </div>
              ))}
            </div>
            <h2>Prix</h2>
            <div>
              <h3>Prix min</h3>
              <select name="price" onChange={handleSelectChange}>
                {priceOptions.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </select>
              <h3>Prix max</h3>
              <select name="price" onChange={handleSelectChange}>
                {priceOptions.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <h2>Notes</h2>
            <div>
              <h3>Note min</h3>
              <select name="notes" onChange={handleSelectChange}>
                {notesOptions.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </select>
              <h3>Note max</h3>
              <select name="notes" onChange={handleSelectChange}>
                {notesOptions.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
      </form>
    <div>           
      <h2 className="articles-gallery">Liste des Produits</h2>
      <ul>
        {products.slice(0, 9).map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>Prix: {product.price} €</p>
            <p>Note: {product.note}</p>
            <img src={`../assets/images/${product.image}`} alt={product.title} width="100" />
            <p>Description: {product.description}</p>
            <p>Ingrédients: {product.ingredients}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default Form;

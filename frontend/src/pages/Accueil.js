import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import RadioButtons from './RadioButtons';

const Accueil = () => {
  const history = useHistory();
  const [response, setResponse] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/send-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Bonjour du FrontEnd' }),
      });
      const responseData = await response.json();
      setResponse(responseData.message);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (response.ok) {
        history.push('/boutique');
      }
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  return (
    <div>
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
        <button className="btn btn-primary" onClick={handleClick}>Voir Vitrine</button>
        {response && <p>Réponse du serveur : {response}</p>}
      </div>
      <RadioButtons selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
    </div>
  );
};
export default Accueil;

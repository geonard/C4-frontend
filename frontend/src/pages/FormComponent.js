// frontend/src/components/FormComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/submit-form', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Nom" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <button type="submit">Soumettre</button>
        </form>
    );
};

export default FormComponent;

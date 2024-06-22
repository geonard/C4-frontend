import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from '../pages/Form'; // Assurez-vous que le chemin est correct
jest.mock('../pages/Form.css', () => ({})); // Mocking CSS file import

// Mock de l'appel fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ products: [] }),
  })
);

afterEach(() => {
  jest.clearAllMocks();
});

describe('Form Component', () => {
  test('renders form and checks for category checkboxes', () => {
    render(<Form />);
    
    const categories = ['Tous', 'Chocolat blanc', 'Chocolat au lait', 'Chocolat noir', 'Noix/Noisette', 'Fruit', 'Caramel', 'Liqueur'];

    categories.forEach(category => {
      expect(screen.getByLabelText(category)).toBeInTheDocument();
    });
  });

  test('renders form and checks for price options', () => {
    render(<Form />);

    const priceOptions = [
      'Tous les prix', '0 - 5 €', '5 - 10 €', '10 - 20 €', '20 - 50 €', '50 € et plus'
    ];

    fireEvent.change(screen.getAllByRole('combobox')[0], { target: { value: '0-5' } });
    fireEvent.change(screen.getAllByRole('combobox')[1], { target: { value: '0-5' } });

    priceOptions.forEach(option => {
      expect(screen.getAllByRole('option', { name: option })[0]).toBeInTheDocument();
    });
  });

  test('renders form and checks for notes options', () => {
    render(<Form />);

    const notesOptions = [
      'Toutes les notes', '0 - 5', '5 - 7', '7 - 9', '9 et plus'
    ];

    fireEvent.change(screen.getAllByRole('combobox')[2], { target: { value: '0-5' } });
    fireEvent.change(screen.getAllByRole('combobox')[3], { target: { value: '0-5' } });

    notesOptions.forEach(option => {
      expect(screen.getAllByRole('option', { name: option })[0]).toBeInTheDocument();
    });
  });

  test('submits the form and checks if fetch is called', async () => {
    render(<Form />);

    fireEvent.click(screen.getByLabelText('Chocolat blanc'));
    fireEvent.change(screen.getAllByRole('combobox')[0], { target: { value: '0-5' } });
    fireEvent.change(screen.getAllByRole('combobox')[2], { target: { value: '0-5' } });

    fireEvent.click(screen.getByText('Soumettre'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/submit-form', expect.any(Object));
  });

  test('renders products list', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          products: [
            {
              id: 1,
              title: 'Chocolat Noir',
              price: '10',
              note: '9',
              image: 'chocolat_noir.jpg',
              description: 'Délicieux chocolat noir',
              ingredients: 'Cacao, sucre, beurre de cacao'
            }
          ]
        })
      })
    );

    render(<Form />);
    
    fireEvent.click(screen.getByText('Soumettre'));

    await waitFor(() => screen.getByText('Chocolat Noir'));

    expect(screen.getByText('Chocolat Noir')).toBeInTheDocument();
    expect(screen.getByText('Prix: 10 €')).toBeInTheDocument();
    expect(screen.getByText('Note: 9')).toBeInTheDocument();
    expect(screen.getByText('Description: Délicieux chocolat noir')).toBeInTheDocument();
    expect(screen.getByText('Ingrédients: Cacao, sucre, beurre de cacao')).toBeInTheDocument();
  });
});

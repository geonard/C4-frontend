import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Boutique from './pages/Boutique';
import Barsearch from './pages/Barsearch';
import CustomNavbar from './pages/CustomNavbar';
import Footer from './pages/Footer';
import './App.css';

const App = () => {
  const [cartCount, setCartCount] = useState(0);

  const incrementCartCount = () => {
    setCartCount(prevCount => prevCount + 1);
  };
  const decrementCartCount = () => {
    setCartCount(prevCount => prevCount - 1);
  };

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  const fetchDataFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000');
      if (!response.ok) {
        throw new Error('Failed to fetch data from backend');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <Barsearch />
          <CustomNavbar cartCount={cartCount} setCartCount={setCartCount} />
        </header>
        <div className="content-wrap">
          <Switch>
            <Route path="/" exact>
              <Accueil />
            </Route>
            <Route path="/boutique" exact>
              <Boutique incrementCartCount={incrementCartCount} decrementCartCount={decrementCartCount} />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

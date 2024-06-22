module.exports = {
    // Indique à Jest où trouver les fichiers de test
    testMatch: ['**/__tests__/**/*.test.js'],
  
    // Transforme les fichiers avec babel-jest pour prendre en charge ES6
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
  };
  
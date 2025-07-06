import React from 'react';
import Home from './pages/Home';
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
}

export default App;

import React from 'react';
import Home from './pages/Home';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Home />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

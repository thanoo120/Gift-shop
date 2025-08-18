import React from 'react';
import Home from './pages/Home';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <Home />
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;

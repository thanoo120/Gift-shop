import React from "react";
import Home from "./pages/Home.jsx";
import { CartProvider } from "./components/CartContext.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import { Provider } from "react-redux";
import store from "./store";

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

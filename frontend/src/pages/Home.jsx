import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar.jsx";
import GiftItem from "../components/GiftItem.jsx";
import UserProfile from "../components/UserProfile.jsx";
import PurchaseForm from "../components/PurchaseForm.jsx";
import CartContext from "../components/CartContext.jsx";
import CartDrawer from "../components/CrtDrawer.jsx";
import { useAuthContext } from "@asgardeo/auth-react";

const gifts = [
  {
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    title: "Birthday Surprise Box",
    description: "A box full of surprises to make birthdays extra special!"
  },
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    title: "Anniversary Candle Set",
    description: "Romantic scented candles for memorable anniversaries."
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    title: "Custom Mug",
    description: "Personalized mugs for every personality and occasion."
  },
];

const Home = () => {
  const { isAuthenticated, signIn, signOut, getBasicUserInfo } = useAuthContext();
  const [user, setUser] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { cart } = useContext(CartContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const info = await getBasicUserInfo();
        setUser(info);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated, getBasicUserInfo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center">
      {/* Navbar */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
        user={user}
        signIn={signIn}
        signOut={signOut}
      />

      {/* Header */}
      <header className="w-full flex flex-col items-center py-10" id="home">
        <h1 className="text-4xl font-extrabold text-pink-600 drop-shadow mb-2">
          Welcome to Giftify!
        </h1>
        <p className="text-lg text-gray-700 mb-6 max-w-xl text-center">
          Discover the perfect gift for every occasion. Browse our curated selection of unique gifts.
        </p>
      </header>

      {/* Product Grid */}
      <main
        className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 py-10"
        id="shop"
      >
        {gifts.map((gift, idx) => (
          <GiftItem key={idx} {...gift} />
        ))}
      </main>

      {user && <UserProfile />}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onCheckout={() => {
          setShowCart(false);
          setShowForm(true);
        }}
      />

      {/* Purchase Form */}
      {showForm && <PurchaseForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Home;

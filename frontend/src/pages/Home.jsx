import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar.jsx";
import GiftItem from "../components/GiftItem.jsx";
import UserProfile from "../components/UserProfile.jsx";
import PurchaseForm from "../components/PurchaseForm.jsx";
import CartContext from "../components/CartContext.jsx";
import CartDrawer from "../components/CrtDrawer.jsx";
import { useAuthContext } from "@asgardeo/auth-react";



const Home = () => {

  const { isAuthenticated, signIn, signOut, getBasicUserInfo } = useAuthContext();
  const [user, setUser] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showForm, setShowForm] = useState(false);
const [products, setProducts] = useState([]);
  const { cart } = useContext(CartContext);

   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = isAuthenticated ? await getAccessToken() : null;
        const res = await axios.get("https://localhost:8443/api/products", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, [isAuthenticated, getAccessToken]);

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
     
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
        user={user}
        signIn={signIn}
        signOut={signOut}
      />

    
      <header className="w-full flex flex-col items-center py-10" id="home">
        <h1 className="text-4xl font-extrabold text-pink-600 drop-shadow mb-2">
          Welcome to Giftify!
        </h1>
        <p className="text-lg text-gray-700 mb-6 max-w-xl text-center">
          Discover the perfect gift for every occasion. Browse our curated selection of unique gifts.
        </p>
      </header>


      <main
        className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 py-10"
        id="shop"
      >
        {products.map((gift, idx) => (
          <GiftItem key={idx} {...gift} />
        ))}
      </main>

      {user && <UserProfile />}

   
      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onCheckout={() => {
          setShowCart(false);
          setShowForm(true);
        }}
      />

   
      {showForm && <PurchaseForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Home;

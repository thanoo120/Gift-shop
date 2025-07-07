import React, { useContext, useState, useEffect } from 'react';
import GiftItem from '../components/GiftItem';
import Navbar from '../components/Navbar';
import CartContext from '../components/CartContext';
import AuthContext from '../components/AuthContext';

const gifts = [
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    title: 'Birthday Surprise Box',
    description: 'A box full of surprises to make birthdays extra special!'
  },
  {
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    title: 'Anniversary Candle Set',
    description: 'Romantic scented candles for memorable anniversaries.'
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Custom Mug',
    description: 'Personalized mugs for every personality and occasion.'
  }
];

const LoginModal = ({ show, onClose }) => {
  const { login, register, forgotPassword } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotResult, setForgotResult] = useState('');

  if (!show) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      setMessage('Login successful!');
      onClose();
    } else {
      setMessage('Invalid credentials.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (register(email, password)) {
      setMessage('Registration successful!');
      onClose();
    } else {
      setMessage('User already exists.');
    }
  };

  const handleForgot = (e) => {
    e.preventDefault();
    const result = forgotPassword(email);
    setForgotResult(result ? `Your password is: ${result}` : 'Email not found.');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">✕</button>
        <h2 className="text-2xl font-bold mb-4 text-pink-600">{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={isRegister ? handleRegister : handleLogin} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="p-2 rounded border border-gray-300" required />
          {!showForgot && (
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="p-2 rounded border border-gray-300" required />
          )}
          {message && <div className="text-sm text-red-500">{message}</div>}
          {showForgot ? (
            <>
              <button onClick={handleForgot} className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-400 transition">Get Password</button>
              {forgotResult && <div className="text-green-600 text-sm mt-2">{forgotResult}</div>}
              <button type="button" onClick={() => setShowForgot(false)} className="text-xs text-blue-500 mt-2">Back to Login</button>
            </>
          ) : (
            <>
              <button type="submit" className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-400 transition">{isRegister ? 'Register' : 'Login'}</button>
              <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-xs text-blue-500">{isRegister ? 'Already have an account? Login' : 'Not registered? Register'}</button>
              {!isRegister && <button type="button" onClick={() => setShowForgot(true)} className="text-xs text-blue-500">Forgot Password?</button>}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

const Home = () => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const handler = () => setShowLogin(true);
    window.addEventListener('show-login', handler);
    return () => window.removeEventListener('show-login', handler);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center">
      <Navbar cartCount={user ? cart.length : 0} onCartClick={() => setShowCart(!showCart)} />
      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
      {showCart && user && (
        <div className="fixed top-20 right-8 bg-white rounded-xl shadow-lg p-6 w-80 z-50">
          <h2 className="text-xl font-bold mb-4 text-pink-600">Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cart.map((item, idx) => (
                <li key={idx} className="py-2 flex items-center gap-3">
                  <img src={item.image} alt={item.title} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <header className="w-full flex flex-col items-center py-10" id="home">
        <h1 className="text-4xl font-extrabold text-pink-600 drop-shadow mb-2">Welcome to Giftify!</h1>
        <p className="text-lg text-gray-700 mb-6 max-w-xl text-center">
          Discover the perfect gift for every occasion. Browse our curated selection of unique and thoughtful gifts for your loved ones.
        </p>
        <a
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-lg hover:scale-105 hover:from-pink-400 hover:to-purple-400 transition-all duration-300 font-semibold text-lg"
          href="#shop"
        >
          Shop Now
        </a>
      </header>
      <main className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 py-10" id="shop">
        {gifts.map((gift, idx) => (
          <GiftItem key={idx} {...gift} />
        ))}
      </main>
      <section id="about" className="w-full max-w-3xl bg-white bg-opacity-80 rounded-xl shadow-lg p-8 my-8">
        <h2 className="text-2xl font-bold text-purple-700 mb-2">About Us</h2>
        <p className="text-gray-700">Giftify is your one-stop shop for unique, thoughtful gifts for every occasion. We believe in making every celebration special with handpicked items that bring joy to your loved ones.</p>
      </section>
      <section id="contact" className="w-full max-w-3xl bg-white bg-opacity-80 rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-purple-700 mb-2">Contact Us</h2>
        <p className="text-gray-700 mb-2">Have questions or need help? Reach out to us!</p>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="p-2 rounded border border-gray-300" />
          <input type="email" placeholder="Your Email" className="p-2 rounded border border-gray-300" />
          <textarea placeholder="Your Message" className="p-2 rounded border border-gray-300" rows="3"></textarea>
          <button type="submit" className="self-end px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-400 transition">Send</button>
        </form>
      </section>
      <footer className="w-full text-center py-6 text-gray-500 text-sm mt-auto bg-white bg-opacity-80">
        © 2025 Giftify. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

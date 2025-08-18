import React, { useContext } from 'react';
import AuthContext from './AuthContext';

const Navbar = ({ cartCount = 0, onCartClick }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold text-pink-600">Giftify</div>
      <ul className="flex gap-8 text-lg font-medium">
        <li><a href="#home" className="hover:text-pink-500 transition">Home</a></li>
        <li><a href="#about" className="hover:text-pink-500 transition">About</a></li>
        <li><a href="#contact" className="hover:text-pink-500 transition">Contact Us</a></li>
      </ul>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <button onClick={onCartClick} className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-pink-600 hover:text-pink-400 transition">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25A3.75 3.75 0 0011.25 18h1.5a3.75 3.75 0 003.75-3.75V6.75m-9 7.5h9m-9 0l-1.5-6.75m10.5 6.75l1.5-6.75m-12 0h15.75" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5">{cartCount}</span>
            </button>
            <span className="text-gray-700 font-medium">{user.email}</span>
            <button onClick={logout} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm">Logout</button>
          </>
        ) : (
          <button onClick={() => window.dispatchEvent(new Event('show-login'))} className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-400 transition">Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

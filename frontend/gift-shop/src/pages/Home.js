import React from 'react';
import GiftItem from '../components/GiftItem';

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

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center">
    <header className="w-full flex flex-col items-center py-10">
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
    <footer className="w-full text-center py-6 text-gray-500 text-sm mt-auto">
      © 2025 Giftify. All rights reserved.
    </footer>
  </div>
);

export default Home;

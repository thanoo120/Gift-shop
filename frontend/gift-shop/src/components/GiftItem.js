import React from 'react';

const GiftItem = ({ image, title, description }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow">
    <img src={image} alt={title} className="w-32 h-32 object-cover rounded-full mb-4" />
    <h2 className="text-xl font-bold text-purple-700 mb-2">{title}</h2>
    <p className="text-gray-600 mb-4 text-center">{description}</p>
    <button className="mt-auto px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-400 transition">Add to Cart</button>
  </div>
);

export default GiftItem;

import React from 'react';

function Header() {
  return (
    <nav className="bg-gray-900 p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Bitcoin Daily Price Tracker</h1>
        <div className="space-x-6">
          <a href="#prices" className="text-gray-300 hover:text-white transition">Prices</a>
          <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
        </div>
      </div>
    </nav>
  );
}

export default Header;
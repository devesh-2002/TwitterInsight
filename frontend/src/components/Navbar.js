import React from 'react';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://cdn.iconscout.com/icon/free/png-512/free-twitter-44-125621.png" alt="Twitter Logo" className="h-8 w-8 mr-2 animate-bounce" />
            <div className="text-white font-semibold text-lg">TwitterInsight</div>
          </div>
          <div className="flex space-x-4">
            <a href="/" className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110">Home</a>
            <a href="/search" className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110">Search Tweets</a>
            <a href="/dashboards" className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110">Dashboards</a>
            <a href="/bot" className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110">Tweet Bot</a>
            <a href="/contact" className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110">Contact Us</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

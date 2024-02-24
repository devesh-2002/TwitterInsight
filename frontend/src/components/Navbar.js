import React from 'react';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-semibold">Navbar</div>
          <div className="flex space-x-4">
            <a href="/" className="text-white hover:text-gray-300">Home</a>
            <a href="/search" className="text-white hover:text-gray-300">SearchTweets</a>
            <a href="/dashboards" className="text-white hover:text-gray-300">Dashboards</a>
            <a href="/bot" className="text-white hover:text-gray-300">TweetBot</a>
            <a href="/contact" className="text-white hover:text-gray-300">Contact Us</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

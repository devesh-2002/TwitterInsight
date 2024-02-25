"use client";
import React, { useState } from 'react';

function SearchTweet() {
  const [query, setQuery] = useState('');
  const [tweets, setTweets] = useState([]);
  const [message, setMessage] = useState('');
  const [limit, setLimit] = useState(10);
  const [minLikes, setMinLikes] = useState(0);
  const [minRetweets, setMinRetweets] = useState(0);
  const [startDate, setStartDate] = useState('2022-01-01');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!query) {
      setMessage('Please enter something');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, limit, min_likes: minLikes, min_retweets: minRetweets, start_date: startDate })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tweets');
      }
      const data = await response.json();
      console.log(data); // Log the response
      setTweets(data.tweets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tweets:', error);
      setLoading(false);
    }
  };
  
  return (
    <div className="flex justify-center items-center my-10">
      <div className="max-w-screen-md w-full mx-2 flex">
        <div className="flex-2">
          <div className="mb-10 p-6 rounded-lg bg-gray-700 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-white">Search by Hashtag</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white font-sans font-normal outline-none focus:outline-none placeholder-blue-gray-200 border border-blue-gray-200 focus:border-gray-900 rounded-[7px] px-3 py-2.5"
                placeholder="Enter hashtag..."
              />
              <div className="flex mt-4">
                <div className="w-1/2 mr-4">
                  <label htmlFor="limit" className="text-white">Limit:</label>
                  <input
                    type="number"
                    id="limit"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    className="w-full bg-transparent text-white font-sans font-normal outline-none focus:outline-none placeholder-blue-gray-200 border border-blue-gray-200 focus:border-gray-900 rounded-[7px] px-3 py-2.5"
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="minLikes" className="text-white">Min Likes:</label>
                  <input
                    type="number"
                    id="minLikes"
                    value={minLikes}
                    onChange={(e) => setMinLikes(e.target.value)}
                    className="w-full bg-transparent text-white font-sans font-normal outline-none focus:outline-none placeholder-blue-gray-200 border border-blue-gray-200 focus:border-gray-900 rounded-[7px] px-3 py-2.5"
                  />
                </div>
              </div>
              <div className="flex mt-4">
                <div className="w-1/2 mr-4">
                  <label htmlFor="minRetweets" className="text-white">Min Retweets:</label>
                  <input
                    type="number"
                    id="minRetweets"
                    value={minRetweets}
                    onChange={(e) => setMinRetweets(e.target.value)}
                    className="w-full bg-transparent text-white font-sans font-normal outline-none focus:outline-none placeholder-blue-gray-200 border border-blue-gray-200 focus:border-gray-900 rounded-[7px] px-3 py-2.5"
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="startDate" className="text-white">Start Date:</label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-transparent text-white font-sans font-normal outline-none focus:outline-none placeholder-blue-gray-200 border border-blue-gray-200 focus:border-gray-900 rounded-[7px] px-3 py-2.5"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none shadow-md transition duration-300"
              >
                Search
              </button>
            </form>
            {message && <p className="text-red-500">{message}</p>}
            {loading && <p className="text-yellow-500">Please wait till response is returned...</p>} {/* Show loading message */}

          </div>
        </div>
        <div className="flex-2 mx-5 max-h-100 overflow-y-auto">
          <div className="p-6 rounded-lg bg-gray-700 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-white">Search Results</h2>
            {tweets.map((tweet, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition duration-300">
                <p className="text-gray-800">{tweet}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchTweet;

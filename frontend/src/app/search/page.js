import React from 'react';

function SearchTweet() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full mx-4">
        <div className="mb-10 p-6 rounded-lg bg-gray-700 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Search by Hashtag</h2>
          <form>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300"
              placeholder="Enter hashtag..."
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none shadow-md transition duration-300"
            >
              Search
            </button>
          </form>
        </div>

        <div className="p-6 rounded-lg bg-gray-700 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Search by Tag</h2>
          <form>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300"
              placeholder="Enter tag..."
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none shadow-md transition duration-300"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchTweet;

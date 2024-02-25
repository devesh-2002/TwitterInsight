import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <main>
        <div className="min-h-screen flex items-center justify-center">
          <div className="relative">
            <img
              className="object-cover w-full h-full rounded-lg shadow-md"
              src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fc7801a1d-511a-4a59-937a-6a07c1565374_1200x675.jpeg"
              alt=""
            />
            <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gray-500 max-w-lg p-8 shadow-md rounded-lg text-center font-serif">
                <h1 className="text-3xl font-bold mb-4 text-white">Welcome to TwitterInsight</h1>
                <p className="text-lg mb-6 text-white">
                  Are you looking to gain valuable insights from your customer feedback data? Look no further!
                  <br /><br />
                  <b>TwitterInsight</b> offers a comprehensive solution for analyzing and understanding the voice of your customers.
                </p>
                <Link href="/search">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                    Get Started
                  </button>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

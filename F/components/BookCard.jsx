'use client';

import { FaHeadphones, FaTabletAlt } from 'react-icons/fa';

export default function BookCard({ book }) {
  const { image, title, author, price, hasAudiobook, hasEbook } = book;

  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden w-64 group">
      {/* Book image */}
      <div className="relative h-72 w-full">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />

        {/* Format icons */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          {hasAudiobook && (
            <div className="relative group">
              <FaHeadphones
                className="text-white bg-black/70 p-1 rounded-full w-7 h-7 hover:scale-110 transition-transform"
              />
              <span className="absolute right-9 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                Available in audiobook
              </span>
            </div>
          )}
          {hasEbook && (
            <div className="relative group">
              <FaTabletAlt
                className="text-white bg-black/70 p-1 rounded-full w-7 h-7 hover:scale-110 transition-transform"
              />
              <span className="absolute right-9 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                Available in ebook
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Book info */}
      <div className="p-4 flex flex-col justify-between h-40">
        <div className="mb-4">
          <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>
          <p className="text-sm text-gray-600">by {author}</p>
          <p className="mt-2 font-bold text-indigo-600">${price.toFixed(2)}</p>
        </div>
        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
          Add to cart
        </button>
      </div>
    </div>
  );
}

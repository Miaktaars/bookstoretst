"use client";

import { FaHeadphones, FaTabletAlt } from "react-icons/fa";
import { useState } from "react";

export default function BookCard({ book }) {
  const { title, author, price, image, hasAudiobook, hasEbook } = book;
  const [imgSrc, setImgSrc] = useState(() => {
    // Initial check for invalid images
    if (!image || image.endsWith(".gif")) {
      return "/no_cover.webp";
    }
    return image;
  });

  const handleImageError = (e) => {
    if (e.target.src !== "/no_cover.webp") {
      setImgSrc("/no_cover.webp");
    }
  };

  const handleImageLoad = (e) => {
    // Check if loaded image is a 1x1 pixel placeholder
    if (e.target.naturalWidth === 1 && e.target.naturalHeight === 1) {
      setImgSrc("/no_cover.webp");
    }
  };

  return (
    <div className="card bg-base-100 w-55 h-[380px] shadow-md hover:shadow-lg transition-shadow flex flex-col rounded-xl bg-gray-200 border border-white">
      {/* Image container */}
      <figure className="relative h-60 shrink-0">
        <img
          src={imgSrc}
          alt={title || "Book cover"}
          className="w-full h-full object-cover rounded-t-xl rounded-b-none"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />

        {/* Format indicators */}
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          {hasAudiobook && (
            <div className="group relative">
              <FaHeadphones className="text-white bg-black/70 p-1 rounded-full w-7 h-7 hover:scale-110 transition-transform" />
              <span className="absolute right-8 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Available in audiobook
              </span>
            </div>
          )}
          {hasEbook && (
            <div className="group relative">
              <FaTabletAlt className="text-white bg-black/70 p-1 rounded-full w-7 h-7 hover:scale-110 transition-transform" />
              <span className="absolute right-8 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Available in ebook
              </span>
            </div>
          )}
        </div>
      </figure>

      {/* Book details */}
      <div className="px-3 pb-4 pt-1 flex flex-col flex-grow">
        <div className="flex-grow overflow-y-auto mb-2">
          <h2 className="text-sm font-semibold mb-1 line-clamp-2">{title}</h2>
          <p className="text-xs text-gray-500 line-clamp-1">by {author}</p>
        </div>

        <div className="mt-auto">
          <div className="mb-2 font-bold text-primary">${price.toFixed(2)}</div>
          <button className="btn btn-warning w-full !bg-orange-500 hover:!bg-orange-600 !border-none rounded-3xl !text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

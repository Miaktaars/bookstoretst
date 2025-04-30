"use client";

import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

export default function BestSellers() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        const data = await res.json();
        const bestSellers = data.books.filter((book) => book.isBestseller);
        setBooks(bestSellers);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
      partialVisibilityGutter: 20,
    },
  };

  // Custom arrow components with proper positioning
  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full shadow-lg transition-all"
      aria-label="Previous"
    >
      &larr;
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-20 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full shadow-lg transition-all"
      aria-label="Next"
    >
      &rarr;
    </button>
  );

  return (
    <div className="relative min-h-[500px] w-full">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/star_img.jpg"
          alt="Bookstore background"
          fill
          className="object-cover object-center"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-orange-500">
            Best Sellers
          </h2>

          {/* Carousel Container */}
          <div className="relative">
            {/* Loading Skeleton */}
            {loading ? (
              <div className="flex gap-4 overflow-x-hidden">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-56">
                    <div className="card bg-gray-800/80 backdrop-blur-sm w-full h-88 rounded-lg animate-pulse">
                      <div className="h-48 bg-gray-700/50 rounded-t-lg"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-700/50 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-700/50 rounded w-1/4 mt-2"></div>
                        <div className="h-8 bg-gray-700/50 rounded-lg mt-4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative">
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  autoPlay={false}
                  itemClass="px-2"
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["mobile"]}
                  showDots={false}
                  partialVisible={false}
                  centerMode={false}
                >
                  {books.map((book) => (
                    <div key={book._id} className="h-full">
                      <BookCard book={book} className="w-full h-full mx-1" />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

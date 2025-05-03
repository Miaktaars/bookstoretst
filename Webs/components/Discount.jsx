"use client";

import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

export default function RandomBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        const data = await res.json();

        // Get 10 random books
        const shuffled = [...data.books].sort(() => 0.5 - Math.random());
        const randomBooks = shuffled.slice(0, 10).map((book) => ({
          ...book,
          // Create fake discount pricing (keep as numbers)
          originalPrice: Number(book.price), // Store original price as number
          price: Number((book.price * 0.8).toFixed(2)), // 20% discount
          usedPrice: Number((book.price * 0.5).toFixed(2)), // 50% discount
        }));

        setBooks(randomBooks);
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
      items: 5, // Reduced from 6 to prevent crowding
      slidesToSlide: 2,
      partialVisibilityGutter: 40, // Added space between items
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
      slidesToSlide: 1,
      partialVisibilityGutter: 20,
    },
  };

  // Custom arrow components positioned outside
  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full shadow-lg transition-all w-10 h-10 flex items-center justify-center"
      aria-label="Previous"
    >
      &larr;
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full shadow-lg transition-all w-10 h-10 flex items-center justify-center"
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
      <div className="relative z-10 px-10 py-10">
        {" "}
        {/* Increased side padding */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-orange-500">
            Special Offers
          </h2>

          {/* Carousel Container */}
          <div className="relative">
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
                  itemClass="px-2" // Spacing between items
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["mobile"]}
                  showDots={false}
                  partialVisible={false} // Ensure full cards are visible
                  centerMode={false}
                >
                  {books.map((book) => (
                    <div key={book._id} className="h-full pb-4">
                      {" "}
                      {/* Added padding bottom */}
                      <BookCard book={book} className="w-full h-full" />
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

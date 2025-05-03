"use client";

import { useState, useEffect } from "react";
import BookCard from "@/components/BookCard";
import Image from "next/image";

export default function BookListPage() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showNoCover, setShowNoCover] = useState(false);

  const [filters, setFilters] = useState({
    author: "",
    genre: "",
    hasEbook: false,
    hasAudiobook: false,
    condition: "",
    isBestseller: false,
    rating: 0,
  });

  const PAGE_SIZE = 50;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page,
          ...filters,
        });

        const res = await fetch(`/api/books?${params.toString()}`);
        const data = await res.json();

        setBooks(data.books);
        setTotal(data.total);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page, filters]);

  const handleFilterChange = (key, value) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const totalPageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="relative min-h-screen flex">
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
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Filter Sidebar */}
      <aside className="w-72 p-6 bg-black/80 backdrop-blur-md text-white sticky top-0 h-screen overflow-auto">
        <div className="mb-6 space-y-4">
          <div>
            <label>Author</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 mt-1"
              onChange={(e) => handleFilterChange("author", e.target.value)}
            />
          </div>

          <div>
            <label>Genre</label>
            <select
              className="w-full p-2 rounded bg-gray-700 mt-1 text-white"
              onChange={(e) => handleFilterChange("genre", e.target.value)}
            >
              <option value="">All</option>
              <option value="Fiction">Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Mystery">Mystery</option>
            </select>
          </div>

          <div>
            <label>Condition</label>
            <select
              className="w-full p-2 rounded bg-gray-700 mt-1 text-white"
              onChange={(e) => handleFilterChange("condition", e.target.value)}
            >
              <option value="">Any</option>
              <option value="New">New</option>
              <option value="Second-hand">Second-hand</option>
            </select>
          </div>

          {/* Toggle Buttons */}
          <div className="flex flex-col space-y-2 mt-4">
            <button
              type="button"
              className={`w-full p-2 rounded ${
                filters.hasEbook ? "bg-orange-500" : "bg-gray-600"
              }`}
              onClick={() => handleFilterChange("hasEbook", !filters.hasEbook)}
            >
              Ebook
            </button>

            <button
              type="button"
              className={`w-full p-2 rounded ${
                filters.hasAudiobook ? "bg-orange-500" : "bg-gray-600"
              }`}
              onClick={() =>
                handleFilterChange("hasAudiobook", !filters.hasAudiobook)
              }
            >
              Audiobook
            </button>
          </div>

          {/* Rating Range */}
          <div className="mt-6 w-full">
            <div className="text-sm font-semibold mb-2">
              Ratings: ⭐ {filters.rating}+
            </div>
            <input
              type="range"
              min={0}
              max={5}
              value={filters.rating}
              step={1}
              onChange={(e) =>
                handleFilterChange("rating", Number(e.target.value))
              }
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs mt-1 px-1">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          {/* Best Seller Toggle */}
          <div className="mt-6">
            <button
              type="button"
              className={`w-full p-2 rounded ${
                filters.isBestseller ? "bg-orange-500" : "bg-gray-600"
              }`}
              onClick={() =>
                handleFilterChange("isBestseller", !filters.isBestseller)
              }
            >
              Best Seller
            </button>
          </div>

          {/* No Cover Toggle */}
          <div className="mt-6">
            <button
              type="button"
              className={`w-full p-2 rounded ${
                showNoCover ? "bg-orange-500" : "bg-gray-600"
              }`}
              onClick={() => setShowNoCover((prev) => !prev)}
            >
              Don't Judge a Book by its Cover
            </button>
          </div>
        </div>
      </aside>

      {/* Books Section */}
      <main className="flex-1 p-8 flex flex-col">
        {loading ? (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
          >
            {[...Array(21)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-full">
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
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
          >
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={showNoCover ? { ...book, image: "/no_cover.webp" } : book}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-end items-center mt-8 space-x-2">
          {totalPageNumbers.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded-md text-white ${
                page === p ? "bg-orange-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

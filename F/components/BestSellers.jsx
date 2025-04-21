'use client';

import { useEffect, useState } from "react";
import BookCard from "./BookCard";

export default function BestSellers() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(`/api/books?page=${page}`);
      const data = await res.json();

      const bestSellers = data.books.filter(book => book.isBestseller);
      setBooks(bestSellers);
      setTotalPages(Math.ceil(bestSellers.length / 6));
    };

    fetchBooks();
  }, [page]);

  const booksToShow = books.slice((page - 1) * 6, page * 6);

  return (
    <div className="relative z-10 text-white px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-orange-500">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {booksToShow.map((book, idx) => (
          <BookCard key={idx} book={book} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          className="text-orange-400 hover:text-orange-600"
        >
          ⬅
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`h-3 w-3 rounded-full ${page === i + 1 ? 'bg-orange-500' : 'bg-gray-500'}`}
          />
        ))}

        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          className="text-orange-400 hover:text-orange-600"
        >
          ➡
        </button>
      </div>
    </div>
  );
}

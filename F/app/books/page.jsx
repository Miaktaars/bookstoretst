'use client';

import { useEffect, useState } from 'react';
import BookCard from '@/components/BookCard';

export default function BookListPage() {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const PAGE_SIZE = 20;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`/api/books?page=${page}&genre=${genre}`);
        const data = await res.json();
        setBooks(data.books);
        setTotal(data.total);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, [page, genre]);

  const genres = ['All', 'Fiction', 'Fantasy', 'Romance', 'Sci-Fi', 'Mystery'];

  return (
    <div className="px-6 py-8">
      {/* Genre Filter */}
      <div className="mb-6">
        <label className="font-semibold mr-2">Filter by Genre:</label>
        <select
          className="border rounded px-3 py-1"
          value={genre}
          onChange={(e) => {
            setPage(1);
            setGenre(e.target.value === 'All' ? '' : e.target.value);
          }}
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-8 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          ← Prev
        </button>
        <span className="font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

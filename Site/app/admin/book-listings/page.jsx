"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function AdminBookListingsPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/admin/book-listings");
        const data = await res.json();
        setBooks(data.books || []);
      } catch (error) {
        console.error("Failed to fetch user books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/book-listings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setBooks((prev) => prev.map((b) => (b._id === id ? updated.book : b)));
      }
    } catch (err) {
      console.error("Failed to update book status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteListing = async (id) => {
    if (!confirm("Delete this listing?")) return;
    try {
      await fetch(`/api/admin/book-listings/${id}`, { method: "DELETE" });
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Book Listings</h2>

      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>No listings submitted.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-muted">
            <tr className="text-left border-b">
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Submitted</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">${book.price?.toFixed(2)}</td>
                <td className="p-3">
                  <select
                    value={book.status}
                    onChange={(e) => updateStatus(book._id, e.target.value)}
                    disabled={updatingId === book._id}
                    className="border px-2 py-1 rounded text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-3">
                  {new Date(book.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteListing(book._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

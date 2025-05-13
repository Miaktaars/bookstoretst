"use client";

import { useEffect, useState } from "react";
import { Pencil, ChevronDown, ChevronUp, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [editedBook, setEditedBook] = useState({});
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 50;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`/api/books?page=${page}`);
        const data = await res.json();
        setBooks(data.books);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [page]);

  const handleEdit = (book) => {
    if (editingId === book._id) {
      setEditingId(null);
      setEditedBook({});
      setExpandedId(null);
    } else {
      setEditingId(book._id);
      setEditedBook({ ...book });
      setExpandedId(book._id);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedBook({});
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/books/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedBook),
      });
      if (res.ok) {
        const updated = await res.json();
        setBooks((prev) =>
          prev.map((b) => (b._id === updated._id ? updated : b))
        );
        handleCancel();
        setExpandedId(null);
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setEditedBook({ ...editedBook, [name]: val });
  };

  const sortBooks = (field) => {
    const sorted = [...books].sort((a, b) => {
      const valA = a[field]?.toString().toLowerCase() || "";
      const valB = b[field]?.toString().toLowerCase() || "";
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
    setBooks(sorted);
    setSortField(field);
    setSortAsc(!sortAsc);
  };

  const totalPages = Math.ceil(books.length / PAGE_SIZE);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Books</h2>

      <div className="mb-4 flex justify-between text-sm text-muted-foreground">
        <div>Total Books: {books.length}</div>
        <div>Total Pages: {totalPages}</div>
        <div className="space-x-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </Button>
          <span>Page {page}</span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="rounded-md border">
          <table className="w-full text-sm border-separate border-spacing-0">
            <thead className="bg-muted">
              <tr className="text-left border-b border-gray-500">
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => sortBooks("title")}
                >
                  <div className="flex items-center gap-1">
                    Title{" "}
                    {sortField === "title" &&
                      (sortAsc ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => sortBooks("isbn")}
                >
                  <div className="flex items-center gap-1">
                    ISBN{" "}
                    {sortField === "isbn" &&
                      (sortAsc ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.slice(0, PAGE_SIZE).map((book) => (
                <>
                  <tr
                    key={book._id}
                    className="border-t border-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-4 py-2">{book.title}</td>
                    <td className="px-4 py-2">{book.isbn}</td>
                    <td className="px-4 py-2">${book.price}</td>
                    <td className="px-4 py-2">{book.stockQuantity}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(book)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setExpandedId(
                            expandedId === book._id ? null : book._id
                          )
                        }
                      >
                        {expandedId === book._id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                      {editingId === book._id && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCancel}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleSave}
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                  {expandedId === book._id && (
                    <tr className="bg-gray-50 border-b border-gray-500">
                      <td colSpan="5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Author
                              </label>
                              <Input
                                name="author"
                                value={editedBook.author || book.author}
                                onChange={handleChange}
                                placeholder="Author"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Used Price
                              </label>
                              <Input
                                name="usedPrice"
                                type="number"
                                value={
                                  editedBook.usedPrice || book.usedPrice || ""
                                }
                                onChange={handleChange}
                                placeholder="Used Price"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                eBook Price
                              </label>
                              <Input
                                name="ebookPrice"
                                type="number"
                                value={
                                  editedBook.ebookPrice || book.ebookPrice || ""
                                }
                                onChange={handleChange}
                                placeholder="eBook Price"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Audiobook Price
                              </label>
                              <Input
                                name="audiobookPrice"
                                type="number"
                                value={
                                  editedBook.audiobookPrice ||
                                  book.audiobookPrice ||
                                  ""
                                }
                                onChange={handleChange}
                                placeholder="Audiobook Price"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Genre
                              </label>
                              <Input
                                name="genre"
                                value={
                                  editedBook.genre ||
                                  book.genre?.join(", ") ||
                                  ""
                                }
                                onChange={handleChange}
                                placeholder="Genre"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Description
                              </label>
                              <Textarea
                                name="description"
                                value={
                                  editedBook.description ||
                                  book.description ||
                                  ""
                                }
                                onChange={handleChange}
                                placeholder="Description"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                id="isBestseller"
                                checked={
                                  editedBook.isBestseller ?? book.isBestseller
                                }
                                onCheckedChange={(val) =>
                                  setEditedBook({
                                    ...editedBook,
                                    isBestseller: val,
                                  })
                                }
                              />
                              <label htmlFor="isBestseller">Bestseller</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                id="hasEbook"
                                checked={editedBook.hasEbook ?? book.hasEbook}
                                onCheckedChange={(val) =>
                                  setEditedBook({
                                    ...editedBook,
                                    hasEbook: val,
                                  })
                                }
                              />
                              <label htmlFor="hasEbook">Has eBook</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                id="hasAudiobook"
                                checked={
                                  editedBook.hasAudiobook ?? book.hasAudiobook
                                }
                                onCheckedChange={(val) =>
                                  setEditedBook({
                                    ...editedBook,
                                    hasAudiobook: val,
                                  })
                                }
                              />
                              <label htmlFor="hasAudiobook">
                                Has Audiobook
                              </label>
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <img
                              src={book.image}
                              alt="cover"
                              className="h-48 object-contain mb-2"
                            />
                            <p className="text-xs text-gray-500 break-words text-center max-w-xs">
                              {book.image}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

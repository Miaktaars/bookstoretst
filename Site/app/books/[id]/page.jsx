"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import toast from "react-hot-toast";
import BookCard from "@/components/BookCard";
import { Heart, Star } from "lucide-react";

export default function BookDetailPage() {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);

  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState("used");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books?id=${id}`);
        const data = await res.json();
        const found = data.books?.find((b) => b._id === id);
        setBook(found || null);

        if (found?.genre?.length) {
          const genreRes = await fetch(`/api/books?genre=${found.genre[0]}`);
          const genreData = await genreRes.json();
          const filtered = genreData.books.filter((g) => g._id !== id);
          setSimilarBooks(filtered);
        }
      } catch (err) {
        console.error("Failed to load book:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!book) return <p className="p-6">Book not found.</p>;

  const getPrice = () => {
    if (selectedFormat === "used") return book.usedPrice;
    if (selectedFormat === "new") return book.price;
    if (selectedFormat === "ebook") return book.ebookPrice;
    if (selectedFormat === "audiobook") return book.audiobookPrice;
    return 0;
  };

  const handleAddToCart = () => {
    addItem({
      bookId: `${book._id}-${selectedFormat}`,
      title: book.title,
      author: book.author,
      image: book.image,
      price: getPrice(),
      format: selectedFormat,
      condition: book.condition || "New",
      hasEbook: book.hasEbook,
      hasAudiobook: book.hasAudiobook,
    });
    toast.success("Book added to cart");
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Book Image */}
        <div className="col-span-1">
          <img
            src={book.image || `/no_cover.webp`}
            alt={book.title}
            className="w-full max-w-xs h-auto object-cover rounded-lg shadow mx-auto"
            onError={(e) => (e.target.src = "/no_cover.webp")}
          />
        </div>

        {/* Book Info + Format Selector */}
        <div className="col-span-2 flex flex-col md:flex-row justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-sm text-muted-foreground mb-1">
              by {book.author}
            </p>

            {/* Rating */}
            <div className="flex items-center text-yellow-500 mb-4">
              {Array.from({
                length: Math.round(book.rating?.average || 0),
              }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 stroke-yellow-500"
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">
                ({book.rating?.count || 0} reviews)
              </span>
            </div>

            {/* Format Options */}
            <div className="mt-4">
              <p className="font-medium mb-2">Choose Format:</p>
              <div className="flex gap-3 flex-wrap">
                <label
                  className={`cursor-pointer px-4 py-2 border rounded-md text-sm font-medium transition ${
                    selectedFormat === "used"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value="used"
                    className="hidden"
                    checked={selectedFormat === "used"}
                    onChange={() => setSelectedFormat("used")}
                  />
                  Used ${book.usedPrice?.toFixed(2)}
                </label>

                <label
                  className={`cursor-pointer px-4 py-2 border rounded-md text-sm font-medium transition ${
                    selectedFormat === "new"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value="new"
                    className="hidden"
                    checked={selectedFormat === "new"}
                    onChange={() => setSelectedFormat("new")}
                  />
                  New ${book.price?.toFixed(2)}
                </label>

                {book.hasEbook && (
                  <label
                    className={`cursor-pointer px-4 py-2 border rounded-md text-sm font-medium transition ${
                      selectedFormat === "ebook"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value="ebook"
                      className="hidden"
                      checked={selectedFormat === "ebook"}
                      onChange={() => setSelectedFormat("ebook")}
                    />
                    eBook ${book.ebookPrice?.toFixed(2)}
                  </label>
                )}

                {book.hasAudiobook && (
                  <label
                    className={`cursor-pointer px-4 py-2 border rounded-md text-sm font-medium transition ${
                      selectedFormat === "audiobook"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value="audiobook"
                      className="hidden"
                      checked={selectedFormat === "audiobook"}
                      onChange={() => setSelectedFormat("audiobook")}
                    />
                    Audiobook ${book.audiobookPrice?.toFixed(2)}
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-gray-100 p-4 rounded shadow w-full md:w-64 h-fit">
            <p className="text-sm text-muted-foreground mb-1">
              Selected Format
            </p>
            <h3 className="text-xl font-semibold mb-1 capitalize">
              {selectedFormat}
            </h3>
            <p className="text-lg font-bold mb-4">${getPrice().toFixed(2)}</p>
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add To Cart
            </button>
            <button className="flex items-center justify-center gap-2 text-green-600 text-sm mt-2 hover:underline w-full">
              <Heart className="w-4 h-4" />
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Carousel */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">You May Also Like:</h2>
        {similarBooks.length === 0 ? (
          <p className="text-muted-foreground">No similar books found.</p>
        ) : (
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            itemClass="px-2"
            containerClass="carousel-container"
          >
            {similarBooks.map((b) => (
              <div key={b._id}>
                <BookCard book={b} />
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}

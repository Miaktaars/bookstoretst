"use client";

import { useCartStore } from "@/lib/cartStore";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">
        My Cart{" "}
        <span className="text-gray-500">
          ({items.length} item{items.length !== 1 && "s"})
        </span>
      </h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side: Cart items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.bookId}
                className="flex flex-col md:flex-row items-start md:items-center justify-between border rounded p-4 gap-4"
              >
                {/* Book Info */}
                <div className="flex gap-4 items-start">
                  <img
                    src={item.image || "/no_cover.webp"}
                    alt={item.title}
                    className="w-24 h-32 object-cover rounded border"
                    onError={(e) => (e.target.src = "/no_cover.webp")}
                  />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      by {item.author}
                    </p>
                    <p className="text-sm">
                      <strong>Format:</strong>{" "}
                      {item.hasEbook || item.hasAudiobook
                        ? "Digital"
                        : "Physical"}
                    </p>
                    <p className="text-sm">
                      <strong>Condition:</strong>{" "}
                      {item.hasEbook || item.hasAudiobook
                        ? "--------"
                        : item.condition || "New"}
                    </p>
                  </div>
                </div>

                {/* Price / Quantity / Remove */}
                <div className="flex flex-col items-end gap-2 min-w-[140px]">
                  <p className="text-lg font-semibold">
                    ${item.price.toFixed(2)} USD
                  </p>
                  <div className="flex items-center border rounded overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.bookId,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="px-3 py-1 hover:bg-gray-200 text-sm"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="px-4 text-sm">{item.quantity}</div>
                    <button
                      onClick={() =>
                        updateQuantity(item.bookId, item.quantity + 1)
                      }
                      className="px-3 py-1 hover:bg-gray-200 text-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.bookId)}
                    className="text-sm text-red-600 hover:underline flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right side: Order Summary */}
          <div className="border rounded p-4 h-fit shadow-sm bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between text-sm mb-2">
              <span>
                {items.length} item{items.length !== 1 && "s"} Subtotal
              </span>
              <span>${total.toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Shipping to 🇩🇿</span>
              <span className="text-green-600">FREE</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-base mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)} USD</span>
            </div>
            <Link href="/checkout">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded">
                Proceed To Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

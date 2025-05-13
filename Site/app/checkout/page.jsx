"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookId = searchParams.get("bookId");
  const [singleBook, setSingleBook] = useState(null);
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [coupon, setCoupon] = useState("");
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const isSingle = Boolean(bookId);
  const items = isSingle
    ? singleBook
      ? [
          {
            bookId: singleBook._id,
            title: singleBook.title,
            quantity: 1,
            price: singleBook.price,
          },
        ]
      : []
    : cartItems;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;
      try {
        const res = await fetch(`/api/books?id=${bookId}`);
        const data = await res.json();
        const found = data.books?.find((b) => b._id === bookId);
        setSingleBook(found || null);
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (items.length === 0) {
      alert("Cart is empty.");
      return;
    }

    const payload = {
      email: form.email,
      shippingAddress: {
        fullName: form.fullName,
        street: form.street,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
      },
      items,
      totalAmount: total,
      paymentInfo: {
        method: "card",
        status: "paid",
        transactionId: "manual",
      },
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Order placed successfully!");
        if (!isSingle) clearCart();
        router.push("/");
      } else {
        alert("Order failed.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  if (isSingle && !singleBook)
    return <p className="p-6">Loading book info...</p>;
  if (!isSingle && cartItems.length === 0)
    return <p className="p-6">Your cart is empty.</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left: Shipping & Payment */}
      <div className="lg:col-span-2 space-y-8">
        {/* Shipping Info */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="street">Street</Label>
              <Input
                id="street"
                name="street"
                value={form.street}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={form.country}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Info */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full mt-4" onClick={handleSubmit}>
          Place Order
        </Button>
      </div>

      {/* Right: Order Summary */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{items.length}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Coupon */}
        <Card>
          <CardHeader>
            <CardTitle>Apply Coupon</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input
              id="coupon"
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <Button variant="outline">Apply</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

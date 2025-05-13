"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        setOrder(data.order || null);
      } catch (error) {
        console.error("Failed to load order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!orderId) return <p className="p-6">Invalid order.</p>;
  if (loading) return <p className="p-6">Loading...</p>;
  if (!order) return <p className="p-6">Order not found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        🎉 Order Confirmed!
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Thank you for your purchase. Your order ID is:
      </p>
      <div className="bg-gray-100 p-4 rounded text-sm font-mono mb-6">
        {order._id}
      </div>

      <div className="text-left space-y-2 text-sm">
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Items:</strong>
        </p>
        <ul className="list-disc ml-6">
          {order.items.map((item) => (
            <li key={item.bookId}>
              {item.title} × {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

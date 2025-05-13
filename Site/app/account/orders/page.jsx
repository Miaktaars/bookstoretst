"use client";

import { useEffect, useState } from "react";

export default function UserOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/user/orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Failed to fetch user orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded bg-muted">
              <p className="text-sm text-muted-foreground mb-2">
                Order ID: {order._id}
              </p>
              <p className="text-sm mb-1">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="text-sm mb-1">
                <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
              </p>
              <p className="text-sm mb-1">
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <ul className="text-sm list-disc ml-5 mt-2">
                {order.items.map((item) => (
                  <li key={item.bookId}>
                    {item.title} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

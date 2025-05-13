"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

export default function CartIcon() {
  const items = useCartStore((state) => state.items);
  const total = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-6 h-6 text-white hover:text-yellow-500 transition" />
      {total > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {total}
        </span>
      )}
    </Link>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/admin" },
  { name: "Books", href: "/admin/books" },
  { name: "Users", href: "/admin/users" },
  { name: "Orders", href: "/admin/orders" },
  { name: "Reviews", href: "/admin/reviews" },
  { name: "Requests", href: "/admin/book-requests" },
  { name: "Listings", href: "/admin/book-listings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6 text-xl font-bold">Admin Panel</div>
      <nav className="mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <span
                  className={`block px-6 py-2 cursor-pointer text-gray-700 hover:bg-gray-200 ${
                    pathname === item.href ? "bg-gray-200 font-semibold" : ""
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

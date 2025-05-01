// app/profile/page.jsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      router.push("/");
    } else {
      setUser(storedUser);
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {user.isAdmin && (
          <p className="text-orange-400 font-semibold mt-2">ADMIN</p>
        )}
        <div className="mt-6 flex flex-col gap-2">
          {user.isAdmin && (
            <button
              onClick={() => router.push("/admin")}
              className="bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
            >
              Go to Admin Dashboard
            </button>
          )}
          <button
            onClick={() => {
              localStorage.removeItem("user");
              router.push("/");
              router.refresh();
            }}
            className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

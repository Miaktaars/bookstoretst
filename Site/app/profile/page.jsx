"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Not authenticated");
        }
        const { user } = await res.json();
        setUser(user);
      } catch {
        router.push("/");
      }
    }
    loadUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed", err);
    }
    router.push("/");
    router.refresh();
  };

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
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

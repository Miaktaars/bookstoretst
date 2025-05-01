"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCircle } from "lucide-react";
import AuthModal from "./AuthModal";

export default function UserMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Get user from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      } else {
        localStorage.removeItem("user"); // Clean up invalid value
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      localStorage.removeItem("user"); // Remove corrupt data
    }
  }, []);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setAuthModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.refresh();
  };

  return (
    <div className="relative inline-block text-left z-50">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="rounded-full p-2 hover:bg-gray-200 transition"
      >
        <UserCircle className="w-8 h-8 text-white" />
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 z-50">
          {!user ? (
            <>
              <button
                className="w-full text-left mt-1 hover:underline text-black"
                onClick={() => {
                  setMenuOpen(false);
                  setIsLogin(true);
                  setAuthModalOpen(true);
                }}
              >
                Login
              </button>
              <button
                className="w-full text-left mt-1 hover:underline text-black"
                onClick={() => {
                  setMenuOpen(false);
                  setIsLogin(false);
                  setAuthModalOpen(true);
                }}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <div className="text-black px-2 py-1 font-semibold">
                {user.email === "bookkeeper_admin@gmail.com" ? (
                  <span className="text-orange-500">ADMIN</span>
                ) : (
                  user.email
                )}
              </div>
              <button
                className="w-full text-left mt-1 hover:underline text-black"
                onClick={() => {
                  router.push("/profile");
                  setMenuOpen(false);
                }}
              >
                Profile
              </button>
              <button
                className="w-full text-left mt-1 hover:underline text-black"
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {authModalOpen && (
        <AuthModal
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          onClose={() => setAuthModalOpen(false)}
        />
      )}
    </div>
  );
}

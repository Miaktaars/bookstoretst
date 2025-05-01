"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { UserCircle } from "lucide-react";
import AuthModal from "./AuthModal";

export default function UserMenu() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    router.refresh(); // Refresh current page
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setMenuOpen(!menuOpen)}>
        <UserCircle className="text-white w-8 h-8" />
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-2 px-4 text-sm text-black">
            {user ? (
              <>
                <p
                  className={`font-semibold ${
                    user.isAdmin ? "text-orange-500" : ""
                  }`}
                >
                  {user.isAdmin ? "ADMIN" : user.email}
                </p>
                <button
                  className="w-full text-left mt-2 hover:underline"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/profile");
                  }}
                >
                  Profile
                </button>
                <button
                  className="w-full text-left mt-2 text-red-600 hover:underline"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-full text-left mt-1 hover:underline"
                  onClick={() => {
                    setMenuOpen(false);
                    setIsLogin(true); // 👈 This is for login
                    setAuthModalOpen(true);
                  }}
                >
                  Login
                </button>
                <button
                  className="w-full text-left mt-1 hover:underline"
                  onClick={() => {
                    setMenuOpen(false);
                    setIsLogin(false); // 👈 This is for register
                    setAuthModalOpen(true);
                  }}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {authModalOpen && (
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          isLogin={isLogin}
          switchToSignup={() => setIsLogin(false)}
          switchToLogin={() => setIsLogin(true)}
        />
      )}
    </div>
  );
}

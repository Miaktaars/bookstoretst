"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCircle } from "lucide-react";
import AuthModal from "./AuthModal";

export default function UserMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null); // "login" | "register" | null
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null); // { message: string, type: 'success' | 'info' }
  const router = useRouter();

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000); // Hide after 3s
  };

  // Fetch authenticated user
  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const { user } = await res.json();
        setUser(user);
      } else {
        setUser(null);
      }
    }
    loadUser();
  }, []);

  // Close modal on ESC
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setActiveForm(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setMenuOpen(false);
    showAlert("You have been logged out.", "info");
    router.refresh();
  };

  return (
    <div className="relative inline-block text-left z-50">
      <button
        onClick={() => setMenuOpen((o) => !o)}
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
                  setActiveForm("login");
                }}
              >
                Login
              </button>
              <button
                className="w-full text-left mt-1 hover:underline text-black"
                onClick={() => {
                  setMenuOpen(false);
                  setActiveForm("register");
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
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {activeForm && (
        <AuthModal
          isLogin={activeForm === "login"}
          setIsLogin={(login) => setActiveForm(login ? "login" : "register")}
          onClose={() => setActiveForm(null)}
          showAlert={showAlert}
        />
      )}

      {alert && (
        <div
          role="alert"
          className={`flex items-center gap-2 px-4 py-3 rounded shadow-lg text-white absolute top-0 right-0 mt-2 mr-2 z-50 ${
            alert.type === "success" ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                alert.type === "success"
                  ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  : "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              }
            />
          </svg>
          <span>{alert.message}</span>
        </div>
      )}
    </div>
  );
}

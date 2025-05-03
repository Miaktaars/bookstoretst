"use client";
import { useState } from "react";

export default function LoginForm({ onClose, switchToSignup, showAlert }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        showAlert("Login successful!", "success");
        onClose();
        location.reload(); // refresh current page
      }
    } catch (err) {
      setError("Login failed");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4"
      autoComplete="on"
    >
      <h2 className="text-white text-2xl font-bold">Welcome Back!</h2>
      <p className="text-sm text-gray-400">Login to your account</p>

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="p-2 rounded"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        name="password"
        autoComplete="current-password"
        type="password"
        placeholder="Password"
        className="p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-orange-500 text-white p-2 rounded font-bold hover:bg-orange-600"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-sm text-gray-400">
        Don't have an account?{" "}
        <span
          onClick={switchToSignup}
          className="text-orange-400 cursor-pointer"
        >
          Register
        </span>
      </p>
    </form>
  );
}

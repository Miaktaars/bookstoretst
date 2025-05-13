"use client";

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
      {/* Optional: Add user info, logout button, or status indicators here */}
      <div className="text-sm text-gray-600">
        {/* Example user status placeholder */}
        Logged in as <span className="font-medium">Admin</span>
      </div>
    </header>
  );
}
